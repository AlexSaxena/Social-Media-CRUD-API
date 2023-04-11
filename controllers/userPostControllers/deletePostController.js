const {ObjectId} = require("mongodb");
const {connect} = require("../../db/connect");
const {deleteSchema, checkPostExist} = require("../../model/postModel");

const deletePost = async function (req, res) {
  let validation = deleteSchema.validate(req.body);
  if (validation.error) {
    return res.json({message: validation.error.details[0].message}).status(406);
  }

  const {id} = req.body;

  const checkPost = await checkPostExist(id);

  if (checkPost === false) {
    return res.status(409).json({message: "Post doesn't exist"});
  } else {
    try {
      const db = await connect();
      const collection = db.collection("posts");

      await collection.deleteOne({_id: new ObjectId(id)});

      return res.status(200).json({message: "Post deleted successfully"});
    } catch (err) {
      console.error(err);
      return res.status(400).json({message: "Error deleting post"});
    }
  }
};

exports.deletePost = deletePost;
