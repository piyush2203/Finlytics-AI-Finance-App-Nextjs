import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production'){
    globalThis.prisma = db;
}

// globalThis.prisma:
// Checks if a Prisma Client instance already exists.
// If it does (globalThis.prisma is defined), it reuses the existing instance.
// If not, it creates a new instance of PrismaClient using new PrismaClient().



// process.env.NODE_ENV:
// Indicates the current environment mode (e.g., development, production).

// In non-production environments (e.g., development), it assigns the db instance to globalThis.prisma so it can be reused across module reloads.