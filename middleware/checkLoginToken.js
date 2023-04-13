const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path: './config/.env'});

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const LOGIN_TOKEN_COOKIE_NAME = 'authToken';

exports.checkLoginToken = function checkLoginToken(req, res, next) {
  const {cookies} = req;
  if (!cookies[LOGIN_TOKEN_COOKIE_NAME]) {
    return res.status(401).json({message: 'No Active LoginToken'});
  }

  try {
    const loginToken = cookies[LOGIN_TOKEN_COOKIE_NAME];
    const loggedInUser = jwt.verify(loginToken, TOKEN_SECRET);
    req.loggedInUser = loggedInUser;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({message: 'Unauthorized LoginToken'});
  }
};
