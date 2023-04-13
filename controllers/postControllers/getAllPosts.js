const {getClientDB} = require('../../db/connect');

exports.getAllPosts = async function getAllPosts(req, res) {
  const username = req.loggedInUser.user;

  const db = await getClientDB();
  const userCollection = db.collection('users');

  const user = await userCollection.findOne({username: username});
  const following = user.following;

  const collection = db.collection('posts');
  let documents = [];

  for (let i = 0; i < following.length; i++) {
    const document = await collection.find({userID: following[i]}).toArray();
    documents.push(document);
  }

  if (documents.length === 0) return res.status(404).json({message: 'No posts were found, try following users first'});

  res.status(200).json(documents);
};
