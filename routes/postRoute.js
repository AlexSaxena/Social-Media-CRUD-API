const express = require('express');

const {createPost} = require('../controllers/postControllers/createPostController');
const {getAllPosts} = require('../controllers/postControllers/getAllPosts');
const {getAllUserPosts} = require('../controllers/postControllers/getAllUserPosts');
const {deletePost} = require('../controllers/postControllers/deletePostController');
const {editPost} = require('../controllers/postControllers/editPostController');

const postRoute = express.Router();

postRoute.post('/', createPost);
postRoute.get('/all', getAllPosts);
postRoute.get('/all/user', getAllUserPosts);
postRoute.patch('/', editPost);
postRoute.delete('/', deletePost);

module.exports = {
  postRoute,
};
