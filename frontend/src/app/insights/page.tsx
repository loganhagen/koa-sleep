import { Stack } from "@mui/material";
import WeeklyInsights from "./_components/WeeklyInsights";
import DynamicInsights from "./_components/DynamicInsights";

const Insights = () => {
  return (
    <Stack direction="column" spacing={3}>
      <WeeklyInsights />
      <DynamicInsights />
    </Stack>
  );
};

export default Insights;
