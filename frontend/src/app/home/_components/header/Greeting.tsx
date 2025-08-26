"use client";

import { Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import WavingHandIcon from "@mui/icons-material/WavingHand";

const Greeting = () => {
  const [username, setUsername] = useState("Demo");

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
      }}
    >
      <Stack direction={"column"}>
        <Typography variant="h4" sx={{ color: "text.primary" }}>
          Good morning,
        </Typography>
        <Stack
          direction={"row"}
          spacing={1}
          justifyContent={"center"}
          paddingTop={1}
        >
          <Typography variant="h4" sx={{ color: "text.primary" }}>
            {username}!
          </Typography>
          <WavingHandIcon sx={{ fontSize: 30, color: "info.main" }} />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Greeting;
