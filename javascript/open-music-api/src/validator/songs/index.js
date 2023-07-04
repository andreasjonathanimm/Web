const InvariantError = require('../../exceptions/InvariantError');
const { SongPayloadSchema, FilterSongPayloadSchema } = require('./schema');

const SongsValidator = {
  validateSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateFilterSongPayload: (payload) => {
    const validationResult = FilterSongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

module.exports = SongsValidator;
