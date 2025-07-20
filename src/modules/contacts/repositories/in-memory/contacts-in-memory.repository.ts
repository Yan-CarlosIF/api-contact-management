import { Contact } from "@prisma/client";

import { AppError } from "@/shared/errors/app-error";

import { IAddContactDTO } from "../../dtos/Iadd-contactDTO";
import { IUpdateContactDTO } from "../../dtos/Iupdate-contactDTO";
import { IContactsRepository } from "../Icontacts.repository";

export class ContactsRepositoryInMemory implements IContactsRepository {
  private contacts: Contact[] = [];

  async addContact(contact: IAddContactDTO): Promise<void> {
    this.contacts.push({
      ...contact,
      id: this.contacts.length + 1,
    });
  }

  async findContactPerUser(
    userId: number,
    contactEmail: string,
    contactPhone: string
  ) {
    const contact =
      this.contacts.find(
        (contact) =>
          (contact.email === contactEmail && contact.userId === userId) ||
          (contact.phone === contactPhone && contact.userId === userId)
      ) ?? null;

    return contact;
  }

  async getContacts(userId: number): Promise<Contact[]> {
    const contacts = this.contacts.filter(
      (contact) => contact.userId === userId
    );

    return contacts;
  }

  async deleteContact(contactId: number): Promise<void> {
    this.contacts = this.contacts.filter((contact) => contact.id !== contactId);
  }

  async updateContact(contact: IUpdateContactDTO): Promise<void> {
    const contactIndex = this.contacts.findIndex(
      (contact) => contact.id === contact.id
    );

    if (contactIndex === -1) {
      throw new AppError("Contact not found", 404);
    }

    this.contacts[contactIndex] = {
      ...this.contacts[contactIndex],
      ...contact,
    };
  }

  async updateAvatar(
    contactId: number,
    avatarUrl: string | null
  ): Promise<void> {
    const contactIndex = this.contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex === -1) {
      throw new AppError("Contact not found", 404);
    }

    this.contacts[contactIndex] = {
      ...this.contacts[contactIndex],
      avatarUrl,
    };
  }
}
