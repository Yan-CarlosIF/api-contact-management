import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";

import { IRegisterDTO } from "../../dtos/IregisterDTO";
import { RegisterUseCase } from "./register.useCase";

export class RegisterController {
  async handle(
    request: FastifyRequest<{ Body: IRegisterDTO }>,
    reply: FastifyReply
  ) {
    const registerUseCase = container.resolve(RegisterUseCase);

    const { name, email, password } = request.body;

    await registerUseCase.execute({ name, email, password });

    return reply.status(201).send();
  }
}
