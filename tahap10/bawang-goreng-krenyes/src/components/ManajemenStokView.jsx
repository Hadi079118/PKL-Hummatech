import React, { useState } from 'react';

export function ManajemenStokView({
  products,
  onOpenAddModal,
  onOpenEditModal,
  onOpenDeleteModal,
  onUpdateStock,
  searchQuery,
  onSearchChange,
}) {
  // Filter & Sort state
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('stock-asc');

  // Simulated UI states for developer testing
  const [uiState, setUiState] = useState('normal');

  // Filter & sort logic
  let processedProducts = products.filter((p) => {
    // Search filter
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.weight.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    if (!matchesSearch) return false;
    if (filterStatus === 'available') return p.stock > 5;
    if (filterStatus === 'low') return p.stock > 0 && p.stock <= 5;
    if (filterStatus === 'out') return p.stock === 0;
    return true;
  });

  // Sorting
  processedProducts = [...processedProducts].sort((a, b) => {
    if (sortBy === 'stock-asc') return a.stock - b.stock;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0; // default newest
  });

  const countAvailable = products.filter((p) => p.stock > 5).length;
  const countLow = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const countOut = products.filter((p) => p.stock === 0).length;

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-2xl shadow-xs border border-[#dbc2b0]/30 gap-4">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-full font-['Work_Sans'] text-xs font-bold flex items-center gap-1 transition-all ${
                filterStatus === 'all'
                  ? 'bg-[#8d4b00] text-white shadow-xs'
                  : 'bg-[#fff1eb] text-[#554336] hover:bg-[#ffeae1]'
              }`}
            >
              Semua ({products.length})
            </button>
            <button
              onClick={() => setFilterStatus('available')}
              className={`px-3 py-1.5 rounded-full font-['Work_Sans'] text-xs font-bold flex items-center gap-1 transition-all ${
                filterStatus === 'available'
                  ? 'bg-[#8d4b00] text-white shadow-xs'
                  : 'bg-[#fff1eb] text-[#554336] hover:bg-[#ffeae1]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
              Tersedia ({countAvailable})
            </button>
            <button
              onClick={() => setFilterStatus('low')}
              className={`px-3 py-1.5 rounded-full font-['Work_Sans'] text-xs font-bold flex items-center gap-1 transition-all ${
                filterStatus === 'low'
                  ? 'bg-[#8d4b00] text-white shadow-xs'
                  : 'bg-[#fff1eb] text-[#554336] hover:bg-[#ffeae1]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px] text-amber-600">warning</span>
              Stok Menipis ({countLow})
            </button>
            <button
              onClick={() => setFilterStatus('out')}
              className={`px-3 py-1.5 rounded-full font-['Work_Sans'] text-xs font-bold flex items-center gap-1 transition-all ${
                filterStatus === 'out'
                  ? 'bg-[#8d4b00] text-white shadow-xs'
                  : 'bg-[#fff1eb] text-[#554336] hover:bg-[#ffeae1]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px] text-rose-600">block</span>
              Habis ({countOut})
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-[#554336] font-['Work_Sans'] shrink-0">
            <span className="font-semibold">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#fff1eb] border border-[#dbc2b0]/30 rounded-xl px-3 py-1.5 font-bold text-[#8d4b00] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]/20 cursor-pointer"
            >
              <option value="stock-asc">Stok Terendah</option>
              <option value="name-asc">Nama A-Z</option>
              <option value="price-desc">Harga Tertinggi</option>
              <option value="newest">Terbaru</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xs overflow-hidden border border-[#dbc2b0]/30 relative min-h-[360px] flex flex-col justify-between">
          {/* UI Test State Overlays */}
          {uiState === 'loading' && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 rounded-full border-4 border-[#ffeae1] border-t-[#8d4b00] animate-spin mb-3"></div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#351000]">
                Memuat Persediaan Bawang...
              </h3>
              <p className="text-xs text-[#554336] mt-1">Mengambil data dari REST API Server</p>
            </div>
          )}

          {uiState === 'error' && (
            <div className="absolute inset-0 bg-[#ffdad6] z-30 flex flex-col items-center justify-center p-8 text-center">
              <span className="material-symbols-outlined text-[#ba1a1a] text-5xl mb-2">wifi_off</span>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#93000a]">
                Gagal Memuat Data Produk
              </h3>
              <p className="text-xs text-[#93000a]/80 max-w-sm mt-1 mb-4">
                Koneksi ke server terputus. Silakan periksa jaringan internet Anda dan coba lagi.
              </p>
              <button
                onClick={() => setUiState('normal')}
                className="bg-[#ba1a1a] text-white px-5 py-2 rounded-full font-['Work_Sans'] text-xs font-bold shadow-md hover:bg-[#93000a]"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {uiState === 'empty' || processedProducts.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-center my-auto">
              <div className="w-20 h-20 rounded-full bg-[#ffeae1] flex items-center justify-center text-[#8d4b00] mb-3">
                <span className="material-symbols-outlined text-4xl">inventory</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#351000]">
                Belum Ada Varian Produk
              </h3>
              <p className="text-xs text-[#554336] max-w-xs mt-1 mb-4">
                Katalog bawang goreng tidak memiliki item sesuai pencarian Anda. Tambahkan varian baru untuk mulai berjualan.
              </p>
              <button
                onClick={() => {
                  setUiState('normal');
                  onSearchChange('');
                  setFilterStatus('all');
                }}
                className="bg-[#8d4b00] text-white px-5 py-2 rounded-full font-['Work_Sans'] text-xs font-bold shadow-md hover:bg-[#b15f00]"
              >
                Reset Filter & Cari
              </button>
            </div>
          ) : (
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
                  {processedProducts.map((p) => (
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

                          {/* Quick Adjust Buttons */}
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

          {/* Pagination Footer */}
          <div className="p-3 px-4 bg-[#fff1eb] border-t border-[#dbc2b0]/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#554336]">
            <span>
              Menampilkan {processedProducts.length} dari {products.length} produk
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled
                className="p-1 rounded bg-white text-[#887364] shadow-2xs disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-6 h-6 rounded bg-[#8d4b00] text-white font-bold text-[11px] flex items-center justify-center">
                1
              </button>
              <button className="p-1 rounded bg-white text-[#554336] shadow-2xs hover:bg-[#ffeae1]">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
