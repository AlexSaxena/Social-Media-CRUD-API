const express = require("express");
const {
  editPost,
} = require("../controllers/userPostControllers/editPostController");
const {
  deletePost,
} = require("../controllers/userPostControllers/deletePostController");

const postRoute = express.Router();

// no questionmarks in Params url
// Edit Route
postRoute.patch("/editPost/:id", editPost);

// DELETE route
postRoute.delete("/", deletePost);

module.exports = {
  postRoute,
};
