import { inject, injectable } from "tsyringe";

import { AppError } from "@/shared/errors/app-error";

import { IContactsRepository } from "../../repositories/Icontacts.repository";

@injectable()
export class UpdateAvatarUseCase {
  constructor(
    @inject("ContactsRepository")
    private contactsRepository: IContactsRepository
  ) {}

  async execute(contactId: number, avatarUrl: string) {
    try {
      await this.contactsRepository.updateAvatar(contactId, avatarUrl);
    } catch {
      throw new AppError("Contact not found", 404);
    }
  }
}
