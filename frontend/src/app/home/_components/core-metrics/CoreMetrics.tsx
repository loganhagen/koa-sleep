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

const emptyMetrics = [
  {
    label: "Bedtime",
    value: "--",
    icon: <BedtimeIcon fontSize="small" color="disabled" />,
  },
  {
    label: "Wake-Up",
    value: "--",
    icon: <SunnyIcon fontSize="small" color="disabled" />,
  },
  {
    label: "Total Sleep",
    value: "--",
    icon: <ScheduleIcon fontSize="small" color="disabled" />,
  },
  {
    label: "Efficiency",
    value: "--",
    icon: <InsightsIcon fontSize="small" color="disabled" />,
  },
];

const CoreMetrics: React.FC<CoreMetricsProps> = ({ targetDate }) => {
  const { user } = useUser();
  const { data, isLoading, error, isPlaceholderData } = useCoreMetrics(
    user?.id,
    targetDate
  );

  const allMetricsPresent =
    data && data.startTime && data.endTime && data.duration && data.efficiency;

  const metricsData =
    !error && allMetricsPresent && !isPlaceholderData
      ? [
          {
            label: "Bedtime",
            value: data.startTime,
            icon: <BedtimeIcon fontSize="small" color="primary" />,
          },
          {
            label: "Wake-Up",
            value: data.endTime,
            icon: <SunnyIcon fontSize="small" sx={{ color: "warning.main" }} />,
          },
          {
            label: "Total Sleep",
            value: data.duration,
            icon: <ScheduleIcon fontSize="small" color="primary" />,
          },
          {
            label: "Efficiency",
            value: data.efficiency,
            icon: <InsightsIcon fontSize="small" color="primary" />,
          },
        ]
      : emptyMetrics;

  return (
    <DashboardCard
      title="Core Metrics"
      isLoading={isLoading}
      skeleton={<CoreMetricsSkeleton />}
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
            value={metric.value.toString()}
            icon={metric.icon}
          />
        ))}
      </Stack>
    </DashboardCard>
  );
};

export default CoreMetrics;
