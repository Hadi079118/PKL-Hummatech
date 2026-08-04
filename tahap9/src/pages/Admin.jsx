import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router-dom'

const MOCK_ACCOUNTS = [
  { id: 1, name: 'Hadi', email: 'admin@example.com', role: 'admin' },
  { id: 2, name: 'Budi', email: 'user@example.com', role: 'user' },
]

export default function Admin() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Halaman Admin</h1>
        <button className="btn-logout" onClick={handleLogout}>
          Keluar
        </button>
      </header>
      <main className="dashboard-content">
        <div className="welcome-card">
          <h2>Selamat datang, {user?.name}!</h2>
          <p>Role: <span className="role-badge">admin</span></p>
          <p>Halaman ini hanya bisa diakses oleh pengguna dengan role admin.</p>
        </div>
        <div className="admin-table-card">
          <h3>Daftar Akun</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ACCOUNTS.map(acc => (
                <tr key={acc.id}>
                  <td>{acc.id}</td>
                  <td>{acc.name}</td>
                  <td>{acc.email}</td>
                  <td><span className={`role-badge role-${acc.role}`}>{acc.role}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
