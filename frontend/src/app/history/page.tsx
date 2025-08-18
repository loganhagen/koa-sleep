"use client";

import { useState, useEffect } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Box, Typography, Chip, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const History = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activities = {
    "Late Coffee": { label: "Late Coffee", color: "warning" as const },
    "Stressful Day": { label: "Stressful Day", color: "error" as const },
    Meditation: { label: "Meditation", color: "success" as const },
    Exercised: { label: "Exercised", color: "primary" as const },
    "Ate Late": { label: "Ate Late", color: "warning" as const },
    "Good Meal": { label: "Good Meal", color: "info" as const },
  };

  const feelingConfig = {
    Rested: { label: "Rested", color: "info" as const },
    Tired: { label: "Tired", color: "warning" as const },
    Great: { label: "Great", color: "success" as const },
    Okay: { label: "Okay", color: "secondary" as const },
  };

  const rows: GridRowsProp = [
    {
      id: 1,
      date: "2024-07-28",
      bedtime: "23:30",
      wakeUpTime: "07:00",
      totalSleep: "7h 30m",
      efficiency: "92",
      feeling: "Rested",
      dailyActivities: [activities["Late Coffee"], activities["Exercised"]],
    },
    {
      id: 2,
      date: "2024-07-27",
      bedtime: "00:15",
      wakeUpTime: "07:00",
      totalSleep: "6h 45m",
      efficiency: "88",
      feeling: "Tired",
      dailyActivities: [activities["Stressful Day"]],
    },
    {
      id: 3,
      date: "2024-07-26",
      bedtime: "22:45",
      wakeUpTime: "07:00",
      totalSleep: "8h 15m",
      efficiency: "96",
      feeling: "Great",
      dailyActivities: [activities["Meditation"], activities["Good Meal"]],
    },
    {
      id: 4,
      date: "2024-07-25",
      bedtime: "23:55",
      wakeUpTime: "06:55",
      totalSleep: "7h 00m",
      efficiency: "90",
      feeling: "Okay",
      dailyActivities: [activities["Ate Late"]],
    },
    {
      id: 5,
      date: "2024-07-24",
      bedtime: "23:10",
      wakeUpTime: "07:00",
      totalSleep: "7h 50m",
      efficiency: "94",
      feeling: "Rested",
      dailyActivities: [activities["Exercised"]],
    },
    {
      id: 6,
      date: "2024-07-23",
      bedtime: "00:30",
      wakeUpTime: "07:00",
      totalSleep: "6h 30m",
      efficiency: "85",
      feeling: "Tired",
      dailyActivities: [activities["Late Coffee"], activities["Stressful Day"]],
    },
    {
      id: 7,
      date: "2024-07-22",
      bedtime: "23:00",
      wakeUpTime: "07:00",
      totalSleep: "8h 00m",
      efficiency: "95",
      feeling: "Great",
      dailyActivities: [
        activities["Meditation"],
        activities["Exercised"],
        activities["Good Meal"],
        activities["Ate Late"],
      ],
    },
    {
      id: 8,
      date: "2024-07-21",
      bedtime: "23:45",
      wakeUpTime: "07:00",
      totalSleep: "7h 15m",
      efficiency: "91",
      feeling: "Rested",
      dailyActivities: [activities["Exercised"]],
    },
    {
      id: 9,
      date: "2024-07-20",
      bedtime: "01:00",
      wakeUpTime: "07:05",
      totalSleep: "6h 05m",
      efficiency: "82",
      feeling: "Tired",
      dailyActivities: [activities["Late Coffee"], activities["Ate Late"]],
    },
    {
      id: 10,
      date: "2024-07-19",
      bedtime: "22:15",
      wakeUpTime: "07:00",
      totalSleep: "8h 45m",
      efficiency: "98",
      feeling: "Great",
      dailyActivities: [activities["Meditation"]],
    },
    {
      id: 11,
      date: "2024-07-18",
      bedtime: "23:40",
      wakeUpTime: "07:00",
      totalSleep: "7h 20m",
      efficiency: "93",
      feeling: "Okay",
      dailyActivities: [activities["Good Meal"], activities["Exercised"]],
    },
    {
      id: 12,
      date: "2024-07-17",
      bedtime: "01:10",
      wakeUpTime: "07:00",
      totalSleep: "5h 50m",
      efficiency: "80",
      feeling: "Tired",
      dailyActivities: [activities["Stressful Day"], activities["Late Coffee"]],
    },
    {
      id: 13,
      date: "2024-07-16",
      bedtime: "22:50",
      wakeUpTime: "07:00",
      totalSleep: "8h 10m",
      efficiency: "95",
      feeling: "Rested",
      dailyActivities: [activities["Good Meal"]],
    },
    {
      id: 14,
      date: "2024-07-15",
      bedtime: "23:05",
      wakeUpTime: "07:00",
      totalSleep: "7h 55m",
      efficiency: "97",
      feeling: "Great",
      dailyActivities: [activities["Meditation"], activities["Exercised"]],
    },
  ];

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
      field: "efficiency",
      headerName: "Efficiency",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "feeling",
      headerName: "Feeling",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        const feeling =
          feelingConfig[params.value as keyof typeof feelingConfig];
        if (!feeling) return null;
        return <Chip label={feeling.label} color={feeling.color} />;
      },
    },
    {
      field: "dailyActivities",
      headerName: "Daily Activities",
      flex: 1,
      minWidth: 400,
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => {
        const allActivities = params.value as {
          label: string;
          color: any;
        }[];
        if (!Array.isArray(allActivities)) return null;

        const visibleActivities = allActivities.slice(0, 3);
        const hasMore = allActivities.length > 3;

        return (
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{
              height: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
              pl: 2,
            }}
          >
            {visibleActivities.map((activity) => (
              <Chip
                key={activity.label}
                label={activity.label}
                variant="outlined"
                color={activity.color}
                size="small"
              />
            ))}
            {hasMore && <AddIcon fontSize="small" color="action" />}
          </Stack>
        );
      },
    },
  ];

  return (
    <Stack>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Sleep History
      </Typography>
      <Box sx={{ width: "100%", p: 4 }}>
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
            <DataGrid rows={rows} columns={columns} rowHeight={80} />
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default History;
