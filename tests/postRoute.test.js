const request = require("supertest");
const express = require("express");

const app = express();

describe("DELETE /posts/delete", () => {
  it("should return status 409 for an invalid post ID", async () => {
    // Send a delete request to the /posts/delete endpoint with an invalid ID
    const response = await request(app).delete("/posts/delete").send({id: "6433c1c848726936a72bea2e"});

    // Check that the response has a status of 409
    expect(response.status).toBe(409);
  });
});
