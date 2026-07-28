import { Navigate, Outlet } from 'react-router-dom';

// Komponen pengetatan akses halaman
const ProtectedRoute = ({ isAllowed, redirectPath = '/login' }) => {
  // Jika pengguna belum login atau tidak diizinkan, redirect ke halaman login
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  // Jika diizinkan, <Outlet /> merender route anak yang dibungkus oleh ProtectedRoute.
  return <Outlet />;
};

export default ProtectedRoute;
