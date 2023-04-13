const {ObjectId} = require('mongodb');
const {getClientDB} = require('../../db/connect');
const {deleteSchema, checkPostExist} = require('../../model/postModel');

const deletePost = async function (req, res) {
  let validation = deleteSchema.validate(req.body);
  if (validation.error) {
    return res.status(406).json({message: validation.error.details[0].message});
  }

  const {id} = req.body;
  const {user} = req.loggedInUser;

  const checkPost = await checkPostExist(id, user);

  if (checkPost === false) {
    return res.status(404).json({message: "Post doesn't exist"});
  } else {
    try {
      const db = await getClientDB();
      const collection = db.collection('posts');

      await collection.deleteOne({_id: new ObjectId(id), userID: user});

      return res.status(200).json({message: 'Post deleted successfully'});
    } catch (err) {
      console.error(err);
      return res.status(400).json({message: 'Error deleting post'});
    }
  }
};

exports.deletePost = deletePost;
