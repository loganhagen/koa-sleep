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
import { useFetchCurrentUser } from "@/hooks/useAuth";

type UserContextType = {
  user: UserDTO | null;
  setUser: (user: UserDTO) => void;
  clearUser: () => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  clearUser: () => {},
  isLoading: true,
});

export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setUserState] = useState<UserDTO | null>(null);
  const { data, isLoading, isError } = useFetchCurrentUser();

  useEffect(() => {
    if (data) {
      setUserState(data);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setUserState(null);
    }
  }, [isError]);
  const setUser = (user: UserDTO) => {
    setUserState(user);
  };

  const clearUser = () => {
    setUserState(null);
  };

  const contextValue = useMemo(
    () => ({
      user: currentUser,
      setUser,
      clearUser,
      isLoading,
    }),
    [currentUser, isLoading]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
