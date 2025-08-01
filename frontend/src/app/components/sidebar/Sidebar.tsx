import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Home, Settings } from "@mui/icons-material";
import InsightsIcon from "@mui/icons-material/Insights";

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/home">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/insights">
            <ListItemIcon>
              <InsightsIcon />
            </ListItemIcon>
            <ListItemText primary="Insights" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/settings">
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
