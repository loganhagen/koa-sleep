"use client";

import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Box, Paper, CircularProgress, useTheme } from "@mui/material";
import { useState, useEffect } from "react";

interface HistoryTableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  isLoading: boolean;
}

const HistoryTable = ({ rows, columns, isLoading }: HistoryTableProps) => {
  const theme = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

export default HistoryTable;