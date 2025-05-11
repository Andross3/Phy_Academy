import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PaginaCodigo from './pages/paginaCodigo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes> 
        <Route path="/paginaCodigo" element={<PaginaCodigo />} />
      </Routes>
    </Router>
  )
}

export default App
