const { connect } = require("../../db/connect");

// Get all posts from users that the user follows
exports.getAllPosts = async function getAllPosts(req, res) {
    // Retrieves username from cookie
    const username = req.loggedInUser.user;
    
    const db = await connect();
    const userCollection = db.collection('users');

    // Retrieves list of user's followed users
    const user = await userCollection.findOne({ username: username });
    const following = user.following;

    const collection = db.collection('posts');
    let documents = []; 

    // Loops through the posts to retrieve all posts posted by users in following array
    for(let i = 0; i < following.length; i++) {
        const document = await collection.find( { userID: following[i] }).toArray();
        documents.push(document);
    };

    if(documents.length === 0) return res.status(404).json({ message: 'No posts were found, try following users first' });

    res.status(200).json(documents);
}