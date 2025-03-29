import { Card, CardContent, Typography } from "@mui/material";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}

export default function SleepChart() {
  return (
    <Card sx={{ width: "fit-content" }}>
      <CardContent sx={{ textAlign: "center" }}>
        <GaugeContainer
          width={200}
          height={200}
          startAngle={-110}
          endAngle={110}
          value={30}
        >
          <GaugeReferenceArc />
          <GaugeValueArc />
          <GaugePointer />
        </GaugeContainer>
        <Typography>Total Sleep: 7.5 hours</Typography>
      </CardContent>
    </Card>
  );
}
