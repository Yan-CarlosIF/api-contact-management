import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";

import { AppError } from "@/shared/errors/app-error";

import { DeleteContactUseCase } from "./delete-contact.useCase";

export class DeleteContactController {
  async handle(
    request: FastifyRequest<{ Body: { contactId: number } }>,
    reply: FastifyReply
  ) {
    const { contactId } = request.body;

    if (!contactId) {
      throw new AppError("Contact ID is required", 400);
    }

    const deleteContactUseCase = container.resolve(DeleteContactUseCase);

    await deleteContactUseCase.execute(contactId);

    return reply.status(200).send();
  }
}
