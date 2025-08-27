"use client";

import * as React from "react";
import { Paper, Stack, Typography, Box, Divider } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { PieChart } from "@mui/x-charts/PieChart";

const SleepStages = () => {
  const sleepStageData = [
    { id: 0, value: 0.8, label: "Awake" },
    { id: 1, value: 4.2, label: "Light" },
    { id: 2, value: 1.5, label: "Deep" },
    { id: 3, value: 1.5, label: "REM" },
  ];

  const totalDuration = sleepStageData.reduce(
    (acc, stage) => acc + stage.value,
    0
  );

  const pieChartData = sleepStageData.map((stage) => ({
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
          paddingBottom={1}
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Sleep Stages
          </Typography>
          <ShowChartIcon sx={{ fontSize: 30, color: "info.main" }} />
        </Stack>
        <Typography textAlign={"center"} paddingBottom={1}>
          January 1, 2006
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ flex: 1, width: "100%" }}>
            <PieChart
              series={[
                {
                  data: pieChartData,
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={200}
            />
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" } }}
          />
          <Stack
            direction={"column"}
            sx={{ flex: 1, width: "100%" }}
            spacing={1}
          >
            {pieChartData.map((stage) => (
              <Stack
                key={stage.id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body1">{stage.label}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {stage.value.toFixed(1)} hrs ({stage.percentage.toFixed(0)}%)
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
