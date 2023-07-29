/* eslint-disable no-underscore-dangle */
const InvariantError = require('../../exceptions/InvariantError');

class AlbumsHandler {
  constructor(albumsService, songsService, storageService, albumsValidator, uploadsValidator) {
    this._albumsService = albumsService;
    this._songsService = songsService;
    this._storageService = storageService;
    this._albumsValidator = albumsValidator;
    this._uploadsValidator = uploadsValidator;

    this.postAlbumsHandler = this.postAlbumsHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.postAlbumsCoverHandler = this.postAlbumsCoverHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    this.postLikeAlbumByIdHandler = this.postLikeAlbumByIdHandler.bind(this);
    this.deleteLikeAlbumByIdHandler = this.deleteLikeAlbumByIdHandler.bind(this);
    this.getLikeAlbumByIdHandler = this.getLikeAlbumByIdHandler.bind(this);
  }

  async postAlbumsHandler(request, h) {
    this._albumsValidator.validateAlbumPayload(request.payload);
    const { name = 'untitled', year } = request.payload;
    const albumId = await this._albumsService.addAlbum({ name, year });

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
    const album = await this._albumsService.getAlbumById(id);
    const songs = await this._songsService.getSongs();

    if (album.coverUrl === undefined) {
      album.coverUrl = null;
    }

    if (songs.length) {
      album.songs = songs.filter((song) => song.album_id === id);

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
    this._albumsValidator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    const { name, year } = request.payload;

    await this._albumsService.editAlbumById(id, { name, year });

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
    this._uploadsValidator.validateImageHeaders(cover.hapi.headers);

    const filename = await this._storageService.writeFile(cover, cover.hapi);

    await this._albumsService.addAlbumCoverById(id, `http://${process.env.HOST}:${process.env.PORT}/uploads/images/${filename}`);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }

  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;
    await this._albumsService.deleteAlbumById(id);
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
    await this._albumsService.getAlbumById(id);

    const hasLiked = await this._albumsService.verifyLikeAlbumById(id, credentialId);
    if (hasLiked) {
      throw new InvariantError('Like gagal ditambahkan, Anda sudah memberikan like sebelumnya');
    }

    await this._albumsService.addLikeAlbumById(id, credentialId);

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
    await this._albumsService.getAlbumById(id);

    const hasLiked = await this._albumsService.verifyLikeAlbumById(id, credentialId);
    if (!hasLiked) {
      throw new InvariantError('Like gagal dihapus, Anda belum memberikan like sebelumnya');
    }

    await this._albumsService.deleteLikeAlbumById(id, credentialId);

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
    await this._albumsService.getAlbumById(id);

    const { likesCount, cached } = await this._albumsService.getLikeAlbumById(id);

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
