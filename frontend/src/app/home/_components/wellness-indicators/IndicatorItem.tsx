import React from "react";
import { Stack, Typography, Box, Tooltip, BoxProps } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const baseItemStyle: BoxProps["sx"] = {
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

interface IndicatorItemProps {
  value: React.ReactNode;
  label: string;
  Icon: React.ElementType;
  gradient: string;
  shadow: string;
  valueColor?: string;
  iconColor?: BoxProps["color"];
  tooltip?: string;
}

const IndicatorItem: React.FC<IndicatorItemProps> = ({
  value,
  label,
  Icon,
  gradient,
  shadow,
  valueColor = "white",
  iconColor = "primary",
  tooltip,
}) => {
  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      <Box
        sx={{
          ...baseItemStyle,
          borderRadius: "50%",
          color: "white",
          background: gradient,
          boxShadow: shadow,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ whiteSpace: "nowrap", color: valueColor }}
        >
          {value}
        </Typography>
      </Box>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <Typography variant="subtitle1">{label}</Typography>
        <Icon fontSize="small" sx={{ color: iconColor }} />
        {tooltip && (
          <Tooltip title={tooltip} placement="top" arrow>
            <HelpOutlineIcon
              fontSize="small"
              sx={{ color: "text.secondary", cursor: "pointer" }}
            />
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
};

export default IndicatorItem;
