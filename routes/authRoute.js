const express = require("express");
const { login } = require("../controllers/userAuthControllers/loginController");
const {
  register,
} = require("../controllers/userAuthControllers/registerController");

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/register", register);

module.exports = {
  authRoute,
};
