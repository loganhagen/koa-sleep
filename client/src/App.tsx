import { Box, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import SleepChart from "./components/SleepChart";

function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
          }}
        >
          <SleepChart />
        </Box>
      </Container>
    </>
  );
}

export default App;
