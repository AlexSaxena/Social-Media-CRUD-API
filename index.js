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
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use(cookieParser());
