import request from "supertest";

import { app } from "@/shared/infra/http/app";

describe("E2E - Register User", () => {
  it("should be able to create (register) a new user", async () => {
    const response = await request(app.server).post("/user/register").send({
      email: "lZlYI@example.com",
      name: "John Doe",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });

  it("should not be able to create a new user with an already registered email", async () => {
    await request(app.server).post("/user/register").send({
      email: "lZlYI@example.com",
      name: "John Doe",
      password: "123456",
    });

    const response = await request(app.server).post("/user/register").send({
      email: "lZlYI@example.com",
      name: "John Doe",
      password: "123456",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toBe("Email already taken!");
  });
});
