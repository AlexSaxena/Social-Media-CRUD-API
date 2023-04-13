const {followUserSchema, getFollowingList} = require('../../model/userModel');
const {checkUserExists} = require('../../model/authModel');
const {getClientDB} = require('../../db/connect');

const unfollowUser = async (req, res) => {
  try {
    const {error, value} = followUserSchema.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({message: errorMessage});
    }
    const {username} = value;

    const userExists = await checkUserExists(username);
    if (!userExists) {
      return res.status(404).json({message: 'User not found'});
    }

    const followingList = await getFollowingList(req.loggedInUser.user);

    if (!followingList) {
      return res.status(404).json({message: 'User not found'});
    }

    if (!followingList.includes(username)) {
      return res.status(409).json({message: "You're not following that user"});
    }

    const db = await getClientDB();
    const collection = db.collection('users');
    const update = await collection.updateOne({username: req.loggedInUser.user}, {$pull: {following: username}});
    if (update.modifiedCount) {
      return res.status(200).json({message: 'Successfully unfollowed user!'});
    }
    return res.status(500).json({message: 'No changes have been made'});
  } catch (error) {
    return res.status(500).json({message: 'Internal server error'});
  }
};

module.exports = {
  unfollowUser,
};
