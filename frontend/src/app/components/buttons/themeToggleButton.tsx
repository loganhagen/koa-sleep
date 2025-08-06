"use client";

import { IconButton, useTheme as useMuiTheme } from "@mui/material";
import { useTheme } from "../../providers/themeProvider";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ThemeToggleButton() {
  const { toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
      {muiTheme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
}
