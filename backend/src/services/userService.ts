import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userService = {
  getDemoUser: async () => {
    const demoUser = await prisma.user.findUnique({
      where: {
        email: "mo.sleepin@fitsync.com",
      },
    });

    return demoUser;
  },
  getAllUsers: async () => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  },
  getUserByEmail: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  },
};
