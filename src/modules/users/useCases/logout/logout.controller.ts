import { FastifyReply, FastifyRequest } from "fastify";

import { env } from "@/env/env";

export class LogoutController {
  handle(_: FastifyRequest, reply: FastifyReply) {
    try {
      reply
        .clearCookie("token", {
          secure: env.production === "true",
          httpOnly: env.production === "true",
          sameSite: env.production === "true" && "none",
          path: "/",
        })
        .send({ message: "Logout realizado com sucesso!" });
    } catch {
      reply.status(500).send({ message: "Error logging out" });
    }
  }
}
