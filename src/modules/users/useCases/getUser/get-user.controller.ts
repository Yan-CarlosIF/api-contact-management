import { FastifyReply, FastifyRequest } from "fastify";

import { JWTPayload } from "../../../../@types/auth";

export class GetUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id, email, name } = request.user as JWTPayload;

      if (!id) return reply.code(401).send({ message: "Unauthorized" });

      return reply.code(200).send({ id, email, name });
    } catch {
      return reply.code(500).send({ message: "Internal Server Error" });
    }
  }
}
