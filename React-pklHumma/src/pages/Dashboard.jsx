import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Panel Dashboard Utama</h2>
      <p>Ini adalah area rahasia yang memerlukan login.</p>
      
      {/* Menu navigasi internal dashboard */}
      <div style={{ margin: '15px 0', gap: '10px', display: 'flex' }}>
        <Link to="/dashboard/analytics">Lihat Analitik</Link>
        <Link to="/dashboard/settings">Lihat Pengaturan</Link>
      </div>

      {/* Nested route: <Outlet /> menampilkan konten sub-halaman di bawah route /dashboard */}
      <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
