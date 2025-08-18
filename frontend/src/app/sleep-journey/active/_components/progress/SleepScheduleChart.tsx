"use client";

import React from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import { Box, Typography } from "@mui/material";
import { formatHour } from "@/utils/utils";

const SleepScheduleChart: React.FC = () => {
  const bedtimeData = [22, 22.5, 23, 22.75, 23.5, 22.25, 23];
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const goalBedtime = 22.5;

  const generateTargetBedtimeData = (
    actualBedtimes: number[],
    goal: number
  ): number[] => {
    const targetBedtimes: number[] = [];
    const step = 0.25;

    if (actualBedtimes.length === 0) {
      return [];
    }

    targetBedtimes.push(
      actualBedtimes[0] > goal ? actualBedtimes[0] - step : goal
    );

    for (let i = 1; i < actualBedtimes.length; i++) {
      const previousBedtime = actualBedtimes[i - 1];
      if (previousBedtime > goal) {
        const newTarget = previousBedtime - step;
        targetBedtimes.push(Math.max(newTarget, goal));
      } else {
        targetBedtimes.push(goal);
      }
    }
    return targetBedtimes;
  };

  const targetBedtimeData = generateTargetBedtimeData(bedtimeData, goalBedtime);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h6"
        component="h3"
        sx={{ mb: 2 }}
        textAlign={"center"}
      >
        Bedtimes
      </Typography>
      <Box
        sx={{
          borderRadius: 4,
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.08)"
              : "grey.100",
          padding: 2,
        }}
      >
        <LineChart
          xAxis={[{ scaleType: "point", data: weekDays }]}
          yAxis={[{ valueFormatter: (value: number) => formatHour(value) }]}
          series={[
            {
              data: bedtimeData,
              label: "Actual Bedtime",
            },
            {
              data: targetBedtimeData,
              label: "Target Bedtime",
              id: "targetBedtime",
            },
          ]}
          height={300}
          sx={{
            [`.${lineElementClasses.root}[data-series="targetBedtime"]`]: {
              strokeDasharray: "5 5",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SleepScheduleChart;
