/**
 * ============================================================
 * Pagination — Komponen Navigasi Halaman (Reusable)
 * ============================================================
 * Menampilkan navigasi halaman untuk tabel/katalog:
 *  - Info ringkas: "Menampilkan X–Y dari Z produk"
 *  - Tombol panah kiri/kanan (auto-disable di ujung halaman)
 *  - Nomor halaman dengan window (maks 5 tombol + ellipsis)
 *
 * Props:
 *  - pagination : objek dari hasil getProducts() / useProductTable()
 *                 { page, totalPages, total, from, to }
 *  - onPageChange : callback saat halaman dipilih
 *  - isLoading     : menonaktifkan tombol selama proses fetch
 * ============================================================
 */
import React from 'react';

/**
 * Membuat daftar tombol nomor halaman yang ditampilkan.
 * Agar tidak boros pada ratusan halaman, hanya halaman aktif,
 * tetangganya (current±1), halaman pertama, dan terakhir yang
 * ditampilkan — sisanya diganti ellipsis ("...").
 */
function getPageWindow(currentPage, totalPages) {
  const pages = [];
  const start = Math.max(1, Math.min(currentPage - 1, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  if (start > 1) pages.push('ellipsis-start');
  for (let i = start; i <= end; i += 1) pages.push(i);
  if (end < totalPages) pages.push('ellipsis-end');
  return pages;
}

export function Pagination({ pagination, onPageChange, isLoading = false }) {
  const { page, totalPages, total, from, to } = pagination;

  // Tidak ada data -> tidak perlu menampilkan navigasi
  if (total === 0) return null;

  // Gaya tombol panah (prev/next)
  const navButtonClass =
    'w-7 h-7 rounded-lg bg-white text-[#554336] shadow-2xs hover:bg-[#ffeae1] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all';

  // Gaya tombol nomor halaman (aktif vs non-aktif)
  const pageButtonClass = (isActive) =>
    `w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[11px] transition-all ${
      isActive
        ? 'bg-[#8d4b00] text-white shadow-xs'
        : 'bg-white text-[#554336] shadow-2xs hover:bg-[#ffeae1]'
    }`;

  return (
    <div className="px-4 py-3 bg-[#fff1eb] border-t border-[#dbc2b0]/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#554336]">
      {/* Info rentang data yang sedang ditampilkan */}
      <span className="font-['Be_Vietnam_Pro']">
        Menampilkan <span className="font-bold text-[#351000]">{from}&ndash;{to}</span> dari{' '}
        <span className="font-bold text-[#351000]">{total}</span> produk
      </span>

      <div className="flex items-center gap-1">
        {/* Tombol halaman sebelumnya (disable di halaman 1 / saat loading) */}
        <button
          className={navButtonClass}
          disabled={page <= 1 || isLoading}
          onClick={() => onPageChange(page - 1)}
          aria-label="Halaman sebelumnya"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>

        {/* Nomor-nomor halaman (windowed dengan ellipsis) */}
        {getPageWindow(page, totalPages).map((item) =>
          item === 'ellipsis-start' || item === 'ellipsis-end' ? (
            <span key={item} className="px-1 text-[#887364]">
              &hellip;
            </span>
          ) : (
            <button
              key={item}
              className={pageButtonClass(item === page)}
              disabled={isLoading}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          )
        )}

        {/* Tombol halaman berikutnya (disable di halaman terakhir / saat loading) */}
        <button
          className={navButtonClass}
          disabled={page >= totalPages || isLoading}
          onClick={() => onPageChange(page + 1)}
          aria-label="Halaman berikutnya"
        >
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
