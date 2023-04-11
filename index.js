console.log("General Kenobi");

// Dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {connect} = require("./db/connect");

const app = express();

// Routes & Middleware
const {checkLoginToken} = require("./middleware/checkLoginToken");
const {authRoute} = require("./routes/authRoute");
const {postRoute} = require("./routes/postRoute");

// Enables Cors, Cookies & JSON to be read/used
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

//Establish database connection
connect();

// Route -> Auth Routes, Login/Register
app.use("/auth", authRoute);
// Route -> Posts routes, NewPost/GetAllPosts/GetSinglePost/PatchPost/DeletePost
// app.use("/posts", [checkLoginToken], postRoute);
app.use("/posts", postRoute);

// Server Port
app.listen(5050, () => {
  console.log(`\x1b[33m  Server running on http://localhost:5050 \x1b[0m`);
});
