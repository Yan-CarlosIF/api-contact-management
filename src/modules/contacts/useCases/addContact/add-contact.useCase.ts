import { inject, injectable } from "tsyringe";

import { AppError } from "@/shared/errors/app-error";

import { IAddContactDTO } from "../../dtos/Iadd-contactDTO";
import { IContactsRepository } from "../../repositories/Icontacts.repository";

@injectable()
export class AddContactUseCase {
  constructor(
    @inject("ContactsRepository")
    private contactsRepository: IContactsRepository
  ) {}

  async execute({
    avatarUrl,
    description,
    email,
    name,
    phone,
    userId,
  }: IAddContactDTO) {
    const contactAlreadyExists =
      await this.contactsRepository.findContactPerUser(userId, email);

    if (contactAlreadyExists) {
      throw new AppError("Contact already exists", 400);
    }

    await this.contactsRepository.addContact({
      avatarUrl,
      description,
      email,
      name,
      phone,
      userId,
    });
  }
}
