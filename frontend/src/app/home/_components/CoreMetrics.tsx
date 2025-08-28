"use client";

import React, { useEffect, useState } from "react";
import { Stack, Typography, Box, BoxProps, Paper } from "@mui/material";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SunnyIcon from "@mui/icons-material/Sunny";
import { useUser } from "@/app/providers/userProvider";
import { fetchRecentSleepLog } from "@/services/apiClient";
import { parseSleepLog } from "@/utils/sleep";
import { MostRecentSleep } from "@custom_types/ui/sleep";
import ScheduleIcon from "@mui/icons-material/Schedule";

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

const CoreMetrics = () => {
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
        <Typography textAlign={"center"}>January 1, 2006</Typography>

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
                borderRadius: "50%",
                background: "linear-gradient(145deg, #2CDFFF, #00A2E8)",
                color: "secondary.contrastText",
                boxShadow: "0px 4px 20px rgba(0, 162, 232, 0.25)",
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ position: "relative", top: "2px" }}
              >
                88
              </Typography>
            </Box>
            <Typography variant="subtitle1">Efficiency</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CoreMetrics;
