import { Card, CardContent, Typography, Stack, Skeleton } from "@mui/material";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { useEffect, useState } from "react";
import { SleepData } from "../../types/api/sleep";
import { Gauge, gaugeClasses, PieChart } from "@mui/x-charts";
import { fitbitApiService } from "../services/api";

export default function SleepChart() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<SleepData>({
    duration: 0,
    efficiency: 0,
    wake: 0,
    light: 0,
    deep: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fitbitApiService.fetchSleepData();
        setData(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
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
            <Skeleton variant="text" width={80} height={40} />
            <Skeleton
              variant="circular"
              width={24}
              height={24}
              sx={{ ml: 1 }}
            />
          </Stack>

          <Stack direction="column" sx={{ alignItems: "center" }}>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="circular" width={100} height={100} />
          </Stack>

          <Stack direction="column" sx={{ alignItems: "center" }}>
            <Skeleton variant="text" width={120} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width={200} height={100} />

            <Stack direction="row" sx={{ mt: 1 }}>
              <Stack direction="column">
                <Skeleton variant="text" width={80} />
              </Stack>
              <Stack direction="column">
                <Skeleton variant="text" width={60} sx={{ ml: 1 }} />
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  }

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

        <Stack direction="column" sx={{ alignItems: "center" }}>
          <Typography sx={{ mb: -3 }}>Efficiency</Typography>
          <Gauge
            width={100}
            height={100}
            value={data.efficiency}
            startAngle={-90}
            endAngle={90}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 15,
                transform: "translate(0px, 0px)",
              },
            }}
            text={({ value }) => `${value}%`}
          />
        </Stack>

        <Stack direction="column" sx={{ alignItems: "center" }}>
          <Typography sx={{ mb: 1 }}>Sleep Stages</Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: data.deep, label: "Deep" },
                  { id: 1, value: data.light, label: "Light" },
                  { id: 2, value: data.wake, label: "Wake" },
                ],
              },
            ]}
            width={200}
            height={100}
            slotProps={{
              legend: {
                position: { vertical: "middle", horizontal: "right" },
                itemMarkWidth: 10,
                itemMarkHeight: 10,
                markGap: 5,
                itemGap: 5,
                labelStyle: {
                  fontSize: 10,
                },
              },
            }}
          />
          <Stack direction="row" sx={{ mt: 1 }}>
            <Stack direction="column">
              <Typography>Duration:</Typography>
            </Stack>
            <Stack direction="column">
              <Typography sx={{ ml: 1 }} fontWeight="bold">
                {data?.duration} hrs
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
