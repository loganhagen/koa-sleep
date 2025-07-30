import React from "react";
import { Stack, Typography } from "@mui/material";
import GlanceItem from "../at-a-glance/GlanceItem";
import { BoxProps } from "@mui/material/Box";

interface AnalyticsItemProps {
  title: string;
  displayContent: React.ReactNode;
  glanceItemSx?: BoxProps["sx"];
  description: string;
}

const AnalyticsItem: React.FC<AnalyticsItemProps> = ({
  title,
  displayContent,
  glanceItemSx,
  description,
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={4}>
      <GlanceItem
        title={title}
        displayContent={displayContent}
        sx={glanceItemSx}
      />
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
        {description}
      </Typography>
    </Stack>
  );
};

export default AnalyticsItem;
