import request from "supertest";

import { app } from "@/shared/infra/http/app";

describe("E2E - Logout User", () => {
  it("should be able to logout a user", async () => {
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

    const responseLogout = await request(app.server)
      .post("/auth/logout")
      .set("Cookie", cookie!)
      .send();

    expect(responseLogout.statusCode).toEqual(200);
    expect(responseLogout.body.message).toBe("Logout realizado com sucesso!");
  });
});
