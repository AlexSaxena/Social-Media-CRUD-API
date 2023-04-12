const express = require('express');
const { createPost } = require('../controllers/postControllers/createPostController');
const {deletePost} = require('../controllers/postControllers/deletePostController');

const postRoute = express.Router();

postRoute.post('/', createPost)
// DELETE route
postRoute.delete('/', deletePost);

module.exports = {
  postRoute,
};
