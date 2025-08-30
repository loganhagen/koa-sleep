import React from "react";
import { Stack, Skeleton } from "@mui/material";

export const DateSelectorSkeleton = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ position: "relative", width: "100%", height: 40 }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={{ xs: 1, sm: 2 }}
      >
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton
          variant="text"
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          width={180}
        />
        <Skeleton variant="circular" width={40} height={40} />
      </Stack>
      <Skeleton
        variant="circular"
        width={40}
        height={40}
        sx={{ position: "absolute", right: 0 }}
      />
    </Stack>
  );
};
