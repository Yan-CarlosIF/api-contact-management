import { inject, injectable } from "tsyringe";

import { IContactsRepository } from "../../repositories/Icontacts.repository";

@injectable()
export class GetContactsUseCase {
  constructor(
    @inject("ContactsRepository")
    private contactsRepository: IContactsRepository
  ) {}

  async execute(userId: number) {
    return await this.contactsRepository.getContacts(userId);
  }
}
