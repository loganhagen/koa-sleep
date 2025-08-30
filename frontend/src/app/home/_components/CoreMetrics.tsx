"use client";

import React from "react";
import { Stack, Typography, Box, BoxProps, Paper } from "@mui/material";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SunnyIcon from "@mui/icons-material/Sunny";
import InsightsIcon from "@mui/icons-material/Insights";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { useSleepLogByDate } from "@/hooks/useSleepLogs";
import { CoreMetricsSkeleton } from "./_skeletons/CoreMetricsSkeleton";
import { useUser } from "@/app/providers/userProvider";
import { formatTimeTo12Hour, millisecondsToHours } from "@/utils/utils";

const baseItemStyle: BoxProps["sx"] = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: 120,
  width: 120,
  textAlign: "center",
  transition: "transform 0.3s ease-in-out",
  ":hover": {
    transform: "scale(1.05)",
  },
};

interface CoreMetricsProps {
  targetDate: string;
}

const CoreMetrics: React.FC<CoreMetricsProps> = ({ targetDate }) => {
  const { user } = useUser();

  if (!user) {
    return (
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 4,
          borderRadius: 10,
          backgroundColor: "background.paper",
          width: "100%",
        }}
      >
        <Typography>Please log in.</Typography>
      </Paper>
    );
  }

  const { data: sleepLog, isLoading: isSleepLogLoading } = useSleepLogByDate(
    user.id,
    targetDate
  );

  if (isSleepLogLoading) {
    return <CoreMetricsSkeleton />;
  }

  if (!sleepLog) {
    return (
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 4,
          borderRadius: 10,
          backgroundColor: "background.paper",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Stack direction={"column"} spacing={1}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Core Metrics
            </Typography>
          </Stack>
          <Typography>No data found.</Typography>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 10,
        backgroundColor: "background.paper",
        width: "100%",
      }}
    >
      <Stack direction={"column"} spacing={1}>
        {/* Title */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          justifyContent={"center"}
          alignItems="center"
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Core Metrics
          </Typography>
        </Stack>

        {/* Core Metrics */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 5 }}
          paddingTop={3}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {/* Bedtime */}
          <Stack direction={"column"} alignItems="center" spacing={1}>
            <Box
              sx={{
                ...baseItemStyle,
                borderRadius: 4,
                bgcolor: "background.default",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap" }}
              >
                1
              </Typography>
            </Box>
            <Stack direction={"row"} spacing={1} alignItems="center">
              <Typography variant="subtitle1">Bedtime</Typography>
              <BedtimeIcon fontSize="small" color="primary" />
            </Stack>
          </Stack>

          {/* Wake time */}
          <Stack direction={"column"} alignItems="center" spacing={1}>
            <Box
              sx={{
                ...baseItemStyle,
                borderRadius: 4,
                bgcolor: "background.default",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap" }}
              >
                9:30 AM
              </Typography>
            </Box>
            <Stack direction={"row"} spacing={1} alignItems="center">
              <Typography variant="subtitle1">Wake-Up</Typography>
              <SunnyIcon fontSize="small" sx={{ color: "#ffca28" }} />
            </Stack>
          </Stack>

          {/* Total Sleep */}
          <Stack alignItems="center" spacing={1}>
            <Box
              sx={{
                ...baseItemStyle,
                borderRadius: 4,
                bgcolor: "background.default",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {millisecondsToHours(sleepLog.duration)} h
              </Typography>
            </Box>
            <Stack direction={"row"} spacing={1} alignItems="center">
              <Typography variant="subtitle1">Total Sleep</Typography>
              <ScheduleIcon fontSize="small" color="primary" />
            </Stack>
          </Stack>

          {/* Efficiency */}
          <Stack alignItems="center" spacing={1}>
            <Box
              sx={{
                ...baseItemStyle,
                borderRadius: 4,
                bgcolor: "background.default",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {sleepLog.efficiency}
              </Typography>
            </Box>
            <Stack direction={"row"} spacing={1} alignItems="center">
              <Typography variant="subtitle1">Efficiency</Typography>
              <InsightsIcon fontSize="small" color="primary" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CoreMetrics;
