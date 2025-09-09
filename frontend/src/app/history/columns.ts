import { GridColDef } from "@mui/x-data-grid";

export const getHistoryTableColumns = (): GridColDef[] => [
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