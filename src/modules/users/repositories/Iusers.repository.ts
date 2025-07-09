import { User } from "@prisma/client";

export interface IUsersRepository {
  register(user: Omit<User, "id">): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
