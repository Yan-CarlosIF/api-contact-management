import { Contact, PrismaClient } from "@prisma/client";

import { IAddContactDTO } from "@/modules/contacts/dtos/Iadd-contactDTO";
import { IContactsRepository } from "@/modules/contacts/repositories/Icontacts.repository";

export class ContactsRepository implements IContactsRepository {
  private contacts = new PrismaClient().contact;

  async addContact({
    name,
    avatarUrl,
    description,
    email,
    phone,
    userId,
  }: IAddContactDTO) {
    await this.contacts.create({
      data: {
        name,
        avatarUrl,
        description,
        email,
        phone,
        userId,
      },
    });
  }

  async findContactPerUser(userId: number, contactEmail: string) {
    return await this.contacts.findFirst({
      where: {
        userId,
        email: contactEmail,
      },
    });
  }

  async getContacts(userId: number) {
    return await this.contacts.findMany({
      where: {
        userId,
      },
    });
  }

  async deleteContact(contactId: number) {
    await this.contacts.delete({
      where: {
        id: contactId,
      },
    });
  }

  async updateContact({ id, name, email, phone, userId }: Contact) {
    await this.contacts.update({
      where: {
        id,
        userId,
      },
      data: {
        name,
        email,
        phone,
      },
    });
  }

  async updateAvatar(userId: number, contactId: number, avatarUrl: string) {
    await this.contacts.update({
      where: {
        id: contactId,
        userId,
      },
      data: {
        avatarUrl,
      },
    });
  }
}
