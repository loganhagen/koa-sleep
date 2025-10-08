import { Stack, Typography } from "@mui/material";
import WeeklyInsights from "./_components/WeeklyInsights";
import DynamicInsights from "./_components/DynamicInsights";

const Insights = () => {
  return (
    <Stack
      direction="column"
      spacing={3}
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontSize: { xs: "1.5rem", sm: "2.5rem" },
          mb: { xs: 2, sm: 3 },
          fontWeight: 700,
          color: "text.primary",
        }}
      >
        Insights
      </Typography>
      <WeeklyInsights />
      <DynamicInsights />
    </Stack>
  );
};

export default Insights;
