const { ObjectId } = require("mongodb");
const { getClientDB } = require("../../db/connect");

const commentOnPost = async function (req, res) {
  const { id, body } = req.body;

  // Checks DB for desired post
  const db = await getClientDB();
  const postCollection = db.collection("posts");
  const selectedPost = await postCollection.findOne({ _id: new ObjectId(id) });

  if (selectedPost === null)
    return res
      .status(404)
      .json({ message: "Something Went Wrong finding Post." });

  // WIP Check Db connection & Post Will be Remmoved
  res.json({ post: selectedPost });
};

exports.commentOnPost = commentOnPost;
