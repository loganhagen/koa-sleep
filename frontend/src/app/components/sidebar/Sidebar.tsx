"use client";

import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Home, Settings } from "@mui/icons-material";
import InsightsIcon from "@mui/icons-material/Insights";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Box, useTheme } from "@mui/material";
import { getProSidebarStyles } from "../../../../theme";

const SidebarComponent: React.FC = () => {
  const pathname = usePathname();
  const muiTheme = useTheme();
  const menuItemStyles = getProSidebarStyles(muiTheme);

  return (
    <Sidebar
      width="250px"
      style={{
        borderRight: "none",
        height: "100vh",
        top: 0,
        position: "sticky",
      }}
      backgroundColor="#1F2937"
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src="/globe.svg" alt="FitSync Logo" width={40} height={40} />
      </Box>
      <Menu menuItemStyles={menuItemStyles}>
        <MenuItem
          icon={<Home />}
          active={pathname === "/home"}
          component={<a href="/home" />}
        >
          Home
        </MenuItem>
        <MenuItem
          icon={<InsightsIcon />}
          active={pathname === "/insights"}
          component={<a href="/insights" />}
        >
          Insights
        </MenuItem>
        <MenuItem
          icon={<Settings />}
          active={pathname === "/settings"}
          component={<a href="/settings" />}
        >
          Settings
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
