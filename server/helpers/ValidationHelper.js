const Joi = require('joi');
const Boom = require('boom');

const phoneBookValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = { phoneBookValidation };
