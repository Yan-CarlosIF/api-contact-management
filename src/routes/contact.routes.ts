import { FastifyInstance } from "fastify";

import {
  addContact,
  deleteContact,
  getContacts,
  updateAvatar,
  updateContact,
} from "../controllers/contact.controller";

export async function contactRoutes(app: FastifyInstance) {
  app.post("/add", {
    preHandler: [app.authenticate],
    handler: addContact,
  });
  app.get("/get", {
    preHandler: [app.authenticate],
    handler: getContacts,
  });
  app.delete("/delete", {
    preHandler: [app.authenticate],
    handler: deleteContact,
  });
  app.patch("/update", {
    preHandler: [app.authenticate],
    handler: updateContact,
  });
  app.patch("/update-avatar", {
    preHandler: [app.authenticate],
    handler: updateAvatar,
  });
}
