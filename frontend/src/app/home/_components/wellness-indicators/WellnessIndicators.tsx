"use client";

import React from "react";
import { Stack, Typography, Paper } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import { useWellnessIndicators } from "@/hooks/useWellnessIndicators";
import { useUser } from "@/app/providers/userProvider";
import IndicatorItem from "./IndicatorItem";
import { WellnessIndicatorsSkeleton } from "../_skeletons/WellnessIndicatorsSkeleton";
import NoDataDisplay from "../NoDataDisplay";

interface WellnessIndicatorsProps {
  targetDate: Date;
}

const WellnessIndicators: React.FC<WellnessIndicatorsProps> = ({
  targetDate,
}) => {
  const { user } = useUser();
  const { data, isLoading, error } = useWellnessIndicators(
    user?.id,
    targetDate
  );

  if (!user) {
    return (
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 4,
          borderRadius: 10,
          backgroundColor: "background.paper",
          width: "100%",
        }}
      >
        <Typography>Please log in.</Typography>
      </Paper>
    );
  }

  if (isLoading) {
    return <WellnessIndicatorsSkeleton />;
  }

  if (error) {
    return (
      <NoDataDisplay
        title="Wellness Indicators"
        message="Unable to retrieve data."
      />
    );
  }

  if (!data) {
    return (
      <NoDataDisplay title="Wellness Indicators" message="No data found." />
    );
  }

  const skinTempValue = (() => {
    if (data?.nightlyRelative == null) return "...";
    const temp = data.nightlyRelative;
    const sign = temp > 0 ? "+" : "";
    return `${sign}${temp.toFixed(1)}°C`;
  })();

  const skinTempColor = (() => {
    if (data?.nightlyRelative == null) return "white";
    if (data.nightlyRelative > 0) return "#ffb74d";
    if (data.nightlyRelative < 0) return "#90caf9";
    return "white";
  })();

  const indicators = [
    {
      value: skinTempValue,
      valueColor: skinTempColor,
      label: "Skin Temp",
      Icon: ThermostatIcon,
      gradient: "linear-gradient(145deg, #4db6ac, #00897b)",
      shadow: "0px 4px 20px rgba(0, 137, 123, 0.25)",
      tooltip:
        "This shows the change in your skin temperature during sleep compared to your personal baseline...",
      iconColor: "primary.main",
    },
    {
      value: "16 bpm",
      label: "Breathing",
      Icon: AirIcon,
      gradient: "linear-gradient(145deg, #90caf9, #64b5f6)",
      shadow: "0px 4px 20px rgba(100, 181, 246, 0.25)",
      iconColor: "#64b5f6",
    },
    {
      value: "60 ms",
      label: "HRV",
      Icon: MonitorHeartIcon,
      gradient: "linear-gradient(145deg, #ffb74d, #ffa726)",
      shadow: "0px 4px 20px rgba(255, 167, 38, 0.25)",
      iconColor: "warning.main",
    },
    {
      value: "98%",
      label: "SpO2",
      Icon: BloodtypeIcon,
      gradient: "linear-gradient(145deg, #ef9a9a, #e57373)",
      shadow: "0px 4px 20px rgba(229, 115, 115, 0.25)",
      iconColor: "#e57373",
    },
  ];

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 10,
        backgroundColor: "background.paper",
        width: "100%",
      }}
    >
      <Stack direction="column" spacing={1}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Wellness Indicators
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 5 }}
          paddingTop={3}
          justifyContent="center"
          alignItems="center"
        >
          {indicators.map((indicator) => (
            <IndicatorItem
              key={indicator.label}
              value={indicator.value}
              valueColor={indicator.valueColor}
              label={indicator.label}
              Icon={indicator.Icon}
              gradient={indicator.gradient}
              shadow={indicator.shadow}
              tooltip={indicator.tooltip}
              iconColor={indicator.iconColor}
            />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default WellnessIndicators;