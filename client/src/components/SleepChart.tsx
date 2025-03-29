import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
} from "@mui/x-charts/Gauge";

export default function SleepChart() {
  return (
    <Card sx={{ width: "fit-content" }}>
      <CardContent sx={{ textAlign: "center", pb: 1 }}>
        <Typography variant="h5" sx={{ mb: -1 }}>
          Sleep
        </Typography>
        <Box sx={{ position: "relative" }}>
          <GaugeContainer
            width={200}
            height={200}
            startAngle={-110}
            endAngle={110}
            value={30}
          >
            <GaugeReferenceArc />
            <GaugeValueArc />
          </GaugeContainer>
          <Box
            sx={{
              position: "absolute",
              top: -60,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              height: "100%",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem" }}>5 hr 57 min</Typography>
          </Box>
        </Box>
        <Typography sx={{ mt: 1 }}>58 mins awake</Typography>
      </CardContent>
    </Card>
  );
}
