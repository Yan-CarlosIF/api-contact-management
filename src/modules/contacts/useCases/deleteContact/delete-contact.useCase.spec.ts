import "reflect-metadata";

import { UsersRepositoryInMemory } from "@/modules/users/repositories/in-memory/users-in-memory.repository";
import { AppError } from "@/shared/errors/app-error";

import { ContactsRepositoryInMemory } from "../../repositories/in-memory/contacts-in-memory.repository";
import { DeleteContactUseCase } from "./delete-contact.useCase";

const contactExample = {
  name: "test_contact",
  email: "test_contact@example.com",
  phone: "123456789",
};

describe("UNIT - Delete Contact", () => {
  let usersRepository: UsersRepositoryInMemory;
  let contactsRepository: ContactsRepositoryInMemory;
  let deleteContactUseCase: DeleteContactUseCase;

  beforeEach(() => {
    contactsRepository = new ContactsRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();
    deleteContactUseCase = new DeleteContactUseCase(contactsRepository);
  });

  it("should be able to delete a contact", async () => {
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

    await deleteContactUseCase.execute(contacts[0].id);

    const newContacts = await contactsRepository.getContacts(user!.id);

    expect(newContacts).toHaveLength(0);
  });

  it("should not be able to delete a contact that does not exist", async () => {
    await expect(deleteContactUseCase.execute(1)).rejects.toEqual(
      new AppError("Contact not found", 404)
    );
  });
});
