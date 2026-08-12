import React from 'react';

export function DashboardView({
  products,
  orders,
  onNavigateTab,
  onOpenAddModal,
}) {
  // Compute dashboard metrics dynamically
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalPrice, 0);
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  const stats = {
    totalRevenue,
    totalProducts: products.length,
    totalOrders: orders.length,
    lowStockAlerts: lowStockCount + outOfStockCount,
  };

  return (
    <div className="flex flex-col w-full gap-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative w-full rounded-3xl bg-gradient-to-r from-[#8d4b00] via-[#b15f00] to-[#8d4b00] p-8 sm:p-10 text-white shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#ffdcc3] rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdcc3]/20 text-[#ffdcc3] text-xs font-['Work_Sans'] font-semibold uppercase tracking-widest backdrop-blur-md mb-3">
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              Dapur Krenyes Control Center
            </span>
            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl sm:text-4xl leading-tight mb-2">
              Halo, Admin Kitchen! 👋
            </h1>
            <p className="font-['Be_Vietnam_Pro'] text-sm text-[#ffdcc3]/90 leading-relaxed">
              Pantau performa penjualan, stok ketersediaan bawang goreng, dan kelola pesanan pelanggan Anda secara real-time dari satu tempat.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateTab('katalog-produk')}
              className="px-5 py-2.5 rounded-xl bg-white text-[#8d4b00] font-['Work_Sans'] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#fff1eb] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">storefront</span>
              Lihat Katalog
            </button>
            <button
              onClick={onOpenAddModal}
              className="px-5 py-2.5 rounded-xl bg-[#b02d29] text-white font-['Work_Sans'] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#8e1214] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Tambah Produk
            </button>
          </div>
        </div>
      </div>

      {/* Low Stock Warning Alert Banner */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="bg-[#ffdad6] border border-[#ff665c]/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#b02d29] text-white flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-xl">warning</span>
            </div>
            <div>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#410002]">
                Peringatan Stok Menipis!
              </h4>
              <p className="font-['Be_Vietnam_Pro'] text-xs text-[#690007]">
                Terdapat {lowStockCount} varian stok menipis dan {outOfStockCount} varian habis. Segera lakukan produksi ulang.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('manajemen-stok')}
            className="px-4 py-2 rounded-xl bg-[#b02d29] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#8e1214] transition-all shrink-0"
          >
            Kelola Stok Sekarang
          </button>
        </div>
      )}

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="bg-[#ffeae1] rounded-2xl p-5 shadow-sm border border-[#dbc2b0]/30 hover:border-[#8d4b00]/50 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['Work_Sans'] text-xs font-bold uppercase tracking-wider text-[#554336]">
              Total Pendapatan
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#8d4b00]/10 text-[#8d4b00] flex items-center justify-center">
              <span className="material-symbols-outlined">payments</span>
            </div>
          </div>
          <div>
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl text-[#351000] block">
              Rp {stats.totalRevenue.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] text-[#8d4b00] font-semibold mt-1 inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +14.2% bulan ini
            </span>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-[#ffeae1] rounded-2xl p-5 shadow-sm border border-[#dbc2b0]/30 hover:border-[#8d4b00]/50 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['Work_Sans'] text-xs font-bold uppercase tracking-wider text-[#554336]">
              Total Varian
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#8d4b00]/10 text-[#8d4b00] flex items-center justify-center">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
          </div>
          <div>
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl text-[#351000] block">
              {stats.totalProducts} Produk
            </span>
            <span className="text-[11px] text-[#554336] mt-1 block">
              Siap dikirim ke pelanggan
            </span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-[#ffeae1] rounded-2xl p-5 shadow-sm border border-[#dbc2b0]/30 hover:border-[#8d4b00]/50 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['Work_Sans'] text-xs font-bold uppercase tracking-wider text-[#554336]">
              Total Pesanan
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#8d4b00]/10 text-[#8d4b00] flex items-center justify-center">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
          </div>
          <div>
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl text-[#351000] block">
              {stats.totalOrders} Pesanan
            </span>
            <span className="text-[11px] text-[#8d4b00] font-semibold mt-1 inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span> 98% terkirim sukses
            </span>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-[#ffeae1] rounded-2xl p-5 shadow-sm border border-[#dbc2b0]/30 hover:border-[#b02d29]/50 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="font-['Work_Sans'] text-xs font-bold uppercase tracking-wider text-[#554336]">
              Alert Stok
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#b02d29]/10 text-[#b02d29] flex items-center justify-center">
              <span className="material-symbols-outlined">report_problem</span>
            </div>
          </div>
          <div>
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl text-[#b02d29] block">
              {stats.lowStockAlerts} Varian
            </span>
            <span className="text-[11px] text-[#b02d29] font-medium mt-1 block">
              Membutuhkan restock segera
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Chart & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sales Visualizer / Monthly Trend */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-[#dbc2b0]/30 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[#ffeae1] pb-4">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#351000]">
                Analisis Penjualan Bawang Goreng
              </h3>
              <p className="text-xs text-[#554336]">Tren penjualan bulanan varian Original vs Pedas</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#ffdcc3] text-[#6e3900] text-xs font-bold">
              2026
            </span>
          </div>

          {/* Custom SVG Bar Chart */}
          <div className="w-full h-64 flex items-end justify-between gap-2 pt-6 px-2 border-b border-[#ffeae1]">
            {[
              { month: 'Jan', val1: 40, val2: 25 },
              { month: 'Feb', val1: 55, val2: 35 },
              { month: 'Mar', val1: 70, val2: 50 },
              { month: 'Apr', val1: 65, val2: 45 },
              { month: 'Mei', val1: 85, val2: 60 },
              { month: 'Jun', val1: 95, val2: 75 },
            ].map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full flex justify-center items-end gap-1 h-full max-h-[180px]">
                  {/* Bar 1 (Original) */}
                  <div
                    style={{ height: `${d.val1}%` }}
                    className="w-1/2 max-w-[20px] bg-[#8d4b00] rounded-t-md group-hover:bg-[#b15f00] transition-all relative"
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-[#351000] text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10 transition-opacity">
                      {d.val1}kg
                    </span>
                  </div>
                  {/* Bar 2 (Pedas) */}
                  <div
                    style={{ height: `${d.val2}%` }}
                    className="w-1/2 max-w-[20px] bg-[#b02d29] rounded-t-md group-hover:bg-[#ff665c] transition-all relative"
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-[#351000] text-white text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10 transition-opacity">
                      {d.val2}kg
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#554336]">{d.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#8d4b00]"></span>
              <span className="text-[#351000]">Varian Original</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#b02d29]"></span>
              <span className="text-[#351000]">Varian Pedas</span>
            </div>
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-[#dbc2b0]/30 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#ffeae1] pb-3">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#351000]">
              Pesanan Terbaru
            </h3>
            <button
              onClick={() => onNavigateTab('katalog-produk')}
              className="text-xs font-bold text-[#8d4b00] hover:underline"
            >
              Lihat Semua
            </button>
          </div>

          <div className="flex flex-col divide-y divide-[#ffeae1]">
            {orders.map((ord) => (
              <div key={ord.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-[#Plus_Jakarta_Sans] font-bold text-xs text-[#351000]">
                      {ord.customerName}
                    </span>
                    <span className="text-[10px] text-[#887364]">{ord.id}</span>
                  </div>
                  <p className="text-xs text-[#554336] truncate mt-0.5">
                    {ord.productName} ({ord.variant}) x {ord.quantity}
                  </p>
                  <p className="text-[10px] text-[#887364] mt-0.5">{ord.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#8d4b00] block">
                    Rp {ord.totalPrice.toLocaleString('id-ID')}
                  </span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 uppercase ${
                      ord.status === 'Selesai'
                        ? 'bg-[#ede3b8] text-[#201c02]'
                        : ord.status === 'Diproses'
                        ? 'bg-[#ffdcc3] text-[#6e3900]'
                        : 'bg-[#ffdad6] text-[#93000a]'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
