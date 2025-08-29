"use client";

import { UserDTO } from "@/types/api/user";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface UserContextType {
  user: UserDTO | null;
  login: (userData: UserDTO) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDTO | null>(null);

  const login = (userData: UserDTO) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
