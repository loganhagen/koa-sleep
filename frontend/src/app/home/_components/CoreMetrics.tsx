"use client";

import React from "react";
import { Stack, Typography, Box, BoxProps, Paper } from "@mui/material";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SunnyIcon from "@mui/icons-material/Sunny";
import InsightsIcon from "@mui/icons-material/Insights";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { useSleepLogByDate, useSleepLogs } from "@/hooks/useSleepLogs";
import { format } from "date-fns";
import { CoreMetricsSkeleton } from "./_skeletons/CoreMetricsSkeleton";

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
  currentDate: Date;
}

const CoreMetrics: React.FC<CoreMetricsProps> = ({ currentDate }) => {
  const { data: sleepLogs, isLoading: isSleepLogsLoading } = useSleepLogs(
    "12c63558-f813-49f3-b69b-d270be9eed31"
  );

  const formattedDate = format(currentDate, "yyyy-MM-dd");

  /**
   * TO-DO:
   * The API is queried for a sleep log using the date pointed at by the date selector.
   * What if the most recent sleep log is much ealier than that?
   * Add some logic such that the most recent sleep log is retrieved and the date selector is adjusted.
   */

  const {
    data: sleepLog,
    isLoading: isSleepLogLoading,
    isError,
  } = useSleepLogByDate(
    "12c63558-f813-49f3-b69b-d270be9eed31",
    "formattedDate"
  );

  if (isSleepLogLoading) {
    return <CoreMetricsSkeleton />;
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
                11:30 PM
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
                11 hrs
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
                {sleepLog?.efficiency ?? "n/a"}
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
