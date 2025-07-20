import "reflect-metadata";

import { UsersRepositoryInMemory } from "@/modules/users/repositories/in-memory/users-in-memory.repository";

import { ContactsRepositoryInMemory } from "../../repositories/in-memory/contacts-in-memory.repository";
import { GetContactsUseCase } from "./get-contacts.useCase";

const contactExample = {
  name: "test_contact",
  email: "test_contact@example.com",
  phone: "123456789",
  description: null,
  avatarUrl: null,
};

describe("UNIT - Get Contacts", () => {
  let usersRepository: UsersRepositoryInMemory;
  let contactsRepository: ContactsRepositoryInMemory;
  let getContactsUseCase: GetContactsUseCase;

  beforeEach(() => {
    contactsRepository = new ContactsRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();
    getContactsUseCase = new GetContactsUseCase(contactsRepository);
  });

  it("should be able to return all contacts from a user", async () => {
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

    const contacts = await getContactsUseCase.execute(user!.id);

    expect(contacts).toHaveLength(1);
    expect(contacts[0]).toEqual({
      id: expect.any(Number),
      userId: user!.id,
      ...contactExample,
    });
  });
});
