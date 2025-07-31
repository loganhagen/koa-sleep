import { Box } from "@mui/material";
import WeeklyInsights from "../components/weekly-insights/WeeklyInsights";

const Insights = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      <WeeklyInsights />
    </Box>
  );
};

export default Insights;
