"use client";

import { createTheme, Theme } from "@mui/material/styles";
import { MenuItemStyles } from "react-pro-sidebar";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F7F8FA",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#6B8AFD",
    },
    text: {
      primary: "#2E3A48",
      secondary: "#8A94A6",
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.1)",
          padding: "1rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1F2937",
      paper: "#2E3A48",
    },
    primary: {
      main: "#6B8AFD",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B8C4",
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
          padding: "1rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
        },
      },
    },
  },
});

export const getProSidebarStyles = (theme: Theme): MenuItemStyles => {
  return {
    button: ({ active, disabled }) => {
      return {
        color: active
          ? theme.palette.primary.main
          : theme.palette.text.secondary,
        backgroundColor: active ? "rgba(107, 138, 253, 0.1)" : "transparent",
        fontSize: "18px",
        fontWeight: active ? 600 : 500,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        },
        borderLeft: active ? `4px solid ${theme.palette.primary.main}` : "none",
        padding: "12px 20px",
        justifyContent: "flex-start",
      };
    },
    icon: {
      color: theme.palette.primary.main,
      marginRight: "12px",
    },
  };
};

export { lightTheme, darkTheme };
