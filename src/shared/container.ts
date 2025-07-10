import { container } from "tsyringe";

import { ContactsRepository } from "@/modules/contacts/infra/prisma/repositories/contacts-prisma.repository";
import { IContactsRepository } from "@/modules/contacts/repositories/Icontacts.repository";
import { UsersRepository } from "@/modules/users/infra/prisma/repositories/users-prisma.repository";
import { IUsersRepository } from "@/modules/users/repositories/Iusers.repository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IContactsRepository>(
  "ContactsRepository",
  ContactsRepository
);
