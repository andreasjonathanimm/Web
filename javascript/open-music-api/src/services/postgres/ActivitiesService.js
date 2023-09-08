const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class ActivitiesService {
  constructor() {
    this.pool = new Pool();
  }

  async addActivity({
    credentialId, playlistId, songId, action,
  }) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, credentialId, action, time],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Activity gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getActivities(playlistId) {
    const query = {
      // id, username, title, action, time
      text: 'SELECT a.id, u.username, s.title, a.action, a.time FROM activities a JOIN users u ON u.id = a.user_id JOIN songs s ON s.id = a.song_id WHERE a.playlist_id = $1 ORDER BY a.time ASC',
      values: [playlistId],
    };
    const result = await this.pool.query(query);
    return result.rows;
  }
}

module.exports = ActivitiesService;
