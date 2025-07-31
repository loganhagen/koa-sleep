"use client";

import React, { useState } from "react";
import { Divider, Typography, Stack, IconButton, Paper } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import SleepConsistency from "./SleepConsistency";
import SleepScheduleChart from "./SleepScheduleChart";

const WeeklyInsights: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekRange = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  };

  const [weekRange, setWeekRange] = useState(getWeekRange(currentDate));

  const handlePreviousWeek = () => {
    const newDate = new Date(weekRange.start);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
    setWeekRange(getWeekRange(newDate));
  };

  const handleNextWeek = () => {
    const newDate = new Date(weekRange.start);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
    setWeekRange(getWeekRange(newDate));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <IconButton onClick={handlePreviousWeek} aria-label="previous week">
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
          {`${formatDate(weekRange.start)} - ${formatDate(weekRange.end)}`}
        </Typography>
        <IconButton onClick={handleNextWeek} aria-label="next week">
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
