const {likePostSchema, checkAlreadyLiked} = require('../../model/postModel');
const {getClientDB} = require('../../db/connect');
const {ObjectId} = require('mongodb');

const likePost = async (req, res) => {
  try {
    const {error, value} = likePostSchema.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({message: errorMessage});
    }
    const {id} = value;
    const {user} = req.loggedInUser;

    const alreadyLiked = await checkAlreadyLiked(id, user);
    if (alreadyLiked) {
      const db = await getClientDB();
      const collection = db.collection('posts');
      const update = await collection.updateOne({_id: new ObjectId(id)}, {$pull: {like: user}});
      if (update.modifiedCount) {
        return res.status(200).json({message: 'Post unliked!'});
      }
      return res.status(500).json({message: 'No changes have been made'});
    } else {
      const db = await getClientDB();
      const collection = db.collection('posts');
      const update = await collection.updateOne({_id: new ObjectId(id)}, {$push: {like: user}});
      if (update.modifiedCount) {
        return res.status(200).json({message: 'Post liked!'});
      }
      return res.status(500).json({message: 'No changes have been made'});
    }
  } catch (error) {
    return res.status(500).json({message: 'Internal server error'});
  }
};
module.exports = {
  likePost,
};
