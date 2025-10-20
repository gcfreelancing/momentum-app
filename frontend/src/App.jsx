import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Timer from './pages/Timer'
import Tasks from './pages/Tasks'
import Settings from './pages/Settings'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext.jsx'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Login Route - Public */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route
                        path="/*"
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/timer" element={<Timer />} />
                                        <Route path="/tasks" element={<Tasks />} />
                                        <Route path="/settings" element={<Settings />} />
                                        <Route path="*" element={<Navigate to="/" replace />} />
                                    </Routes>
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App