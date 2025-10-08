"use client";

import React from "react";
import {
  Divider,
  Typography,
  Stack,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import SleepConsistency from "./SleepConsistency";
import SleepScheduleChart from "@/app/sleep-journey/active/_components/progress/SleepScheduleChart";

const WeeklyInsights: React.FC = () => {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 10,
        backgroundColor: "background.paper",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" sx={{ pb: 2 }}>
        Sleep Consistency
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ pb: 3 }}>
        Maintaining a regular sleep pattern is key to improving your sleep
        quality. This section analyzes how consistent your sleep schedule has
        been over the past week.
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <IconButton aria-label="previous week">
          <ArrowBackIos />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            minWidth: "220px",
            textAlign: "center",
            mx: -2,
          }}
        >
          Aug 24 - Aug 31
        </Typography>
        <IconButton aria-label="next week">
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack
        alignItems="center"
        spacing={2}
        direction={"column"}
        sx={{ mt: 2 }}
      >
        <SleepConsistency />
        <Box sx={{ display: { xs: "none", md: "block" }, width: "100%" }}>
          <SleepScheduleChart />
        </Box>
      </Stack>
    </Paper>
  );
};

export default WeeklyInsights;
