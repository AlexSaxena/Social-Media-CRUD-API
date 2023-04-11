const request = require("supertest");
const express = require("express");
const { authRoute } = require("../routes/authRoute");

const app = express();

app.use(express.json());
app.use("/posts", postRoute);

describe("Test Edit Post Endpoints", () => {
  it("sanity Check", async () => {
    expect(2 * 2).toBe(4);
  });
});
