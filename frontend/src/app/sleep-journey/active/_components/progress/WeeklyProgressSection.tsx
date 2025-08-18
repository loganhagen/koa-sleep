import { Suspense } from "react";
import { Stack, Typography, Skeleton, Paper, Divider } from "@mui/material";
import KeyMetrics from "./KeyMetrics";
import SleepScheduleChart from "@/app/sleep-journey/active/_components/progress/SleepScheduleChart";
import BedtimeDeviationChart from "./BedtimeDeviationChart";

const ChartSkeleton = () => (
  <Stack alignItems="center" spacing={1.5} sx={{ p: 2 }}>
    <Skeleton variant="text" width={200} height={32} />
    <Skeleton
      variant="rectangular"
      width="100%"
      height={250}
      sx={{ borderRadius: 2 }}
    />
  </Stack>
);

const WeeklyProgressSection = () => {
  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: 700,
        p: { xs: 2, sm: 3 },
      }}
    >
      <Stack spacing={3} divider={<Divider />}>
        <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
          This Week&apos;s Progress
        </Typography>
        <KeyMetrics />
        <Suspense fallback={<ChartSkeleton />}>
          <BedtimeDeviationChart />
        </Suspense>
        <SleepScheduleChart />
      </Stack>
    </Paper>
  );
};

export default WeeklyProgressSection;
