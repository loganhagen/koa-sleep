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
      <NoDataDisplay
        title="Wellness Indicators"
        message="No data available for the selected date."
      />
    );
  }

  const indicators = [
    {
      value: `${data.nightlyRelative}°F`,
      label: "Skin Temp",
      Icon: ThermostatIcon,
      gradient: "linear-gradient(145deg, #66bb6a, #43a047)",
      shadow: "0px 4px 20px rgba(67, 160, 71, 0.25)",
      valueColor: "#ffffff",
      iconColor: "#43a047",
      tooltip:
        "Fitbit estimates your skin temperature variation to help you understand changes in your body, which can be affected by factors like your menstrual cycle, circadian rhythm, or a fever.",
    },
    {
      value: `69 br/min`,
      label: "Breathing Rate",
      Icon: AirIcon,
      gradient: "linear-gradient(145deg, #42a5f5, #2196f3)",
      shadow: "0px 4px 20px rgba(33, 150, 243, 0.25)",
      valueColor: "#ffffff",
      iconColor: "#2196f3",
      tooltip:
        "The number of breaths you take per minute. This is a good indicator of your overall wellness.",
    },
    {
      value: `69 ms`,
      label: "HRV",
      Icon: MonitorHeartIcon,
      gradient: "linear-gradient(145deg, #ab47bc, #8e24aa)",
      shadow: "0px 4px 20px rgba(142, 36, 170, 0.25)",
      valueColor: "#ffffff",
      iconColor: "#8e24aa",
      tooltip:
        "The time variation between heartbeats. A higher HRV is generally associated with better cardiovascular fitness and resilience to stress.",
    },
    {
      value: `69%`,
      label: "SpO2",
      Icon: BloodtypeIcon,
      gradient: "linear-gradient(145deg, #ef9a9a, #e57373)",
      shadow: "0px 4px 20px rgba(229, 115, 115, 0.25)",
      iconColor: "#e57373",
      tooltip:
        "The percentage of your blood that's saturated with, or contains, oxygen.",
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
