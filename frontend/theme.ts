"use client";

import { createTheme, Theme } from "@mui/material/styles";
import { MenuItemStyles } from "react-pro-sidebar";

const theme = createTheme({
  palette: {
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

export const getProSidebarStyles = (theme: Theme): MenuItemStyles => {
  return {
    button: ({ active, disabled }) => {
      return {
        color: active ? theme.palette.primary.main : "#E5E7EB",
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

export default theme;
