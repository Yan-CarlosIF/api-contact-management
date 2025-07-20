import request from "supertest";

import { app } from "@/shared/infra/http/app";

const contactExample = {
  name: "Contact Test",
  email: "test@example.com",
  phone: "1234567890",
  description: null,
  avatarUrl: null,
};

describe("E2E - Get Contacts", () => {
  it("should be able to return all contacts from a user", async () => {
    await request(app.server).post("/user/register").send({
      email: "test@example.com",
      name: "User Test",
      password: "123456",
    });

    const responseAuth = await request(app.server).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    const cookie = responseAuth.get("Set-Cookie");

    await request(app.server)
      .post("/contacts")
      .send(contactExample)
      .set("Cookie", cookie!);

    const response = await request(app.server)
      .get("/contacts")
      .set("Cookie", cookie!)
      .send();

    expect(response.body).toEqual([
      { id: expect.any(Number), userId: 1, ...contactExample },
    ]);
  });

  it("should not be able to return all contacts from a user if not authenticated", async () => {
    const response = await request(app.server).get("/contacts").send();

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});
