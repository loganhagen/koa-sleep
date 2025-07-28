"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
    primary: {
      main: "#4353FF",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00A2E8",
      contrastText: "#ffffff",
    },
  },
  typography: {
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
