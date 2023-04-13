const { ObjectId } = require("mongodb");
const { connect } = require("../../db/connect");
const { deleteSchema } = require("../../model/postModel");
// Same Model as deleteSchema Can be changed Later

const singlePost = async (req, res) => {
  // deletSchema can be changed later
  let validation = deleteSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(406)
      .json({ message: validation.error.details[0].message });
  }

  const { id } = req.body;

  res.send("Hello from SinglePost Controller");
};

exports.singlePost = singlePost;
