import React from 'react';
import { Box, Typography } from '@mui/material';
import Background from '../assets/mushoku_tensei.png'
import Wheel from '../components/Wheel';

const speed = 3;

const Home = () => {
  const pages = [
    {name: 'page', link: "/uwu"},
    {name: 'page', link: "/uwu"},
    {name: 'page', link: "/uwu"},
    {name: 'page', link: "/uwu"},
    {name: 'page', link: "/uwu"},
    {name: 'page', link: "/uwu"},
    {name: 'page', link: "/uwu"},
    {name: 'page', link: "/uwu"},
  ]

  return (
    <>
    <Box
      sx={{
        backgroundImage: `url(${Background})`,
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        filter: 'blur(7px)'
      }}
      >
    </Box>
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Wheel pages={pages}/>
    </Box>
    </>
  )
};

export default Home;