"use client";

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Box, Typography, Chip, Stack } from "@mui/material";

const History = () => {
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
      totalSleep: "7h 30m",
      feeling: "Rested",
      dailyActivities: [activities["Late Coffee"], activities["Exercised"]],
    },
    {
      id: 2,
      date: "2024-07-27",
      totalSleep: "6h 45m",
      feeling: "Tired",
      dailyActivities: [activities["Stressful Day"]],
    },
    {
      id: 3,
      date: "2024-07-26",
      totalSleep: "8h 15m",
      feeling: "Great",
      dailyActivities: [activities["Meditation"], activities["Good Meal"]],
    },
    {
      id: 4,
      date: "2024-07-25",
      totalSleep: "7h 00m",
      feeling: "Okay",
      dailyActivities: [activities["Ate Late"]],
    },
    {
      id: 5,
      date: "2024-07-24",
      totalSleep: "7h 50m",
      feeling: "Rested",
      dailyActivities: [activities["Exercised"]],
    },
    {
      id: 6,
      date: "2024-07-23",
      totalSleep: "6h 30m",
      feeling: "Tired",
      dailyActivities: [activities["Late Coffee"], activities["Stressful Day"]],
    },
    {
      id: 7,
      date: "2024-07-22",
      totalSleep: "8h 00m",
      feeling: "Great",
      dailyActivities: [
        activities["Meditation"],
        activities["Exercised"],
        activities["Good Meal"],
      ],
    },
    {
      id: 8,
      date: "2024-07-21",
      totalSleep: "7h 15m",
      feeling: "Rested",
      dailyActivities: [activities["Exercised"]],
    },
    {
      id: 9,
      date: "2024-07-20",
      totalSleep: "6h 05m",
      feeling: "Tired",
      dailyActivities: [activities["Late Coffee"], activities["Ate Late"]],
    },
    {
      id: 10,
      date: "2024-07-19",
      totalSleep: "8h 45m",
      feeling: "Great",
      dailyActivities: [activities["Meditation"]],
    },
    {
      id: 11,
      date: "2024-07-18",
      totalSleep: "7h 20m",
      feeling: "Okay",
      dailyActivities: [activities["Good Meal"], activities["Exercised"]],
    },
    {
      id: 12,
      date: "2024-07-17",
      totalSleep: "5h 50m",
      feeling: "Tired",
      dailyActivities: [activities["Stressful Day"], activities["Late Coffee"]],
    },
    {
      id: 13,
      date: "2024-07-16",
      totalSleep: "8h 10m",
      feeling: "Rested",
      dailyActivities: [activities["Good Meal"]],
    },
    {
      id: 14,
      date: "2024-07-15",
      totalSleep: "7h 55m",
      feeling: "Great",
      dailyActivities: [activities["Meditation"], activities["Exercised"]],
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "enlarged-header",
      cellClassName: "enlarged-cell",
    },
    {
      field: "totalSleep",
      headerName: "Total Sleep",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "enlarged-header",
      cellClassName: "enlarged-cell",
    },
    {
      field: "feeling",
      headerName: "Feeling",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "enlarged-header",
      cellClassName: "enlarged-cell",
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
      minWidth: 250,
      headerAlign: "center",
      headerClassName: "enlarged-header",
      renderCell: (params: GridRenderCellParams) => (
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          sx={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Array.isArray(params.value) &&
            params.value.map((activity) => (
              <Chip
                key={activity.label}
                label={activity.label}
                variant="outlined"
                color={activity.color}
                size="small"
              />
            ))}
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <Typography
        variant="h4"
        textAlign={"center"}
        gutterBottom
        component="div"
        sx={{ mb: 4 }}
      >
        Sleep History
      </Typography>
      <Box
        sx={{
          p: 1,
          borderRadius: 4,
          bgcolor: "background.paper",
          "& .enlarged-header .MuiDataGrid-columnHeaderTitle": {
            fontSize: "1.1rem",
            fontWeight: "bold",
          },
          "& .enlarged-cell": {
            fontSize: "1rem",
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} rowHeight={80} />
      </Box>
    </Box>
  );
};

export default History;
