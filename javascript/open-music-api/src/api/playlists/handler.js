const autoBind = require('auto-bind');

class PlaylistsHandler {
  constructor(playlistsService, songsService, activitiesService, validator) {
    this.playlistsService = playlistsService;
    this.songsService = songsService;
    this.activitiesService = activitiesService;
    this.validator = validator;

    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    this.validator.validatePlaylistPayload(request.payload);
    const { name = 'untitled' } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this.playlistsService.addPlaylist({ name, owner: credentialId });

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { playlists, cached } = await this.playlistsService.getPlaylists(credentialId);

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditemukan',
      data: {
        playlists,
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

  async deletePlaylistByIdHandler(request, h) {
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this.playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this.playlistsService.deletePlaylistById(playlistId);

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  async postSongToPlaylistHandler(request, h) {
    this.validator.validatePlaylistSongPayload(request.payload);
    const { playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this.playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this.songsService.verifySongId(songId);
    await this.playlistsService.addSongToPlaylist(playlistId, songId);
    await this.activitiesService.addActivity({
      credentialId, playlistId, songId, action: 'add',
    });

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
    });
    response.code(201);
    return response;
  }

  async getSongsFromPlaylistHandler(request, h) {
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this.playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const playlist = await this.playlistsService.getPlaylistById(playlistId);
    const { songs, cached } = await this.playlistsService.getSongsFromPlaylist(playlistId);

    playlist.songs = songs;

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditemukan di playlist',
      data: {
        playlist,
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

  async deleteSongFromPlaylistHandler(request, h) {
    this.validator.validatePlaylistSongPayload(request.payload);
    const { playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this.playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this.songsService.verifySongId(songId);
    await this.playlistsService.deleteSongFromPlaylist(playlistId, songId);
    await this.activitiesService.addActivity({
      credentialId, playlistId, songId, action: 'delete',
    });

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    });
    response.code(200);
    return response;
  }

  async getActivitiesHandler(request, h) {
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this.playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const activities = await this.activitiesService.getActivities(playlistId);

    const response = h.response({
      status: 'success',
      message: 'Aktivitas berhasil ditemukan',
      data: {
        playlistId,
        activities: activities.map((activity) => ({
          username: activity.username,
          title: activity.title,
          action: activity.action,
          time: activity.time,
        })),
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = PlaylistsHandler;
