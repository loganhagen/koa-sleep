"use client";

import React from "react";
import { Stack, Typography, Box, BoxProps, Paper } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";

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

const WellnessIndicators = () => {
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
            Wellness Indicators
          </Typography>
        </Stack>
        <Typography textAlign={"center"}>January 1, 2006</Typography>

        {/* Wellness Indicators */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 5 }}
          paddingTop={3}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {/* Skin Temperature */}
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
                98.6°F
              </Typography>
            </Box>
            <Stack direction={"row"} spacing={1} alignItems="center">
              <Typography variant="subtitle1">Skin Temp</Typography>
              <ThermostatIcon fontSize="small" color="primary" />
            </Stack>
          </Stack>

          {/* Breathing Rate */}
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
                16 bpm
              </Typography>
            </Box>
            <Stack direction={"row"} spacing={1} alignItems="center">
              <Typography variant="subtitle1">Breathing</Typography>
              <AirIcon fontSize="small" sx={{ color: "#64b5f6" }} />
            </Stack>
          </Stack>

          {/* Heart Rate Variability */}
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
                60 ms
              </Typography>
            </Box>
            <Stack direction={"row"} spacing={1} alignItems="center">
              <Typography variant="subtitle1">HRV</Typography>
              <MonitorHeartIcon fontSize="small" color="warning" />
            </Stack>
          </Stack>

          {/* SpO2 */}
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
                98%
              </Typography>
            </Box>
            <Stack direction={"row"} spacing={1} alignItems="center">
              <Typography variant="subtitle1">SpO2</Typography>
              <BloodtypeIcon fontSize="small" sx={{ color: "#e57373" }} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default WellnessIndicators;