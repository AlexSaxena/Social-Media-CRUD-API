const { ObjectId } = require("mongodb");
const { connect } = require("../../db/connect");
const { findOnePostSchema } = require("../../model/postModel");

const singlePost = async (req, res) => {
  let validation = findOnePostSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(406)
      .json({ message: validation.error.details[0].message });
  }

  const { id } = req.body;

  // Checks DB for desired post
  const db = await connect();
  const postCollection = db.collection("posts");
  const selectedPost = await postCollection.findOne({ _id: new ObjectId(id) });

  if (selectedPost === null)
    return res.status(404).json({ message: "Post Not Found" });

  res.json({ post: selectedPost });
};

exports.singlePost = singlePost;
