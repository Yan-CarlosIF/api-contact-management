import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "../server";

export async function register(
  request: FastifyRequest<{ Body: Pick<User, "name" | "email" | "password"> }>,
  reply: FastifyReply
) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return reply.status(400).send({
        error: "name, email and password are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return reply.code(201).send(user);
  } catch {
    console.error("Error creating user");
    reply.code(500).send({ error: "Error creating user" });
  }
}

export async function login(
  request: FastifyRequest<{ Body: Pick<User, "email" | "password"> }>,
  reply: FastifyReply
) {
  try {
    const { email, password } = request.body;

    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return reply.status(404).send({ error: "User not found" });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (user.email !== email || !isValidPassword) {
      return reply.status(401).send({ error: "Invalid credentials" });
    }

    const token = reply.server.jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      { expiresIn: "24h" }
    );

    reply
      .setCookie("token", token, {
        httpOnly: process.env.production === "true",
        secure: process.env.production === "true",
        sameSite: process.env.production === "true" && "none",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .send({ message: "Login successful" });
  } catch {
    console.error("Error logging in");
    reply.code(500).send({ error: "Error logging in" });
  }
}

export async function logout(_: FastifyRequest, reply: FastifyReply) {
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
    console.error("Error logging out");
    reply.code(500).send({ error: "Error logging out" });
  }
}
