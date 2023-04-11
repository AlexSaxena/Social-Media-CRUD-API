const express = require('express');
const { createPost } = require('../controllers/postControllers/createPost');
const postRoute = express.Router();

postRoute.post('/create', createPost)


exports.postRoute = postRoute;