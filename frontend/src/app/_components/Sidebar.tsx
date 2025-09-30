import {
  Sidebar,
  Menu,
  MenuItem as ProSidebarMenuItem,
  MenuItemStyles,
} from "react-pro-sidebar";
import {
  Home,
  CalendarMonth,
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
  IconButton,
  useMediaQuery,
  Skeleton,
  CircularProgress,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useUser } from "../../providers/userProvider";
import InfoIcon from "@mui/icons-material/Info";
import { useLogout } from "@/hooks/useAuth";
// import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const SidebarComponent: React.FC = () => {
  const pathname = usePathname();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("lg"));
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const { user, isLoading } = useUser();
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <ProSidebarMenuItem
            icon={<Home />}
            active={pathname === "/home"}
            component={<Link href="/home" />}
          >
            Home
          </ProSidebarMenuItem>
          <ProSidebarMenuItem
            icon={<CalendarMonth />}
            active={pathname === "/history"}
            component={<Link href="/history" />}
          >
            History
          </ProSidebarMenuItem>
          <ProSidebarMenuItem
            icon={<InfoIcon />}
            active={pathname === "/about"}
            component={<Link href="/about" />}
          >
            About
          </ProSidebarMenuItem>
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
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 1,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: muiTheme.palette.action.hover,
                  },
                  borderRadius: 2,
                }}
                onClick={handleClick}
              >
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {user?.first_name?.[0] ?? ""}
                  {user?.last_name?.[0] ?? ""}
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
                    {user ? `${user.first_name} ${user.last_name}` : ""}
                  </Typography>
                </Box>
              </Box>
              <MuiMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                slotProps={{
                  paper: {
                    sx: {
                      width: isCollapsed ? 150 : 200,
                      mb: 1,
                    },
                  },
                }}
              >
                {/* <MuiMenuItem>
                  <ListItemIcon>
                    <ManageAccountsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Account</ListItemText>
                </MuiMenuItem> */}
                <MuiMenuItem
                  onClick={() => {
                    logoutUser();
                    handleClose();
                  }}
                  disabled={isLoggingOut}
                >
                  <ListItemIcon>
                    {isLoggingOut ? (
                      <CircularProgress size={20} />
                    ) : (
                      <Logout fontSize="small" />
                    )}
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MuiMenuItem>
              </MuiMenu>
            </>
          )}
        </Box>
        <Box
          sx={{
            p: 2,
            textAlign: "center",
            display: isCollapsed ? "none" : "block",
          }}
        >
          <Typography variant="caption" color="textSecondary">
            Version: {process.env.NEXT_PUBLIC_APP_VERSION}
          </Typography>
        </Box>
      </Stack>
    </Sidebar>
  );
};

export default SidebarComponent;
