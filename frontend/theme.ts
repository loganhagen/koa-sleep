import { createTheme } from "@mui/material/styles";

const typography = {
  fontFamily: "Inter, sans-serif",
  h1: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
  },
  h2: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
  },
  h3: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
  },
  h4: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
  },
  h5: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
  },
  h6: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: typography,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: typography,
});
