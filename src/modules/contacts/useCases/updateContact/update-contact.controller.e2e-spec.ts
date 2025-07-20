import request from "supertest";

import { app } from "@/shared/infra/http/app";

describe("E2E - Update Contact", () => {
  it("should be able to update a contact", async () => {
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
      .patch("/contacts")
      .send({
        id: contactId,
        name: "test_contact",
        email: "test@email.com",
        phone: "0987491423",
      })
      .set("Cookie", cookie!);

    expect(response.status).toBe(200);
  });

  it("should not be able to update a inexistent contact", async () => {
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
      .patch("/contacts")
      .send({
        id: 999,
        name: "Contact Test",
        email: "test@example.com",
        phone: "1234567890",
      })
      .set("Cookie", cookie!);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Contact not found");
  });

  it("should not be able to update a contact if user not authenticated", async () => {
    const response = await request(app.server).patch("/contacts").send({
      id: 1,
      name: "Contact Test",
      email: "test@example.com",
      phone: "1234567890",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});
