import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UploadButton from './Components/UploadButton/UploadButton';
import './App.css'
import React from 'react'
import { Box, CssBaseline } from '@mui/material'; // Box must be here!
import Navbar from './Components/Navbar/Navbar.jsx'
import Footer from './Components/Navbar/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return(
    <>
    <div className="App">
      <UploadButton />
    </div>
   <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/*<h1>Welcome to the Dashboard</h1>*/}
        {/* Your other page components go here */}
      </Box>

      <Footer />
    </Box>
    </>
  )
  
}

export default App
