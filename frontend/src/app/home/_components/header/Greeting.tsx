"use client";

import { Stack, Typography } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { useUser } from "@/app/providers/userProvider";

const Greeting = () => {
  const userCtx = useUser();

  return (
    <Stack direction={"column"} alignItems="center" sx={{ pl: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ color: "text.primary" }}
      >
        Good morning,
      </Typography>
      <Stack direction={"row"} spacing={1} alignItems="center">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          {userCtx.user?.data.firstName ?? "...."}
        </Typography>
        <WavingHandIcon
          color="primary"
          sx={{ fontSize: 35, color: "info.main" }}
        />
      </Stack>
    </Stack>
  );
};

export default Greeting;
