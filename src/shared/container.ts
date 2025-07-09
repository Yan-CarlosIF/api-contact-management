import { container } from "tsyringe";

import { UsersRepository } from "../modules/users/repositories/implementations/users-prisma.repository";
import { IUsersRepository } from "../modules/users/repositories/Iusers.repository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
