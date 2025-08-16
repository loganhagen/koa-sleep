import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Paper, Stack, Typography } from "@mui/material";
import { teal, red } from "@mui/material/colors";

const BedtimeDeviationChart: React.FC = () => {
  const userBedtimeData = [22.5, 22.25, 22, 22.75, 23, 22, 22.5];
  const targetBedtime = 22.5;
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const deviationData = userBedtimeData.map(
    (bedtime) => (bedtime - targetBedtime) * 60
  );
  const lateData = deviationData.map((d) => (d > 0 ? d : null));
  const earlyData = deviationData.map((d) => (d <= 0 ? d : null));

  const formatMinutes = (value: number | null) => {
    if (value === null) return "";
    if (value === 0) return "On time";
    return `${Math.abs(value)} min ${value > 0 ? "late" : "early"}`;
  };

  return (
    <Stack alignItems="center" spacing={1.5}>
      <Typography variant="h6" component="h4">
        Bedtime Consistency
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 4,
          width: { xs: "100%", sm: "auto" },
          p: { xs: 1, sm: 2 },
        }}
      >
        <BarChart
          xAxis={[{ scaleType: "band", data: weekDays }]}
          yAxis={[
            { label: "Minutes from target", valueFormatter: formatMinutes },
          ]}
          series={[
            {
              data: lateData,
              label: "Late",
              color: red[400],
            },
            {
              data: earlyData,
              label: "Early / On Time",
              color: teal[300],
            },
          ]}
          height={250}
          width={500}
          margin={{ top: 20, right: 30, bottom: 30, left: 70 }}
          grid={{ horizontal: true }}
        />
      </Paper>
    </Stack>
  );
};

export default BedtimeDeviationChart;
