const express = require("express");
const {
  editPost,
} = require("../controllers/userPostControllers/editPostController");

const postRoute = express.Router();
// no questionmarks in Params url
postRoute.patch("/editPost/:id", editPost);

exports.postRoute = postRoute;
