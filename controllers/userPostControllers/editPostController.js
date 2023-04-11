const editPost = async function (req, res) {
  let { id } = req.params;
  console.log(id);
  res.status(200).json({ message: "Hello From EditPost", id: "Id is ->" + id });
};

exports.editPost = editPost;
