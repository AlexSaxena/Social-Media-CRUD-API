console.log("General Kenobi");

// Dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {connect} = require("./db/connect");
const {authRoute} = require("./routes/authRoute");

const app = express();

// Middleware
const {checkLoginToken} = require("./middleware/checkLoginToken");

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

app.use("/auth", authRoute);

// Server Port
app.listen(5050, () => {
  console.log(`\x1b[33m  Server running on http://localhost:5050 \x1b[0m`);
});
