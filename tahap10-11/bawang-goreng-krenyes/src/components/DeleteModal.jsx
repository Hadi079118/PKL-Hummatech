import React from 'react';

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  product,
}) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#351000]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-[#dbc2b0]/30 p-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#ffdad6] text-[#b02d29] flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-3xl">delete_forever</span>
        </div>

        <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl text-[#351000] mb-2">
          Hapus Varian Produk?
        </h3>

        <p className="font-['Be_Vietnam_Pro'] text-xs text-[#554336] leading-relaxed mb-6">
          Apakah Anda yakin ingin menghapus <strong className="text-[#351000]">{product.name}</strong> ({product.weight})? Tindakan ini tidak dapat dibatalkan dan akan memperbarui database.
        </p>

        <div className="flex items-center gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-['Work_Sans'] text-xs font-bold text-[#554336] bg-[#ffeae1] hover:bg-[#ffdcc3] transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl font-['Work_Sans'] text-xs font-bold uppercase tracking-wider text-white bg-[#b02d29] hover:bg-[#8e1214] shadow-md transition-all"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
