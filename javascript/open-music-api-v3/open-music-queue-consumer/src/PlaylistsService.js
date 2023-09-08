const { Pool } = require('pg');
const { mapDBToModel } = require('./utils/playlists');
const NotFoundError = require('./exceptions/NotFoundError');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async getSongsFromPlaylist(playlistId) {
        const query = {
            text: 'SELECT songs.id, songs.title, songs.performer FROM songs LEFT JOIN playlist_songs ON songs.id = playlist_songs.song_id WHERE playlist_songs.playlist_id = $1',
            values: [playlistId],
          };
          const result = await this._pool.query(query);
          return result.rows;
    }

    async getPlaylistById(id) {
    const query = {
      text: 'SELECT playlists.id, playlists.name, users.username FROM playlists LEFT JOIN users ON users.id = playlists.owner WHERE playlists.id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  async getPlaylistById(id) {
    const query = {
      text: 'SELECT playlists.id, playlists.name, users.username FROM playlists LEFT JOIN users ON users.id = playlists.owner WHERE playlists.id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    return result.rows.map(mapDBToModel)[0];
  }
}

module.exports = PlaylistsService;
