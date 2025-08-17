import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Stack, Typography, Skeleton, Paper, Divider } from "@mui/material";
import KeyMetrics from "./KeyMetrics";
import SleepScheduleChart from "@/app/sleep-journey/_components/active/progress/SleepScheduleChart";

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

const BedtimeDeviationChart = dynamic(() => import("./BedtimeDeviationChart"), {
  ssr: false,
});

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
          This Week's Progress
        </Typography>
        <KeyMetrics />
        <Suspense fallback={<ChartSkeleton />}>
          <BedtimeDeviationChart />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <SleepScheduleChart />
        </Suspense>
      </Stack>
    </Paper>
  );
};

export default WeeklyProgressSection;
