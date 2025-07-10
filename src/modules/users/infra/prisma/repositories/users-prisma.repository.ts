import { PrismaClient, User } from "@prisma/client";

import { IUsersRepository } from "@/modules/users/repositories/Iusers.repository";

export class UsersRepository implements IUsersRepository {
  private users = new PrismaClient().user;

  async register(user: Omit<User, "id">) {
    await this.users.create({ data: user });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.users.findUnique({ where: { email } });
  }
}
