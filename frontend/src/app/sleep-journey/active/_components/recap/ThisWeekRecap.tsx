"use client";

import React from "react";
import { Paper, Typography, Stack, Divider } from "@mui/material";
import KeyMomentsChart from "./KeyMomentsChart";
import KeyInsights from "../key-insights/KeyInsights";

const JourneyRecap = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: 700,
        p: { xs: 2, sm: 3 },
      }}
    >
      <Stack spacing={3} divider={<Divider />}>
        <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
          This Week&apos;s Recap
        </Typography>
        <KeyMomentsChart />
        <KeyInsights />
      </Stack>
    </Paper>
  );
};

export default JourneyRecap;
