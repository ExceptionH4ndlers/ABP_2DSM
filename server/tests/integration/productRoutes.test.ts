const request = require("supertest");
const app = require("../../tests/"); // importa sua instância do Express

describe("Product Routes", () => {
  // 🧭 GET /api/v1/products
  describe("GET /api/v1/products", () => {
    it("deve retornar lista de produtos com status 200", async () => {
      const res = await request(app).get("/api/v1/products");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.items)).toBe(true);
      expect(res.body.meta).toBeDefined(); // se sua API tiver paginação
    });
  });

  // 🧭 GET /api/v1/products/:id
  describe("GET /api/v1/products/:id", () => {
    it("deve retornar um produto específico com status 200", async () => {
      const res = await request(app).get("/api/v1/products/1");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("name");
    });

    it("deve retornar 404 se o produto não existir", async () => {
      const res = await request(app).get("/api/v1/products/99999");
      expect(res.statusCode).toBe(404);
    });
  });
 expect(res.statusCode).toBe(400);
    });
  