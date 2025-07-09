import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";

import { IRegisterDTO } from "../../dtos/IregisterDTO";
import { RegisterUseCase } from "./register.useCase";

export class RegisterController {
  async handle(
    request: FastifyRequest<{ Body: IRegisterDTO }>,
    reply: FastifyReply
  ) {
    try {
      const registerUseCase = container.resolve(RegisterUseCase);

      const { name, email, password } = request.body;

      await registerUseCase.execute({ name, email, password });

      return reply.code(201).send();
    } catch (err) {
      return reply.code(400).send({
        message: err instanceof Error ? err.message : "Internal Server Error",
      });
    }
  }
}
