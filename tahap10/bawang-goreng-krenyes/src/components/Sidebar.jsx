import React from 'react';
import { LOGO_URL } from '../data/mockData';

export function Sidebar({ currentTab, onSelectTab, isOpenMobile, onCloseMobile }) {
  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: 'dashboard' },
    { id: 'katalog-produk', label: 'KATALOG PRODUK', icon: 'inventory_2' },
    { id: 'manajemen-stok', label: 'MANAJEMEN STOK', icon: 'package_2' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-[#351000]/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-[#fff1eb] z-50 flex flex-col shadow-[1px_0_12px_rgba(141,75,0,0.06)] transition-transform duration-300 ease-in-out border-r border-[#dbc2b0]/30 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header / Brand Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-[#dbc2b0]/20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('katalog-produk')}>
            <div className="w-10 h-10 rounded-full bg-[#ffdcc3] p-1 shadow-sm flex items-center justify-center overflow-hidden border border-[#8d4b00]/20">
              <img
                src={LOGO_URL}
                alt="Bawang Goreng Krenyes Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl text-[#8d4b00] tracking-tight block leading-none">
                Krenyes
              </span>
              <span className="text-[10px] font-['Work_Sans'] font-semibold tracking-wider text-[#887364] uppercase block mt-1">
                Bawang Goreng
              </span>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-[#554336] hover:bg-[#ffeae1] lg:hidden"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left font-['Work_Sans'] text-xs font-semibold tracking-wider ${
                  isActive
                    ? 'bg-[#8d4b00] text-white shadow-md shadow-[#8d4b00]/20'
                    : 'text-[#554336] hover:bg-[#ffeae1] hover:text-[#351000]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    isActive ? 'text-white' : 'text-[#8d4b00]'
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom User Info */}
        <div className="p-4 border-t border-[#dbc2b0]/30 bg-[#ffeae1]/50">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-10 h-10 rounded-full bg-[#8d4b00] text-white flex items-center justify-center font-bold shadow-xs">
              <span className="material-symbols-outlined text-lg">person</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#351000] truncate">
                Admin Kitchen
              </span>
              <span className="text-[11px] font-['Be_Vietnam_Pro'] text-[#554336]">
                Super Admin
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
