import React, { useState } from 'react';

export function Header({
  onOpenMobileSidebar,
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotifications = [
    { id: 1, text: 'Stok Krenyes Pedas Gila tersisa 3 botol!', time: '10 menit lalu', isUnread: true },
    { id: 2, text: 'Pesanan baru #ORD-9821 berhasil dibuat', time: '1 jam lalu', isUnread: true },
    { id: 3, text: 'Restock Krenyes Kiloan berhasil', time: 'Yesterday', isUnread: false },
  ];

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#fff8f6]/80 backdrop-blur-xl z-30 px-4 sm:px-8 flex items-center justify-between shadow-[0_1px_8px_rgba(141,75,0,0.04)] border-b border-[#dbc2b0]/20">
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-xl text-[#351000] hover:bg-[#ffeae1] lg:hidden"
          aria-label="Open Navigation"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        {/* Global Search Input */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#887364] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari pesanan atau produk..."
            className="w-full pl-10 pr-4 py-2 bg-[#ffeae1] border border-[#dbc2b0]/30 rounded-full font-['Be_Vietnam_Pro'] text-xs text-[#351000] focus:bg-white focus:ring-2 focus:ring-[#8d4b00]/30 focus:border-[#8d4b00] outline-none transition-all placeholder:text-[#887364]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#887364] hover:text-[#351000]"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Header Controls */}
      <div className="flex items-center gap-3 sm:gap-4 ml-4">
        {/* Shopping Cart Button */}
        <button
          onClick={onOpenCart}
          className="relative p-2 text-[#554336] hover:text-[#8d4b00] hover:bg-[#ffeae1] rounded-full transition-colors flex items-center justify-center"
          title="Keranjang Belanja"
        >
          <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#b02d29] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-pulse">
              {cartCount}
            </span>
          )}
        </button>

        {/* Notifications Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-[#554336] hover:text-[#8d4b00] hover:bg-[#ffeae1] rounded-full transition-colors flex items-center justify-center"
            title="Notifikasi"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#b02d29] rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#dbc2b0]/30 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-[#ffeae1] flex items-center justify-between">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#351000]">
                  Notifikasi System
                </span>
                <span className="text-[10px] bg-[#ffdcc3] text-[#6e3900] px-2 py-0.5 rounded-full font-bold">
                  2 Baru
                </span>
              </div>
              <div className="divide-y divide-[#ffeae1] max-h-64 overflow-y-auto custom-scrollbar">
                {mockNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 hover:bg-[#fff8f6] transition-colors cursor-pointer ${
                      n.isUnread ? 'bg-[#fff1eb]/60' : ''
                    }`}
                  >
                    <p className="text-xs text-[#351000] font-medium leading-snug">{n.text}</p>
                    <p className="text-[10px] text-[#887364] mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 pt-2 border-t border-[#ffeae1] text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] font-bold text-[#8d4b00] hover:underline"
                >
                  Tutup Notifikasi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Card Summary */}
        <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-[#dbc2b0]/30">
          <div className="text-right">
            <div className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#351000] leading-tight">
              Admin Kitchen
            </div>
            <div className="font-['Work_Sans'] text-[10px] text-[#887364] uppercase font-semibold">
              Super Admin
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#8d4b00] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
