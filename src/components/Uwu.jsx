import React from 'react';
import { Box, Typography } from '@mui/material';

const speed = 3;

const Uwu = () => {
  return (
    <Box sx={{
      '@keyframes spin': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' }
      },
      animation: `spin ${speed}s ease-in-out infinite`,
    }}>
      <Typography variant='h1'>
        uwu
      </Typography>
    </Box>
  )
};

export default Uwu;