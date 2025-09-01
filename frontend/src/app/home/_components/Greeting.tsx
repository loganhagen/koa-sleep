"use client";

import { Paper, Stack, Typography } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { useUser } from "@/app/providers/userProvider";
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
    <Paper
      elevation={11}
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 10,
        backgroundColor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Stack direction={"column"} alignItems="center">
        <Typography
          variant="h4"
          sx={{
            color: "text.primary",
            textAlign: "center",
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
          <Typography variant="h4" sx={{ color: "text.primary" }}>
            {user?.firstName}
          </Typography>
          <WavingHandIcon sx={{ fontSize: 30, color: "info.main" }} />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Greeting;
