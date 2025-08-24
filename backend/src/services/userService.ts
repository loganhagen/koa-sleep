import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userService = {
  getAllUsers: async () => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  },
  getDemoUser: async () => {
    const demoUser = await prisma.user.findFirst({
      where: { id: "cltvo112j00008x9s1g8p4d7c" },
    });
    return demoUser;
  },
};
