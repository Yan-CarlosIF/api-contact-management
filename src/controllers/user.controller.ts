import { FastifyReply, FastifyRequest } from "fastify";

import { JWTPayload } from "../modules/auth";

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id, email, name } = request.user as JWTPayload;

    if (!id) return reply.code(401).send({ message: "Unauthorized" });

    reply.code(200).send({ id, email, name });

    return reply.code(200).send({ message: "User found" });
  } catch {
    return reply.code(500).send({ message: "Error getting user" });
  }
}
