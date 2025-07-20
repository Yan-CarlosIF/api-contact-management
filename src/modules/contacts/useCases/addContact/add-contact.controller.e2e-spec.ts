import request from "supertest";

import { app } from "@/shared/infra/http/app";

const contactExample = {
  name: "John Doe",
  email: "lZlYI@example.com",
  phone: "1234567890",
  description: null,
  avatarUrl: null,
};

describe("E2E - Add Contact", () => {
  it("should be able to add a new contact", async () => {
    await request(app.server).post("/user/register").send({
      email: "test@example.com",
      name: "User Test",
      password: "123456",
    });

    const response = await request(app.server).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    const cookie = response.get("Set-Cookie");

    await request(app.server)
      .post("/contacts")
      .send(contactExample)
      .set("Cookie", cookie!);

    const responseContacts = await request(app.server)
      .get("/contacts")
      .set("Cookie", cookie!)
      .send();

    expect(responseContacts.body).toEqual([
      {
        id: expect.any(Number),
        userId: 1,
        ...contactExample,
      },
    ]);
  });

  it("should not be able to add a new contact if contact already exists", async () => {
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
      .post("/contacts")
      .send(contactExample)
      .set("Cookie", cookie!);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Contact already exists");
  });

  it("should not be able to add a new contact if not authenticated", async () => {
    const response = await request(app.server)
      .post("/contacts")
      .send(contactExample);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});
