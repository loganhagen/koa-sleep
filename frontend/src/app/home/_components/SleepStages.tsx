"use client";

import * as React from "react";
import { Paper, Stack, Typography, Box, Divider } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useUser } from "@/app/providers/userProvider";
import { useSleepStages } from "@/hooks/useSleepStages";
import SleepStagesSkeleton from "./_skeletons/SleepStagesSkeleton";
import NoDataDisplay from "./NoDataDisplay";
import { SleepStages as SleepStagesData } from "@/types/api/sleep";

interface SleepStagesProps {
  targetDate: Date;
}

const sleepStageConfig: Record<
  keyof SleepStagesData,
  { label: string; color: string }
> = {
  awake: { label: "Awake", color: "#ffc107" },
  light: { label: "Light", color: "#03a9f4" },
  deep: { label: "Deep", color: "#4caf50" },
  rem: { label: "REM", color: "#f44336" },
};

const SleepStages: React.FC<SleepStagesProps> = ({ targetDate }) => {
  const { user } = useUser();
  const { data, isLoading, error } = useSleepStages(user?.id, targetDate);

  if (isLoading) {
    return <SleepStagesSkeleton />;
  }

  if (error || !data) {
    const message = error?.message || "No data found for the selected date.";
    return <NoDataDisplay title="Sleep Stages" message={message} />;
  }

  const pieChartData = Object.entries(data)
    .map(([stage, value], id) => ({
      id,
      value,
      label:
        sleepStageConfig[stage as keyof SleepStagesData]?.label || "Unknown",
      color:
        sleepStageConfig[stage as keyof SleepStagesData]?.color || "#808080",
    }))
    .sort((a, b) => a.id - b.id);

  const totalDuration = pieChartData.reduce(
    (acc, stage) => acc + stage.value,
    0
  );

  const finalPieChartData = pieChartData.map((stage) => ({
    ...stage,
    percentage: totalDuration > 0 ? (stage.value / totalDuration) * 100 : 0,
  }));

  return (
    <Paper
      elevation={11}
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 10,
        backgroundColor: "background.paper",
      }}
    >
      <Stack direction={"column"} spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          justifyContent={"center"}
          alignItems="center"
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Sleep Stages
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Box
            sx={{ width: { xs: 250, sm: 250 }, height: { xs: 250, sm: 250 } }}
          >
            <PieChart
              series={[
                {
                  data: finalPieChartData,
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                  },
                },
              ]}
            />
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" } }}
          />
          <Stack direction={"column"} spacing={1}>
            {finalPieChartData.map((stage) => (
              <Stack key={stage.id} direction="row" alignItems="center">
                <Typography variant="body1" paddingRight={2}>
                  {stage.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stage.value.toFixed(0)} mins ({stage.percentage.toFixed(0)}%)
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          A healthy sleep cycle includes adequate amounts of Light, Deep, and
          REM sleep.
        </Typography>
      </Stack>
    </Paper>
  );
};

export default SleepStages;
