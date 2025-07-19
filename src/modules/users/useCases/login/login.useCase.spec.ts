import "reflect-metadata";

import { AppError } from "@/shared/errors/app-error";

import { IRegisterDTO } from "../../dtos/IregisterDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/users-in-memory.repository";
import { LoginUseCase } from "./login.useCase";

const userExample: IRegisterDTO = {
  email: "lZlYI@example.com",
  name: "John Doe",
  password: "123456",
};

describe("UNIT - Login User", () => {
  let usersRepository: UsersRepositoryInMemory;
  let loginUseCase: LoginUseCase;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    loginUseCase = new LoginUseCase(usersRepository);
  });

  it("should be able do login a user", async () => {
    await usersRepository.register(userExample);

    const user = await loginUseCase.execute({
      email: userExample.email,
      password: userExample.password,
    });

    expect(user).toHaveProperty("id");
    expect(user.name).toBe(userExample.name);
    expect(user.email).toBe(userExample.email);
  });

  it("should not be able to login a user with a non-existent email", async () => {
    await expect(
      loginUseCase.execute({
        email: "doesnotexist@example.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("User not found.", 404));
  });

  it("should not be able to login a user with an incorrect password", async () => {
    await usersRepository.register(userExample);

    await expect(
      loginUseCase.execute({
        email: userExample.email,
        password: "wrongpassword",
      })
    ).rejects.toEqual(new AppError("Invalid credentials.", 401));
  });
});
