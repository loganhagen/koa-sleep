import request from "supertest";
import app from "../../app";
import { userService } from "@services/userService";

jest.mock("@services/userService");

describe("GET /api/demo/login", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = "test_secret";
  });

  it("should redirect to /home on success", async () => {
    (userService.getUserByEmail as jest.Mock).mockResolvedValue({
      id: "123",
      email: "demo@koa",
    });

    const res = await request(app).get("/api/demo/login");

    expect(res.status).toBe(302);
    expect(res.header.location).toBe("/home");
    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toMatch(/auth-token=/);
  });
});
