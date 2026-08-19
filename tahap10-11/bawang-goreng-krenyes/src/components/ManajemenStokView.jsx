/**
 * ============================================================
 * ManajemenStokView — Tabel Kelola Stok Bawang Goreng
 * ============================================================
 * Fitur baru yang diimplementasikan:
 *  - SEARCH (debounce 350ms + submit):
 *      * Mengetik otomatis mencari setelah berhenti 350ms (debounce)
 *      * Tombol "Cari" atau tekan Enter → langsung diterapkan (submit)
 *      * Spinner di dalam input selama permintaan berlangsung
 *  - FILTER status stok (Semua / Tersedia / Stok Menipis / Habis)
 *  - SORTING (Terbaru / Stok Terendah / Nama A-Z / Harga Tertinggi)
 *  - PAGINATION (5 baris per halaman) via komponen <Pagination/>
 *  - RESET FILTER: semua state kembali ke nilai awal
 *  - INTEGRASI API: data diambil lewat bawangService.getProducts()
 *    lengkap dengan state loading, error + tombol "Coba Lagi".
 *
 * State semua fitur di atas dikelola satu hook: useProductTable
 * (lihat src/hooks/useProductTable.js).
 * ============================================================
 */
import React, { useMemo } from 'react';
import { useProductTable } from '../hooks/useProductTable.js';
import { Pagination } from './Pagination.jsx';

// Definisi pill filter status stok (key harus sama dengan di service layer)
const STATUS_FILTERS = [
  { key: 'all', label: 'Semua', icon: 'inventory_2', iconColor: 'text-[#8d4b00]' },
  { key: 'available', label: 'Tersedia', icon: 'check_circle', iconColor: 'text-emerald-600' },
  { key: 'low', label: 'Stok Menipis', icon: 'warning', iconColor: 'text-amber-600' },
  { key: 'out', label: 'Habis', icon: 'block', iconColor: 'text-rose-600' },
];

// Opsi dropdown "Urutkan" yang tersedia di halaman manajemen stok
const SORT_OPTIONS = [
  { value: 'default', label: 'Terbaru' },
  { value: 'stock-asc', label: 'Stok Terendah' },
  { value: 'name-asc', label: 'Nama A-Z' },
  { value: 'price-desc', label: 'Harga Tertinggi' },
];

