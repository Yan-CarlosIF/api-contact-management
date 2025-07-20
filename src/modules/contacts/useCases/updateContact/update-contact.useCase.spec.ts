import "reflect-metadata";

import { UsersRepositoryInMemory } from "@/modules/users/repositories/in-memory/users-in-memory.repository";
import { AppError } from "@/shared/errors/app-error";

import { ContactsRepositoryInMemory } from "../../repositories/in-memory/contacts-in-memory.repository";
import { UpdateContactUseCase } from "./update-contact.useCase";

const contactExample = {
  name: "test_contact",
  email: "test_contact@example.com",
  phone: "123456789",
  description: null,
  avatarUrl: null,
};

describe("UNIT - Update Contact", () => {
  let usersRepository: UsersRepositoryInMemory;
  let contactsRepository: ContactsRepositoryInMemory;
  let updateContactUseCase: UpdateContactUseCase;

  beforeEach(() => {
    contactsRepository = new ContactsRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();
    updateContactUseCase = new UpdateContactUseCase(contactsRepository);
  });

  it("should be able to update a contact", async () => {
    await usersRepository.register({
      name: "John Doe",
      email: "123456@example.com",
      password: "123456",
    });

    const user = await usersRepository.findByEmail("123456@example.com");

    await contactsRepository.addContact({
      ...contactExample,
      userId: user!.id,
      avatarUrl: null,
      description: null,
    });

    const contacts = await contactsRepository.getContacts(user!.id);

    await updateContactUseCase.execute({
      name: "Contact Test",
      email: "test@example.com",
      phone: "1234567890",
      description: null,
      id: contacts[0].id,
      userId: user!.id,
    });

    const updatedContacts = await contactsRepository.getContacts(user!.id);

    expect(updatedContacts[0]).toEqual({
      ...contacts[0],
      name: "Contact Test",
      email: "test@example.com",
      phone: "1234567890",
    });
  });

  it("should not be able to update a inexistent contact", async () => {
    await expect(
      updateContactUseCase.execute({
        name: "Contact Test",
        email: "test@example.com",
        phone: "1234567890",
        description: null,
        id: 999,
        userId: 999,
      })
    ).rejects.toEqual(new AppError("Contact not found", 404));
  });
});
