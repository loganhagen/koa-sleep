"use client";

import { Paper, Stack, Typography } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { useUser } from "@/app/providers/userProvider";

const Greeting = () => {
  const { user } = useUser();

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
            {user?.firstName}
          </Typography>
          <WavingHandIcon sx={{ fontSize: 30, color: "info.main" }} />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Greeting;
