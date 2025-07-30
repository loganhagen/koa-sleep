"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#4353FF",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00A2E8",
      contrastText: "#ffffff",
    },

    text: {
      primary: "#343A40",
      secondary: "#6C757D",
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: "bold",
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === "outlined" && {
            border: `1px solid ${theme.palette.grey[300]}`,
          }),
        }),
      },
    },
  },
});

export default theme;
