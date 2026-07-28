import { useParams } from 'react-router-dom';

const Profile = () => {
  // Mengambil parameter :userId dari URL
  const { userId } = useParams();

  return (
    <div>
      <h2>Halaman Profil</h2>
      <p>ID Pengguna yang sedang diakses: <strong>{userId}</strong></p>
    </div>
  );
};

export default Profile;
