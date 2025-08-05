import { Paper, Stack, Divider, Typography, Box } from "@mui/material";
import Greeting from "./Greeting";
import MostRecentSleep from "./MostRecentSleep";

const Header = () => {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 10,
        backgroundColor: "background.paper",
      }}
    >
      <Stack spacing={5}>
        <Stack direction="row" spacing={5} alignItems="center">
          <Greeting />
          <Divider orientation="vertical" flexItem />
          <Stack spacing={2} alignItems="center">
            <Typography variant="h6" component="h2">
              Your Last Sleep
            </Typography>
            <MostRecentSleep />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Header;
