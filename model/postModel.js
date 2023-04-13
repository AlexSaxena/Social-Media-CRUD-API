const { connect } = require("../db/connect");
const Joi = require("joi");
const { ObjectId } = require("mongodb");

//Joi validation schema for endpoint /posts/create
const postSchema = Joi.object({
  body: Joi.string().required(),
});

// Joi Validation schema for endpoint /posts/delete
const deleteSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

// Joi Validation schema for endpoint /posts/post
// NOTE: Can be refactored later when all Schemas are at place
const findOnePostSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

// Joi Validation schema for endpoints /posts/PATCH.
const patchSchema = Joi.object({
  id: Joi.string().length(24).required(),
  body: Joi.string().required(),
});

const checkPostExist = async (id, user) => {
  const db = await connect();
  const collection = db.collection("posts");
  // Use length instead of min to check the string length
  const post = await collection.findOne({
    _id: new ObjectId(id),
    userID: user,
  });
  // If post exists in database, return its id
  if (!post) {
    return false;
  }
  return { id };
};

module.exports = {
  postSchema,
  findOnePostSchema,
  deleteSchema,
  patchSchema,
  checkPostExist,
};
