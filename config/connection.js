import { PrismaClient } from "../prisma/.generated/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient({
    log: ["query"]
});

export default prisma;
