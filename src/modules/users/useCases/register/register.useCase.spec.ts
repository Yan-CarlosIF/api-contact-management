import "reflect-metadata";

import { AppError } from "@/shared/errors/app-error";

import { UsersRepositoryInMemory } from "../../repositories/in-memory/users-in-memory.repository";
import { RegisterUseCase } from "./register.useCase";

const userExample = {
  email: "lZlYI@example.com",
  name: "John Doe",
  password: "123456",
};

describe("UNIT - Register User", () => {
  let userRepository: UsersRepositoryInMemory;
  let registerUseCase: RegisterUseCase;

  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory();

    registerUseCase = new RegisterUseCase(userRepository);
  });

  it("should be able to create (register) a new user", async () => {
    await registerUseCase.execute(userExample);

    const userCreated = await userRepository.findByEmail(userExample.email);

    expect(userCreated).toHaveProperty("id");
  });

  it("should not be able to create a new user with an already registered email", async () => {
    await registerUseCase.execute(userExample);

    await expect(registerUseCase.execute(userExample)).rejects.toEqual(
      new AppError("Email already taken!", 400)
    );
  });
});
