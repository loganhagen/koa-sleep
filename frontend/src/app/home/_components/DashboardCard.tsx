"use client";

import React from "react";
import { Paper, Typography, Stack } from "@mui/material";
import NoDataDisplay from "./NoDataDisplay";
import { NotFoundError } from "@/lib/errors";

interface DashboardCardProps {
  title: string;
  user: any;
  isLoading: boolean;
  error: unknown;
  children: React.ReactNode;
  skeleton: React.ReactNode;
  noDataMessage?: string;
  isEmpty?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  user,
  isLoading,
  error,
  children,
  skeleton,
  isEmpty,
  noDataMessage = "No data available for the selected date.",
}) => {
  if (!user) {
    return <Typography>Please log in.</Typography>;
  }

  if (isLoading) {
    return <>{skeleton}</>;
  }

  if (error) {
    if (error instanceof NotFoundError) {
      return <NoDataDisplay title={title} message={noDataMessage} />;
    }
    return <NoDataDisplay title={title} message="Unable to retrieve data." />;
  }

  if (isEmpty) {
    return <NoDataDisplay title={title} message={noDataMessage} />;
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
