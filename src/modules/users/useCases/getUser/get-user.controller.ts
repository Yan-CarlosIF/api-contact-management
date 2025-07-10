import { FastifyReply, FastifyRequest } from "fastify";

export class GetUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id, email, name } = request.user;

    return reply.status(200).send({ id, email, name });
  }
}
