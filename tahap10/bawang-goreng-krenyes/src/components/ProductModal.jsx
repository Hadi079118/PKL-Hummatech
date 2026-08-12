import React, { useState, useEffect } from 'react';

const DEFAULT_IMAGE_PRESETS = [
  {
    label: 'Jar Original',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBavIMyW6LIRHApI5Re1bj_Yys2gqe8J1bh9He9U_5C0KdhqNtWMRHNixPRRxZjLiJKT93IQ6mcv-Rk8iBR7NYOE-XF3qbOklfvlgb2gpm0DunyCPrT25An5sxXaEZDqUwB26tskH5xxDlPf3onjCwSUCJqSrVucWFewhTpKzbnuu8VkR6W1Wfi2xIqJYNHjQi-4vtdYe_cHRlKGbT5Kz0dhL3hVasVWa1fvDmQ4GV__PRczU_CnF7KxA',
  },
  {
    label: 'Mangkuk Premium',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB62-z7SaOXMnvIkWuX3wOXzRA9FFH2ly42dB3IVca9X9O3esfrkUEAu8HBHraO0zA_8ctzd2ptChlandgkeZHXFIO8G5XEzsad6tnBdLDELb_puyewW5duh9cvBSaUxpKM5h3bejUjCXW7qlpAwQqmS_JS8e9dAOcXhtJHhdgw-DXcqVgqoVYsV0-E-cNCSq2JmeJXEzVENUjQkK8xUmrowAg0wUh7SKWjClH7jqjUq2NRHpVZ6bdSBQ',
  },
  {
    label: 'Spicy Level 3',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBORTdhyQiIjcHKUnlUXLnGyxdK-7ggzMTp9L7_GHup84xdvuq3PBy_nh99iLCIjlDzB3aBOHfEcYkFnEkAVhbAiIAvmgKGK5bUsYjsv0CMxUF9cNEglQ8QWbicZrq7C6jTyrIyWNhvPNV5P81fWJdezCZlmqlRq_DR4dR41PBQ-iuInOwumjQGv7J59FYld8qPqst4C5yYhUBpPF3LSf1v_KuUNnj74Rc6TQkXq2ufJxRNa-vzSBFG_A',
  },
  {
    label: 'Standing Pouch Kiloan',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjoc2Lres_R25jJhiRWJQFwgwxL-2TYFVR33Mq7G8-Qml3MBWM5QYAe0qvl0VCIt5bOkcAIy0PKJ2HQiFumn22ZM5toSfjdVbOAzy0VsJm1-9pKfTI3YQz6Eb4HEfOS1xXcI033e9t_Xw2IB6eE0P5sgWAKXuJdI3kvZ5wjVwqwUzjFEfllJOrgT-vPNkupNwot5PBrJWlSPtYuzJkD5DTPohv83jpzOrptz6XrNo7hfvoIOUZ0cumCg',
  },
];

