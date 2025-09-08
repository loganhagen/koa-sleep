"use client";

import { useState, useEffect, useMemo } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  Paper,
  CircularProgress,
} from "@mui/material";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import { useUser } from "../providers/userProvider";
import { useFullLogs, useSleepLogs } from "@/hooks/useSleepLogs";

const History = () => {
  const { user } = useUser();
  const { data: sleepLogs, isLoading, error } = useFullLogs(user?.id);
  const [isMounted, setIsMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const rows: GridRowsProp = useMemo(() => {
    if (!sleepLogs) {
      return [];
    }

    return sleepLogs.map((log) => ({
      id: log.id,
      date: log.dateTime,
      bedtime: log.bedTime,
      wakeUpTime: log.wakeTime,
      totalSleep: log.duration,
      awake: `${log.awakeMins}m`,
      rem: `${log.remMins}m`,
      light: `${log.lightMins}m`,
      deep: `${log.deepMins}m`,
      efficiency: log.efficiency,
      skinTemperature: log.skinTemperature,
      breathingRate: log.breathingRate,
      hrv: log.hrv,
      spo2: log.spo2,
    }));
  }, [sleepLogs]);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 120,
      headerAlign: "center",
      align: "center",
      sortComparator: (v1, v2) =>
        new Date(v1).getTime() - new Date(v2).getTime(),
    },
    {
      field: "bedtime",
      headerName: "Bedtime",
      width: 120,
      headerAlign: "center",
      align: "center",
      sortComparator: (v1, v2) =>
        new Date(`01/01/2000 ${v1}`).getTime() -
        new Date(`01/01/2000 ${v2}`).getTime(),
    },
    {
      field: "wakeUpTime",
      headerName: "Wake Up Time",
      width: 130,
      headerAlign: "center",
      align: "center",
      sortComparator: (v1, v2) =>
        new Date(`01/01/2000 ${v1}`).getTime() -
        new Date(`01/01/2000 ${v2}`).getTime(),
    },
    {
      field: "totalSleep",
      headerName: "Total Sleep",
      width: 120,
      headerAlign: "center",
      align: "center",
      sortComparator: (v1, v2) => {
        const toMinutes = (s: string) => {
          const parts = s.split("h ");
          const hours = parseInt(parts[0], 10);
          const minutes = parseInt(parts[1].replace("m", ""), 10);
          return hours * 60 + minutes;
        };
        return toMinutes(v1) - toMinutes(v2);
      },
    },
    {
      field: "awake",
      headerName: "Awake",
      width: 100,
      headerAlign: "center",
      align: "center",
      sortComparator: (v1, v2) =>
        parseInt(v1.replace("m", "")) - parseInt(v2.replace("m", "")),
    },
    {
      field: "rem",
      headerName: "REM",
      width: 100,
      headerAlign: "center",
      align: "center",
      sortComparator: (v1, v2) =>
        parseInt(v1.replace("m", "")) - parseInt(v2.replace("m", "")),
    },
    {
      field: "light",
      headerName: "Light",
      width: 100,
      headerAlign: "center",
      align: "center",
      sortComparator: (v1, v2) =>
        parseInt(v1.replace("m", "")) - parseInt(v2.replace("m", "")),
    },
    {
      field: "deep",
      headerName: "Deep",
      width: 100,
      headerAlign: "center",
      align: "center",
      sortComparator: (v1, v2) =>
        parseInt(v1.replace("m", "")) - parseInt(v2.replace("m", "")),
    },
    {
      field: "efficiency",
      headerName: "Efficiency",
      width: 120,
      headerAlign: "center",
      align: "center",
      sortComparator: (v1, v2) => v1 - v2,
    },
    {
      field: "breathingRate",
      headerName: "Breathing Rate",
      width: 120,
      headerAlign: "center",
      align: "center",
      sortComparator: (v1, v2) => v1 - v2,
    },
    {
      field: "hrv",
      headerName: "HRV",
      width: 100,
      headerAlign: "center",
      align: "center",
      sortComparator: (v1, v2) => v1 - v2,
    },
    {
      field: "spo2",
      headerName: "SpO2",
      width: 100,
      headerAlign: "center",
      align: "center",
      sortComparator: (v1, v2) => v1 - v2,
    },
    {
      field: "skinTemperature",
      headerName: "Skin Temp",
      width: 120,
      headerAlign: "center",
      align: "center",
      sortComparator: (v1, v2) => v1 - v2,
    },
  ];

  const renderDataGrid = () => {
    if (!isMounted) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 650,
            width: "100%",
            maxWidth: "1180px",
            mx: "auto",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
    return (
      <Paper
        elevation={3}
        sx={{
          height: 650,
          width: "100%",
          maxWidth: "1180px",
          mx: "auto",
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: theme.palette.background.paper,
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.grey[100],
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
            fontSize: "0.95rem",
            color: theme.palette.text.secondary,
          },
          "& .MuiDataGrid-cell": {
            fontSize: "0.9rem",
            color: theme.palette.text.primary,
            borderBottom: `1px dashed ${theme.palette.grey[200]}`,
          },
          "& .MuiDataGrid-row": {
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.grey[50],
          },
        }}
      >
        <Box sx={{ height: "100%", overflowX: "auto" }}>
          <DataGrid
            sx={{ minWidth: "1450px" }}
            rows={rows}
            columns={columns}
            rowHeight={80}
            loading={isLoading}
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Box>
      </Paper>
    );
  };

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
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{
              textAlign: "center",
              height: "60vh",
              p: 2,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: theme.shadows[3],
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
          renderDataGrid()
        )}
      </Box>
    </Stack>
  );
};

export default History;
