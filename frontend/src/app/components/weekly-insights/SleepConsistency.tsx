import React from "react";
import { Typography, Box, Stack } from "@mui/material";

const SleepConsistency: React.FC = () => {
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
    <Box
      sx={{
        width: "100%",
        p: 2,
        mb: 2,
        borderRadius: 4,
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "grey.50",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={4}>
        <Stack alignItems="center" spacing={1}>
          <Box
            sx={{
              ...displayItemStyle,
              borderRadius: "50%",
              background: "linear-gradient(145deg, #288520ff, #288520ff)",
              color: "secondary.contrastText",
              boxShadow: "0px 4px 15px rgba(0, 162, 232, 0.25)",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ position: "relative", top: "2px" }}
            >
              A
            </Typography>
          </Box>
          <Typography variant="subtitle1">Sleep Consistency Score</Typography>
        </Stack>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 400 }}
        >
          A high sleep consistency score means you're maintaining a regular
          sleep schedule, which is great for your circadian rhythm.
        </Typography>
      </Stack>
    </Box>
  );
};

export default SleepConsistency;
