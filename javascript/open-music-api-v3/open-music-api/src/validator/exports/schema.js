const Joi = require('joi');

const PostExportPlaylistPayloadSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = { PostExportPlaylistPayloadSchema };
