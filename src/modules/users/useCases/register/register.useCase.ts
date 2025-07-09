import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IRegisterDTO } from "../../dtos/IregisterDTO";
import { IUsersRepository } from "../../repositories/Iusers.repository";

@injectable()
export class RegisterUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, name, password }: IRegisterDTO) {
    const emailAlreadyTaken = await this.userRepository.findByEmail(email);

    if (emailAlreadyTaken) {
      throw new Error("Email already taken!");
    }

    const hashedPassword = await hash(password, 10);

    await this.userRepository.register({
      email,
      name,
      password: hashedPassword,
    });
  }
}
