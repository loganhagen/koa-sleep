import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userService = {
  getAllUsers: async () => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  },
  getDemoUser: async () => {
    const demoUser = await prisma.user.findUnique({ where: { id: "001" } });
    return demoUser;
  },
};
