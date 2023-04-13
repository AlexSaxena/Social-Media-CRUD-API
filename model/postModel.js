const {connect} = require('../db/connect');
const Joi = require('joi');
const {ObjectId} = require('mongodb');

//Joi validation schema for endpoint /posts/create
const postSchema = Joi.object({
  body: Joi.string().required(),
});

// Joi Validation schema for endpoint /posts/delete
const deleteSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

// Joi Validation schema for endpoints /posts/PATCH.
const patchSchema = Joi.object({
  id: Joi.string().length(24).required(),
  body: Joi.string().required(),
});

// Joi Validation schema for endpoints /posts/allown.
const getAllUserPostsSchema = Joi.object({
  username: Joi.string().required(),
});

const checkPostExist = async (id, user) => {
  const db = await connect();
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
  getAllUserPostsSchema,
  checkPostExist,
};
