import "reflect-metadata";

import { UsersRepositoryInMemory } from "@/modules/users/repositories/in-memory/users-in-memory.repository";
import { AppError } from "@/shared/errors/app-error";

import { ContactsRepositoryInMemory } from "../../repositories/in-memory/contacts-in-memory.repository";
import { UpdateAvatarUseCase } from "./update-avatar.useCase";

const contactExample = {
  name: "test_contact",
  email: "test_contact@example.com",
  phone: "123456789",
  description: null,
  avatarUrl: null,
};

describe("UNIT - Update Avatar", () => {
  let usersRepository: UsersRepositoryInMemory;
  let contactsRepository: ContactsRepositoryInMemory;
  let updateAvatarUseCase: UpdateAvatarUseCase;

  beforeEach(() => {
    contactsRepository = new ContactsRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();
    updateAvatarUseCase = new UpdateAvatarUseCase(contactsRepository);
  });

  it("should be able to update a contact avatar", async () => {
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

    await updateAvatarUseCase.execute(contacts[0].id, "avatarUrl");

    const updatedContact = await contactsRepository.getContacts(user!.id);

    expect(updatedContact[0].avatarUrl).toBe("avatarUrl");
  });

  it("should not be able to update a contact avatar if contact not found", async () => {
    await expect(updateAvatarUseCase.execute(1, "avatarUrl")).rejects.toEqual(
      new AppError("Contact not found", 404)
    );
  });
});
