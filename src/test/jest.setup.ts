import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";

import { PrismaClient } from "@prisma/client";

import { app } from "@/shared/infra/http/app";
import { generateUniqueDatabaseURL } from "@/utils/generate-unique-db-url";

const schemaId = randomUUID();
const databaseUrl = generateUniqueDatabaseURL(schemaId);
process.env.DATABASE_URL = databaseUrl;

const prisma = new PrismaClient();

beforeAll(async () => {
  execSync(`pnpm prisma db push`, {
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
    },
    stdio: "inherit",
  });

  await app.ready();
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();

  await app.close();
});
