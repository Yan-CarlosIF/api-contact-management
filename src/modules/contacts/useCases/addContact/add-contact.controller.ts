import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";

import { IAddContactDTO } from "../../dtos/Iadd-contactDTO";
import { AddContactUseCase } from "./add-contact.useCase";

export class AddContactController {
  async handle(
    request: FastifyRequest<{ Body: Omit<IAddContactDTO, "userId"> }>,
    reply: FastifyReply
  ) {
    const { avatarUrl, description, email, name, phone } = request.body;

    const { id: userId } = request.user;

    const addContactUseCase = container.resolve(AddContactUseCase);

    await addContactUseCase.execute({
      avatarUrl,
      description,
      email,
      name,
      phone,
      userId,
    });

    return reply.status(201).send();
  }
}
