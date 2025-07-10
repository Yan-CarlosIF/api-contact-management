import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@/shared/errors/app-error";

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
      throw new AppError("User not found.", 404);
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid credentials.", 401);
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
