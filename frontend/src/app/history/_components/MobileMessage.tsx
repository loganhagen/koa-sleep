import { Box, Typography, Stack, useTheme } from "@mui/material";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";

const MobileMessage = () => {
  const theme = useTheme();
  return (
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
  );
};

export default MobileMessage;