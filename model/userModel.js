const {getClientDB} = require('../db/connect');
const Joi = require('joi');

const followUserSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(16).required().messages({
    'string.base': 'Username should be a string',
    'string.empty': 'Username is required',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
});

const getFollowingList = async (user) => {
  const db = await getClientDB();
  const collection = db.collection('users');
  const userObject = await collection.findOne({username: {$regex: new RegExp(user, 'i')}});
  if (!userObject) {
    return false;
  }
  return userObject.following;
};

module.exports = {
  followUserSchema,
  getFollowingList,
};
