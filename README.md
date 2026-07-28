# PKL-Hummatech
Repository untuk latihan
# Aplikasi React Router - Tahap 8

Proyek ini mendemonstrasikan implementasi sistem navigasi (routing) di React JS menggunakan library `react-router-dom` v6.

## Fitur yang Diimplementasikan
1. **Route Dasar**: Navigasi halaman Home, About, dan Login.
2. **Dynamic Route**: Penggunaan parameter URL dinamis pada halaman `/profile/:userId`.
3. **Nested Route**: Implementasi sub-halaman di dalam panel `/dashboard`.
4. **Redirect**: Pengalihan otomatis dari URL lama `/old-about` ke `/about`.
5. **Protected Route**: Pembatasan akses halaman `/dashboard` berbasis status login pengguna.

## Langkah Setup & Penggunaan

### 1. Kloning Repositori
```bash
git clone <url-repositori-github-anda>
cd <nama-folder-proyek>
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Aplikasi secara Lokal
```bash
npm run dev
```
Buka alamat lokal yang tertera di terminal (biasanya `http://localhost:5173`) pada browser Anda.

### 4. Menguji Proteksi Halaman
Untuk menguji fitur **Protected Route**, buka file `src/App.jsx` dan ubah variabel status login berikut:
* `const isAuthenticated = false;` -> Pengguna akan dialihkan ke halaman `/login` saat mencoba mengakses dashboard.
* `const isAuthenticated = true;` -> Pengguna diizinkan masuk dan melihat isi halaman `/dashboard`.
