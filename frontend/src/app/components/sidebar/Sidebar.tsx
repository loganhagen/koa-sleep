"use client";

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";
import { Home, Settings } from "@mui/icons-material";
import InsightsIcon from "@mui/icons-material/Insights";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "white",
          color: "black",
        },
      }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image src="/globe.svg" alt="FitSync Logo" width={40} height={40} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            FitSync
          </Typography>
        </Box>
      </Toolbar>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="/home"
            selected={pathname === "/home"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              },
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="/insights"
            selected={pathname === "/insights"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              },
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemIcon>
              <InsightsIcon />
            </ListItemIcon>
            <ListItemText primary="Insights" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="/settings"
            selected={pathname === "/settings"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              },
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;