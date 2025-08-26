"use client";

import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Box,
  BoxProps,
  Divider,
  Paper,
} from "@mui/material";
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
        <Stack direction={"row"} spacing={1} justifyContent={"center"}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Your Last Sleep
          </Typography>
          <BedtimeIcon sx={{ fontSize: 30, color: "info.main" }} />
        </Stack>
        <Typography textAlign={"center"}>January 1, 2006</Typography>

        {/* Last Sleep Data Wedges */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 5 }}
          paddingTop={3}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {/*Sleep Schedule */}
          <Stack direction={"column"} alignItems="center" spacing={1}>
            <Box
              sx={{
                ...baseItemStyle,
                borderRadius: 4,
                bgcolor: "background.default",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                border: "1px solid",
                borderColor: "divider",
                paddingX: 10,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                <BedtimeIcon fontSize="small" color="primary" />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  11:30 PM
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
                  variant="h6"
                  fontWeight="bold"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  10:30 AM
                </Typography>
              </Stack>
            </Box>
            <Typography variant="subtitle1">Schedule</Typography>
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
              <Typography variant="h5" fontWeight="bold">
                9 hrs
              </Typography>
            </Box>
            <Typography variant="subtitle1">Total Sleep</Typography>
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
                variant="h6"
                fontWeight="bold"
                sx={{ position: "relative", top: "2px" }}
              >
                Great!
              </Typography>
            </Box>
            <Typography variant="subtitle1">Efficiency</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default YourLastSleep;
