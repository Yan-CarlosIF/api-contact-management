import { inject, injectable } from "tsyringe";

import { AppError } from "@/shared/errors/app-error";

import { IContactsRepository } from "../../repositories/Icontacts.repository";

@injectable()
export class DeleteContactUseCase {
  constructor(
    @inject("ContactsRepository")
    private contactsRepository: IContactsRepository
  ) {}

  async execute(contactId: number) {
    try {
      await this.contactsRepository.deleteContact(contactId);
    } catch {
      throw new AppError("Contact not found", 404);
    }
  }
}
