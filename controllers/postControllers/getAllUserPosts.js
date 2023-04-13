const {getClientDB} = require('../../db/connect');
const {getAllUserPostsSchema} = require('../../model/postModel');

exports.getAllUserPosts = async function getAllUserPosts(req, res) {
  const username = req.loggedInUser.user;

  let validation = getAllUserPostsSchema.validate({username: username});
  if (validation.error) {
    return res.status(406).json({message: validation.error.details[0].message});
  }

  const db = await getClientDB();
  const collection = db.collection('posts');

  const ownPosts = await collection.find({userID: username}).toArray();

  if (ownPosts.length === 0) return res.status(404).json({message: 'No posts were found'});

  res.status(200).json(ownPosts);
};
