const express = require("express");
const {
  editpost,
} = require("../controllers/userPostControllers/editPostController");

const postRoute = express.Router();

postRoute.patch("/editPost:id", editpost);

exports.postRoute = postRoute;
