import React from "react";
import AnalyticsItem from "./WeeklyInsightsItem";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";
import { formatHour } from "@/utils/utils";

const AverageWakeTime: React.FC = () => {
  const wakeTimeData = [6.5, 7, 6.75, 7.5, 6.25, 7, 6];
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <AnalyticsItem
      title="Wake Time"
      displayContent={
        <Box sx={{ width: "100%", height: "100%" }}>
          <LineChart
            xAxis={[{ scaleType: "point", data: weekDays }]}
            yAxis={[{ valueFormatter: (value: any) => formatHour(value) }]}
            series={[
              {
                data: wakeTimeData,
                label: "Wake Time",
                color: "#00A2E8",
              },
            ]}
            height={200}
          />
        </Box>
      }
      glanceItemSx={{
        borderRadius: 4,
        bgcolor: "grey.100",
        color: "grey.800",
        width: { xs: "100%", sm: 400 },
        height: "auto",
        padding: 2,
      }}
      description="Your wake time consistency over the last week. A consistent wake time is just as important as a consistent bedtime for your sleep health."
    />
  );
};

export default AverageWakeTime;
