/**
 * ============================================================
 * useProductTable — State Management Sederhana untuk Tabel/Katalog
 * ============================================================
 * Satu sumber kebenaran (single source of truth) untuk semua state
 * yang saling terkait: pencarian, filter, sorting, pagination,
 * loading, dan error. Dipakai bersama oleh KatalogView dan
 * ManajemenStokView agar logika tidak duplikasi antar view.
 *
 * Alur data:
 *   user mengetik -> searchInput -> [debounce 350ms] -> search (applied)
 *   search/category/status/sortBy/page berubah
 *     -> fetch getProducts() ke service layer (API/simulasi)
 *     -> data + pagination + loading/error
 *
 * Fitur state yang dikelola:
 *  - searchInput   : nilai input seketika (tanpa debounce)
 *  - search        : kata kunci yang benar-benar dieksekusi
 *  - category      : filter kategori (katalog)
 *  - status        : filter status stok (manajemen stok)
 *  - sortBy        : kriteria sorting
 *  - page          : halaman aktif pagination
 *  - loading/error : status komunikasi dengan API
 * ============================================================
 */
import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../api/bawangService.js';
import { useDebouncedValue } from './useDebouncedValue.js';

// Jeda debounce pencarian (ms)
const SEARCH_DEBOUNCE_MS = 350;

export function useProductTable(source, { pageSize = 6, externalSearch = '' } = {}) {
  // --- STATE PENCARIAN (Debounce + Submit) ---
  // searchInput = teks yang tampil di input (langsung berubah).
  // search = kata kunci "resmi" yang meng-trigger fetch API.
  const [searchInput, setSearchInput] = useState(externalSearch);
  const [search, setSearch] = useState(externalSearch);
  const debouncedSearchInput = useDebouncedValue(searchInput, SEARCH_DEBOUNCE_MS);

  // Sinkronisasi dari pencarian global di Header (searchQuery App).
  // Header search bekerja di dua view sekaligus, jadi perubahan
  // dari luar tetap diikuti oleh hook ini.
  useEffect(() => {
    setSearchInput(externalSearch);
  }, [externalSearch]);

  // --- MODE DEBOUNCE ---
  // Hasil debounce dipromosikan menjadi `search` sehingga fetch
  // baru terjadi setelah user berhenti mengetik.
  useEffect(() => {
    setSearch(debouncedSearchInput);
  }, [debouncedSearchInput]);

  // --- STATE FILTER, SORTING, PAGINATION ---
  const [category, setCategory] = useState('all'); // 'all' = semua kategori
  const [status, setStatus] = useState('all');     // 'all' | 'available' | 'low' | 'out'
  const [sortBy, setSortBy] = useState('default'); // kriteria sorting (lihat bawangService)
  const [page, setPage] = useState(1);

  // --- STATE HASIL API ---
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize,
    total: 0,
    totalPages: 1,
    from: 0,
    to: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0); // dipakai untuk "Coba Lagi" (refetch)

  // Saat filter/sort/search berubah, kembalikan ke halaman pertama
  // agar user tidak terjebak di halaman yang sudah tidak valid.
  useEffect(() => {
    setPage(1);
  }, [search, category, status, sortBy]);

  // --- FETCH DATA DARI API (useEffect inti) ---
  // Berjalan ulang setiap: source berubah (CRUD stok), search, filter,
  // sort, page, atau reloadKey (retry). Memakai flag `cancelled` untuk
  // membatalkan response basi (race condition) saat user mengetik cepat.
  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    getProducts({ q: search, category, status, sort: sortBy, page, pageSize }, source)
      .then((result) => {
        if (cancelled) return; // response basi -> abaikan
        setData(result.data);
        setPagination(result.pagination);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || 'Gagal memuat data dari server.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // Cleanup: tandai request sebagai basi saat effect dijalankan ulang
    return () => {
      cancelled = true;
    };
  }, [source, search, category, status, sortBy, page, pageSize, reloadKey]);

  // --- MODE SUBMIT ---
  // Terapkan kata kunci seketika (tanpa menunggu debounce).
  // Dipanggil oleh tombol "Cari" atau tekan Enter pada input pencarian.
  const submitSearch = useCallback(() => setSearch(searchInput), [searchInput]);

  // Kosongkan pencarian (input + kata kunci yang dieksekusi)
  const clearSearch = useCallback(() => {
    setSearchInput('');
    setSearch('');
  }, []);

  // --- RESET SEMUA FILTER ---
  // Kembalikan seluruh state (search, kategori, status, sort, halaman)
  // ke nilai awal — dipakai tombol "Reset Filter".
  const reset = useCallback(() => {
    setSearchInput('');
    setSearch('');
    setCategory('all');
    setStatus('all');
    setSortBy('default');
    setPage(1);
  }, []);

  // Muat ulang data dari API (dipakai tombol "Coba Lagi" saat error)
  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  // Pindah ke halaman tertentu pada pagination
  const goToPage = useCallback((nextPage) => setPage(nextPage), []);

  return {
    searchInput,
    setSearchInput,
    search,
    submitSearch,
    clearSearch,
    category,
    setCategory,
    status,
    setStatus,
    sortBy,
    setSortBy,
    page,
    goToPage,
    pageSize,
    data,
    pagination,
    loading,
    error,
    refetch,
    reset,
  };
}