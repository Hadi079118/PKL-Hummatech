import { useAuth } from '../context/useAuth'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-actions">
          {isAdmin && <Link to="/admin" className="btn-link">Halaman Admin</Link>}
          <button className="btn-logout" onClick={handleLogout}>
            Keluar
          </button>
        </div>
      </header>
      <main className="dashboard-content">
        <div className="welcome-card">
          <h2>Selamat datang, {user?.name}!</h2>
          <p>Email: {user?.email}</p>
          <p>Role: <span className={`role-badge role-${user?.role}`}>{user?.role}</span></p>
          <p>Anda berhasil login. Halaman ini dilindungi dan hanya bisa diakses setelah login.</p>
        </div>
      </main>
    </div>
  )
}
