import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { JWTPayload } from "../@types/auth";

export async function authMiddleware(app: FastifyInstance) {
  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { token } = request.cookies;

        if (!token) {
          return reply.code(401).send({ message: "Token not found" });
        }

        const payload = app.jwt.verify<JWTPayload>(token);

        request.user = payload;
      } catch {
        reply.code(401).send({ message: "Invalid token" });
      }
    }
  );
}
