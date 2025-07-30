import React from 'react';
import { Typography } from '@mui/material';
import AnalyticsItem from './AnalyticsItem';

const AverageWakeTime: React.FC = () => {
  return (
    <AnalyticsItem
      title="Average Wake Time"
      displayContent={<Typography variant="h5" fontWeight="bold">6:30 AM</Typography>}
      glanceItemSx={{
        borderRadius: 4,
        bgcolor: 'grey.100',
        color: 'grey.800',
      }}
      description="Your average wake time is the typical time you wake up. A consistent wake time is just as important as a consistent bedtime for your sleep health."
    />
  );
};

export default AverageWakeTime;