import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Nowhere = () => {
  document.title = 'stuff todo ...'

  const navigate = useNavigate();

  return (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h1'>
        owo
      </Typography>
      <Button size='large' label="back button" color='error' onClick={() => navigate(-1)} sx={{ mt: 1 }}>
        leave
      </Button>
    </Box>
  )
};

export default Nowhere;