import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UploadButton from './Components/UploadButton/UploadButton';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <UploadButton />
    </div>
  );
  
}

export default App
