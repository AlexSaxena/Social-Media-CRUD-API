const { connect } = require("../../db/connect");


exports.getAllPosts = async function getAllPosts(req, res) {
    const db = await connect();
    const collection = db.collection('posts');

    const documents = await collection.find({}).toArray();

    if(!documents) return res.status(404).json({ message: 'No posts were found' });

    res.status(200).json(documents);
}