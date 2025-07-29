"use client";

import { Alert, Paper, Snackbar, Stack, Typography } from "@mui/material";
import GlanceItem from "./GlanceItem";
import { LastNightSleep } from "../../../../types/backend/sleep";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const AtAGlance = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const query = useQuery<LastNightSleep>({
    queryKey: ["lastNightSleep"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/sleep/lastnight");

      if (!res.ok) {
        throw new Error("Failed to fetch sleep data.");
      }
      return await res.json();
    },
    retry: 1,
  });

  useEffect(() => {
    if (query.isError) {
      setShowSnackbar(true);
    }
  }, [query.isError]);

  return (
    <>
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
        <Typography variant="h6" component="h2" sx={{ mb: 4 }}>
          Last Night
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="flex-start"
          spacing={5}
        >
          <GlanceItem
            title={"Total Sleep"}
            displayContent={
              <Typography variant="h5" fontWeight="bold">
                {query.error ? "N/A" : query.data?.totalSleep}
              </Typography>
            }
            sx={{
              borderRadius: 4,
              bgcolor: "grey.100",
              color: "grey.800",
            }}
          />
          <GlanceItem
            title={"Bedtime"}
            displayContent={
              <>
                <Typography variant="h5" fontWeight="bold">
                  {query.error ? "N/A" : query.data?.bedtime}
                </Typography>
              </>
            }
            sx={{
              borderRadius: 4,
              bgcolor: "grey.100",
              color: "grey.800",
            }}
          />
          <GlanceItem
            title={"Sleep Score"}
            displayContent={
              <Typography variant="h4" fontWeight="bold">
                {query.error ? "N/A" : query.data?.sleepScore}
              </Typography>
            }
            sx={{
              borderRadius: "50%",
              background: "linear-gradient(145deg, #2CDFFF, #00A2E8)",
              color: "secondary.contrastText",
              boxShadow: "0px 4px 15px rgba(0, 162, 232, 0.25)",
            }}
          />
        </Stack>
      </Paper>

      <Snackbar
        open={showSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {query.error?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AtAGlance;
