"use client";

import { useMemo } from "react";
import { Box, Typography, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useUser } from "../providers/userProvider";
import { useFullLogs } from "@/hooks/useSleepLogs";
import HistoryTable from "./_components/HistoryTable";
import MobileMessage from "./_components/MobileMessage";
import { getHistoryTableColumns } from "./columns";
import { mapSleepLogsToGridRows } from "./utils";

const HistoryPage = () => {
  const { user } = useUser();
  const { data: sleepLogs, isLoading } = useFullLogs(user?.id);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const rows = useMemo(() => mapSleepLogsToGridRows(sleepLogs), [sleepLogs]);
  const columns = useMemo(() => getHistoryTableColumns(), []);

  return (
    <Stack sx={{ p: { xs: 2, sm: 3 }, alignItems: "center" }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          fontSize: { xs: "2rem", sm: "3rem" },
          mb: { xs: 3, sm: 5 },
          fontWeight: 700,
          color: "text.primary",
        }}
      >
        Sleep History
      </Typography>
      <Box sx={{ width: "100%", p: { xs: 0, sm: 4 } }}>
        {isMobile ? (
          <MobileMessage />
        ) : (
          <HistoryTable rows={rows} columns={columns} isLoading={isLoading} />
        )}
      </Box>
    </Stack>
  );
};

export default HistoryPage;
