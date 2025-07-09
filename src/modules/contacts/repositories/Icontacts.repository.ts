import { Contact } from "@prisma/client";

import { IAddContactDTO } from "../dtos/Iadd-contactDTO";

export interface IContactsRepository {
  addContact(contact: IAddContactDTO): Promise<void>;
  getContacts(): Promise<Contact[] | null>;
  deleteContact(contactId: number): Promise<void>;
  updateContact(userId: number, contact: IAddContactDTO): Promise<void>;
  updateAvatar(
    userId: number,
    contactId: number,
    avatarUrl: string
  ): Promise<void>;
}
