import { Paper, Stack, Skeleton } from "@mui/material";

export const GreetingSkeleton = () => (
  <Paper
    elevation={11}
    variant="outlined"
    sx={{
      p: 4,
      borderRadius: 10,
      backgroundColor: "background.paper",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    }}
  >
    <Stack direction={"column"} alignItems="center">
      <Skeleton variant="text" sx={{ typography: "h4" }} width="200px" />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        paddingTop={1}
        alignItems="center"
      >
        <Skeleton variant="text" sx={{ typography: "h4" }} width="100px" />
        <Skeleton variant="circular" width={30} height={30} sx={{ ml: 0.5 }} />
      </Stack>
    </Stack>
  </Paper>
);
