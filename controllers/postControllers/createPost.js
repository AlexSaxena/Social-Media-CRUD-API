const { connect } = require("../../db/connect");
const { postSchema } = require("../../model/postModel");


exports.createPost = async function createPost(req, res) {
    const { error } = postSchema.validate(req.body);

    if(error) return res.status(400).json({ message: error.details[0].message });

    const { body, userID } = req.body;
    const date = new Date();

    const newPost = {
        body: body,
        comments: [],
        date: date,
        like: [],
        userID: userID
    }

    const db = await connect();
    const collection = db.collection('posts');

    collection.insertOne(newPost, function (err, res) {
        if(err) return res.status(500).json({ message: err });
    })

    res.status(201).json({ message: 'Successfully created post!' });
  }