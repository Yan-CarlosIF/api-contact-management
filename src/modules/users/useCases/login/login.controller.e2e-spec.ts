import request from "supertest";

import { app } from "@/shared/infra/http/app";

describe("E2E - Login User", () => {
  it("should be able do login a user", async () => {
    await request(app.server).post("/user/register").send({
      email: "lZlYI@example.com",
      name: "John Doe",
      password: "123456",
    });

    const response = await request(app.server).post("/auth/login").send({
      email: "lZlYI@example.com",
      password: "123456",
    });

    const cookie = response.get("Set-Cookie");

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toBe("Login realizado com sucesso!");
    expect(cookie).toBeTruthy();
  });

  it("should not be able to login a user with a non-existent email", async () => {
    const response = await request(app.server).post("/auth/login").send({
      email: "doesnotexist@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toBe("User not found.");
  });

  it("should not be able to login a user with invalid credentials", async () => {
    await request(app.server).post("/user/register").send({
      email: "lZlYI@example.com",
      name: "John Doe",
      password: "123456",
    });

    const response = await request(app.server).post("/auth/login").send({
      email: "lZlYI@example.com",
      password: "wrong-password",
    });

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toBe("Invalid credentials.");
  });
});
