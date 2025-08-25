"use client";

import React, { useEffect, useState } from "react";
import { Stack, Typography, Box, BoxProps } from "@mui/material";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SunnyIcon from "@mui/icons-material/Sunny";
import { useDemo } from "@/app/providers/demoProvider";
import { fetchAPI } from "@/services/apiClient";
import { DemoUser } from "@custom_types/backend/users";

const YourLastSleep = () => {
  const [efficiency, setEfficiency] = useState("50");
  const demoCtx = useDemo();

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

  const getUserId = async () => {
    if (demoCtx.isDemoMode) {
      const response = await fetchAPI<DemoUser>("/users/demo");
      return response.data.id;
    } else {
      return "user";
    }
  };

  const fetchSleepLog = async () => {
    const userId = await getUserId();
    if (!userId) return;

    const url = new URL("http://localhost:5000/sleep/recent");
    url.searchParams.append("userId", userId);

    try {
      const res = await fetch(url.toString());
      const json = await res.json();
      setEfficiency(json["data"]["efficiency"]);
    } catch (error) {
      console.error("Failed to fetch sleep log:", error);
    }
  };

  useEffect(() => {
    fetchSleepLog();
  }, []);

  return (
    <Stack spacing={2} alignItems="center">
      <Stack direction={"row"} spacing={1} justifyContent={"center"}>
        <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
          Your Last Sleep
        </Typography>
        <BedtimeIcon sx={{ fontSize: 35, color: "info.main" }} />
      </Stack>

      <Stack spacing={2} alignItems="center">
        <Typography>January 1, 2006</Typography>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="flex-start"
          spacing={5}
        >
          <Stack alignItems="center" spacing={1}>
            <Box
              sx={{
                ...baseItemStyle,
                borderRadius: 4,
                bgcolor: "background.paper",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    9:30 PM
                  </Typography>
                  <BedtimeIcon fontSize="small" color="primary" />
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    5:30 AM
                  </Typography>
                  <SunnyIcon fontSize="small" sx={{ color: "#ffca28" }} />
                </Stack>
              </Stack>
            </Box>
            <Typography variant="subtitle1">Schedule</Typography>
          </Stack>
          <Stack alignItems="center" spacing={1}>
            <Box
              sx={{
                ...baseItemStyle,
                borderRadius: 4,
                bgcolor: "background.paper",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                8h 30m
              </Typography>
            </Box>
            <Typography variant="subtitle1">Total Sleep</Typography>
          </Stack>
          <Stack alignItems="center" spacing={1}>
            <Box
              sx={{
                ...baseItemStyle,
                borderRadius: "50%",
                background: "linear-gradient(145deg, #2CDFFF, #00A2E8)",
                color: "secondary.contrastText",
                boxShadow: "0px 4px 15px rgba(0, 162, 232, 0.25)",
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ position: "relative", top: "2px" }}
              >
                {efficiency}
              </Typography>
            </Box>
            <Typography variant="subtitle1">Efficiency</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default YourLastSleep;
