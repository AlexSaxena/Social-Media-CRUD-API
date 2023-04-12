const express = require("express");
const { getAllUsers } = require("../controllers/userControllers/getUsersController");

const userRoute = express.Router();

userRoute.get("/all", getAllUsers);

module.exports = {
  userRoute,
};