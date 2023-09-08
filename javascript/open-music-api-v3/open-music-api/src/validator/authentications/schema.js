const Joi = require('joi');

const PostUserPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

const PostAuthenticationPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const PutAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const DeleteAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  PostUserPayloadSchema,
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
};
