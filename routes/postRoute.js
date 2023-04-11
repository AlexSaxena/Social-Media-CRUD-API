const express = require("express");
const {deletePost} = require("../controllers/userPostControllers/deletePostController");

const postRoute = express.Router();

// DELETE route
postRoute.delete("/delete", deletePost);

module.exports = {
  postRoute,
};
