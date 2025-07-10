import { FastifyInstance } from "fastify";

import { AppError } from "./app-error";

export function errorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, _, reply) => {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message });
    }

    return reply.status(500).send({ message: "Internal Server Error" });
  });
}
