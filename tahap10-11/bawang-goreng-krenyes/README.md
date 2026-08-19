# Bawang Goreng Krenyes — Aplikasi Manajemen Stok & Katalog

Aplikasi web untuk manajemen stok dan katalog produk "Bawang Goreng Krenyes" (React 19 + Vite + Tailwind CSS 4).

## Teknologi

- **React 19** + **Vite 6** — framework & build tool
- **Tailwind CSS 4** — styling
- **TypeScript (tsc)** — type checking (`npm run lint`)
- **lucide-react / motion** — ikon & animasi
- **fetch native** — integrasi REST API (tanpa library tambahan)

## Cara Menjalankan

```bash
npm install
npm run dev        # development server (port 3000)
npm run build      # production build
npm run preview    # preview hasil build
npm run lint       # type-check dengan tsc
```

## Struktur Proyek

```
src/
├── api/
│   └── bawangService.js        # Service layer: getProducts() (API / simulasi)
├── data/
│   └── mockData.js             # Data awal produk & pesanan
├── hooks/
│   ├── useDebouncedValue.js    # Debounce reusable (optimasi performa)
│   └── useProductTable.js      # State management search/filter/sort/pagination
├── components/
│   ├── App.jsx                 # State global & routing antar tab
│   ├── Header.jsx              # Pencarian global di header
│   ├── KatalogView.jsx         # Katalog produk (search, filter, sort, pagination)
│   ├── ManajemenStokView.jsx   # Tabel stok (search, filter, sort, pagination)
│   ├── Pagination.jsx          # Komponen pagination reusable
│   └── ... (modal, dashboard, dsb.)
```

## Fitur Search / Filter / Sort / Pagination

| Fitur | Katalog | Manajemen Stok | Implementasi |
|---|---|---|---|
| **Search** | Debounce 350ms (dari Header) | Debounce 350ms + tombol "Cari"/Enter (submit) | `useProductTable` + `useDebouncedValue` |
| **Filter** | Kategori (Semua/Original/Pedas/Kiloan) | Status stok (Semua/Tersedia/Menipis/Habis) | server-side di `bawangService.processProducts` |
| **Sort** | Relevan/Best Seller/Harga/Nama | Terbaru/Stok/Nama/Harga | server-side switch `sort` |
| **Pagination** | 6 kartu/halaman | 5 baris/halaman | komponen `Pagination` |
| **Reset** | Tombol "Reset Filter" | Tombol "Reset" / "Reset Filter & Cari" | `reset()` di `useProductTable` |

### Alur Data

```
Input pencarian (Header / kontrol view)
        │  onChange (seketika)
        ▼
searchQuery (state global di App.jsx)
        │  externalSearch → useProductTable
        ▼
searchInput → [useDebouncedValue 350ms] → search (applied)
        │  filter kategori/status + sortBy + page berubah
        ▼
getProducts({ q, category, status, sort, page, pageSize }, source)
        │  request ke API (nyata / simulasi latency 400ms)
        ▼
{ data, pagination }  →  render grid/table + Pagination
```

### Optimasi Performa

- **Debounce pencarian (350ms)** — request API hanya dikirim setelah user berhenti mengetik, mencegah spam request per ketukan huruf.
- **Server-side processing** — pencarian, filter, dan sorting dikerjakan di service layer, hanya data halaman aktif yang dirender.
- **Pembatalan request basi (race condition)** — flag `cancelled` di `useProductTable` membuang response yang sudah tidak relevan.
- **State loading bertingkat** — skeleton (katalog) / strip loading (tabel) saat data lama masih tampil; overlay hanya saat belum ada data.
- **Pagination windowed** — maksimal 5 tombol halaman + ellipsis, cocok untuk jumlah data besar.

## Integrasi dengan Data API

`src/api/bawangService.js` bekerja dalam dua mode:

1. **Mode REST API nyata** — set variabel `VITE_API_URL` di `.env`:

   ```
   VITE_API_URL="https://api.krenyes.id/v1"
   ```

   Endpoint yang dipanggil:
   ```
   GET {VITE_API_URL}/products?q=&category=&status=&sort=&page=&pageSize=
   ```
   Response yang diharapkan:
   ```json
   {
     "data": [ ... ],
     "pagination": { "page": 1, "pageSize": 6, "total": 8, "totalPages": 2, "from": 1, "to": 6 }
   }
   ```

2. **Mode simulasi lokal** (default, `VITE_API_URL` kosong) — memproses pencarian/filter/sort/pagination "seolah-olah di server" dengan latency 400ms sehingga state loading & error tetap bisa diuji di browser.

### Konfigurasi `.env`

| Variabel | Keterangan |
|---|---|
| `VITE_API_URL` | Endpoint REST API produk. Kosongkan untuk memakai simulasi lokal. |

## State Management

- **App.jsx** — state global: produk, pesanan, pencarian global, modal, toast.
- **useProductTable** — hook state management sederhana yang merangkum semua state tabel/katalog (search, filter, sort, page, loading, error) menjadi satu API (`submitSearch`, `reset`, `refetch`, `goToPage`, dll.) dan dipakai bersama oleh dua view tanpa duplikasi logika.
