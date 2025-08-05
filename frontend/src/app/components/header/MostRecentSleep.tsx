"use client";

import { Stack, Typography, Box, BoxProps } from "@mui/material";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SunnyIcon from "@mui/icons-material/Sunny";
import React from "react";

const MostRecentSleep = () => {
  const sleepData = [
    {
      title: "Schedule",
      content: (
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
      ),
      sx: {
        borderRadius: 4,
        bgcolor: "background.paper",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
      },
    },
    {
      title: "Total Sleep",
      content: (
        <Typography variant="h5" fontWeight="bold">
          8h 30m
        </Typography>
      ),
      sx: {
        borderRadius: 4,
        bgcolor: "background.paper",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
      },
    },
    {
      title: "Efficiency",
      content: (
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ position: "relative", top: "2px" }}
        >
          77
        </Typography>
      ),
      sx: {
        borderRadius: "50%",
        background: "linear-gradient(145deg, #2CDFFF, #00A2E8)",
        color: "secondary.contrastText",
        boxShadow: "0px 4px 15px rgba(0, 162, 232, 0.25)",
      },
    },
  ];

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

  return (
    <Stack spacing={2} alignItems="center">
      <Typography>January 1, 2006</Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={5}
      >
        {sleepData.map((item) => (
          <Stack key={item.title} alignItems="center" spacing={1}>
            <Box sx={{ ...baseItemStyle, ...item.sx }}>{item.content}</Box>
            <Typography variant="subtitle1">{item.title}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default MostRecentSleep;
