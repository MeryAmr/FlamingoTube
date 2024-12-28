import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MovieDetails from './pages/MovieDetails'
import MovieDiscovery from './pages/MovieDiscovery'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MovieDiscovery />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>
)