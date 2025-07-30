import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Stack, Typography } from "@mui/material";
import { formatHour } from "@/utils/utils";

const SleepScheduleChart: React.FC = () => {
  const bedtimeData = [22, 22.5, 23, 22.75, 23.5, 22.25, 23];
  const wakeTimeData = [6.5, 7, 6.75, 7.5, 6.25, 7, 6];
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const displayItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    width: { xs: "100%", sm: 400 },
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
    ":hover": {
      transform: "scale(1.05)",
    },
  };

  return (
    <Stack direction="row" alignItems="center" spacing={4}>
      <Stack alignItems="center" spacing={1}>
        <Box
          sx={{
            ...displayItemStyle,
            borderRadius: 4,
            bgcolor: "grey.100",
            color: "grey.800",
          }}
        >
          <Box sx={{ width: "100%", height: "100%", padding: 2 }}>
            <LineChart
              xAxis={[{ scaleType: "point", data: weekDays }]}
              yAxis={[{ valueFormatter: (value: any) => formatHour(value) }]}
              series={[
                {
                  data: bedtimeData,
                  label: "Bedtime",
                },
                {
                  data: wakeTimeData,
                  label: "Wake Time",
                  color: "#00A2E8",
                },
              ]}
              height={200}
            />
          </Box>
        </Box>
        <Typography variant="subtitle1">Sleep Schedule</Typography>
      </Stack>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
        A consistent sleep schedule, including both bedtime and wake time, helps
        regulate your body's internal clock and improves sleep quality.
      </Typography>
    </Stack>
  );
};

export default SleepScheduleChart;
