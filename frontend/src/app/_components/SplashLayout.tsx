"use client";

import { usePathname } from "next/navigation";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import ThemeToggleButton from "./DarkModeToggleButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSplashPage = pathname === "/";

  return (
    <Box sx={{ display: "flex" }}>
      {!isSplashPage && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {!isSplashPage && <Toolbar />}
        <Box sx={{ position: "absolute", top: 16, right: 16 }}>
          {!isSplashPage && <ThemeToggleButton />}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            p: 4,
            height: isSplashPage ? "100vh" : "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
