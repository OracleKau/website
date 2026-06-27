import { PrismaClient } from "@prisma/client";

// Global cache for PrismaClient instances to prevent hot-reload connection exhaustion in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Initialize Prisma client instance. In development, we use log outputs to trace database performance.
export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// Store PrismaClient globally if we are running in non-production environments
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
export default db;

