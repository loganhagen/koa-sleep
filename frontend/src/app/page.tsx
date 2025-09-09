"use client";

import { Box, Stack, Typography, Button, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import GoogleButton from "react-google-button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import { useDemoLogin } from "@/hooks/useAuth";

const Splash = () => {
  const theme = useTheme();
  const currentMode = theme.palette.mode;
  const router = useRouter();
  const { mutate: loginAsDemo } = useDemoLogin();

  const handleSeeDemo = async () => {
    loginAsDemo();
    router.push("/home");
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        textAlign: "center",
      }}
    >
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={2}
        sx={{ maxWidth: "700px" }}
      >
        <Image
          src="/logo-3-no-bg.png"
          alt="FitSync Logo"
          width={200}
          height={200}
          style={{ maxWidth: "80vw", height: "auto" }}
        />
        <Typography variant="h3" fontWeight="bold" color="text.primary">
          Welcome to Koa Sleep
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Unlock the science of your sleep.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ pt: 2 }}>
          Koa Sleep transforms your Fitbit data into a personalized coaching
          experience. Instead of just showing you data, we guide you through a
          Sleep Journey — a tailored program designed to help you build
          healthier habits and achieve your sleep goals, one night at a time.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ pt: 3 }}
        >
          <Tooltip title="Coming Soon!" arrow>
            <Box component="span" sx={{ display: "inline-block" }}>
              <GoogleButton
                type={currentMode}
                style={{
                  opacity: 0.5,
                  pointerEvents: "none",
                }}
              />
            </Box>
          </Tooltip>
          <Button
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={handleSeeDemo}
          >
            See a Demo
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Splash;
