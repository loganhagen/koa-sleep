"use client";

import React, { useEffect, useState } from "react";
import { Stack, Typography, Box, BoxProps } from "@mui/material";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SunnyIcon from "@mui/icons-material/Sunny";
import { useUser } from "@/app/providers/userProvider";
import { fetchRecentSleepLog } from "@/services/apiClient";
import { parseSleepLog } from "@/utils/sleep";
import { MostRecentSleep } from "@custom_types/ui/sleep";

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

const YourLastSleep = () => {
  const userCtx = useUser();
  const [mostRecentSleep, setMostRecentSleep] = useState<MostRecentSleep>();

  useEffect(() => {
    const fetchMostRecentSleepData = async () => {
      if (userCtx.user) {
        const res = await fetchRecentSleepLog(userCtx.user.data.id);
        if (res) {
          const parsedLog = parseSleepLog(res);
          setMostRecentSleep(parsedLog);
        }
      }
    };
    fetchMostRecentSleepData();
  }, [userCtx.user]);

  return (
    <Stack spacing={2} alignItems="center">
      <Stack direction={"row"} spacing={1} justifyContent={"center"}>
        <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
          Your Last Sleep
        </Typography>
        <BedtimeIcon sx={{ fontSize: 35, color: "info.main" }} />
      </Stack>

      <Stack spacing={2} alignItems="center">
        <Typography>{mostRecentSleep?.date}</Typography>
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
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <BedtimeIcon fontSize="small" color="primary" />
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    {mostRecentSleep?.bedtime}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <SunnyIcon fontSize="small" sx={{ color: "#ffca28" }} />
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    {mostRecentSleep?.wakeUp}
                  </Typography>
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
                {mostRecentSleep?.totalSleep}
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
                {mostRecentSleep?.efficiency}
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