export function ManajemenStokView({
  products,
  onOpenAddModal,
  onOpenEditModal,
  onOpenDeleteModal,
  onUpdateStock,
  searchQuery,
  onSearchChange,
}) {
  // --- STATE MANAGEMENT SEDERHANA ---
  // Semua logika search/filter/sort/pagination/loading terpusat di sini.
  // pageSize 5 = 5 baris per halaman. externalSearch = pencarian
  // global dari Header yang dibagikan antar view.
  const table = useProductTable(products, { pageSize: 5, externalSearch: searchQuery });

  // Hitung jumlah produk per status stok untuk badge pada pill filter
  // (dihitung dari keseluruhan produk, bukan halaman yang aktif).
  const counts = useMemo(
    () => ({
      available: products.filter((p) => p.stock > 5).length,
      low: products.filter((p) => p.stock > 0 && p.stock <= 5).length,
      out: products.filter((p) => p.stock === 0).length,
    }),
    [products]
  );

  // --- RESET FILTER ---
  // Bersihkan pencarian global (Header) + kembalikan semua state
  // di useProductTable ke nilai awal.
  const handleReset = () => {
    onSearchChange('');
    table.reset();
  };

  return (
    <div className="flex flex-col w-full gap-8 pb-16">
      {/* Header Banner Section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between bg-[#ffeae1] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#dbc2b0]/30 relative overflow-hidden gap-6">
        <div className="relative z-10 flex flex-col gap-2 max-w-2xl">
          <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl sm:text-4xl text-[#8d4b00]">
            Manajemen Stok
          </h1>
          <p className="font-['Be_Vietnam_Pro'] text-xs sm:text-sm text-[#554336] leading-relaxed">
            Pantau dan kelola persediaan Bawang Goreng Krenyes. Update stok, tambah varian baru, dan pastikan pelanggan selalu mendapatkan kriuk terbaik.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="bg-[#b02d29] text-white px-6 py-3 rounded-full font-['Work_Sans'] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:bg-[#8e1214] hover:-translate-y-0.5 transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Tambah Produk
        </button>
      </div>

      {/* Main Container: Table & Controls */}
      <div className="flex flex-col gap-4 w-full">
        {/* Controls Bar */}
        <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-xs border border-[#dbc2b0]/30">
          {/* Search & Sort Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* --- INPUT PENCARIAN (Debounce + Submit) --- */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#887364] text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  // MODE SUBMIT: tekan Enter → terapkan pencarian seketika
                  if (e.key === 'Enter') table.submitSearch();
                }}
                placeholder="Cari nama, varian, atau ukuran produk..."
                className="w-full pl-10 pr-9 py-2 bg-[#fff8f6] border border-[#dbc2b0]/30 rounded-xl font-['Be_Vietnam_Pro'] text-xs text-[#351000] focus:bg-white focus:ring-2 focus:ring-[#8d4b00]/20 focus:border-[#8d4b00] outline-none transition-all placeholder:text-[#887364]"
              />
              {/* Spinner kecil saat permintaan API sedang berjalan */}
              {table.loading && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#ffeae1] border-t-[#8d4b00] animate-spin pointer-events-none"></span>
              )}
            </div>

            {/* Tombol aksi search: Submit (Cari) & Reset Filter */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={table.submitSearch}
                className="px-4 py-2 rounded-xl bg-[#8d4b00] text-white font-['Work_Sans'] text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-[#b15f00] transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">manage_search</span>
                Cari
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-[#fff1eb] text-[#554336] hover:bg-[#ffeae1] font-['Work_Sans'] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                Reset
              </button>
            </div>
          </div>

          {/* Filter Pills & Sort Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
            {/* --- FILTER STATUS STOK --- */}
            {/* Setiap pill menyetel table.status; jumlah produk di belakang
                label dihitung dari counts (seluruh data, bukan halaman aktif). */}
            <div className="flex flex-wrap gap-2">
              {STATUS_FILTERS.map((filter) => {
                const count =
                  filter.key === 'all'
                    ? products.length
                    : filter.key === 'available'
                      ? counts.available
                      : filter.key === 'low'
                        ? counts.low
                        : counts.out;
                return (
                  <button
                    key={filter.key}
                    onClick={() => table.setStatus(filter.key)}
                    className={`px-3 py-1.5 rounded-full font-['Work_Sans'] text-xs font-bold flex items-center gap-1 transition-all ${
                      table.status === filter.key
                        ? 'bg-[#8d4b00] text-white shadow-xs'
                        : 'bg-[#fff1eb] text-[#554336] hover:bg-[#ffeae1]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[14px] ${
                        table.status === filter.key ? 'text-white' : filter.iconColor
                      }`}
                    >
                      {filter.icon}
                    </span>
                    {filter.label} ({count})
                  </button>
                );
              })}
            </div>

            {/* --- SORTING --- */}
            <div className="flex items-center gap-2 text-xs text-[#554336] font-['Work_Sans'] shrink-0">
              <span className="font-semibold">Urutkan:</span>
              <select
                value={table.sortBy}
                onChange={(e) => table.setSortBy(e.target.value)}
                className="bg-[#fff1eb] border border-[#dbc2b0]/30 rounded-xl px-3 py-1.5 font-bold text-[#8d4b00] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]/20 cursor-pointer"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xs overflow-hidden border border-[#dbc2b0]/30">
          {/* --- INDIKATOR LOADING (data lama masih tampil) --- */}
          {/* Strip tipis di atas tabel saat permintaan ulang berjalan,
              misalnya saat pindah halaman atau mengganti filter. */}
          {table.loading && table.data.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#fff1eb]/70 border-b border-[#dbc2b0]/20 text-[11px] font-bold text-[#8d4b00] font-['Work_Sans']">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-[#ffeae1] border-t-[#8d4b00] animate-spin"></span>
              Memuat data dari server...
            </div>
          )}

          {/* --- STATE LOADING AWAL (belum ada data sama sekali) --- */}
          {table.loading && table.data.length === 0 && !table.error && (
            <div className="min-h-[360px] flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 rounded-full border-4 border-[#ffeae1] border-t-[#8d4b00] animate-spin mb-3"></div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#351000]">
                Memuat Persediaan Bawang...
              </h3>
              <p className="text-xs text-[#554336] mt-1">Mengambil data dari REST API Server</p>
            </div>
          )}

          {/* --- STATE ERROR DARI API + TOMBOL "COBA LAGI" (refetch) --- */}
          {table.error && table.data.length === 0 && (
            <div className="min-h-[360px] bg-[#ffdad6] flex flex-col items-center justify-center p-8 text-center">
              <span className="material-symbols-outlined text-[#ba1a1a] text-5xl mb-2">wifi_off</span>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#93000a]">
                Gagal Memuat Data Produk
              </h3>
              <p className="text-xs text-[#93000a]/80 max-w-sm mt-1 mb-4">
                Koneksi ke server terputus. Silakan periksa jaringan internet Anda dan coba lagi.
              </p>
              <button
                onClick={table.refetch}
                className="bg-[#ba1a1a] text-white px-5 py-2 rounded-full font-['Work_Sans'] text-xs font-bold shadow-md hover:bg-[#93000a]"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* --- STATE KOSONG (hasil search/filter tidak ada) --- */}
          {!table.loading && !table.error && table.data.length === 0 && (
            <div className="min-h-[360px] p-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#ffeae1] flex items-center justify-center text-[#8d4b00] mb-3">
                <span className="material-symbols-outlined text-4xl">search_off</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#351000]">
                Produk Tidak Ditemukan
              </h3>
              <p className="text-xs text-[#554336] max-w-xs mt-1 mb-4">
                Tidak ada varian yang cocok dengan filter atau kata kunci pencarian Anda.
              </p>
              <button
                onClick={handleReset}
                className="bg-[#8d4b00] text-white px-5 py-2 rounded-full font-['Work_Sans'] text-xs font-bold shadow-md hover:bg-[#b15f00]"
              >
                Reset Filter & Cari
              </button>
            </div>
          )}

          {/* --- TABEL PRODUK (data sudah ter-filter, ter-sort, ter-paginasi) --- */}
          {table.data.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-[#fff1eb] text-[#554336] font-['Work_Sans'] text-[11px] font-bold uppercase tracking-wider border-b border-[#dbc2b0]/30">
                    <th className="p-3 pl-4 w-16">Foto</th>
                    <th className="p-3">Varian Bawang</th>
                    <th className="p-3">Ukuran</th>
                    <th className="p-3 text-right">Harga</th>
                    <th className="p-3 text-center">Stok</th>
                    <th className="p-3 pr-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ffeae1] text-xs font-['Be_Vietnam_Pro'] text-[#351000]">
                  {table.data.map((p) => (
                    <tr key={p.id} className="hover:bg-[#fff8f6] transition-colors group">
                      <td className="p-3 pl-4">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className={`w-12 h-12 rounded-xl object-cover shadow-xs border border-[#dbc2b0]/30 ${
                            p.stock === 0 ? 'grayscale opacity-60' : ''
                          }`}
                        />
                      </td>
                      <td className="p-3">
                        <div className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#351000]">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-[#554336] mt-0.5">{p.variant}</div>
                      </td>
                      <td className="p-3">
                        <span className="bg-[#ede3b8] text-[#201c02] px-2 py-1 rounded text-[11px] font-bold">
                          {p.weight}
                        </span>
                      </td>
                      <td className="p-3 text-right font-['Plus_Jakarta_Sans'] font-extrabold text-[#8d4b00]">
                        Rp {p.price.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3 text-center">
                        <div className="inline-flex items-center gap-1.5 bg-[#fff1eb] px-2.5 py-1 rounded-full border border-[#dbc2b0]/30">
                          {p.stock > 5 ? (
                            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                          ) : p.stock > 0 ? (
                            <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping"></span>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                          )}
                          <span className="font-bold text-xs">{p.stock}</span>

                          {/* Quick Adjust Stok (+/-) — data produk di App berubah,
                              lalu hook memuat ulang otomatis dari "server". */}
                          <div className="flex items-center gap-0.5 ml-1 pl-1 border-l border-[#dbc2b0]/40">
                            <button
                              onClick={() => onUpdateStock(p.id, -1)}
                              className="w-4 h-4 bg-white hover:bg-[#8d4b00] hover:text-white rounded text-[10px] font-bold flex items-center justify-center transition-colors shadow-2xs"
                              title="Kurangi stok"
                            >
                              -
                            </button>
                            <button
                              onClick={() => onUpdateStock(p.id, 1)}
                              className="w-4 h-4 bg-white hover:bg-[#8d4b00] hover:text-white rounded text-[10px] font-bold flex items-center justify-center transition-colors shadow-2xs"
                              title="Tambah stok"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 pr-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onOpenEditModal(p)}
                            className="p-1.5 text-[#554336] hover:text-[#8d4b00] hover:bg-[#ffeae1] rounded-lg transition-colors"
                            title="Edit Varian"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button
                            onClick={() => onOpenDeleteModal(p)}
                            className="p-1.5 text-[#554336] hover:text-[#b02d29] hover:bg-[#ffdad6] rounded-lg transition-colors"
                            title="Hapus Varian"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* --- PAGINATION (5 baris per halaman) --- */}
          {table.data.length > 0 && (
            <Pagination
              pagination={table.pagination}
              onPageChange={table.goToPage}
              isLoading={table.loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}