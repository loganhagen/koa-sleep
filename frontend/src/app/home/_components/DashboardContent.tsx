"use client";

import DateSelector from "./DateSelector";
import Greeting from "./Greeting";
import SmartSummary from "./SmartSummary";
import CoreMetrics from "./core-metrics/CoreMetrics";
import SleepStages from "./sleep-stages/SleepStages";
import WellnessIndicators from "./wellness-indicators/WellnessIndicators";
import { Stack, CircularProgress, Box, Container } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useMostRecentSleepLog } from "@/hooks/useSleepLogs";
import { UserDTO } from "@/types/api/user";

interface DashboardContentProps {
  user: UserDTO;
}

const DashboardContent = ({ user }: DashboardContentProps) => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const { data: mostRecentSleepLog, isLoading: isSleepLogLoading } =
    useMostRecentSleepLog(user.id);

  const getMostRecentDate = useCallback(() => {
    if (mostRecentSleepLog) {
      return new Date(mostRecentSleepLog.date);
    } else {
      return new Date();
    }
  }, [mostRecentSleepLog]);

  useEffect(() => {
    if (!isSleepLogLoading) {
      setTargetDate(getMostRecentDate());
    }
  }, [mostRecentSleepLog, isSleepLogLoading, getMostRecentDate]);

  const handleDateChange = (days: number) => {
    setTargetDate((prevDate) => {
      if (!prevDate) return null;
      const newDate = new Date(prevDate);
      newDate.setUTCDate(newDate.getUTCDate() + days);
      return newDate;
    });
  };

  const resetTargetDate = () => {
    setTargetDate(getMostRecentDate());
  };

  if (!user) {
    return <div>Please log in to view metrics.</div>;
  }

  if (!targetDate) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ marginBottom: 5 }}>
        <Greeting />
      </Box>
      <Stack direction={"column"} spacing={3}>
        <DateSelector
          targetDate={targetDate}
          handleDateChange={handleDateChange}
          handleResetToToday={resetTargetDate}
          mostRecentLogDate={
            mostRecentSleepLog ? new Date(mostRecentSleepLog.date) : null
          }
        />
        <SmartSummary targetDate={targetDate} />
        <CoreMetrics targetDate={targetDate} />
        <WellnessIndicators targetDate={targetDate} />
        <SleepStages targetDate={targetDate} />
      </Stack>
    </Container>
  );
};

export default DashboardContent;
