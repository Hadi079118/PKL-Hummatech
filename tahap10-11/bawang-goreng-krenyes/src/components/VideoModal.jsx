import React from 'react';

export function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#351000]/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#351000] text-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-[#8d4b00]/40 my-8 flex flex-col">
        {/* Header */}
        <div className="p-5 px-6 bg-[#51230a] flex items-center justify-between border-b border-[#887364]/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb77d]">movie</span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-white">
              Rahasia Kebersihan & Rahasia Krenyes
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-[#ffdcc3] transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video bg-black flex flex-col items-center justify-center p-6 text-center group">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB62-z7SaOXMnvIkWuX3wOXzRA9FFH2ly42dB3IVca9X9O3esfrkUEAu8HBHraO0zA_8ctzd2ptChlandgkeZHXFIO8G5XEzsad6tnBdLDELb_puyewW5duh9cvBSaUxpKM5h3bejUjCXW7qlpAwQqmS_JS8e9dAOcXhtJHhdgw-DXcqVgqoVYsV0-E-cNCSq2JmeJXEzVENUjQkK8xUmrowAg0wUh7SKWjClH7jqjUq2NRHpVZ6bdSBQ"
            alt="Proses Penggorengan Bawang"
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity"
          />

          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#8d4b00] text-white flex items-center justify-center shadow-xl ring-4 ring-white/20 animate-pulse">
              <span className="material-symbols-outlined text-4xl ml-1">play_arrow</span>
            </div>
            <h4 className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg text-white">
              Dokumentasi Dapur Produksi Sumenep
            </h4>
            <p className="font-['Be_Vietnam_Pro'] text-xs text-[#ffdcc3] max-w-md">
              Proses penggorengan menggunakan minyak kelapa murni, penyaringan spinner 3000 RPM, dan pengemasan steril kedap udara.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 px-6 bg-[#51230a] text-xs text-[#ffdcc3]/80 flex justify-between items-center border-t border-[#887364]/30">
          <span>Standar Higienis BPOM & Halal MUI</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#8d4b00] text-white rounded-lg font-bold text-xs hover:bg-[#b15f00]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
