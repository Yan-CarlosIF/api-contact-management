import { FastifyInstance } from "fastify";

import { LoginController } from "@/modules/users/useCases/login/login.controller";
import { LogoutController } from "@/modules/users/useCases/logout/logout.controller";

const loginController = new LoginController();
const logoutController = new LogoutController();

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", { handler: loginController.handle });
  app.post("/logout", { handler: logoutController.handle });
}
