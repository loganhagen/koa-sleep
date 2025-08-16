import { Stack, Paper, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { SxProps, Theme } from "@mui/material/styles";

interface RecommendedJourneyCardProps {
  sx?: SxProps<Theme>;
}

const RecommendedJourneyCard = ({ sx }: RecommendedJourneyCardProps) => (
  <Paper
    elevation={0}
    variant="outlined"
    sx={{
      p: 4,
      borderRadius: 10,
      backgroundColor: "background.paper",
      textAlign: "left",
      maxWidth: "600px",
      width: "100%",
      borderColor: "primary.main",
      borderWidth: "2px",
      ...sx,
    }}
  >
    <Stack spacing={3}>
      <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
        Recommended for you
      </Typography>
      <Typography variant="body1">
        Based on your data, your bedtime varies by <strong>45 min</strong>.
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
          Start Journey
        </Button>
        <Button variant="text">Learn More</Button>
      </Stack>
    </Stack>
  </Paper>
);

export default RecommendedJourneyCard;
