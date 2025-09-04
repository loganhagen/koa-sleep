"use client";

import * as React from "react";
import { Stack, Typography, Box, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { PieChart } from "@mui/x-charts/PieChart";
import { useUser } from "@/app/providers/userProvider";
import { useSleepStages } from "@/hooks/useSleepStages";
import SleepStagesSkeleton from "../_skeletons/SleepStagesSkeleton";
import DashboardCard from "../DashboardCard";
import { SleepStages as SleepStagesData } from "@/types/api/sleep";

interface SleepStagesProps {
  targetDate: Date;
}

const sleepStageConfig: Record<
  keyof SleepStagesData,
  { label: string; color: string }
> = {
  awake: { label: "Awake", color: "#ffc107" },
  rem: { label: "REM", color: "#f44336" },
  light: { label: "Light", color: "#03a9f4" },
  deep: { label: "Deep", color: "#4caf50" },
};

const SleepStages: React.FC<SleepStagesProps> = ({ targetDate }) => {
  const { user } = useUser();
  const { data, isLoading, error, isPlaceholderData } = useSleepStages(
    user?.id,
    targetDate
  );

  const useRealData = !error && !isPlaceholderData && data;

  const pieChartData = useRealData
    ? Object.entries(data)
        .map(([stage, value], id) => {
          const stageName = stage.replace("Mins", "") as keyof SleepStagesData;
          return {
            id,
            value,
            label: sleepStageConfig[stageName]?.label || "Unknown",
            color: sleepStageConfig[stageName]?.color || "#808080",
          };
        })
        .sort((a, b) => a.id - b.id)
    : Object.entries(sleepStageConfig).map(([stage, config], id) => ({
        id,
        value: 1,
        label: config.label,
        color: grey[300],
      }));

  const totalDuration = useRealData
    ? pieChartData.reduce((acc, stage) => acc + stage.value, 0)
    : 0;

  const finalPieChartData = pieChartData.map((stage) => ({
    ...stage,
    displayValue:
      useRealData && totalDuration > 0
        ? `${stage.value.toFixed(0)} mins (${(
            (stage.value / totalDuration) *
            100
          ).toFixed(0)}%)`
        : "-- mins (0%)",
  }));

  return (
    <DashboardCard
      title="Sleep Stages"
      isLoading={isLoading}
      skeleton={<SleepStagesSkeleton />}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="center"
        spacing={4}
        paddingTop={3}
      >
        <Box sx={{ width: 250, height: 250 }}>
          <PieChart
            series={[
              {
                data: finalPieChartData,
                innerRadius: 60,
                paddingAngle: 2,
                cornerRadius: 5,
                valueFormatter: (item) => `${item.value} mins`,
              },
            ]}
            slots={{
              legend: () => null,
            }}
          />
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            display: { xs: "none", sm: "block" },
            height: 150,
            alignSelf: "center",
          }}
        />
        <Stack direction={"column"} spacing={2}>
          {finalPieChartData.map((stage) => (
            <Stack
              key={stage.id}
              direction="row"
              alignItems="center"
              spacing={1.5}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: stage.color,
                }}
              />
              <Typography variant="body1" sx={{ minWidth: 50 }}>
                {stage.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stage.displayValue}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 3, textAlign: "center" }}
      >
        A healthy sleep cycle includes adequate amounts of Light, Deep, and REM
        sleep.
      </Typography>
    </DashboardCard>
  );
};

export default SleepStages;
