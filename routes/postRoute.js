const express = require("express");

const { createPost} = require("../controllers/postControllers/createPostController");
const {editPost} = require("../controllers/postControllers/editPostController");
const {deletePost} = require("../controllers/postControllers/deletePostController");
const { getAllPosts } = require("../controllers/postControllers/getAllPosts");
const { getAllUserPosts} = require("../controllers/postControllers/getAllUserPosts");
const {singlePost} = require("../controllers/postControllers/getSinglePostController");
const {commentOnPost} = require("../controllers/postControllers/commentOnPostController");

const postRoute = express.Router();

postRoute.post("/", createPost);
postRoute.patch("/", editPost);
postRoute.delete("/", deletePost);
postRoute.get("/all", getAllPosts);
postRoute.get("/all/user", getAllUserPosts);
postRoute.get("/post/", singlePost);
postRoute.patch("/post/", commentOnPost);

module.exports = {
  postRoute,
};