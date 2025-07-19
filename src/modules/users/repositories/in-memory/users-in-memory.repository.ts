import { User } from "@prisma/client";

import { IUsersRepository } from "../Iusers.repository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async register(user: Omit<User, "id">): Promise<void> {
    this.users.push({
      ...user,
      id: this.users.length + 1,
    });
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    return user ?? null;
  }
}
