const { ObjectId } = require("mongodb");
const { getClientDB } = require("../../db/connect");

const commentOnPost = async function (req, res) {
  const { id, commentBody } = req.body;

  // Checks DB for desired post
  const db = await getClientDB();
  const postCollection = db.collection("posts");
  const selectedPost = await postCollection.findOne({ _id: new ObjectId(id) });

  if (selectedPost === null || selectedPost === undefined)
    return res
      .status(404)
      .json({ message: "Something Went Wrong finding Post." });

  await postCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $push: {
        comments: commentBody,
      },
    },
    { $currentDate: { lastUpdated: true } }
  );

  res.json({ message: "New Comment Added To Post" });
};

exports.commentOnPost = commentOnPost;
