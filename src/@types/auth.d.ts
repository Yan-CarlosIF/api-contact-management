import { FastifyReply, FastifyRequest } from "fastify";
export type JWTPayload = Pick<User, "id" | "email" | "name">;

declare module "fastify" {
  interface FastifyRequest {
    user: JWTPayload;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }

  interface FastifyInstance {
    validImageUrl: (
      request: FastifyRequest<{ Body: IUpdateAvatarDTO }>,
      reply: FastifyReply
    ) => Promise<void>;
  }
}
