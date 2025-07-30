import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const TotalSleep = () => {
  return (
    <Gauge
      width={200}
      height={200}
      value={75}
      startAngle={-110}
      endAngle={110}
      text="8.5 hrs"
    />
  );
};

export default TotalSleep;
