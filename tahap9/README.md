# Auth & Form — Login + Proteksi Halaman + Authorization

## Stack

| Teknologi | Kegunaan |
|---|---|
| React 19 | UI framework |
| react-router-dom v7 | Routing & proteksi halaman |
| react-hook-form | Form + validasi (library) |
| localStorage | Penyimpanan token |

---

## Struktur File

```
src/
├── context/
│   ├── AuthContext.jsx      # createContext — wadah state global auth
│   ├── AuthProvider.jsx     # Provider — logic login/logout, token, loading, role
│   └── useAuth.js           # Custom hook — akses AuthContext
├── components/
│   └── ProtectedRoute.jsx   # Route guard — cek login + cek role (authorization)
├── pages/
│   ├── Login.jsx            # Halaman login (2 mode validasi)
│   ├── Dashboard.jsx        # Halaman protected setelah login
│   └── Admin.jsx            # Halaman khusus role admin
├── App.jsx                  # Routing: /login (public), / & /admin (protected)
└── main.jsx                 # Entry: BrowserRouter → AuthProvider → App
```

---

## Alur Auth

```
User akses /
        │
        ▼
 ProtectedRoute
   │            │
   cek token    │
   di context   │
   ───────      │
   │     │      │
  ada  tidak    │
   │     │      │
   ▼     └──→ Navigate ke /login
   │                  │
   │            Form login
   │            email + password
   │                  │
   │            login() di AuthContext
   │            → mock API (1.5s delay)
   │            → cocokkan email & password
   │              dengan MOCK_USERS
   │                  │
   │            sukses? ────→ gagal → error banner
   │                  │
   │            simpan token & user
   │            (termasuk role)
   │            ke localStorage & state
   │                  │
   └──←── navigate('/')
        │
        ▼
     Dashboard
     (keluar → logout → hapus localStorage → redirect /login)
```

### Authorization (cek role)

```
User akses /admin
        │
        ▼
 ProtectedRoute roles={['admin']}
   │            │
   cek login    │
   ───────      │
   │     │      │
  ada  tidak    │
   │     │      └──→ Navigate ke /login
   │     ▼
   │  cek role
   │  hasRole(['admin'])
   │  ────────
   │  │      │
   │ admin  user
   │  │      │
   │  ▼      └──→ Navigate ke / (redirect)
   │
   ▼
 Admin.jsx
 (tabel daftar akun, hanya admin yang bisa lihat)
```

---

## Fitur Authorization (RBAC) — Yang Ditambahkan

Authorization adalah aturan **"siapa boleh mengakses apa"** — berbeda dari autentikasi ("apakah sudah login?"). Fitur ini menambahkan **role-based access control** dengan 2 role:

| Role | Akses `/` (Dashboard) | Akses `/admin` |
|---|---|---|
| `admin` | ✅ | ✅ |
| `user` | ✅ | ❌ (redirect ke `/`) |

### 1. Role pada user — `src/context/AuthProvider.jsx`

- `MOCK_USERS` berisi akun dengan field `role: 'admin'` atau `role: 'user'`.
- Role disimpan bersama data user ke localStorage & state, lalu di-expose lewat context.
- Helper baru yang tersedia:
  - `isAdmin` — `true` jika user berrole `admin`
  - `hasRole(roles)` — menerima array role, misal `hasRole(['admin'])`; mengembalikan `true` jika role user ada di daftar

```js
const hasRole = useCallback((roles) => {
  if (!user) return false
  if (!roles || roles.length === 0) return true
  return roles.includes(user.role)
}, [user])
```

### 2. Route guard dengan role — `src/components/ProtectedRoute.jsx`

`ProtectedRoute` sekarang menerima prop `roles`. Urutan pengecekan:

1. Belum login → redirect `/login`
2. Sudah login tapi role tidak diizinkan → redirect `/`
3. Login & role cocok → render halaman

### 3. Halaman Admin — `src/pages/Admin.jsx`

Halaman baru khusus admin yang menampilkan daftar akun (id, nama, email, role). Hanya bisa diakses lewat `/admin`.

### 4. Routing — `src/App.jsx`

```jsx
<Route
  path="/admin"
  element={
    <ProtectedRoute roles={['admin']}>
      <Admin />
    </ProtectedRoute>
  }
/>
```

### 5. Tampilan dinamis — `src/pages/Dashboard.jsx`

- Badge role (`admin` merah / `user` aksen) di kartu selamat datang.
- Link "Halaman Admin" hanya dirender jika `isAdmin === true`.

> Catatan: role di sini masih **mock** (akun hardcoded di frontend). Pada aplikasi asli, role seharusnya dikirim server (misal payload JWT) dan divalidasi ulang di backend — jangan pernah hanya mengandalkan cek di frontend untuk keamanan sungguhan.

---

## Form Handling — 2 Mode Validasi

### Alur Umum Form Login

```
User mengetik email & password
        │
        ├── Mode 1 (basic): onChange → setState → validasi manual
        └── Mode 2 (RHF):   Controller → register ke useForm
        │
        ▼
Submit
        │
        ├── validasi client (required, format email, min 6 karakter)
        │      └── ada error? → tampilkan pesan per-field, berhenti
        ▼
Panggil login(email, password) → mock API
        │
        ├── gagal → error banner + setError('root') 
        └── sukses → simpan token & user → navigate('/')
```

### Mode 1: Basic Validation (manual)

File: `src/pages/Login.jsx:6-92`

| Konsep | Cara |
|---|---|
| **Controlled component** | `useState` → `value` + `onChange` binding |
| **Validasi** | Fungsi `basicValidate()` — required, email regex, min length |
| **Touched** | `onBlur` → flag `touched` → error muncul setelah interaksi |
| **Error display** | `basicErrors.email && touched.email && <span>` |
| **Loading** | State `loading` → button `disabled` + teks "Memproses..." |
| **Server error** | `try/catch` → `setServerError(msg)` → banner merah |

### Mode 2: React Hook Form (library)

File: `src/pages/Login.jsx:94-156` — penjelasan fungsi tiap bagian:

| Konsep | Cara |
|---|---|
| **Controlled component** | `<Controller>` → `render={({ field })}` → spread `{...field}` |
| **Validasi** | `rules: { required, pattern, minLength }` di Controller |
| **Error display** | `formState.errors.email.message` |
| **Loading** | `isSubmitting` dari react-hook-form |
| **Server error** | `setError('root', ...)` + `error.root.message` |

> **Apa fungsi react-hook-form?** React Hook Form adalah library untuk mengelola state form & validasi — ia **bukan** library authorization. Fungsinya di proyek ini: menyimpan nilai input (`Controller`), memvalidasi (`rules`), mengelola status submit (`isSubmitting`), dan menyediakan error per-field. Authorization ditangani terpisah oleh `AuthProvider` + `ProtectedRoute` (lihat bagian "Fitur Authorization").

Perbedaan utama: react-hook-form mengelola state, validasi, dan error secara otomatis (tidak perlu `touched`, `setState` per field, atau `basicValidate` manual).

---

## Credentials Login

| Email | Password | Role |
|---|---|---|
| `admin@example.com` | `admin123` | `admin` |
| `user@example.com` | `password123` | `user` |

Kombinasi lain akan menampilkan error `"Email atau password salah"`.

---

## Run

```bash
npm run dev
```
