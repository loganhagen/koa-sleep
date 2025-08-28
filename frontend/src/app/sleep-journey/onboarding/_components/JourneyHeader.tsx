import { Box, Typography } from "@mui/material";

const JourneyHeader = () => (
  <Box sx={{ textAlign: "center", maxWidth: "750px", px: { xs: 2, sm: 0 } }}>
    <Typography
      variant="h3"
      component="h1"
      gutterBottom
      sx={{
        fontSize: {
          xs: "2.5rem",
          sm: "3rem",
        },
      }}
    >
      Sleep Journey
    </Typography>
    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
      Transform your sleep habits with personalized daily coaching.
    </Typography>
    <Typography variant="body1" color="text.secondary">
      Our journeys are guided programs designed to help you understand your
      patterns and build healthier habits. Each step is tailored to you, helping
      you achieve your sleep goals at your own pace.
    </Typography>
  </Box>
);

export default JourneyHeader;
