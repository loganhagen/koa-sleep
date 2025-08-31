"use client";

import { User } from "@/types/api/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type UserContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedValue = localStorage.getItem("currentUser");
    if (storedValue) {
      setUser(JSON.parse(storedValue) as User);
    }
  }, []);

  const login = (user: User) => {
    const userJson = JSON.stringify(user);
    localStorage.setItem("currentUser", userJson);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  const contextValue = useMemo(
    () => ({ user: currentUser, login, logout }),
    [currentUser]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
