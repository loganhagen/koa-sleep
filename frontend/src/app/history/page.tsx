"use client";

import { useState, useEffect, useMemo } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import { useUser } from "../providers/userProvider";
import { useSleepLogs } from "@/hooks/useSleepLogs";

// Helper function to format duration from minutes to "Xh Ym"
const formatDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

// Helper function to format a Date object to "HH:mm"
const formatTime = (date: Date): string => {
  const d = new Date(date);
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Helper function to format a Date object to "YYYY-MM-DD"
const formatDate = (date: Date): string => {
  return new Date(date).toISOString().split("T")[0];
};

const History = () => {
  const { user } = useUser();
  const { data, isLoading, error } = useSleepLogs(user?.id);
  const [isMounted, setIsMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const gridRows: GridRowsProp = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.map((log) => ({
      id: log.id,
      date: formatDate(log.dateTime),
      bedtime: formatTime(log.bedTime),
      wakeUpTime: formatTime(log.wakeTime),
      totalSleep: formatDuration(log.duration),
      awake: `${log.awakeMins}m`,
      rem: `${log.remMins}m`,
      light: `${log.lightMins}m`,
      deep: `${log.deepMins}m`,
      efficiency: log.efficiency,
    }));
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "bedtime",
      headerName: "Bedtime",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "wakeUpTime",
      headerName: "Wake Up Time",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalSleep",
      headerName: "Total Sleep",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "awake",
      headerName: "Awake",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "rem",
      headerName: "REM",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "light",
      headerName: "Light",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "deep",
      headerName: "Deep",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "efficiency",
      headerName: "Efficiency",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
  ];

  if (error) {
    return <Typography color="error">Failed to load sleep data.</Typography>;
  }

  return (
    <Stack sx={{ p: { xs: 2, sm: 3 }, alignItems: "center" }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", fontSize: { xs: "2rem", sm: "3rem" } }}
      >
        Sleep History
      </Typography>
      <Box sx={{ width: "100%", p: { xs: 0, sm: 4 } }}>
        {isMobile ? (
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{
              textAlign: "center",
              height: "60vh",
              p: 2,
            }}
          >
            <ImportantDevicesIcon
              sx={{ fontSize: 60, color: "primary.main" }}
            />
            <Typography variant="h5" component="h2" gutterBottom>
              Please view on a larger screen
            </Typography>
            <Typography variant="body1" color="text.secondary">
              The sleep history table is best viewed on a desktop or tablet.
            </Typography>
          </Stack>
        ) : (
          <Box
            sx={{
              height: 650,
              width: "100%",
              maxWidth: "1180px",
              mx: "auto",
              "& .MuiDataGrid-columnHeaderTitle": {
                fontSize: "1rem",
                fontWeight: "bold",
              },
            }}
          >
            {isMounted && (
              <DataGrid
                rows={gridRows}
                columns={columns}
                rowHeight={80}
                loading={isLoading}
              />
            )}
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default History;
