import "reflect-metadata";
import "dotenv/config";
import "../../container";

import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

import { errorHandler } from "@/shared/errors/error-handler.decorator";
import { authMiddleware } from "@/shared/infra/http/middlewares/auth.middleware";
import { authRoutes } from "@/shared/infra/http/routes/auth.routes";
import { contactRoutes } from "@/shared/infra/http/routes/contact.routes";
import { userRoutes } from "@/shared/infra/http/routes/user.routes";

import { validImageUrlMiddleware } from "./middlewares/valid-image-url.middleware";

export const prisma = new PrismaClient();

const app = fastify();

app.register(fastifyCors, {
  origin: [
    "https://contact-management-rho-green.vercel.app",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

app.register(fastifyCookie);

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

authMiddleware(app);
validImageUrlMiddleware(app);
errorHandler(app);

app.register(authRoutes, { prefix: "/auth" });
app.register(contactRoutes, { prefix: "/contacts" });
app.register(userRoutes, { prefix: "/user" });

app.get("/", () => {
  return { api: "running" };
});

app.listen({ host: "0.0.0.0", port: 3000 }).then(() => {
  console.log("listening at http://localhost:3000");
});
