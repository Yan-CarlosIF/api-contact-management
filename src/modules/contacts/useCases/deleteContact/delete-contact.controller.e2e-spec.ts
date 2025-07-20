import request from "supertest";

import { app } from "@/shared/infra/http/app";

describe("E2E - Delete Contact", () => {
  it("should be able to delete a contact", async () => {
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

    await request(app.server).get("/contacts").set("Cookie", cookie!).send();

    const response = await request(app.server)
      .delete("/contacts")
      .send({ contactId: 1 })
      .set("Cookie", cookie!);

    const responseContacts = await request(app.server)
      .get("/contacts")
      .set("Cookie", cookie!)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(responseContacts.body).toEqual([]);
  });

  it("should not be able to delete a contact if not authenticated", async () => {
    const response = await request(app.server)
      .delete("/contacts")
      .send({ contactId: 1 });

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should not be able to delete a contact if contact does not exist", async () => {
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
      .delete("/contacts")
      .send({ contactId: 999 })
      .set("Cookie", cookie!);

    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toBe("Contact not found");
  });
});
