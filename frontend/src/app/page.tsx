"use client";

import AtAGlance from "./components/AtAGlance";
import Greeting from "./components/Greeting";
import AdvancedAnalytics from "./components/AdvancedAnalytics";
import { Box, Stack, Paper, Typography, Divider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 2,
        backgroundColor: "background.default",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Stack direction={"column"} spacing={5}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{
              p: 4,
              borderRadius: 10,
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
            <Stack spacing={5}>
              <Stack direction="row" spacing={5} alignItems="center">
                <Greeting />
                <Divider orientation="vertical" flexItem />
                <Stack spacing={2} alignItems="center">
                  <Typography variant="h6" component="h2">
                    Most Recent Sleep
                  </Typography>
                  <AtAGlance />
                </Stack>
              </Stack>
            </Stack>
          </Paper>
          <AdvancedAnalytics />
        </Stack>
      </QueryClientProvider>
    </Box>
  );
};

export default Home;
