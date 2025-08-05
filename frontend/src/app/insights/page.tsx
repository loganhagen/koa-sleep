import { Box, Stack } from "@mui/material";
import WeeklyInsights from "../components/weekly-insights/WeeklyInsights";
import DynamicInsights from "../components/dynamic-insights/DynamicInsights";

const Insights = () => {
  return (
    <Stack direction="column" spacing={1}>
      <WeeklyInsights />
      <DynamicInsights />
    </Stack>
  );
};

export default Insights;
