import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
if (typeof WebSocket === "undefined") neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL ?? "" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const [tours, blogs, bookings, contacts, payments, newsletter] = await Promise.all([
    prisma.tour.count(),
    prisma.blog.count(),
    prisma.booking.count(),
    prisma.contact.count(),
    prisma.payment.count(),
    prisma.newsletterSubscriber.count(),
  ]);
  console.log(JSON.stringify({ tours, blogs, bookings, contacts, payments, newsletter }, null, 2));
}
main().finally(() => prisma.$disconnect());
