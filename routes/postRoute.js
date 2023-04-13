const express = require("express");

const {
  createPost,
} = require("../controllers/postControllers/createPostController");
const { getAllPosts } = require("../controllers/postControllers/getAllPosts");
const {
  deletePost,
} = require("../controllers/postControllers/deletePostController");
const {
  editPost,
} = require("../controllers/postControllers/editPostController");

const postRoute = express.Router();

// Create Route
postRoute.post("/", createPost);

postRoute.get("/all", getAllPosts);
// PATCH Route Edit post
postRoute.patch("/", editPost);
// DELETE route
postRoute.delete("/", deletePost);

module.exports = {
  postRoute,
};
