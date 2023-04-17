const express = require('express');

const {createPost} = require('../controllers/postControllers/createPostController');
const {getAllPosts} = require('../controllers/postControllers/getAllPosts');
const {deletePost} = require('../controllers/postControllers/deletePostController');
const {editPost} = require('../controllers/postControllers/editPostController');
const {singlePost} = require('../controllers/postControllers/getSinglePostController');
const {getAllUserPosts} = require('../controllers/postControllers/getAllUserPosts');
const {likePost} = require('../controllers/postControllers/likePostController');

const postRoute = express.Router();

postRoute.post('/', createPost);
postRoute.get('/all', getAllPosts);
postRoute.get('/all/user', getAllUserPosts);
postRoute.get('/post/', singlePost);
postRoute.patch('/', editPost);
postRoute.delete('/', deletePost);
postRoute.patch('/like', likePost);

module.exports = {
  postRoute,
};
