import { Stack, Typography } from "@mui/material";

interface JourneyStatusHeaderProps {
  journeyTitle: string;
  progressText: string;
}

const JourneyStatusHeader = ({
  journeyTitle,
  progressText,
}: JourneyStatusHeaderProps) => {
  return (
    <Stack spacing={1.5} sx={{ textAlign: "center", maxWidth: "650px" }}>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 500 }}>
        {journeyTitle}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {progressText}
      </Typography>
    </Stack>
  );
};

export default JourneyStatusHeader;
