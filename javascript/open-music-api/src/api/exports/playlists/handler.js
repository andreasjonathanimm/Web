const autoBind = require('auto-bind');

class ExportsHandler {
  constructor(producerService, playlistsService, validator) {
    this.producerService = producerService;
    this.playlistsService = playlistsService;
    this.validator = validator;

    autoBind(this);
  }

  async postExportPlaylistHandler(request, h) {
    this.validator.validateExportPlaylistPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;

    await this.playlistsService.verifyPlaylistOwner(playlistId, credentialId);

    const message = {
      playlistId,
      targetEmail: request.payload.targetEmail,
    };

    await this.producerService.sendMessage('export:playlist', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda sedang kami proses',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
