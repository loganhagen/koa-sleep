"use client";

import { Stack, Box, Typography, BoxProps } from "@mui/material";
import React from "react";

interface LastSleepItemProps {
  title: string;
  displayContent: React.ReactNode;
  sx?: BoxProps["sx"];
}

const LastSleepItem = ({
  title,
  displayContent,
  sx = {},
}: LastSleepItemProps) => {
  const displayItemStyle: BoxProps["sx"] = {
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
    ...sx,
  };

  return (
    <Stack alignItems="center" spacing={1}>
      <Box sx={displayItemStyle}>{displayContent}</Box>
      <Typography variant="subtitle1">{title}</Typography>
    </Stack>
  );
};

export default LastSleepItem;
