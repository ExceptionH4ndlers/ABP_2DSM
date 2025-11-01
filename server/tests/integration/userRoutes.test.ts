const request = require("supertest");
const app = require("../../src/app"); // Express app

describe("GET /api/v1/users", () => {
  it("deve retornar lista de usuários com status 200", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });
});
