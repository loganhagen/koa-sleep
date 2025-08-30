import React from "react";
import { Stack, Typography, Box, BoxProps } from "@mui/material";

const baseItemStyle: BoxProps["sx"] = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: 120,
  width: 120,
  textAlign: "center",
  borderRadius: 4,
  bgcolor: "background.default",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
  border: "1px solid",
  borderColor: "divider",
  transition: "transform 0.3s ease-in-out",
  ":hover": {
    transform: "scale(1.05)",
  },
};

interface MetricDisplayProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({
  value,
  label,
  icon,
}) => {
  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      <Box sx={baseItemStyle}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ whiteSpace: "nowrap" }}
        >
          {value}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="subtitle1">{label}</Typography>
        {icon}
      </Stack>
    </Stack>
  );
};
