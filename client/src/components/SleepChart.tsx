import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { useEffect, useState } from "react";
import { Sleep, SleepResponse, Summary } from "../../types/api/sleep";
import { minutesToHours, millisecondsToHours } from "../../utils/utils";

interface SleepData {
  duration: number;
  efficiency: number;
  wake: number;
  light: number;
  deep: number;
}

export default function SleepChart() {
  const [sleepData, setSleepData] = useState<SleepData>({
    duration: 0,
    efficiency: 0,
    wake: 0,
    light: 0,
    deep: 0,
  });

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const data = await fetch("http://localhost:3001/sleep-endpoint");
        const res = (await data.json()) as SleepResponse;
        const sleep = res.sleep as Sleep[];
        const summary = res.summary as Summary;

        // There will only be 1 object in the sleep array
        const sleepData: SleepData = {
          duration: millisecondsToHours(sleep[0].duration),
          efficiency: sleep[0].efficiency,
          wake: minutesToHours(summary.stages.wake),
          light: minutesToHours(summary.stages.light),
          deep: minutesToHours(summary.stages.deep),
        };
        setSleepData(sleepData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSleepData();
  }, []);

  return (
    <Card
      sx={{
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          pb: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack direction="row" sx={{ mb: 1 }}>
          <Typography variant="h5" sx={{ mr: 1 }}>
            Sleep
          </Typography>
          <ModeNightIcon />
        </Stack>

        <Box>
          <Stack direction="row" spacing={3}>
            <Stack direction="column">
              <Typography>Efficiency (%)</Typography>
              <Typography>Duration (hrs)</Typography>
              <Typography>Wake (hrs)</Typography>
              <Typography>Light (hrs)</Typography>
              <Typography>Deep (hrs)</Typography>
            </Stack>
            <Stack direction="column">
              <Typography>{sleepData?.efficiency}</Typography>
              <Typography>{sleepData?.duration}</Typography>
              <Typography>{sleepData?.wake}</Typography>
              <Typography>{sleepData?.light}</Typography>
              <Typography>{sleepData?.deep}</Typography>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
