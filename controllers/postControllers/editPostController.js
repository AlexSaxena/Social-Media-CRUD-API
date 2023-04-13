const { ObjectId } = require("mongodb");
const { connect } = require("../../db/connect");
const { patchSchema, checkPostExist } = require("../../model/postModel");

const editPost = async function (req, res) {
  let validation = patchSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(406)
      .json({ message: validation.error.details[0].message });
  }

  const { id, body } = req.body;
  const { user } = req.loggedInUser;

  const checkPost = await checkPostExist(id, user);

  if (checkPost === false) {
    return res.status(404).json({ message: "Post doesn't exist" });
  } else {
    const db = await connect();
    const collection = db.collection("posts");

    await collection.updateOne(
      { _id: new ObjectId(id), userID: user },
      {
        $set: {
          body: body,
        },
      },
      { $currentDate: { lastUpdated: true } }
    );

    return res.status(200).json({ message: "Post updated successfully" });
  }
};

exports.editPost = editPost;
