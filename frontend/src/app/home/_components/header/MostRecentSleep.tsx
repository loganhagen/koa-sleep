"use client";

import { Stack, Typography, Box, BoxProps } from "@mui/material";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SunnyIcon from "@mui/icons-material/Sunny";
import React, { useEffect, useState } from "react";
import { useDemo } from "@/app/providers/demoProvider";
import { fetchAPI } from "@/services/apiClient";
import { DemoUser } from "@custom_types/backend/users";

const MostRecentSleep = () => {
  const [efficiency, setEfficiency] = useState("50");
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

  const demoCtx = useDemo();

  // TO-DO: Move this to a service file.
  const getUserId = async () => {
    if (demoCtx.isDemoMode) {
      const response = await fetchAPI<DemoUser>("/users/demo");
      const userId = response.data.id;
      return userId;
    } else {
      return "user";
    }
  };

  // Create a state object for the state variables.
  const fetchSleepLog = async () => {
    const userId = await getUserId();
    if (!userId) {
      return null;
    }
    const baseUrl = "http://localhost:5000/sleep/recent";
    const url = new URL(baseUrl);
    url.searchParams.append("userId", userId);
    const x = url.toString();
    console.log(x);

    const res = await fetch(url.toString());
    const json = await res.json();
    setEfficiency(json["data"]["efficiency"]);
  };

  useEffect(() => {
    fetchSleepLog();
  }, []);

  return (
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
  );
};

export default MostRecentSleep;
