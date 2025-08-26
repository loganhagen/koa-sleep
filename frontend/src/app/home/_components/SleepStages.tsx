import * as React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsAxisHighlight } from "@mui/x-charts/ChartsAxisHighlight";

const SleepStages = () => {
  const sleepData = [
    { time: 0, stage: 0 },
    { time: 0.25, stage: 1 },
    { time: 0.75, stage: 2 },
    { time: 1.5, stage: 1 },
    { time: 2.0, stage: 3 },
    { time: 2.25, stage: 1 },
    { time: 2.75, stage: 2 },
    { time: 3.5, stage: 1 },
    { time: 4.0, stage: 3 },
    { time: 4.25, stage: 1 },
    { time: 4.5, stage: 0 },
    { time: 4.58, stage: 1 },
    { time: 5.5, stage: 3 },
    { time: 6.0, stage: 1 },
    { time: 7.0, stage: 3 },
    { time: 7.75, stage: 1 },
    { time: 8.0, stage: 0 },
  ];

  const xAxisData = sleepData.map((d) => d.time);
  const seriesData = sleepData.map((d) => d.stage);

  const sleepStageValueFormatter = (value: number) => {
    switch (value) {
      case 0:
        return "Awake";
      case 1:
        return "Light";
      case 2:
        return "Deep";
      case 3:
        return "REM";
      default:
        return "";
    }
  };

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
      <Stack direction={"column"}>
        <Stack
          direction={"row"}
          spacing={1}
          justifyContent={"center"}
          paddingBottom={1}
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Sleep Stages
          </Typography>
          <ShowChartIcon sx={{ fontSize: 30, color: "info.main" }} />
        </Stack>
        <Typography textAlign={"center"} paddingBottom={3}>
          January 1, 2006
        </Typography>

        <ChartContainer
          xAxis={[
            {
              data: xAxisData,
              scaleType: "linear",
              label: "Time",
              valueFormatter: (value) =>
                new Date(
                  new Date().setHours(23, 0, 0, 0) + value * 3600 * 1000
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
            },
          ]}
          yAxis={[
            {
              id: "sleepStages",
              min: 0,
              max: 3,
              scaleType: "linear",
              valueFormatter: sleepStageValueFormatter,
            },
          ]}
          series={[
            {
              type: "line",
              curve: "stepAfter",
              data: seriesData,
              label: "Sleep Stage",
              area: true,
              showMark: false,
            },
          ]}
          height={300}
        >
          <LinePlot />
          <ChartsXAxis />
          <ChartsYAxis />
        </ChartContainer>
      </Stack>
    </Paper>
  );
};

export default SleepStages;
