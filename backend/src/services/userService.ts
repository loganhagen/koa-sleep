import { User } from "@prisma/client";
import prisma from "lib/prisma";

export const userService = {
  getUserByEmail: async (email: string): Promise<User | null> => {
    const user: User | null = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  },
};
