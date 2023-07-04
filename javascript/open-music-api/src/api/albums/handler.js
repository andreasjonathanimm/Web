/* eslint-disable no-underscore-dangle */
class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumsHandler = this.postAlbumsHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  // Specifications:
  // Body request: name: string, year: number
  // Response:
  //  status code: 201 (created),
  //    body: { status: 'success', data: { albumId } }
  async postAlbumsHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  // Specifications:
  // Body request: none
  // Response:
  //  status code: 200 (OK),
  //    body: { status: 'success', data: { album } }
  async getAlbumByIdHandler(request, h) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    const songs = await this._service.getSongs();

    // check if songs is not undefined
    if (songs !== undefined) {
      // filter songs by albumId
      album.songs = songs.filter((song) => song.albumId === id);

      const response = h.response({
        status: 'success',
        data: {
          album: {
            id: album.id,
            name: album.name,
            year: album.year,
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

    // if songs is undefined
    const response = h.response({
      status: 'success',
      data: {
        album: {
          id: album.id,
          name: album.name,
          year: album.year,
          songs: [],
        },
      },
    });
    response.code(200);
    return response;
  }

  // Specifications:
  // Body request: name: string, year: number
  // Response:
  //  status code: 200 (OK),
  //    body: { status: 'success', message: 'Album berhasil diperbarui' }
  async putAlbumByIdHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    const { name, year } = request.payload;

    await this._service.editAlbumById(id, { name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  // Specifications:
  // Body request: none
  // Response:
  //  status code: 200 (OK),
  //    body: { status: 'success', message: 'Album berhasil dihapus' }
  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);
    const response = h.response({
      status: 'success',
      message: 'Album berhasil dihapus',
    });
    response.code(200);
    return response;
  }
}

module.exports = AlbumsHandler;
