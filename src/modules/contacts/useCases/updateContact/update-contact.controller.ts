import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";

import { IUpdateContactDTO } from "../../dtos/Iupdate-contactDTO";
import { UpdateContactUseCase } from "./update-contact.useCase";

export class UpdateContactController {
  async handle(
    request: FastifyRequest<{ Body: Omit<IUpdateContactDTO, "userId"> }>,
    reply: FastifyReply
  ) {
    const { id: userId } = request.user;
    const { id, name, email, phone, description } = request.body;

    const updateContactUseCase = container.resolve(UpdateContactUseCase);

    await updateContactUseCase.execute({
      id,
      name,
      email,
      phone,
      userId,
      description,
    });

    return reply.status(200).send();
  }
}
