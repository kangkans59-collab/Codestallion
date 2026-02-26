import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UploadButton from './Components/UploadButton/UploadButton';
import './App.css'
import React from 'react'
import { Box, CssBaseline } from '@mui/material'; // Box must be here!
import Navbar from './Components/Navbar/Navbar.jsx';
import Footer from './Components/Navbar/Footer.jsx';
import {BrowserRouter, Routes, Route} from "react-router-dom";

//Pages
import TempAnaly from './Pages/TempAnaly';
import Home from './Pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="/result/:fileId" element={<TempAnaly/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
  
}

export default App
