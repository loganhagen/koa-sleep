"use client";

import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { useUser } from "@/hooks/useUser";

const GreetingSkeleton = () => (
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
      <Skeleton variant="text" sx={{ typography: "h4" }} width="200px" />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        paddingTop={1}
        alignItems="center"
      >
        <Skeleton variant="text" sx={{ typography: "h4" }} width="100px" />
        <Skeleton
          variant="circular"
          width={30}
          height={30}
          sx={{ ml: 0.5 }}
        />
      </Stack>
    </Stack>
  </Paper>
);

const Greeting = () => {
  const { data: user, isLoading, isError } = useUser();
  const userName = user ? user.firstName : "user";

  if (isLoading) {
    return <GreetingSkeleton />;
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
          Good morning,
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          paddingTop={1}
          alignItems="center"
        >
          <Typography variant="h4" sx={{ color: "text.primary" }}>
            {userName}
          </Typography>
          <WavingHandIcon sx={{ fontSize: 30, color: "info.main" }} />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Greeting;
