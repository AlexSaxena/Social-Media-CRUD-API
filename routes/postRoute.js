const express = require('express');
const { createPost } = require('../controllers/postControllers/createPost');
const { getAllPosts } = require('../controllers/postControllers/getAllPosts');
const {deletePost} = require('../controllers/userPostControllers/deletePostController');

const postRoute = express.Router();

postRoute.post('/create', createPost)
postRoute.get('/all', getAllPosts);
// DELETE route
postRoute.delete('/', deletePost);

module.exports = {
  postRoute,
};
