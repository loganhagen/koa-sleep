import React from 'react';
import { Typography } from '@mui/material';
import AnalyticsItem from './AnalyticsItem';

const SleepConsistency: React.FC = () => {
  return (
    <AnalyticsItem
      title="Sleep Consistency"
      displayContent={<Typography variant="h4" fontWeight="bold">A</Typography>}
      glanceItemSx={{
        borderRadius: '50%',
        background: 'linear-gradient(145deg, #2CDFFF, #00A2E8)',
        color: 'secondary.contrastText',
        boxShadow: '0px 4px 15px rgba(0, 162, 232, 0.25)',
      }}
      description="A high sleep consistency score means you're maintaining a regular sleep schedule, which is great for your circadian rhythm."
    />
  );
};

export default SleepConsistency;