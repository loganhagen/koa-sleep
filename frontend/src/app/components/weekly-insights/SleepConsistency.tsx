import React from "react";
import { Typography, Box } from "@mui/material";
import WeeklyInsightsItem from "./WeeklyInsightsItem";

const SleepConsistency: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        mb: 2,
        borderRadius: 4,
        backgroundColor: "grey.50",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WeeklyInsightsItem
        title="Sleep Consistency"
        displayContent={
          <Typography variant="h4" fontWeight="bold">
            A
          </Typography>
        }
        glanceItemSx={{
          borderRadius: "50%",
          background: "linear-gradient(145deg, #288520ff, #288520ff)",
          color: "secondary.contrastText",
          boxShadow: "0px 4px 15px rgba(0, 162, 232, 0.25)",
        }}
        description="A high sleep consistency score means you're maintaining a regular sleep schedule, which is great for your circadian rhythm."
      />
    </Box>
  );
};

export default SleepConsistency;
