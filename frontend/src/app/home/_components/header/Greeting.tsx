"use client";

import { Stack, Typography } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";

interface GreetingProps {
  username: string | undefined;
}

const Greeting: React.FC<GreetingProps> = ({ username }) => {
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
          {username ?? "..."}
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
