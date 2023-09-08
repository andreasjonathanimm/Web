require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const path = require('path');
const config = require('./utils/config');

// albums
const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/AlbumsService');
const AlbumsValidator = require('./validator/albums');

// songs
const songs = require('./api/songs');
const SongsService = require('./services/postgres/SongsService');
const SongsValidator = require('./validator/songs');

// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

// users
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

// collaborations
const collaborations = require('./api/collaborations');
const CollaborationsService = require('./services/postgres/CollaborationsService');
const CollaborationsValidator = require('./validator/collaborations');

// playlists
const playlists = require('./api/playlists');
const PlaylistsService = require('./services/postgres/PlaylistsService');
const PlaylistsValidator = require('./validator/playlists');

// playlists exports
const playlistsExports = require('./api/exports/playlists');
const ProducerService = require('./services/rabbitmq/ProducerService');
const ExportsValidator = require('./validator/exports');

// activities
const ActivitiesService = require('./services/postgres/ActivitiesService');

// error handling
const ClientError = require('./exceptions/ClientError');

// storage
const StorageService = require('./services/storage/StorageService');
const UploadsValidator = require('./validator/uploads');

// cache
const CacheService = require('./services/redis/CacheService');

const init = async () => {
  const cacheService = new CacheService();
  const albumsService = new AlbumsService(cacheService);
  const songsService = new SongsService(cacheService);
  const usersService = new UsersService();
  const collaborationsService = new CollaborationsService();
  const playlistsService = new PlaylistsService(collaborationsService, cacheService);
  const authenticationsService = new AuthenticationsService();
  const activitiesService = new ActivitiesService();
  const storageService = new StorageService(path.resolve(__dirname, 'api/uploads/images'));

  const server = Hapi.server({
    port: config.app.port,
    host: config.app.host,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: config.jwt.accessTokenKey,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: config.jwt.accessTokenAge,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([{
    plugin: albums,
    options: {
      albumsService,
      songsService,
      storageService,
      albumsValidator: AlbumsValidator,
      uploadsValidator: UploadsValidator,
    },
  },
  {
    plugin: songs,
    options: {
      service: songsService,
      validator: SongsValidator,
    },
  },
  {
    plugin: authentications,
    options: {
      authenticationsService,
      usersService,
      tokenManager: TokenManager,
      authenticationsValidator: AuthenticationsValidator,
      usersValidator: UsersValidator,
    },
  },
  {
    plugin: collaborations,
    options: {
      collaborationsService,
      usersService,
      playlistsService,
      validator: CollaborationsValidator,
    },
  },
  {
    plugin: playlists,
    options: {
      playlistsService,
      songsService,
      activitiesService,
      validator: PlaylistsValidator,
    },
  },
  {
    plugin: playlistsExports,
    options: {
      producerService: ProducerService,
      playlistsService,
      validator: ExportsValidator,
    },
  },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      // penanganan client error oleh hapi secara native, seperti 404
      if (!response.isServer) {
        return h.continue;
      }

      // server error
      const newResponse = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      newResponse.code(500);
      console.error(response);
      return newResponse;
    }
    // jika bukan error lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });

  server.route({
    method: 'GET',
    path: '/uploads/images/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'api/uploads/images'),
      },
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
