import { PrismaClient, Prisma } from "@prisma/client";
export { Prisma as dbType } from "@prisma/client";
export const db = new PrismaClient();
