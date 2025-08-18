import { Sidebar, Menu, MenuItem, MenuItemStyles } from "react-pro-sidebar";
import {
  Home,
  Settings,
  Logout,
  AutoGraph,
  CalendarMonth,
  CheckCircleOutline,
} from "@mui/icons-material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Box, Typography, useTheme, Avatar, Stack, Chip } from "@mui/material";

const SidebarComponent: React.FC = () => {
  const pathname = usePathname();
  const muiTheme = useTheme();

  const menuItemStyles: MenuItemStyles = {
    button: ({ active }) => {
      return {
        color: active
          ? muiTheme.palette.primary.main
          : muiTheme.palette.text.secondary,
        backgroundColor: active ? "rgba(107, 138, 253, 0.1)" : "transparent",
        fontSize: "18px",
        fontWeight: active ? 600 : 500,
        "&:hover": {
          backgroundColor:
            muiTheme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.04)",
        },
        borderLeft: active
          ? `4px solid ${muiTheme.palette.primary.main}`
          : "none",
        padding: "12px 20px",
        justifyContent: "flex-start",
      };
    },
    icon: {
      color: muiTheme.palette.primary.main,
      marginRight: "12px",
    },
  };

  return (
    <Sidebar
      width="250px"
      style={{
        borderRight: "none",
        height: "100vh",
        top: 0,
        position: "sticky",
      }}
      backgroundColor={muiTheme.palette.background.paper}
      rootStyles={{
        color: muiTheme.palette.text.secondary,
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/logo-3-no-bg.png"
            alt="FitSync Logo"
            width={60}
            height={60}
          />
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "700",
              fontFamily: "Source Serif Pro, sans-serif",
              color: muiTheme.palette.text.primary,
            }}
          >
            FitSync
          </Typography>
        </Box>
        <Menu menuItemStyles={menuItemStyles} style={{ flexGrow: 1 }}>
          <MenuItem
            icon={<Home />}
            active={pathname === "/home"}
            component={<a href="/home" />}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<AutoGraph />}
            active={pathname.startsWith("/sleep-journey")}
            component={<a href="/sleep-journey/onboarding" />}
          >
            Sleep Journey
          </MenuItem>
          <MenuItem
            icon={<CalendarMonth />}
            active={pathname === "/history"}
            component={<a href="/history" />}
          >
            History
          </MenuItem>
          <MenuItem
            icon={<Settings />}
            active={pathname === "/settings"}
            component={<a href="/settings" />}
          >
            Settings
          </MenuItem>
        </Menu>

        <Box sx={{ p: 2, borderTop: `1px solid ${muiTheme.palette.divider}` }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main" }}>LH</Avatar>
            <Typography sx={{ fontWeight: 600 }}>Denzel Washington</Typography>
          </Box>
          <Chip
            icon={<CheckCircleOutline />}
            label="Fitbit Connected"
            color="success"
            size="small"
            sx={{ mb: 2, width: "100%" }}
          />
          <Menu menuItemStyles={menuItemStyles}>
            <MenuItem icon={<Logout />}>Log Out</MenuItem>
          </Menu>
        </Box>
      </Stack>
    </Sidebar>
  );
};

export default SidebarComponent;
