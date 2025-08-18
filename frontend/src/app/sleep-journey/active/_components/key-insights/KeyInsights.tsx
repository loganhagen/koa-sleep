import React from "react";
import { Typography, Stack } from "@mui/material";
import InsightItem from "./InsightItem";

const KeyInsights = () => {
  return (
    <Stack direction={"column"}>
      <Typography
        variant="h6"
        component="h3"
        sx={{ mb: 2 }}
        textAlign={"center"}
      >
        Key Insights
      </Typography>
      <InsightItem />
    </Stack>
  );
};

export default KeyInsights;
