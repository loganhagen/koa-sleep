import { createTheme } from "@mui/material/styles";

const typography = {
  fontFamily: "Inter, sans-serif",
  h1: {
    fontFamily: "'Source Serif Pro', serif",
    fontWeight: 700,
  },
  h2: {
    fontFamily: "'Source Serif Pro', serif",
    fontWeight: 700,
  },
  h3: {
    fontFamily: "'Source Serif Pro', serif",
    fontWeight: 700,
  },
  h4: {
    fontFamily: "'Source Serif Pro', serif",
    fontWeight: 700,
  },
  h5: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
  },
  h6: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00897b",
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
      main: "#4db6ac",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: typography,
});
