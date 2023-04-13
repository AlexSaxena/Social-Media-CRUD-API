const {getClientDB} = require('../db/connect');
const Joi = require('joi');
const {ObjectId} = require('mongodb');

const postSchema = Joi.object({
  body: Joi.string().required(),
});

const deleteSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

const patchSchema = Joi.object({
  id: Joi.string().length(24).required(),
  body: Joi.string().required(),
});

const checkPostExist = async (id, user) => {
  const db = await getClientDB();
  const collection = db.collection('posts');
  const post = await collection.findOne({
    _id: new ObjectId(id),
    userID: user,
  });
  if (!post) {
    return false;
  }
  return {id};
};

module.exports = {
  postSchema,
  deleteSchema,
  patchSchema,
  checkPostExist,
};
