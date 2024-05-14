import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import theme from './theme'

import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Home from './pages/Home'
import Limbo from './pages/Limbo'
import Spire from './pages/Spire'
import Nowhere from './pages/Nowhere'

const App = () => {
  document.title = 'Xykeal'

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/uwu" element={<Limbo />} />
        <Route path="/spire" element={<Spire />} />
        <Route path="/nowhere" element={<Nowhere />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App