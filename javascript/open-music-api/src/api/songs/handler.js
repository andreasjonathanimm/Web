/* eslint-disable no-underscore-dangle */
class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongsHandler = this.postSongsHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  // Specifications:
  // Body request:
  //  title: string,
  //  year: number,
  //  performer: string,
  //  genre: string,
  //  duration: number?,
  //  albumId: string?,
  // Response:
  //  status code: 201 (created),
  //    body: { status: 'success', data: { songId } }
  async postSongsHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const {
      title, year, performer, genre, duration, albumId,
    } = request.payload;
    const songId = await this._service.addSong(
      {
        title, year, performer, genre, duration, albumId,
      },
    );

    const response = h.response({
      status: 'success',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  // Specifications:
  // Body request: none
  // Response:
  //  status code: 200 (OK),
  //    body: { status: 'success', data: { songs: [ { id, title, performer } ] } }
  async getSongsHandler(request) {
    // the query parameters must be string so the filter can work properly
    this._validator.validateFilterSongPayload(request.query);
    const songs = await this._service.getSongs();
    const { title, performer } = request.query;

    // filter the songs based on the query parameters
    const filteredSongs = songs.filter((song) => {
      const isTitleMatch = title === undefined || song.title.toLowerCase()
        .includes(title.toLowerCase());
      const isPerformerMatch = performer === undefined || song.performer.toLowerCase()
        .includes(performer.toLowerCase());
      return isTitleMatch && isPerformerMatch;
    });

    return {
      status: 'success',
      data: {
        songs: filteredSongs.map((song) => ({
          id: song.id,
          title: song.title,
          performer: song.performer,
        })),
      },
    };
  }

  // Specifications:
  // Body request: none
  // Response:
  //  status code: 200 (OK),
  //    body: { status: 'success', data: { song } }
  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);
    const response = h.response({
      status: 'success',
      data: {
        song,
      },
    });
    response.code(200);
    return response;
  }

  // Specifications:
  // Body request:
  //   title: string, year: number, performer: string, genre: string,
  //   duration: number?, albumId: string?
  // Response:
  //  status code: 200 (OK),
  //    body: { status: 'success', message: 'Song berhasil diperbarui' }
  async putSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;
    const {
      title, year, performer, genre, duration, albumId,
    } = request.payload;

    await this._service.editSongById(id, {
      title, year, performer, genre, duration, albumId,
    });

    const response = h.response({
      status: 'success',
      message: 'Song berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  // Specifications:
  // Body request: none
  // Response:
  //  status code: 200 (OK),
  //    body: { status: 'success', message: 'Song berhasil dihapus' }
  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteSongById(id);
    const response = h.response({
      status: 'success',
      message: 'Song berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = SongsHandler;
