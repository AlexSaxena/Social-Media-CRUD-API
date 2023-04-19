const express = require('express');
const {getAllUsers} = require('../controllers/userControllers/getUsersController');
const {getSingleUser} = require('../controllers/userControllers/getSingleUserController');
const {followUser} = require('../controllers/userControllers/followUserController');
const {unfollowUser} = require('../controllers/userControllers/unfollowUserController');
const {getUserFollowing} = require('../controllers/userControllers/getFollowingListController');

const userRoute = express.Router();

userRoute.get('/all', getAllUsers);
userRoute.get('/single/:username?', getSingleUser);
userRoute.patch('/follow', followUser);
userRoute.patch('/unfollow', unfollowUser);
userRoute.get('/following', getUserFollowing);

module.exports = {
  userRoute,
};
