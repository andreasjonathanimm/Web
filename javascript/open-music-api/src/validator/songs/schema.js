const Joi = require('joi');

const year = new Date().getFullYear();

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(year)
    .required(),
  performer: Joi.string().required(),
  genre: Joi.string().required(),
  duration: Joi.number().integer().min(0).max(900000),
  albumId: Joi.string(),
});

const FilterSongPayloadSchema = Joi.object({
  title: Joi.string(),
  performer: Joi.string(),
});

module.exports = { SongPayloadSchema, FilterSongPayloadSchema };
