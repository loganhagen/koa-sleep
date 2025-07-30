import React from 'react';
import { Typography } from '@mui/material';
import AnalyticsItem from './AnalyticsItem';

const AverageBedtime: React.FC = () => {
  return (
    <AnalyticsItem
      title="Average Bedtime"
      displayContent={<Typography variant="h5" fontWeight="bold">10:30 PM</Typography>}
      glanceItemSx={{
        borderRadius: 4,
        bgcolor: 'grey.100',
        color: 'grey.800',
      }}
      description="Your average bedtime is the typical time you go to sleep. A consistent bedtime helps regulate your body's internal clock."
    />
  );
};

export default AverageBedtime;