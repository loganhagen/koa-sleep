"use client";

import React from "react";
import { Stack } from "@mui/material";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SunnyIcon from "@mui/icons-material/Sunny";
import InsightsIcon from "@mui/icons-material/Insights";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { CoreMetricsSkeleton } from "../_skeletons/CoreMetricsSkeleton";
import { useUser } from "@/app/providers/userProvider";
import { useCoreMetrics } from "@/hooks/useCoreMetrics";
import { MetricDisplay } from "./MetricsDisplay";
import DashboardCard from "../DashboardCard";

interface CoreMetricsProps {
  targetDate: Date;
}

const CoreMetrics: React.FC<CoreMetricsProps> = ({ targetDate }) => {
  const { user } = useUser();
  const { metrics, isLoading, error } = useCoreMetrics(user?.id, targetDate);

  const allMetricsPresent =
    metrics &&
    metrics.bedtime &&
    metrics.wakeup &&
    metrics.totalSleep &&
    metrics.efficiency;

  const metricsData =
    metrics && allMetricsPresent
      ? [
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
        ]
      : [];

  return (
    <DashboardCard
      title="Core Metrics"
      isLoading={isLoading}
      error={error}
      skeleton={<CoreMetricsSkeleton />}
      isEmpty={!isLoading && !error && metricsData.length === 0}
    >
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
    </DashboardCard>
  );
};

export default CoreMetrics;
