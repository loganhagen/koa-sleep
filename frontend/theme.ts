import { createTheme } from "@mui/material/styles";

const typography = {
  fontFamily: "Inter, sans-serif",
  h1: {
    fontFamily: "'Inter', serif",
    fontWeight: 700,
  },
  h2: {
    fontFamily: "'Inter', serif",
    fontWeight: 700,
  },
  h3: {
    fontFamily: "'Inter', serif",
    fontWeight: 700,
  },
  h4: {
    fontFamily: "'Inter', serif",
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

const themeComponents = {
  MuiPaper: {
    defaultProps: {
      variant: "outlined" as const,
    },
    styleOverrides: {
      root: {
        borderRadius: 16,
      },
    },
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
    warning: {
      main: "#ffa726",
    },
  },
  typography: typography,
  components: themeComponents,
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
    warning: {
      main: "#ef6c00",
    },
  },
  typography: typography,
  components: themeComponents,
});
