import React from 'react';
import { Box, Typography } from '@mui/material';
import Uwu from '../components/Uwu';

const speed = 3;

const Limbo = () => {
  return (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Uwu />
    </Box>
  )
};

export default Limbo;