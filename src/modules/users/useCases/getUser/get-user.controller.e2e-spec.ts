import request from "supertest";

import { app } from "@/shared/infra/http/app";

describe("E2E - Get User", () => {
  it("should be able to get user information", async () => {
    await request(app.server).post("/user/register").send({
      email: "john@example.com",
      name: "John Doe",
      password: "123456",
    });

    const response = await request(app.server).post("/auth/login").send({
      email: "john@example.com",
      password: "123456",
    });

    const cookie = response.get("Set-Cookie");

    const responseUser = await request(app.server)
      .get("/user")
      .set("Cookie", cookie!)
      .send();

    expect(responseUser.statusCode).toEqual(200);
    expect(responseUser.body).toEqual({
      id: expect.any(Number),
      email: "john@example.com",
      name: "John Doe",
    });
  });

  it("should not be able to get user information without authentication", async () => {
    const response = await request(app.server).get("/user").send();

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});
