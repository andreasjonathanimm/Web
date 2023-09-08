const autoBind = require('auto-bind');

class SongsHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    autoBind(this);
  }

  async postSongHandler(request, h) {
    this.validator.validateSongPayload(request.payload);
    const songId = await this.service.addSong(request.payload);

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler(request, h) {
    this.validator.validateFilterSongPayload(request.query);
    const { title, performer } = request.query;
    const { songs, cached } = await this.service.getSongs(title, performer);

    const response = h.response({
      status: 'success',
      data: {
        songs,
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

  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    const { song, cached } = await this.service.getSongById(id);
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditemukan',
      data: {
        song,
      },
    });
    if (cached) {
      response.header('X-Data-Source', 'cache');
    } else {
      response.header('X-Data-Source', 'database');
    }
    response.code(200);
    return response;
  }

  async putSongByIdHandler(request, h) {
    this.validator.validateSongPayload(request.payload);
    const { id } = request.params;
    const {
      title, year, performer, genre, duration, albumId,
    } = request.payload;

    await this.service.editSongById(id, {
      title, year, performer, genre, duration, albumId,
    });

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;
    await this.service.deleteSongById(id);
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = SongsHandler;
