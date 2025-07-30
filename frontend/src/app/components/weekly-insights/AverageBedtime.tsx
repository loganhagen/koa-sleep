import React from "react";
import AnalyticsItem from "./WeeklyInsightsItem";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";
import { formatHour } from "@/utils/utils";

const AverageBedtime: React.FC = () => {
  const bedtimeData = [22, 22.5, 23, 22.75, 23.5, 22.25, 23];
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <AnalyticsItem
      title="Bedtime"
      displayContent={
        <Box sx={{ width: "100%", height: "100%" }}>
          <LineChart
            xAxis={[{ scaleType: "point", data: weekDays }]}
            yAxis={[{ valueFormatter: (value: any) => formatHour(value) }]}
            series={[
              {
                data: bedtimeData,
                label: "Bedtime",
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
      description="Your bedtime consistency over the last week. A consistent bedtime helps regulate your body's internal clock."
    />
  );
};

export default AverageBedtime;
