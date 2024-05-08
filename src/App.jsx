import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import theme from './theme'

import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Home from './pages/Home'

const App = () => {
  document.title = 'Xykeal'

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App