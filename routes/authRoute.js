const express = require("express");
const { login } = require("../controllers/authController");
const { register } = require("../controllers/userAuthControllers/register");

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/register", register);

module.exports = {
  authRoute,
};
