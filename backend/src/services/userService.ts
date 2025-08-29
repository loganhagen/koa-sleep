import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userService = {
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
