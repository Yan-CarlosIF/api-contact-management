import { FastifyInstance } from "fastify";

import { GetUserController } from "../modules/users/useCases/getUser/get-user.controller";
import { RegisterController } from "../modules/users/useCases/register/register.controller";

const registerUserController = new RegisterController();
const getUserController = new GetUserController();

export async function userRoutes(app: FastifyInstance) {
  app.post("/register", { handler: registerUserController.handle });

  app.get("/", {
    preHandler: [app.authenticate],
    handler: getUserController.handle,
  });
}
