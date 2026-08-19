import React, { useState, useEffect } from 'react';

export function BuyModal({
  isOpen,
  onClose,
  product,
  onConfirmPurchase,
}) {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [nameError, setNameError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setCustomerName('');
    setPhone('');
    setNotes('');
    setNameError('');
    setIsProcessing(false);
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const shippingFee = 10000;
  const subtotal = product.price * quantity;
  const totalPrice = subtotal + shippingFee;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setNameError('Nama pembeli wajib diisi');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      onConfirmPurchase(product, quantity, customerName);
      setIsProcessing(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#351000]/60 backdrop-blur-xs flex overflow-y-auto p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#dbc2b0]/30 m-auto">
        {/* Modal Header */}
        <div className="bg-[#8d4b00] p-6 flex items-center justify-between text-white">
          <div>
            <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl">
              Pesan Bawang Goreng
            </h2>
            <p className="text-xs text-[#ffdcc3] mt-0.5">
              Isi data pengiriman untuk memesan langsung
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmitOrder} className="p-6 flex flex-col gap-6">
          {/* Selected Product Summary Card */}
          <div className="bg-[#fff1eb] p-4 rounded-2xl border border-[#dbc2b0]/30 flex items-center gap-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 rounded-xl object-cover shadow-xs shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="bg-[#8d4b00] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                {product.category}
              </span>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#351000] truncate mt-1">
                {product.name}
              </h4>
              <p className="text-xs text-[#554336]">{product.variant} ({product.weight})</p>
              <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-xs text-[#b02d29] mt-1">
                Rp {product.price.toLocaleString('id-ID')} / item
              </p>
            </div>
          </div>

          {/* Quantity Counter */}
          <div className="flex items-center justify-between bg-[#ffeae1]/60 p-4 rounded-2xl border border-[#dbc2b0]/30">
            <div>
              <span className="font-['Work_Sans'] text-xs font-bold text-[#351000] block">
                Jumlah Pesanan
              </span>
              <span className="text-[11px] text-[#554336]">Maksimal stok: {product.stock} item</span>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-[#dbc2b0]/30 shadow-xs">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-[#fff1eb] hover:bg-[#8d4b00] hover:text-white font-bold text-sm flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm w-8 text-center text-[#351000]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="w-8 h-8 rounded-lg bg-[#fff1eb] hover:bg-[#8d4b00] hover:text-white font-bold text-sm flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Customer Details Inputs */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-['Work_Sans'] text-xs font-bold text-[#351000]">
                Nama Lengkap Penerima <span className="text-[#b02d29]">*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (nameError) setNameError('');
                }}
                placeholder="Contoh: Siti Rahmawati"
                className={`w-full px-4 py-2.5 rounded-xl border bg-[#fff1eb]/50 text-xs text-[#351000] focus:outline-none focus:ring-2 ${
                  nameError
                    ? 'border-[#b02d29] focus:ring-[#b02d29]/20'
                    : 'border-[#dbc2b0] focus:ring-[#8d4b00]/20'
                }`}
              />
              {nameError && (
                <span className="text-[10px] text-[#b02d29] font-bold mt-0.5">{nameError}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-['Work_Sans'] text-xs font-bold text-[#351000]">
                Nomor WhatsApp (Opsional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0812-3456-7890"
                className="w-full px-4 py-2.5 rounded-xl border border-[#dbc2b0] bg-[#fff1eb]/50 text-xs text-[#351000] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]/20"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-['Work_Sans'] text-xs font-bold text-[#351000]">
                Catatan Pesanan
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Bungkus bubble wrap ekstra"
                className="w-full px-4 py-2.5 rounded-xl border border-[#dbc2b0] bg-[#fff1eb]/50 text-xs text-[#351000] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]/20"
              />
            </div>
          </div>

          {/* Price Total Calculation */}
          <div className="border-t border-[#ffeae1] pt-4 flex flex-col gap-1.5 text-xs text-[#554336]">
            <div className="flex justify-between">
              <span>Subtotal Produk ({quantity}x)</span>
              <span className="font-bold text-[#351000]">Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimasi Ongkir (Lokal)</span>
              <span className="font-bold text-[#351000]">Rp {shippingFee.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-sm font-['Plus_Jakarta_Sans'] font-extrabold text-[#8d4b00] pt-2 border-t border-[#dbc2b0]/30">
              <span>Total Pembayaran</span>
              <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Form Action CTA */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-['Work_Sans'] text-xs font-bold text-[#554336] bg-[#ffeae1] hover:bg-[#ffdcc3] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 py-3 rounded-xl font-['Work_Sans'] text-xs font-bold uppercase tracking-wider text-white bg-[#8d4b00] hover:bg-[#b15f00] shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Konfirmasi Pesanan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
