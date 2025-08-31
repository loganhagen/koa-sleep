import { User } from "@prisma/client";
import prisma from "lib/prisma";

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const allUsers: User[] = await prisma.user.findMany();
    return allUsers;
  },
  getUserByEmail: async (email: string): Promise<User | null> => {
    const user: User | null = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  },
};