export function ProductModal({
  isOpen,
  onClose,
  onSave,
  productToEdit,
}) {
  const [name, setName] = useState('');
  const [variant, setVariant] = useState('');
  const [weight, setWeight] = useState('250g');
  const [price, setPrice] = useState(35000);
  const [stock, setStock] = useState(10);
  const [category, setCategory] = useState('Original');
  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE_PRESETS[0].url);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setVariant(productToEdit.variant);
      setWeight(productToEdit.weight);
      setPrice(productToEdit.price);
      setStock(productToEdit.stock);
      setCategory(productToEdit.category);
      setImageUrl(productToEdit.imageUrl);
      setDescription(productToEdit.description);
    } else {
      setName('');
      setVariant('');
      setWeight('250g');
      setPrice(35000);
      setStock(15);
      setCategory('Original');
      setImageUrl(DEFAULT_IMAGE_PRESETS[0].url);
      setDescription('');
    }
    setErrors({});
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Nama varian wajib diisi';
    if (!variant.trim()) newErrors.variant = 'Keterangan varian wajib diisi';
    if (price <= 0) newErrors.price = 'Harga harus angka positif';
    if (stock < 0) newErrors.stock = 'Stok tidak boleh negatif';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSave({
        id: productToEdit ? productToEdit.id : undefined,
        name,
        variant,
        weight,
        weightInGrams: parseInt(weight) || 250,
        price,
        stock,
        category,
        imageUrl,
        description: description || 'Bawang goreng renyah gurih berkualitas premium.',
      });
      setIsSubmitting(false);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#351000]/60 backdrop-blur-xs flex overflow-y-auto p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#dbc2b0]/30 m-auto">
        {/* Modal Header */}
        <div className="bg-[#8d4b00] p-6 flex items-center justify-between text-white">
          <div>
            <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl">
              {productToEdit ? 'Edit Varian Produk' : 'Tambah Produk Baru'}
            </h2>
            <p className="text-xs text-[#ffdcc3] mt-0.5">
              Isi parameter varian Bawang Goreng Krenyes
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {/* Input: Nama Produk */}
          <div className="flex flex-col gap-1">
            <label className="font-['Work_Sans'] text-xs font-bold text-[#351000]">
              Nama Varian Produk <span className="text-[#b02d29]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder="Contoh: Bawang Goreng Pedas Manis"
              className={`w-full px-4 py-2.5 rounded-xl border bg-[#fff1eb]/50 text-xs text-[#351000] focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? 'border-[#b02d29] focus:ring-[#b02d29]/20'
                  : 'border-[#dbc2b0] focus:ring-[#8d4b00]/20 focus:border-[#8d4b00]'
              }`}
            />
            {errors.name && (
              <span className="text-[11px] text-[#b02d29] font-medium flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[13px]">error</span>
                {errors.name}
              </span>
            )}
          </div>

          {/* Sub-variant & Kategori Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-['Work_Sans'] text-xs font-bold text-[#351000]">
                Detail Varian <span className="text-[#b02d29]">*</span>
              </label>
              <input
                type="text"
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                placeholder="Contoh: Level 3 (Judes)"
                className="w-full px-4 py-2.5 rounded-xl border border-[#dbc2b0] bg-[#fff1eb]/50 text-xs text-[#351000] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]/20 focus:border-[#8d4b00]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-['Work_Sans'] text-xs font-bold text-[#351000]">
                Kategori Produk
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#dbc2b0] bg-[#fff1eb]/50 text-xs font-bold text-[#8d4b00] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]/20 cursor-pointer"
              >
                <option value="Original">Original</option>
                <option value="Pedas">Pedas</option>
                <option value="Special">Special</option>
                <option value="Kiloan">Kiloan Bulk</option>
              </select>
            </div>
          </div>

          {/* Price & Stock Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-['Work_Sans'] text-xs font-bold text-[#351000]">
                Ukuran Kemasan
              </label>
              <select
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#dbc2b0] bg-[#fff1eb]/50 text-xs text-[#351000] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]/20 cursor-pointer"
              >
                <option value="150g">150g</option>
                <option value="200g">200g</option>
                <option value="250g">250g</option>
                <option value="500g">500g</option>
                <option value="1 Kg">1 Kg</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-['Work_Sans'] text-xs font-bold text-[#351000]">
                Harga (Rp) <span className="text-[#b02d29]">*</span>
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                  if (errors.price) setErrors({ ...errors, price: '' });
                }}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs text-[#351000] focus:outline-none focus:ring-2 ${
                  errors.price
                    ? 'border-[#b02d29] bg-[#ffdad6]/30 text-[#b02d29]'
                    : 'border-[#dbc2b0] bg-[#fff1eb]/50 focus:ring-[#8d4b00]/20'
                }`}
              />
              {errors.price && (
                <span className="text-[10px] text-[#b02d29] font-bold mt-0.5">
                  {errors.price}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-['Work_Sans'] text-xs font-bold text-[#351000]">
                Stok Awal
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-[#dbc2b0] bg-[#fff1eb]/50 text-xs text-[#351000] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]/20"
              />
            </div>
          </div>

          {/* Preset Image Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="font-['Work_Sans'] text-xs font-bold text-[#351000]">
              Pilih Foto Sampul
            </label>
            <div className="grid grid-cols-4 gap-2">
              {DEFAULT_IMAGE_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`relative h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    imageUrl === preset.url
                      ? 'border-[#8d4b00] ring-2 ring-[#8d4b00]/30 scale-105'
                      : 'border-[#dbc2b0]/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-[#351000]/70 text-white text-[9px] font-bold text-center truncate py-0.5 px-1">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="font-['Work_Sans'] text-xs font-bold text-[#351000]">
              Deskripsi Singkat
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan aroma, cita rasa, dan saran penyajian..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#dbc2b0] bg-[#fff1eb]/50 text-xs text-[#351000] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]/20"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end items-center gap-3 pt-3 border-t border-[#ffeae1]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold font-['Work_Sans'] text-[#554336] hover:bg-[#ffeae1] transition-colors"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#8d4b00] text-white font-['Work_Sans'] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#b15f00] transition-all flex items-center justify-center min-w-[130px]"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Simpan Produk'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
