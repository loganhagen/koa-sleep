"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type DemoContextType = {
  isDemoMode: boolean;
  enableDemoMode: () => void;
};

const DemoContext = createContext<DemoContextType>({
  isDemoMode: false,
  enableDemoMode: () => {},
});

export const useDemo = () => useContext(DemoContext);

export default function DemoProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(true);

  const enableDemoMode = () => {
    setIsDemoMode(true);
  };

  const contextValue = useMemo(
    () => ({ isDemoMode, enableDemoMode }),
    [isDemoMode]
  );

  return (
    <DemoContext.Provider value={contextValue}>{children}</DemoContext.Provider>
  );
}
