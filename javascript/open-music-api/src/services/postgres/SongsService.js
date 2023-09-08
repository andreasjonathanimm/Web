const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModel } = require('../../utils/songs');

class SongsService {
  constructor(cacheService) {
    this.pool = new Pool();
    this.cacheService = cacheService;
  }

  async addSong({
    title, year, performer, genre, duration, albumId,
  }) {
    const id = `song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    this.cacheService.delete('songs');

    return result.rows[0].id;
  }

  async getSongs(title = '', performer = '') {
    try {
      const result = await this.cacheService.get(`songs:${title}:${performer}`);
      return {
        songs: JSON.parse(result),
        cached: true,
      };
    } catch (error) {
      const result = await this.pool.query({
        text: `SELECT songs.id, songs.title, songs.performer FROM songs WHERE songs.title LIKE '%${title}%' AND songs.performer LIKE '%${performer}%'`,
      });

      await this.cacheService.set(`songs:${title}:${performer}`, JSON.stringify(result.rows));

      return {
        songs: result.rows.map(mapDBToModel),
        cached: false,
      };
    }
  }

  async getSongById(id) {
    try {
      const result = await this.cacheService.get(`song:${id}`);
      return {
        song: JSON.parse(result),
        cached: true,
      };
    } catch (error) {
      const query = {
        text: 'SELECT * FROM songs WHERE id = $1',
        values: [id],
      };
      const result = await this.pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Lagu tidak ditemukan');
      }

      await this.cacheService.set(`song:${id}`, JSON.stringify(result.rows[0]), 1800);

      return {
        song: mapDBToModel(result.rows[0]),
        cached: false,
      };
    }
  }

  async editSongById(id, {
    title, year, performer, genre, duration, albumId,
  }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
      values: [title, year, performer, genre, duration, albumId, id],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui song. Id tidak ditemukan');
    }

    this.cacheService.delete('songs');
    this.cacheService.delete(`song:${id}`);
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }

    this.cacheService.delete('songs');
    this.cacheService.delete(`song:${id}`);
  }

  async verifySongId(id) {
    const query = {
      text: 'SELECT id FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
  }
}

module.exports = SongsService;
