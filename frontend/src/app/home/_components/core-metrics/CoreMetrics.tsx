"use client";

import React from "react";
import { Stack, Typography, Paper } from "@mui/material";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SunnyIcon from "@mui/icons-material/Sunny";
import InsightsIcon from "@mui/icons-material/Insights";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { CoreMetricsSkeleton } from "../_skeletons/CoreMetricsSkeleton";
import { useUser } from "@/app/providers/userProvider";
import { useCoreMetrics } from "@/hooks/useCoreMetrics";
import { MetricDisplay } from "./MetricsDisplay";
import NoDataDisplay from "../NoDataDisplay";

interface CoreMetricsProps {
  targetDate: Date;
}

const CoreMetrics: React.FC<CoreMetricsProps> = ({ targetDate }) => {
  const { user } = useUser();
  const { metrics, isLoading, error } = useCoreMetrics(user?.id, targetDate);

  if (!user) {
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
        <Typography>Please log in.</Typography>
      </Paper>
    );
  }

  if (isLoading) {
    return <CoreMetricsSkeleton />;
  }

  if (error) {
    return (
      <NoDataDisplay title="Core Metrics" message="Unable to retrieve data." />
    );
  }

  if (!metrics) {
    return <NoDataDisplay title="Core Metrics" message="No data found." />;
  }

  const metricsData = [
    {
      label: "Bedtime",
      value: metrics.bedtime,
      icon: <BedtimeIcon fontSize="small" color="primary" />,
    },
    {
      label: "Wake-Up",
      value: metrics.wakeup,
      icon: <SunnyIcon fontSize="small" sx={{ color: "warning.main" }} />,
    },
    {
      label: "Total Sleep",
      value: metrics.totalSleep,
      icon: <ScheduleIcon fontSize="small" color="primary" />,
    },
    {
      label: "Efficiency",
      value: metrics.efficiency,
      icon: <InsightsIcon fontSize="small" color="primary" />,
    },
  ];

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

        {/* Core Metrics */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 5 }}
          paddingTop={3}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {metricsData.map((metric) => (
            <MetricDisplay
              key={metric.label}
              label={metric.label}
              value={metric.value}
              icon={metric.icon}
            />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CoreMetrics;
