import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ILoginDTO } from "../../dtos/IloginDTO";
import { IUsersRepository } from "../../repositories/Iusers.repository";

@injectable()
export class LoginUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: ILoginDTO) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found.");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials.");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
