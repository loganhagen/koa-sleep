"use client";

import React, { useState } from "react";
import {
  Stack,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TodayIcon from "@mui/icons-material/Today";

const DateSelector = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDateChange = (days: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    });
  };

  const handleResetToToday = () => {
    setCurrentDate(new Date());
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: isMobile ? "short" : "long",
    day: "numeric",
  }).format(currentDate);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ position: "relative", width: "100%" }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={{ xs: 1, sm: 2 }}
      >
        <IconButton
          onClick={() => handleDateChange(-1)}
          aria-label="previous day"
        >
          <ArrowBackIosNewIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
        <Typography variant={isMobile ? "body1" : "h6"} fontWeight="bold">
          {formattedDate}
        </Typography>
        <IconButton onClick={() => handleDateChange(1)} aria-label="next day">
          <ArrowForwardIosIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
      </Stack>
      <IconButton
        onClick={handleResetToToday}
        aria-label="today"
        sx={{ position: "absolute", right: 0 }}
      >
        <TodayIcon />
      </IconButton>
    </Stack>
  );
};

export default DateSelector;
