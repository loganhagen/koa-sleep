"use client";

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { ScatterChart, BarChart } from "@mui/x-charts";
import {
  ExpandMore as ExpandMoreIcon,
  LightbulbOutlined as LightbulbOutlinedIcon,
} from "@mui/icons-material";

const DynamicInsights: React.FC = () => {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 10,
        backgroundColor: "background.paper",
        textAlign: "left",
      }}
    >
      <Typography variant="h4" sx={{ pb: 5, textAlign: "center" }}>
        Dynamic Insights
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Accordion
        defaultExpanded
        sx={{
          boxShadow: "none",
          backgroundColor: "transparent",
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LightbulbOutlinedIcon sx={{ mr: 1.5, color: "primary.main" }} />
            <Typography variant="body1">
              A high step count on days you exercise is correlated with a 15%
              increase in deep sleep.
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <ScatterChart
            series={[
              {
                label: "Deep Sleep vs. Steps",
                data: [
                  { x: 5000, y: 120, id: 1 },
                  { x: 8000, y: 150, id: 2 },
                  { x: 12000, y: 180, id: 3 },
                  { x: 6000, y: 130, id: 4 },
                  { x: 15000, y: 200, id: 5 },
                  { x: 7000, y: 140, id: 6 },
                  { x: 9000, y: 160, id: 7 },
                  { x: 11000, y: 170, id: 8 },
                  { x: 13000, y: 190, id: 9 },
                  { x: 10000, y: 165, id: 10 },
                  { x: 5500, y: 125, id: 11 },
                  { x: 8500, y: 155, id: 12 },
                  { x: 12500, y: 185, id: 13 },
                  { x: 6500, y: 135, id: 14 },
                  { x: 15500, y: 205, id: 15 },
                  { x: 7500, y: 145, id: 16 },
                  { x: 9500, y: 165, id: 17 },
                  { x: 11500, y: 175, id: 18 },
                  { x: 13500, y: 195, id: 19 },
                  { x: 10500, y: 170, id: 20 },
                  { x: 4000, y: 110, id: 21 },
                  { x: 16000, y: 210, id: 22 },
                  { x: 4500, y: 115, id: 23 },
                  { x: 16500, y: 215, id: 24 },
                  { x: 3000, y: 100, id: 25 },
                  { x: 17000, y: 220, id: 26 },
                  { x: 3500, y: 105, id: 27 },
                  { x: 17500, y: 225, id: 28 },
                  { x: 2000, y: 90, id: 29 },
                  { x: 18000, y: 230, id: 30 },
                ],
              },
            ]}
            height={300}
            xAxis={[{ label: "Daily Steps" }]}
            yAxis={[{ label: "Deep Sleep (min)" }]}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          boxShadow: "none",
          backgroundColor: "transparent",
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LightbulbOutlinedIcon sx={{ mr: 1.5, color: "primary.main" }} />
            <Typography variant="body1">
              A consistent wake-up time is linked to a 10% improvement in sleep
              efficiency.
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <BarChart
            series={[
              {
                data: [85],
                label: "Inconsistent Wake-up",
                color: "#f2b4b4",
              },
              {
                data: [95],
                label: "Consistent Wake-up",
                color: "#a2c4c9",
              },
            ]}
            height={300}
            xAxis={[{ data: ["Sleep Efficiency"], scaleType: "band" }]}
            yAxis={[{ label: "Sleep Efficiency (%)" }]}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          boxShadow: "none",
          backgroundColor: "transparent",
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LightbulbOutlinedIcon sx={{ mr: 1.5, color: "primary.main" }} />
            <Typography variant="body1">
              Consuming caffeine within 6 hours of bedtime is associated with a
              20-minute reduction in total sleep time.
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{ p: 2, backgroundColor: "grey.200" }}
          >
            Data Visualization Placeholder
          </Paper>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default DynamicInsights;
