import { Paper, Stack, Skeleton } from "@mui/material";

export const CoreMetricsSkeleton = () => (
  <Paper
    elevation={0}
    variant="outlined"
    sx={{
      p: 4,
      borderRadius: 10,
      backgroundColor: "background.paper",
      width: "100%",
    }}
  >
    <Stack direction={"column"} spacing={1}>
      {/* Title */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        justifyContent={"center"}
        alignItems="center"
      >
        <Skeleton variant="text" sx={{ typography: "h5" }} width="180px" />
      </Stack>

      {/* Core Metrics */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3, md: 5 }}
        paddingTop={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {[...Array(4)].map((_, index) => (
          <Stack
            direction={"column"}
            alignItems="center"
            spacing={1}
            key={index}
          >
            <Skeleton
              variant="rectangular"
              width={120}
              height={120}
              sx={{ borderRadius: 4 }}
            />
            <Stack direction={"row"} spacing={1} alignItems="center">
              <Skeleton
                variant="text"
                sx={{ typography: "subtitle1" }}
                width="80px"
              />
              <Skeleton variant="circular" width={20} height={20} />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  </Paper>
);
