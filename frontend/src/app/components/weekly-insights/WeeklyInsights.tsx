"use client";

import React from "react";
import { Divider, Typography, Stack, IconButton, Paper } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import SleepConsistency from "./SleepConsistency";
import SleepScheduleChart from "./SleepScheduleChart";

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
      <Typography variant="h4" sx={{ pb: 5 }}>
        Sleep Consistency
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <IconButton aria-label="previous week">
          <ArrowBackIos />
        </IconButton>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: "bold",
            minWidth: "220px",
            textAlign: "center",
          }}
        >
          Jul 28 - Aug 3
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
        <SleepScheduleChart />
      </Stack>
    </Paper>
  );
};

export default WeeklyInsights;
