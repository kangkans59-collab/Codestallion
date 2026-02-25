import { useState } from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import TempAnaly from './Pages/TempAnaly';
import Home from './Pages/Home';

function App() {
  const [count, setCount] = useState(0)

    return (
      <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/Temporary-Analytics" element={<TempAnaly />} />
      </Routes>
    </BrowserRouter>
    )
  
  
}

export default App
