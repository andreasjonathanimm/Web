/* eslint-disable no-underscore-dangle */
class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlst = await this._playlistsService.getPlaylistById(playlistId);
      const sngs = await this._playlistsService.getSongsFromPlaylist(playlistId);

      playlst.songs = sngs;

      const data = {
        playlist: {
          id: playlst.id,
          name: playlst.name,
          songs: playlst.songs,
        },
      };

      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(data));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
