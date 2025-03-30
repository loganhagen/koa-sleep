import { Box, Grid, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import SleepChart from "./components/SleepChart";
import HeartRateChart from "./components/HeartRateChart";

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100vw",
            margin: 0,
            padding: 0,
            position: "relative",
            left: 0,
            right: 0,
            top: 0,
          }}
        >
          <Navbar />
        </Box>

        <Box sx={{ p: 0, m: 1 }}>
          <Grid container spacing={3}>
            <HeartRateChart />
            <SleepChart />
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default App;
