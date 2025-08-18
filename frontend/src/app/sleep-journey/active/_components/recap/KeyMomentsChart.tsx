"use client";

import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography } from "@mui/material";

const KeyMomentsChart = () => {
  const data = {
    best: { day: "Wednesday", deviation: -5 },
    worst: { day: "Saturday", deviation: 30 },
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h6"
        component="h3"
        sx={{ mb: 2 }}
        textAlign={"center"}
      >
        Key Moments
      </Typography>
      <BarChart
        series={[
          {
            data: [data.best.deviation, data.worst.deviation],
            label: "Deviation (mins)",
          },
        ]}
        height={250}
        xAxis={[
          {
            data: [`Best: ${data.best.day}`, `Worst: ${data.worst.day}`],
            scaleType: "band",
          },
        ]}
        colors={["#4db6ac", "#ffa726"]}
      />
    </Box>
  );
};

export default KeyMomentsChart;
