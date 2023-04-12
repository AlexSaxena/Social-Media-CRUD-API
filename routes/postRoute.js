const express = require("express");
const {
  editPost,
} = require("../controllers/userPostControllers/editPostController");
const {
  deletePost,
} = require("../controllers/userPostControllers/deletePostController");
const { createPost } = require("../controllers/postControllers/createPost");

const postRoute = express.Router();

// no questionmarks in Params url
// Edit Route
postRoute.patch("/", editPost);

// Create Route
postRoute.post("/create", createPost);

// DELETE route
postRoute.delete("/", deletePost);

module.exports = {
  postRoute,
};
