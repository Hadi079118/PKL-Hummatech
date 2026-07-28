import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  // Simulasi status login (ganti jadi true jika ingin menguji akses dashboard)
  const isAuthenticated = false; 

  return (
    // Router utama menampung seluruh route aplikasi
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          {/* 1. Route Dasar */}
          {/* Route dasar adalah path tetap yang langsung merender komponen halaman. */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />

          {/* 2. Redirect */}
          {/* Redirect mengalihkan path lama/alias ke path baru tanpa menampilkan komponen lama. */}
          <Route path="/old-about" element={<Navigate to="/about" replace />} />

          {/* 3. Dynamic Route */}
          {/* Dynamic route menggunakan parameter URL seperti :userId untuk memuat konten spesifik pengguna. */}
          <Route path="/profile/:userId" element={<Profile />} />

          {/* 4. Protected Route */}
          {/* Protected route hanya merender anak route ketika pengguna diizinkan (isAllowed true). */}
          <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
            {/* 4a. Nested Route di dalam Dashboard */}
            {/* Nested route membuat sub-halaman /dashboard/analytics dan /dashboard/settings berada di bawah /dashboard. */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="analytics" element={<div>=== Halaman Analitik ===</div>} />
              <Route path="settings" element={<div>=== Halaman Pengaturan ===</div>} />
            </Route>
          </Route>

          {/* 5. Penanganan 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
