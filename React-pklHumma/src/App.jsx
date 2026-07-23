import React, { useState, useEffect } from 'react';

// ==========================================
// 1. CONTOH FUNCTIONAL COMPONENT & PROPS
// ==========================================
// Komponen anak bernama 'UserProfile' menerima data dari luar via 'props'
function UserProfile(props) {
  return (
    <div style={{ padding: '15px', backgroundColor: '#eef2f3', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>👤 Profil Pengguna</h3>
      {/* Membaca data dari props */}
      <p>Nama: <strong>{props.username}</strong></p>
      <p>Status: {props.status}</p>
    </div>
  );
}

// ==========================================
// 2. COMPONENT UTAMA (Wadah Project)
// ==========================================
export default function App() {
  
  // ==========================================
  // 3. CONTOH HOOKS (useState) & STATE
  // ==========================================
  // State untuk menyimpan teks input dari pengguna
  const [taskInput, setTaskInput] = useState('');
  
  // State untuk menyimpan daftar tugas (berupa Array of Objects)
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Belajar Sintaksis JSX', done: true },
    { id: 2, text: 'Pahami State dan Props', done: false }
  ]);

  // State untuk kontrol tampilan (Tampilkan/Sembunyikan profil)
  const [showProfile, setShowProfile] = useState(true);

  // ==========================================
  // 4. CONTOH HOOKS (useEffect)
  // ==========================================
  // Efek ini otomatis berjalan setiap kali data 'tasks' berubah
  useEffect(() => {
    // Mengubah judul tab browser secara dinamis
    document.title = `Tugas Terbuka: ${tasks.filter(t => !t.done).length}`;
    console.log('Data tugas diperbarui!');
  }, [tasks]); // [tasks] adalah dependency array

  // ==========================================
  // 5. CONTOH EVENT HANDLING (Fungsi Pengolah Aksi)
  // ==========================================
  // Menangani submit form untuk menambah tugas baru
  const handleAddTask = (event) => {
    event.preventDefault(); // Mencegah halaman web reload
    if (!taskInput.trim()) return; // Jika input kosong, batalkan

    const newTask = {
      id: Date.now(), // Membuat ID unik dari timestamp
      text: taskInput,
      done: false
    };

    setTasks([...tasks, newTask]); // Menambah tugas baru ke dalam array state
    setTaskInput(''); // Mengosongkan kembali form input
  };

  // Menangani aksi klik untuk mengubah status tugas (Selesai / Belum)
  const handleToggleDone = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      
      <h2>🎯 Mini Dashboard React (Tahap 7)</h2>

      {/* Button Event Handling untuk mengubah state penampil profil */}
      <button 
        onClick={() => setShowProfile(!showProfile)}
        style={{ marginBottom: '15px', padding: '8px 12px', cursor: 'pointer' }}
      >
        {showProfile ? 'Sembunyikan Profil' : 'Tampilkan Profil'}
      </button>

      {/* ==========================================
          6. CONTOH CONDITIONAL RENDERING
         ========================================== */}
      {/* Menggunakan operator ternary (kondisi ? jika_ya : jika_tidak) */}
      {showProfile ? (
        <UserProfile username="Developer Muda" status="Sedang Belajar React JS" />
      ) : (
        <p style={{ color: 'gray', fontStyle: 'italic' }}>Profil sedang disembunyikan.</p>
      )}

      <hr style={{ border: '0.5px solid #eee', margin: '20px 0' }} />

      {/* Form Input dengan Event Handling onSubmit dan onChange */}
      <form onSubmit={handleAddTask} style={{ marginBottom: '20px', display: 'flex', gap: '8px' }}>
        <input 
          type="text" 
          placeholder="Tulis tugas baru di sini..." 
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)} // Mengubah state saat mengetik
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Tambah
        </button>
      </form>

      <h3>📋 Daftar Tugas Anda:</h3>

      {/* ==========================================
          7. CONTOH LIST & KEY
         ========================================== */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((task) => (
          // Setiap elemen di dalam perulangan .map() wajib memiliki 'key' unik
          <li 
            key={task.id} 
            style={{ 
              padding: '12px', 
              marginBottom: '8px', 
              backgroundColor: '#f9f9f9', 
              borderRadius: '6px',
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              textDecoration: task.done ? 'line-through' : 'none', // Gaya bersyarat jika selesai
              color: task.done ? 'gray' : 'black'
            }}
          >
            <span>{task.text}</span>
            <button 
              onClick={() => handleToggleDone(task.id)}
              style={{ 
                padding: '4px 8px', 
                fontSize: '12px', 
                backgroundColor: task.done ? '#6c757d' : '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {task.done ? 'Batal' : 'Selesai'}
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}