import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";

import { env } from "@/env/env";

import { ILoginDTO } from "../../dtos/IloginDTO";
import { LoginUseCase } from "./login.useCase";

export class LoginController {
  async handle(
    request: FastifyRequest<{ Body: ILoginDTO }>,
    reply: FastifyReply
  ) {
    const loginUseCase = container.resolve(LoginUseCase);

    const { email, password } = request.body;

    const user = await loginUseCase.execute({ email, password });

    const token = reply.server.jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      { expiresIn: "24h" }
    );

    reply
      .setCookie("token", token, {
        httpOnly: env.production === "true",
        secure: env.production === "true",
        sameSite: env.production === "true" && "none",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .send({ message: "Login realizado com sucesso!" });
  }
}
