import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { cookies } from "next/headers";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./components/sidebar/Sidebar";
import ThemeProvider from "./providers/themeProvider";
import ThemeToggleButton from "./components/buttons/themeToggleButton";

type ThemeMode = "light" | "dark";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeCookie = (await cookies()).get("theme-mode");

  const initialMode: ThemeMode =
    themeCookie?.value === "dark" ? "dark" : "light";

  return (
    <html lang="en">
      <body>
        <ThemeProvider initialMode={initialMode}>
          <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Toolbar />
              <Box sx={{ position: "absolute", top: 16, right: 16 }}>
                <ThemeToggleButton />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexGrow: 1,
                  p: 4,
                }}
              >
                {children}
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
