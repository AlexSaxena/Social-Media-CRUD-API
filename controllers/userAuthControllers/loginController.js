const {
  loginSchema,
  checkUserExists
} = require("../../model/authModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config({ path: "../../config/.env" });
const jwt = require("jsonwebtoken");

//Function called upon successful login. Creates a jwt access token.
const generateAccessToken = (username) => {
  return jwt.sign({ user: username }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
};

const login = async (req, res) => {
  try {
    //Validating request payload. Expecting username, password
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ message: errorMessage });
    } else {
      //Destructures username & password from Joi validation.
      const { username, password } = value;
      //Checks if username exists in the database.
      const user = await checkUserExists(username);
      if (!user) {
        return res
          .status(404)
          .json({ message: "Login failed: Invalid credentials" });
      } else {
        //Compares the hashed password stored in database with password from req.body
        //If passwords match, creates JWT token and set it as a cookie.
        if (await bcrypt.compare(password, user.password)) {
          const accessToken = generateAccessToken(user.username);
          return res
            .cookie("authToken", accessToken, {
              httpOnly: true,
            })
            .status(200)
            .json({ message: "Login successful" });
        } else {
          return res
            .status(401)
            .json({ message: "Login failed: Invalid credentials" });
        }
      }
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
};
