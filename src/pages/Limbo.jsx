import React from 'react';
import { Box, Button } from '@mui/material';
import Uwu from '../components/Uwu';
import { useNavigate } from 'react-router-dom';

const Limbo = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Uwu />
      <Button size='large' label="back button" onClick={() => navigate(-1)} sx={{ mt: 7 }}>
        Back
      </Button>
    </Box>
  )
};

export default Limbo;