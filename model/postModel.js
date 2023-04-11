const Joi = require("joi");

const postSchema = Joi.object({
    body: Joi.string().required(),
    userID: Joi.string().alphanum()
})

module.exports = {
   postSchema
  };