import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Stack, Typography, Divider, Skeleton } from "@mui/material";

const ChartSkeleton = () => (
  <Stack alignItems="center" spacing={1.5}>
    <Skeleton variant="text" width={200} height={32} />
    <Skeleton
      variant="rectangular"
      width={500}
      height={250}
      sx={{ borderRadius: 4 }}
    />
  </Stack>
);

const BedtimeDeviationChart = dynamic(() => import("./BedtimeDeviationChart"), {
  ssr: false,
});

const WeeklyProgressSection = () => {
  return (
    <Stack spacing={3} sx={{ width: "100%", alignItems: "center" }}>
      <Divider sx={{ width: "80%" }} />
      <Typography variant="h4" component="h3">
        This Week's Progress
      </Typography>

      <Suspense fallback={<ChartSkeleton />}>
        <BedtimeDeviationChart />
      </Suspense>
    </Stack>
  );
};

export default WeeklyProgressSection;
