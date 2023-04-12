// Add dependancy
// Add Validation
// Check post exist
// If Doesn't Exist send error msg
// If exist let user edit post

const { connect } = require("../../db/connect");
const { checkPostExist } = require("../../model/authModel");

const editPost = async function (req, res) {
  let { id } = req.params;
  console.log(id);
  res.status(200).json({ message: "Hello From EditPost", id: "Id is ->" + id });
};

exports.editPost = editPost;
