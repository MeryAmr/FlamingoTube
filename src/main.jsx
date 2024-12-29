import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MovieDetails from './pages/MovieDetails'
import MovieDiscovery from './pages/MovieDiscovery'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'
import './styles/pages.css'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MovieDiscovery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
)