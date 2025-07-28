"use client";

import { Paper, Stack, Typography, Box } from "@mui/material";
import React from "react";

const AtAGlance = () => {
  const displayItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    width: 120,
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
    ":hover": {
      transform: "scale(1.05)",
    },
  };

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 6,
        border: "1px solid",
        borderColor: "grey.300",
        backgroundColor: "background.paper",
        transition: (theme) =>
          theme.transitions.create(["box-shadow", "transform"], {
            duration: theme.transitions.duration.short,
          }),
        ":hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.07)",
        },
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        At a Glance
      </Typography>

      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={5}
      >
        <Stack alignItems="center" spacing={2}>
          <Box
            sx={{
              ...displayItemStyle,
              borderRadius: "50%",
              background: "linear-gradient(145deg, #6D7BFF, #4353FF)",
              color: "primary.contrastText",
              boxShadow: "0px 4px 15px rgba(67, 83, 255, 0.25)",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              7h 30m
            </Typography>
          </Box>
          <Typography variant="subtitle1" fontWeight="medium">
            Last Night's Sleep
          </Typography>
        </Stack>

        <Stack alignItems="center" spacing={2}>
          <Box
            sx={{
              ...displayItemStyle,
              borderRadius: 4,
              bgcolor: "grey.100",
              color: "grey.800",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              11:30
            </Typography>
            <Typography variant="body1">PM</Typography>
          </Box>
          <Typography variant="subtitle1" fontWeight="medium">
            Bedtime
          </Typography>
        </Stack>

        <Stack alignItems="center" spacing={2}>
          <Box
            sx={{
              ...displayItemStyle,
              borderRadius: "50%",
              background: "linear-gradient(145deg, #2CDFFF, #00A2E8)",
              color: "secondary.contrastText",
              boxShadow: "0px 4px 15px rgba(0, 162, 232, 0.25)",
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              75
            </Typography>
          </Box>
          <Typography variant="subtitle1" fontWeight="medium">
            Sleep Score
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default AtAGlance;
