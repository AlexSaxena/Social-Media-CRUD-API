const express = require("express");
const { getAllUsers } = require("../controllers/userControllers/getUsersController");
const { followUser } = require('../controllers/userControllers/followUserController')

const userRoute = express.Router();

userRoute.get("/all", getAllUsers);
userRoute.patch("/follow", followUser);


module.exports = {
  userRoute,
};