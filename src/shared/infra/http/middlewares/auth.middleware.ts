import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { JWTPayload } from "@/@types/auth";
import { AppError } from "@/shared/errors/app-error";

export async function authMiddleware(app: FastifyInstance) {
  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { token } = request.cookies;

        if (!token) {
          throw new AppError("Unauthorized", 401);
        }

        const payload = app.jwt.verify<JWTPayload>(token);

        request.user = payload;
      } catch (err) {
        const { message, statusCode } =
          err instanceof AppError ? err : new AppError("Invalid Token", 401);

        reply.status(statusCode).send({ message });
      }
    }
  );
}
