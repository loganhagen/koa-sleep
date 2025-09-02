"use client";

import React from "react";
import { Paper, Typography, Stack } from "@mui/material";

interface DashboardCardProps {
  title: string;
  isLoading: boolean;
  children: React.ReactNode;
  skeleton: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  isLoading,
  children,
  skeleton,
}) => {
  if (isLoading) {
    return <>{skeleton}</>;
  }

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{ p: 4, borderRadius: 10, width: "100%" }}
    >
      <Stack direction={"column"} spacing={1}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {title}
        </Typography>
        {children}
      </Stack>
    </Paper>
  );
};

export default DashboardCard;
