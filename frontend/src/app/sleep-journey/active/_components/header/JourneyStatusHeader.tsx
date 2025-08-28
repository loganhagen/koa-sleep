import { Stack, Typography } from "@mui/material";

interface JourneyStatusHeaderProps {
  journeyTitle: string;
  progressText: string;
  description: string;
}

const JourneyStatusHeader = ({
  journeyTitle,
  progressText,
  description,
}: JourneyStatusHeaderProps) => {
  return (
    <Stack spacing={1.5} sx={{ textAlign: "center", maxWidth: "650px" }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ fontWeight: 500, fontSize: { xs: "1.75rem", sm: "2.125rem" } }}
      >
        {journeyTitle}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {progressText}
      </Typography>
    </Stack>
  );
};

export default JourneyStatusHeader;
