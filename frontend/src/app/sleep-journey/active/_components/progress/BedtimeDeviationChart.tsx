"use client";
import { BarChart } from "@mui/x-charts/BarChart";
import { Typography, useTheme, Box } from "@mui/material";

const BedtimeDeviationChart = () => {
  const theme = useTheme();
  const data = [
    { day: "Mon", deviation: -15 },
    { day: "Tue", deviation: 10 },
    { day: "Wed", deviation: -5 },
    { day: "Thu", deviation: 20 },
    { day: "Fri", deviation: -10 },
    { day: "Sat", deviation: 30 },
    { day: "Sun", deviation: 5 },
  ];
  const xAxisData = data.map((d) => d.day);
  const positiveData = data.map((d) => (d.deviation > 0 ? d.deviation : null));
  const negativeData = data.map((d) => (d.deviation <= 0 ? d.deviation : null));

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" component="h3" textAlign={"center"} gutterBottom>
        Bedtime Deviation
      </Typography>
      <BarChart
        height={300}
        xAxis={[{ data: xAxisData, scaleType: "band" }]}
        series={[
          {
            data: positiveData,
            label: "Late (mins)",
            stack: "A",
            color: theme.palette.warning.main,
          },
          {
            data: negativeData,
            label: "Early (mins)",
            stack: "A",
            color: theme.palette.primary.main,
          },
        ]}
      />
    </Box>
  );
};

export default BedtimeDeviationChart;
