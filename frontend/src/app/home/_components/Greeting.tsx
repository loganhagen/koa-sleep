"use client";

import { Box, Stack, Typography } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { useUser } from "@/providers/userProvider";
import { GreetingSkeleton } from "./_skeletons/GreetingSkeleton";

const Greeting = () => {
  const { user } = useUser();

  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const message = getGreetingMessage();

  if (!user) {
    return <GreetingSkeleton></GreetingSkeleton>;
  }

  return (
    <Box>
      <Stack direction={"column"} alignItems="center">
        <Typography
          variant="h4"
          sx={{
            color: "text.primary",
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "2.5rem" },
            fontWeight: 700,
          }}
        >
          {message},
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          paddingTop={1}
          alignItems="center"
        >
          <Typography
            variant="h4"
            sx={{
              color: "text.primary",
              fontSize: { xs: "1.5rem", sm: "2.5rem" },
              fontWeight: 700,
            }}
          >
            {user?.first_name}
          </Typography>
          <WavingHandIcon sx={{ fontSize: 30, color: "info.main" }} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Greeting;
