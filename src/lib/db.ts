/**
 * Prisma client (singleton) using the Neon serverless driver adapter.
 * Compatible with Node runtime and Vercel Fluid Compute.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

declare global {
  var __travelora_db: PrismaClient | undefined;
}

if (typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

function makeClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const prisma: PrismaClient = global.__travelora_db ?? makeClient();

if (process.env.NODE_ENV !== "production") {
  global.__travelora_db = prisma;
}
