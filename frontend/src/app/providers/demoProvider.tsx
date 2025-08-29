"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type DemoContextType = {
  isDemoMode: boolean;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
};

const DemoContext = createContext<DemoContextType>({
  isDemoMode: false,
  enableDemoMode: () => {},
  disableDemoMode: () => {},
});

export const useDemo = () => useContext(DemoContext);

export default function DemoProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem("isDemoMode");
    if (storedValue) {
      setIsDemoMode(JSON.parse(storedValue));
    }
  }, []);

  const enableDemoMode = () => {
    localStorage.setItem("isDemoMode", "true");
    setIsDemoMode(true);
  };

  const disableDemoMode = () => {
    localStorage.setItem("isDemoMode", "false");
    setIsDemoMode(false);
  };

  const contextValue = useMemo(
    () => ({ isDemoMode, enableDemoMode, disableDemoMode }),
    [isDemoMode]
  );

  return (
    <DemoContext.Provider value={contextValue}>{children}</DemoContext.Provider>
  );
}
