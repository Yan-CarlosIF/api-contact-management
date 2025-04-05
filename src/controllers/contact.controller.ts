import { Contact } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

import { JWTPayload } from "../modules/auth";
import { prisma } from "../server";

export async function addContact(
  request: FastifyRequest<{ Body: Omit<Contact, "id" | "userId"> }>,
  reply: FastifyReply<{ Body: Contact }>
) {
  try {
    const { name, email, description, avatarUrl, phone } = request.body;
    const { id } = request.user as JWTPayload;

    if (!id) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        description,
        avatarUrl,
        phone,
        userId: id,
      },
    });

    return reply.code(201).send(contact);
  } catch {
    return reply.code(500).send({ message: "Error creating contact" });
  }
}

export async function getContacts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.user as JWTPayload;

    if (!id) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    const contacts: Contact[] = await prisma.contact.findMany({
      where: {
        userId: id,
      },
    });

    return reply.code(200).send(contacts);
  } catch {
    return reply.code(500).send({ message: "Error getting contacts" });
  }
}

export async function deleteContact(
  request: FastifyRequest<{ Body: { contactId: number } }>,
  reply: FastifyReply
) {
  try {
    const { contactId } = request.body;

    if (!contactId) {
      return reply.code(400).send({ message: "Contact ID is required" });
    }

    await prisma.contact.delete({
      where: {
        id: contactId,
      },
    });

    return reply.code(200).send({ message: "Contact deleted successfully" });
  } catch {
    return reply.code(500).send({ message: "Error deleting contact" });
  }
}

export async function updateContact(
  request: FastifyRequest<{
    Body: Pick<Contact, "id" | "name" | "email" | "phone" | "avatarUrl">;
  }>,
  reply: FastifyReply
) {
  try {
    const { id, name, email, phone, avatarUrl } = request.body;
    const { id: userId } = request.user as JWTPayload;

    if (!userId) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    const contact = await prisma.contact.update({
      where: {
        id,
        userId,
      },
      data: {
        name,
        email,
        phone,
        avatarUrl,
      },
    });

    return reply.code(200).send(contact);
  } catch {
    reply.code(500).send({ message: "Error updating contact" });
  }
}
