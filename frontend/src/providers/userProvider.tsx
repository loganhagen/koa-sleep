"use client";

import { UserDTO } from "@/types/api/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type UserContextType = {
  user: UserDTO | null;
  login: (user: UserDTO) => void;
  logout: () => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setUser] = useState<UserDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem("currentUser");
      if (storedValue) {
        setUser(JSON.parse(storedValue) as UserDTO);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (user: UserDTO) => {
    const userJson = JSON.stringify(user);
    localStorage.setItem("currentUser", userJson);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  const contextValue = useMemo(
    () => ({ user: currentUser, login, logout, isLoading }),
    [currentUser, isLoading]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
