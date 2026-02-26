
import { useState } from 'react'

import UploadButton from '../Components/UploadButton/UploadButton.jsx';
import { Box, CssBaseline } from '@mui/material'; // Box must be here!
import Navbar from '../Components/Navbar/Navbar.jsx';
import Footer from '../Components/Navbar/Footer.jsx';

export default function Home() {
    return (
        <>
   <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Your other page components go here */}
      </Box>
        <div className="App">
      <UploadButton />
    </div>
      

      {/* <Footer /> */}
    </Box>
        </>
    )
}