import { inject, injectable } from "tsyringe";

import { AppError } from "@/shared/errors/app-error";

import { IUpdateContactDTO } from "../../dtos/Iupdate-contactDTO";
import { IContactsRepository } from "../../repositories/Icontacts.repository";

@injectable()
export class UpdateContactUseCase {
  constructor(
    @inject("ContactsRepository")
    private contactsRepository: IContactsRepository
  ) {}

  async execute(contact: IUpdateContactDTO) {
    try {
      await this.contactsRepository.updateContact(contact);
    } catch {
      throw new AppError("Contact not found", 404);
    }
  }
}
