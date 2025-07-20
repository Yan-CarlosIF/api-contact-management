import "reflect-metadata";

import { UsersRepositoryInMemory } from "@/modules/users/repositories/in-memory/users-in-memory.repository";
import { AppError } from "@/shared/errors/app-error";

import { ContactsRepositoryInMemory } from "../../repositories/in-memory/contacts-in-memory.repository";
import { AddContactUseCase } from "./add-contact.useCase";

const contactExample = {
  name: "test_contact",
  email: "test_contact@example.com",
  phone: "123456789",
};

describe("UNIT - Add Contact", () => {
  let contactsRepository: ContactsRepositoryInMemory;
  let addContactUseCase: AddContactUseCase;
  let usersRepository: UsersRepositoryInMemory;

  beforeEach(async () => {
    contactsRepository = new ContactsRepositoryInMemory();
    addContactUseCase = new AddContactUseCase(contactsRepository);
    usersRepository = new UsersRepositoryInMemory();
  });

  it("should be able to add a new contact", async () => {
    await usersRepository.register({
      name: "John Doe",
      email: "123456@example.com",
      password: "123456",
    });

    const user = await usersRepository.findByEmail("123456@example.com");

    await addContactUseCase.execute({
      ...contactExample,
      userId: user!.id,
      avatarUrl: null,
      description: null,
    });

    const contacts = await contactsRepository.getContacts(user!.id);

    expect(contacts).toHaveLength(1);
    expect(contacts[0]).toEqual({
      ...contactExample,
      id: 1,
      userId: user!.id,
      avatarUrl: null,
      description: null,
    });
  });

  it("should not be able to add a new contact if contact already exists", async () => {
    await usersRepository.register({
      name: "John Doe",
      email: "123456@example.com",
      password: "123456",
    });

    const user = await usersRepository.findByEmail("123456@example.com");

    await addContactUseCase.execute({
      ...contactExample,
      userId: user!.id,
      avatarUrl: null,
      description: null,
    });

    await expect(
      addContactUseCase.execute({
        ...contactExample,
        userId: user!.id,
        avatarUrl: null,
        description: null,
      })
    ).rejects.toEqual(new AppError("Contact already exists", 400));
  });
});
