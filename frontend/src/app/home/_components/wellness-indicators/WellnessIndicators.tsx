"use client";

import React from "react";
import { Stack } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import { useWellnessIndicators } from "@/hooks/useWellnessIndicators";
import { useUser } from "@/app/providers/userProvider";
import IndicatorItem from "./IndicatorItem";
import { WellnessIndicatorsSkeleton } from "../_skeletons/WellnessIndicatorsSkeleton";
import DashboardCard from "../DashboardCard";
import { WellnessSummaryDTO } from "@/types/api/wellness";
import { grey } from "@mui/material/colors";

interface WellnessIndicatorsProps {
  targetDate: Date;
}

const WellnessIndicators: React.FC<WellnessIndicatorsProps> = ({
  targetDate,
}) => {
  const { user } = useUser();
  const { data, isLoading, error, isPlaceholderData } = useWellnessIndicators(
    user?.id,
    targetDate
  );

  const indicatorConfig = [
    {
      key: "skinTemperature",
      getValue: (data: WellnessSummaryDTO) => `${data.skinTemperature}°C`,
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
      key: "breathingRate",
      getValue: (d: WellnessSummaryDTO) => `${d.breathingRate} br/min`,
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
      key: "hrv",
      getValue: (d: WellnessSummaryDTO) => `${d.hrv} ms`,
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
      key: "spo2",
      getValue: (d: WellnessSummaryDTO) => `${d.spo2}%`,
      label: "SpO2",
      Icon: BloodtypeIcon,
      gradient: "linear-gradient(145deg, #ef9a9a, #e57373)",
      shadow: "0px 4px 20px rgba(229, 115, 115, 0.25)",
      iconColor: "#e57373",
      tooltip:
        "The percentage of your blood that's saturated with, or contains, oxygen.",
    },
  ];

  const indicators = indicatorConfig.map((config) => {
    const useRealData = !isLoading && !error && !isPlaceholderData && data;

    if (useRealData) {
      const indicatorValue = data[config.key as keyof WellnessSummaryDTO];
      if (indicatorValue != null) {
        return {
          ...config,
          value: config.getValue(data),
        };
      }
    }

    return {
      ...config,
      value: "--",
      valueColor: "text.secondary",
      iconColor: "disabled",
      gradient: `linear-gradient(145deg, ${grey[200]}, ${grey[300]})`,
      shadow: "none",
    };
  });

  return (
    <DashboardCard
      title="Wellness Indicators"
      isLoading={isLoading}
      skeleton={<WellnessIndicatorsSkeleton />}
    >
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
    </DashboardCard>
  );
};

export default WellnessIndicators;
