// Add dependancy
// Add Validation
// Check post exist
// If Doesn't Exist send error msg
// If exist let user edit post
const { ObjectId } = require("mongodb");
const { connect } = require("../../db/connect");
const { IDCheckSchema, checkPostExist } = require("../../model/postModel");
// Current user - token

const editPost = async function (req, res) {
  let validation = IDCheckSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(406)
      .json({ message: validation.error.details[0].message });
  }

  const { id, body } = req.body;
  const { user } = req.loggedInUser;
  console.log("id ->" + id, "Body ->" + body, "User ->" + user);

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
