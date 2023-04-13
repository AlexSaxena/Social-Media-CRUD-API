const request = require("supertest");
const express = require("express");
const { postRoute } = require("../routes/postRoute");

const app = express();

app.use(express.json());
app.use("/posts", postRoute);

describe("GET /posts/post with invalid payloads", () => {
  it("should respond with statusCode 406", async () => {
    const response = await request(app).get("/posts/post/").send({
      id: "1337Leet",
    });
    expect(response.status).toBe(406);
  });
});
