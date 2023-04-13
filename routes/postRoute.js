const express = require('express');

const { createPost } = require('../controllers/postControllers/createPostController');
const { getAllPosts } = require('../controllers/postControllers/getAllPosts');
const {deletePost} = require('../controllers/postControllers/deletePostController');

const postRoute = express.Router();

postRoute.post('/', createPost)
postRoute.get('/all', getAllPosts);

// DELETE route
postRoute.delete('/', deletePost);

module.exports = {
  postRoute,
};
