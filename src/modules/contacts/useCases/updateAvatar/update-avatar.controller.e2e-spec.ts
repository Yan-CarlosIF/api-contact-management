import request from "supertest";

import { app } from "@/shared/infra/http/app";

describe("E2E - Update Avatar", () => {
  it("should be able to update a contact avatar", async () => {
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
      .send({
        name: "Contact Test",
        email: "test@example.com",
        phone: "1234567890",
      })
      .set("Cookie", cookie!);

    const contacts = await request(app.server)
      .get("/contacts")
      .set("Cookie", cookie!)
      .send();

    const contactId = contacts.body[0].id;

    const response = await request(app.server)
      .patch("/contacts/update-avatar")
      .send({ id: contactId, avatarUrl: "https://github.com/yan-carlosif.png" })
      .set("Cookie", cookie!);

    const responseContacts = await request(app.server)
      .get("/contacts")
      .set("Cookie", cookie!)
      .send();

    expect(response.status).toBe(200);
    expect(responseContacts.body[0].avatarUrl).not.toBe(null);
  });

  it("should not be able to update a contact avatar if user not authenticated", async () => {
    const response = await request(app.server)
      .patch("/contacts/update-avatar")
      .send({ id: 1, avatarUrl: "https://github.com/yan-carlosif.png" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should not be able to update a contact avatar if contact not found", async () => {
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

    const response = await request(app.server)
      .patch("/contacts/update-avatar")
      .send({ id: 999, avatarUrl: "https://github.com/yan-carlosif.png" })
      .set("Cookie", cookie!);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Contact not found");
  });

  it("should not be able to update a contact avatar if avatarUrl is invalid", async () => {
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
      .send({
        name: "Contact Test",
        email: "test@example.com",
        phone: "1234567890",
      })
      .set("Cookie", cookie!);

    const contacts = await request(app.server)
      .get("/contacts")
      .set("Cookie", cookie!)
      .send();

    const contactId = contacts.body[0].id;

    const response = await request(app.server)
      .patch("/contacts/update-avatar")
      .send({ id: contactId, avatarUrl: "invalid-url" })
      .set("Cookie", cookie!);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid image URL");
  });
});
