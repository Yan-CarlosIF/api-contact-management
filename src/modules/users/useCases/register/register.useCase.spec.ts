import "reflect-metadata"

import { UsersRepositoryInMemory } from "../../repositories/in-memory/users-in-memory.repository";
import { RegisterUseCase } from "./register.useCase";

describe("Register User", () => {
  let userRepository: UsersRepositoryInMemory;
  let registerUseCase: RegisterUseCase;

  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory();

    registerUseCase = new RegisterUseCase(userRepository);
  });

  it("should be able to create a new user", async () => {
    const user = {
      email: "lZlYI@example.com",
      name: "John Doe",
      password: "123456",
    };

    await registerUseCase.execute(user);

    const userCreated = await userRepository.findByEmail(user.email);

    expect(userCreated).toHaveProperty("id");
  });
});
