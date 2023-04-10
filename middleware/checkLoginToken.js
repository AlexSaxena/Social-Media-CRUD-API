const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({path: "./config/.env"});

// gets token from .env
const TOKEN_SECRET = process.env.TOKEN_SECRET;
// gets token from from cookies
const LOGIN_TOKEN_COOKIE_NAME = "loginToken";

// checkLoginToken function to verify if user have cookie with JWT token

exports.checkLoginToken = function checkLoginToken(req, res, next) {
  //destruct required cookies and check if present
  const {cookies} = req;
  if (!cookies[LOGIN_TOKEN_COOKIE_NAME]) {
    return res.status(404).json({message: "No Active LoginToken"});
  }

  try {
    const loginToken = cookies[LOGIN_TOKEN_COOKIE_NAME];
    const loggedInUser = jwt.verify(loginToken, TOKEN_SECRET);
    req.loggedInUser = loggedInUser;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({message: "Unauthorized LoginToken"});
  }
};
