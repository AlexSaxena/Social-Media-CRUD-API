const { connect } = require("../../db/connect");


exports.getAllPosts = async function getAllPosts(req, res) {
    const db = await connect();
    const collection = db.collection('posts');

    const documents = await collection.find({}).toArray();
    res.status(200).json(documents);
}