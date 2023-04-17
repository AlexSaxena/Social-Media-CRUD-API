const { ObjectId } = require("mongodb");
const { getClientDB } = require("../../db/connect");
const { commentPostSchema } = require("../../model/postModel");

const commentOnPost = async function (req, res) {
  let validation = commentPostSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(406)
      .json({ message: validation.error.details[0].message });
  }

  const { id, commentBody } = req.body;
  const { user } = req.loggedInUser;

  let comments = {
    userID: user,
    comment: commentBody,
    date: new Date(),
  };

  const db = getClientDB();
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
        comments,
      },
    },
    { $currentDate: { lastUpdated: true } }
  );

  res.json({ message: "New Comment Added To Post" });
};

exports.commentOnPost = commentOnPost;
