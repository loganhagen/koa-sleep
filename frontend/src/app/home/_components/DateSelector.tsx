"use client";

import React from "react";
import {
  Stack,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TodayIcon from "@mui/icons-material/Today";

interface DateSelectorProps {
  targetDate: Date;
  handleDateChange: (days: number) => void;
  handleResetToToday: () => void;
  mostRecentLogDate?: Date | null;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  targetDate,
  handleDateChange,
  handleResetToToday,
  mostRecentLogDate,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isNextDayDisabled = () => {
    const checkDate = new Date(targetDate);
    checkDate.setUTCHours(0, 0, 0, 0);

    if (mostRecentLogDate) {
      const recentDate = new Date(mostRecentLogDate);
      recentDate.setUTCHours(0, 0, 0, 0);
      return checkDate >= recentDate;
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return checkDate >= today;
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: "100%" }}
    >
      <IconButton
        onClick={() => handleDateChange(-1)}
        aria-label="previous day"
      >
        <ArrowBackIosNewIcon fontSize={isMobile ? "small" : "medium"} />
      </IconButton>

      <Typography
        variant={isMobile ? "body1" : "h6"}
        fontWeight="bold"
        sx={{ textAlign: "center" }}
      >
        {targetDate.toUTCString().substring(0, 16)}
      </Typography>

      <Stack direction="row">
        <IconButton onClick={handleResetToToday} aria-label="today">
          <TodayIcon />
        </IconButton>
        <IconButton
          onClick={() => handleDateChange(1)}
          aria-label="next day"
          disabled={isNextDayDisabled()}
        >
          <ArrowForwardIosIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default DateSelector;
