import { FastifyReply, FastifyRequest } from "fastify";

export class LogoutController {
  handle(_: FastifyRequest, reply: FastifyReply) {
    try {
      reply
        .clearCookie("token", {
          secure: process.env.production === "true",
          httpOnly: process.env.production === "true",
          sameSite: process.env.production === "true" && "none",
          path: "/",
        })
        .send({ message: "Logout realizado com sucesso!" });
    } catch {
      reply.code(500).send({ error: "Error logging out" });
    }
  }
}
