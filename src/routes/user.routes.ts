import { FastifyInstance } from "fastify";

import { getUser } from "../controllers/user.controller";

export async function userRoutes(app: FastifyInstance) {
  app.get("/get", {
    preHandler: [app.authenticate],
    handler: getUser,
  });
}
