const express = require("express");
const {
  editPost,
} = require("../controllers/postControllers/editPostController");
const {
  deletePost,
} = require("../controllers/postControllers/deletePostController");
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
