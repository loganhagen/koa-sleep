import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Stack, Typography } from "@mui/material";
import { formatHour } from "@/utils/utils";

const SleepScheduleChart: React.FC = () => {
  const bedtimeData = [22, 22.5, 23, 22.75, 23.5, 22.25, 23];
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
    <Stack direction={"column"} alignItems={"center"}>
      <Typography
        variant="h6"
        component="h3"
        sx={{ mb: 2 }}
        textAlign={"center"}
      >
        Bedtimes
      </Typography>
      <Box
        sx={{
          ...displayItemStyle,
          borderRadius: 4,
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.08)"
              : "grey.100",
        }}
      >
        <Box sx={{ width: "100%", height: "100%", padding: 2 }}>
          <LineChart
            xAxis={[{ scaleType: "point", data: weekDays }]}
            yAxis={[{ valueFormatter: (value: number) => formatHour(value) }]}
            series={[
              {
                data: bedtimeData,
                label: "Bedtime",
              },
            ]}
            height={200}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default SleepScheduleChart;
