import { FastifyInstance } from "fastify";

import { login, logout, register } from "../controllers/auth.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", login);
  app.post("/register", register);
  app.post("/logout", logout);
}
