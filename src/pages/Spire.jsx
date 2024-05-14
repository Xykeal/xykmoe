import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const home = 'src/assets/Spire/Home.html';

const Spire = () => {
  document.title = 'Xykeal - Stuff'

  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    // hi bro
    if (password === 'password') {
      setAuth(true)
      setError('')
      setLoading(true)
    } else {
      setError('incorrect password')
    }
  }

  return (
    auth
      ? <>
        {loading && 
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h1'>
              Loading...
            </Typography>
          </Box>
        }
        <iframe src={home} style={{ position: 'absolute', height: '100%', width: '100%', border: 'none', display: loading ? 'none' : 'block' }} onLoad={() => setLoading(false)} />
      </>
      : <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          label="secret code..."
          type='text'
          variant="filled"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={error !== ''}
          helperText={error}
        />
        <Button size='large' label="back button" onClick={handleSubmit} sx={{ m: 1 }}>
          Submit
        </Button>
        <Button size='large' label="back button" onClick={() => navigate(-1)} sx={{ m: 1 }}>
          Back
        </Button>
      </Box>
  )
};

export default Spire;