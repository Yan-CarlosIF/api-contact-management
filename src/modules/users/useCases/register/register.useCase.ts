import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@/shared/errors/app-error";

import { IRegisterDTO } from "../../dtos/IregisterDTO";
import { IUsersRepository } from "../../repositories/Iusers.repository";

@injectable()
export class RegisterUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, name, password }: IRegisterDTO) {
    const emailAlreadyTaken = await this.userRepository.findByEmail(email);

    if (emailAlreadyTaken) {
      throw new AppError("Email already taken!", 400);
    }

    const hashedPassword = await hash(password, 10);

    await this.userRepository.register({
      email,
      name,
      password: hashedPassword,
    });
  }
}
