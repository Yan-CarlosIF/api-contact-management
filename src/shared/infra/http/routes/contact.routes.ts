import { FastifyInstance } from "fastify";

import { AddContactController } from "@/modules/contacts/useCases/addContact/add-contact.controller";
import { DeleteContactController } from "@/modules/contacts/useCases/deleteContact/delete-contact.controller";
import { GetContactsController } from "@/modules/contacts/useCases/getContacts/get-contacts.controller";
import { UpdateAvatarController } from "@/modules/contacts/useCases/updateAvatar/update-avatar.controller";
import { UpdateContactController } from "@/modules/contacts/useCases/updateContact/update-contact.controller";

const addContactController = new AddContactController();
const getContactsController = new GetContactsController();
const deleteContactController = new DeleteContactController();
const updateContactController = new UpdateContactController();
const updateAvatarController = new UpdateAvatarController();

export async function contactRoutes(app: FastifyInstance) {
  app.post("/", {
    preHandler: [app.authenticate],
    handler: addContactController.handle,
  });
  app.get("/", {
    preHandler: [app.authenticate],
    handler: getContactsController.handle,
  });
  app.delete("/", {
    preHandler: [app.authenticate],
    handler: deleteContactController.handle,
  });
  app.patch("/", {
    preHandler: [app.authenticate],
    handler: updateContactController.handle,
  });
  app.patch("/update-avatar", {
    preHandler: [app.authenticate, app.validImageUrl],
    handler: updateAvatarController.handle,
  });
}
