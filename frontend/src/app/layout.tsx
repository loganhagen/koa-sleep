"use client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  CssBaseline,
  ThemeProvider,
  Box,
  Toolbar,
  IconButton,
} from "@mui/material";
import { darkTheme } from "../../theme";
import Sidebar from "./components/sidebar/Sidebar";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
              }}
            >
              <Toolbar />
              <Box sx={{ position: "absolute", top: 16, right: 16 }}>
                <IconButton sx={{ ml: 1 }} color="inherit">
                  <Brightness7Icon />
                </IconButton>
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
