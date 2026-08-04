import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function ProtectedRoute({ roles, children }) {
  const { isAuthenticated, hasRole, loading } = useAuth()

  if (loading) {
    return <div className="loading-screen">Memuat...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (roles && !hasRole(roles)) {
    return <Navigate to="/" replace />
  }

  return children
}
