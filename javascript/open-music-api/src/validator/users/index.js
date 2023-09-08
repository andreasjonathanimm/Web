const { PostUserPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const AuthenticationsValidator = {
  validatePostUserPayload: (payload) => {
    const validationResult = PostUserPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AuthenticationsValidator;
