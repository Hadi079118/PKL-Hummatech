/**
 * ============================================================
 * bawangService.js — Service Layer API Produk Bawang Goreng
 * ============================================================
 * Lapisan layanan yang memisahkan logika akses data dari komponen UI.
 * Semua operasi pencarian, filter, sorting, dan pagination diproses
 * "di sisi server" (server-side processing) agar mudah dipindahkan
 * ke REST API sungguhan.
 *
 * Mode kerja:
 *  - Jika VITE_API_URL diisi -> request HTTP nyata ke REST API.
 *  - Jika kosong -> simulasi API lokal dengan latency buatan agar
 *    alur loading/async tetap terlihat dan dapat diuji di browser.
 *
 * Kontrak endpoint (REST):
 *   GET {VITE_API_URL}/products?q=&category=&status=&sort=&page=&pageSize=
 *   Response: { data: [...], pagination: { page, pageSize, total, totalPages, from, to } }
 * ============================================================
 */
import { INITIAL_PRODUCTS } from '../data/mockData.js';

// Endpoint REST API (kosongkan untuk memakai simulasi lokal)
const API_URL = import.meta.env.VITE_API_URL || '';

// Durasi latency buatan (ms) untuk mensimulasikan jaringan
const SIMULATED_LATENCY_MS = 400;

// Helper: promise yang selesai setelah delay tertentu (simulasi jaringan)
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper: membentuk query string untuk request REST nyata,
// mengabaikan parameter yang kosong/null/undefined.
const buildQueryString = (params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value);
    }
  });
  return query.toString();
};

// Filter status stok (dipakai oleh ManajemenStokView):
//  - available : stok aman (> 5)
//  - low       : stok menipis (1 - 5)
//  - out       : stok habis (= 0)
const statusMatches = (product, status) => {
  if (status === 'available') return product.stock > 5;
  if (status === 'low') return product.stock > 0 && product.stock <= 5;
  if (status === 'out') return product.stock === 0;
  return true;
};

// Proses data "server-side": pencarian + filter kategori + filter status + sorting.
// Menerima dataset mentah dan mengembalikan daftar yang sudah terproses,
// siap dipotong oleh pagination di fungsi getProducts().
const processProducts = (products, { q = '', category = 'all', status = 'all', sort = 'default' } = {}) => {
  const query = q.trim().toLowerCase();

  // --- PENCARIAN (search) ---
  // Kata kunci dicocokkan ke: nama, varian, ukuran kemasan, dan deskripsi.
  // Semua dibandingkan dalam huruf kecil agar case-insensitive.
  const filtered = products.filter((product) => {
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.variant.toLowerCase().includes(query) ||
      product.weight.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);

    // --- FILTER KATEGORI ---
    const matchesCategory =
      category === 'all' || product.category.toLowerCase() === category.toLowerCase();

    // --- FILTER STATUS STOK ---
    return matchesSearch && matchesCategory && statusMatches(product, status);
  });

  // --- SORTING ---
  // Urutan default (array asli) berarti produk terbaru ditampilkan lebih dulu,
  // karena produk baru selalu di-prepend ke daftar saat ditambahkan.
  return [...filtered].sort((a, b) => {
    switch (sort) {
      case 'price-asc':   // Harga terendah -> tertinggi
        return a.price - b.price;
      case 'price-desc':  // Harga tertinggi -> terendah
        return b.price - a.price;
      case 'name-asc':    // Nama A-Z (locale-aware)
        return a.name.localeCompare(b.name);
      case 'stock-asc':   // Stok terendah -> tertinggi
        return a.stock - b.stock;
      case 'stock-desc':  // Stok tertinggi -> terendah
        return b.stock - a.stock;
      case 'bestseller':  // Produk bertanda isBestSeller tampil duluan
        return Number(Boolean(b.isBestSeller)) - Number(Boolean(a.isBestSeller));
      default:            // Urutan relevan / terbaru
        return 0;
    }
  });
};

/**
 * getProducts — ambil daftar produk dengan parameter pencarian, filter,
 * sorting, dan pagination (server-side processing).
 *
 * @param {Object} params  { q, category, status, sort, page, pageSize }
 * @param {Array}  source  Dataset mentah (default: data dari mockData.js)
 * @returns {Promise<{ data: Array, pagination: Object }>}
 */
export async function getProducts(params = {}, source = INITIAL_PRODUCTS) {
  // Pastikan page & pageSize selalu angka positif (validasi input)
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.max(1, Number(params.pageSize) || 6);

  // --- MODE REST API NYATA ---
  // Kirim parameter sebagai query string ke endpoint /products.
  // Bentuk response harus mengikuti kontrak di header file ini.
  if (API_URL) {
    const query = buildQueryString({ ...params, page, pageSize });
    const response = await fetch(`${API_URL}/products${query ? `?${query}` : ''}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Gagal memuat produk dari server.`);
    }
    return response.json();
  }

  // --- MODE SIMULASI LOKAL ---
  // Beri jeda singkat supaya state loading sungguhan terlihat.
  await wait(SIMULATED_LATENCY_MS);

  // Terapkan search/filter/sort, lalu potong sesuai halaman (pagination).
  const sorted = processProducts(source, params);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  // Clamping: jika user di halaman 3 lalu filter menyisakan 1 halaman,
  // otomatis kembali ke halaman terakhir yang valid.
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const data = sorted.slice(startIndex, startIndex + pageSize);

  return {
    data,
    pagination: {
      page: safePage,
      pageSize,
      total,
      totalPages,
      from: total === 0 ? 0 : startIndex + 1,
      to: Math.min(startIndex + pageSize, total),
    },
  };
}