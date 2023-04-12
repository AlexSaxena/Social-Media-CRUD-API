const express = require("express");
const { getAllUsers } = require("../controllers/userControllers/getUsersController");
const { followUser } = require('../controllers/userControllers/followUserController')
const { getUserFollowing } = require('../controllers/userControllers/getFollowingListController')

const userRoute = express.Router();

userRoute.get("/all", getAllUsers);
userRoute.patch("/follow", followUser);
userRoute.get('/following', getUserFollowing)


module.exports = {
  userRoute,
};