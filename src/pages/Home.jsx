import React from 'react';
import { Box } from '@mui/material';
import Background from '../assets/mushoku_tensei.png'
import Wheel from '../components/Wheel';
import Primogem from '/primogem.png';
import Spire from '../assets/spire.svg'

const backgroundBlur = '7px';
const pages = [
  {name: 'todo', link: "/uwu", image: Primogem},
  {name: 'Stuff', link: "/spire", image: Spire},
  {name: '', link: "/nowhere", image: ''},
  {name: 'todo', link: "/uwu", image: Primogem},
  {name: 'todo', link: "/uwu", image: Primogem},
]

const Home = () => {
  document.title = 'Xykeal - Home'
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${Background})`,
          height: '100vh',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          filter: `blur(${backgroundBlur})`
        }}
        >
      </Box>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Wheel pages={pages}/>
      </Box>
    </Box>
  )
};

export default Home;