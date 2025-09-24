import { Sidebar, Menu, MenuItem, MenuItemStyles } from "react-pro-sidebar";
import {
  Home,
  Settings,
  CalendarMonth,
  CheckCircleOutline,
  ExpandLess,
  Logout,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Typography,
  useTheme,
  Avatar,
  Stack,
  Chip,
  IconButton,
  useMediaQuery,
  Button,
  Skeleton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useUser } from "../../providers/userProvider";
import InfoIcon from "@mui/icons-material/Info";
import { useLogout } from "@/hooks/useAuth";

const SidebarComponent: React.FC = () => {
  const pathname = usePathname();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("lg"));
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const { user, isLoading } = useUser();
  const { mutate: logoutUser } = useLogout();

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

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
      collapsed={isCollapsed}
      width="250px"
      style={{
        borderRight: "none",
        height: isMobile ? "auto" : "100vh",
        minHeight:
          pathname === "/history" || pathname === "/settings"
            ? "100vh"
            : "auto",
        top: 0,
        position: "sticky",
      }}
      backgroundColor={muiTheme.palette.background.paper}
      rootStyles={{
        color: muiTheme.palette.text.secondary,
      }}
    >
      <Stack sx={{ height: "100%", position: "relative" }}>
        <Box
          sx={{
            p: isCollapsed ? 2 : 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "padding 0.3s ease-in-out",
          }}
        >
          <Image
            src="/logo-3-no-bg.png"
            alt="FitSync Logo"
            width={isCollapsed ? 48 : 60}
            height={isCollapsed ? 48 : 60}
            style={{
              transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
            }}
          />
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "700",
              fontFamily: "Outfit, sans-serif",
              color: muiTheme.palette.text.primary,
              ml: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: isCollapsed ? 0 : "auto",
              opacity: isCollapsed ? 0 : 1,
              transition: "width 0.3s ease-in-out, opacity 0.2s ease-in-out",
            }}
          >
            Koa
          </Typography>
        </Box>
        <Menu menuItemStyles={menuItemStyles} style={{ flexGrow: 1 }}>
          <MenuItem
            icon={<Home />}
            active={pathname === "/home"}
            component={<Link href="/home" />}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<CalendarMonth />}
            active={pathname === "/history"}
            component={<Link href="/history" />}
          >
            History
          </MenuItem>
          <MenuItem
            icon={<Settings />}
            active={pathname === "/settings"}
            component={<Link href="/settings" />}
          >
            Settings
          </MenuItem>
          <MenuItem icon={<InfoIcon />}>About</MenuItem>
        </Menu>

        <IconButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{
            position: "absolute",
            top: "50%",
            right: -15,
            transform: "translateY(-50%)",
            backgroundColor: muiTheme.palette.background.paper,
            zIndex: 1,
            width: 50,
            height: 50,
            "&:hover": {
              backgroundColor: muiTheme.palette.background.default,
            },
          }}
        >
          <ExpandLess
            style={{
              transform: `rotate(${isCollapsed ? 90 : -90}deg)`,
              transition: "transform 0.3s ease-in-out",
            }}
          />
        </IconButton>

        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${muiTheme.palette.divider}`,
            transition: "padding 0.3s ease-in-out",
            overflow: "hidden",
          }}
        >
          {isLoading ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  justifyContent: "center",
                }}
              >
                <Skeleton variant="circular" width={40} height={40} />
                <Box
                  sx={{
                    width: isCollapsed ? 0 : "auto",
                    opacity: isCollapsed ? 0 : 1,
                    ml: isCollapsed ? 0 : 2,
                  }}
                >
                  <Skeleton variant="text" width={120} />
                </Box>
              </Box>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                {isCollapsed ? (
                  <Skeleton
                    variant="circular"
                    width={24}
                    height={24}
                    sx={{ mx: "auto" }}
                  />
                ) : (
                  <Skeleton variant="rounded" height={24} />
                )}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                {isCollapsed ? (
                  <Skeleton
                    variant="circular"
                    width={34}
                    height={34}
                    sx={{ mx: "auto" }}
                  />
                ) : (
                  <Skeleton variant="rounded" height={32} />
                )}
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {user?.first_name?.[0] ?? "U"}
                  {user?.last_name?.[0] ?? "N"}
                </Avatar>
                <Box
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: isCollapsed ? 0 : "auto",
                    opacity: isCollapsed ? 0 : 1,
                    transition:
                      "width 0.3s ease-in-out, opacity 0.2s ease-in-out",
                    ml: isCollapsed ? 0 : 2,
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    {user?.first_name} {user?.last_name}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                {isCollapsed ? (
                  <CheckCircleOutline color="success" />
                ) : (
                  <Chip
                    icon={<CheckCircleOutline />}
                    label="Fitbit Connected"
                    color="success"
                    size="small"
                    sx={{ width: "100%" }}
                  />
                )}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                {isCollapsed ? (
                  <IconButton onClick={() => logoutUser()} color="inherit">
                    <Logout />
                  </IconButton>
                ) : (
                  <Button
                    onClick={() => logoutUser()}
                    startIcon={<Logout />}
                    size="small"
                    variant="outlined"
                    color="inherit"
                    sx={{ width: "100%" }}
                  >
                    Logout
                  </Button>
                )}
              </Box>
            </>
          )}
        </Box>
      </Stack>
    </Sidebar>
  );
};

export default SidebarComponent;
