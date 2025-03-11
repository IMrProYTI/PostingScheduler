import { Attachment, Post, Prisma, PrismaClient, Social, Task } from '@prisma/client';

const prisma = new PrismaClient();

export type { Attachment, Post, Prisma, Social, Task };
export default prisma;