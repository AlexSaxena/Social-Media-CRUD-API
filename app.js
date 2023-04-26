console.log("General Kenobi");

// Dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Enables Cors, Cookies & JSON to be read/used
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://penfriend.onrender.com/"],
    credentials: true,
  })
);
app.use(cookieParser());

// Routes & Middleware
const { checkLoginToken } = require("./middleware/checkLoginToken");
const { authRoute } = require("./routes/authRoute");
const { postRoute } = require("./routes/postRoute");
const { userRoute } = require("./routes/userRoute");

app.get("/ping", (req, res) => res.sendStatus(200));
app.use("/auth", authRoute);
app.use("/posts", checkLoginToken, postRoute);
app.use("/users", checkLoginToken, userRoute);

exports.app = app;
