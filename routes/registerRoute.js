const express = require("express");
const { register } = require("../controllers/userAuthControllers/register");

const registerRoutes = express.Router();

registerRoutes.post("/", register);

exports.registerRoutes = registerRoutes;
