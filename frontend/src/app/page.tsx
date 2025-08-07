"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import GoogleButton from "react-google-button"; // Import the button

const Splash = () => {
  const theme = useTheme();
  const currentMode = theme.palette.mode;

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={3}
        sx={{ textAlign: "center" }}
      >
        <Image
          src="/logo-3-no-bg.png"
          alt="FitSync Logo"
          width={200}
          height={200}
          style={{ maxWidth: "80vw", height: "auto" }}
        />
        <Typography variant="h3" fontWeight="bold" color="text.primary">
          FitSync Sleep Lab
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Unlock the science of your sleep.
        </Typography>
        <Box pt={2}>
          <GoogleButton type={currentMode} onClick={() => {}} />
        </Box>
      </Stack>
    </Box>
  );
};

export default Splash;
