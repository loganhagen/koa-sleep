import { Typography, Stack, Divider } from "@mui/material";

const MetricItem = ({ title, value }: { title: string; value: string }) => (
  <Stack alignItems="center">
    <Typography variant="body1" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="h5" component="p" sx={{ fontWeight: 500 }}>
      {value}
    </Typography>
  </Stack>
);

const KeyMetrics = () => {
  const metrics = {
    goal: "10:30 PM",
    avgBedtime: "10:15 PM",
    avgWakeUpTime: "6:45 AM",
  };

  return (
    <Stack direction={"column"}>
      <Typography variant="h6" component="h3" textAlign={"center"} gutterBottom>
        Key Metrics
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-around"
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ width: "100%", p: 2 }}
      >
        <MetricItem title="Goal" value={metrics.goal} />
        <MetricItem title="Avg. Bedtime" value={metrics.avgBedtime} />
        <MetricItem title="Avg. Wake-up" value={metrics.avgWakeUpTime} />
      </Stack>
    </Stack>
  );
};

export default KeyMetrics;
