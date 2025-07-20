import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";

import { DeleteContactUseCase } from "./delete-contact.useCase";

export class DeleteContactController {
  async handle(
    request: FastifyRequest<{ Body: { contactId: number } }>,
    reply: FastifyReply
  ) {
    const { contactId } = request.body;

    const deleteContactUseCase = container.resolve(DeleteContactUseCase);

    await deleteContactUseCase.execute(contactId);

    return reply.status(200).send();
  }
}
