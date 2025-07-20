import { Contact } from "@prisma/client";

import { IAddContactDTO } from "../dtos/Iadd-contactDTO";
import { IUpdateContactDTO } from "../dtos/Iupdate-contactDTO";

export interface IContactsRepository {
  addContact(contact: IAddContactDTO): Promise<void>;
  findContactPerUser(
    userId: number,
    contactEmail: string,
    contactPhone: string
  ): Promise<Contact | null>;
  getContacts(userId: number): Promise<Contact[]>;
  deleteContact(contactId: number): Promise<void>;
  updateContact(contact: IUpdateContactDTO): Promise<void>;
  updateAvatar(contactId: number, avatarUrl: string | null): Promise<void>;
}
