const autoBind = require('auto-bind');
const InvariantError = require('../../exceptions/InvariantError');

class AlbumsHandler {
  constructor(albumsService, songsService, storageService, albumsValidator, uploadsValidator) {
    this.albumsService = albumsService;
    this.songsService = songsService;
    this.storageService = storageService;
    this.albumsValidator = albumsValidator;
    this.uploadsValidator = uploadsValidator;

    autoBind(this);
  }

  async postAlbumsHandler(request, h) {
    this.albumsValidator.validateAlbumPayload(request.payload);
    const { name = 'untitled', year } = request.payload;
    const albumId = await this.albumsService.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request, h) {
    const { id } = request.params;
    const album = await this.albumsService.getAlbumById(id);
    const songs = await this.songsService.getSongs();

    if (album.coverUrl === undefined) {
      album.coverUrl = null;
    }

    if (songs.length) {
      album.songs = songs.filter((song) => song.albumid === id);

      const response = h.response({
        status: 'success',
        message: 'Album berhasil ditemukan',
        data: {
          album: {
            id: album.id,
            name: album.name,
            year: album.year,
            coverUrl: album.coverUrl,
            songs: album.songs.map((song) => ({
              id: song.id,
              title: song.title,
              performer: song.performer,
            })),
          },
        },
      });
      response.code(200);
      return response;
    }

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditemukan',
      data: {
        album: {
          id: album.id,
          name: album.name,
          year: album.year,
          coverUrl: album.coverUrl,
          songs: [],
        },
      },
    });
    response.code(200);
    return response;
  }

  async putAlbumByIdHandler(request, h) {
    this.albumsValidator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    const { name, year } = request.payload;

    await this.albumsService.editAlbumById(id, { name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  async postAlbumsCoverHandler(request, h) {
    const { id } = request.params;
    const { cover } = request.payload;
    this.uploadsValidator.validateImageHeaders(cover.hapi.headers);

    const filename = await this.storageService.writeFile(cover, cover.hapi);

    await this.albumsService.addAlbumCoverById(id, `http://${process.env.HOST}:${process.env.PORT}/uploads/images/${filename}`);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }

  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;
    await this.albumsService.deleteAlbumById(id);
    const response = h.response({
      status: 'success',
      message: 'Album berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  async postLikeAlbumByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    // test if album exists
    await this.albumsService.getAlbumById(id);

    const hasLiked = await this.albumsService.verifyLikeAlbumById(id, credentialId);
    if (hasLiked) {
      throw new InvariantError('Like gagal ditambahkan, Anda sudah memberikan like sebelumnya');
    }

    await this.albumsService.addLikeAlbumById(id, credentialId);

    const response = h.response({
      status: 'success',
      message: 'Like berhasil ditambahkan',
    });
    response.code(201);
    return response;
  }

  async deleteLikeAlbumByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    // test if album exists
    await this.albumsService.getAlbumById(id);

    const hasLiked = await this.albumsService.verifyLikeAlbumById(id, credentialId);
    if (!hasLiked) {
      throw new InvariantError('Like gagal dihapus, Anda belum memberikan like sebelumnya');
    }

    await this.albumsService.deleteLikeAlbumById(id, credentialId);

    const response = h.response({
      status: 'success',
      message: 'Like berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  async getLikeAlbumByIdHandler(request, h) {
    const { id } = request.params;

    // test if album exists
    await this.albumsService.getAlbumById(id);

    const { likesCount, cached } = await this.albumsService.getLikeAlbumById(id);

    const response = h.response({
      status: 'success',
      data: {
        likes: parseInt(likesCount, 10),
      },
    });
    response.code(200);
    if (cached) {
      response.header('X-Data-Source', 'cache');
    } else {
      response.header('X-Data-Source', 'database');
    }
    return response;
  }
}

module.exports = AlbumsHandler;
