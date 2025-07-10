import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";

import { GetContactsUseCase } from "./get-contacts.useCase";

export class GetContactsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.user;

    const getContactsUseCase = container.resolve(GetContactsUseCase);

    const contacts = await getContactsUseCase.execute(id);

    return reply.status(200).send(contacts);
  }
}
