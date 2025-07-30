import React from "react";
import { Stack, Typography } from "@mui/material";
import LastSleepItem from "../header/LastSleepItem";
import { BoxProps } from "@mui/material/Box";

interface InsightsItemProps {
  title: string;
  displayContent: React.ReactNode;
  glanceItemSx?: BoxProps["sx"];
  description: string;
}

const InsightsItem: React.FC<InsightsItemProps> = ({
  title,
  displayContent,
  glanceItemSx,
  description,
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={4}>
      <LastSleepItem
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

export default InsightsItem;
