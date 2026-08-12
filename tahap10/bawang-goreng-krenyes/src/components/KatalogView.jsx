import React, { useState } from 'react';

export function KatalogView({
  products,
  onSelectProductToBuy,
  onOpenVideoModal,
  searchQuery,
}) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Filter products by category and search query
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'Semua' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Hero Banner Section */}
      <section className="relative w-full py-12 px-6 lg:px-12 bg-gradient-to-br from-[#ede3b8]/60 via-[#ffeae1] to-[#fff8f6] rounded-3xl overflow-hidden shadow-sm mb-12 border border-[#dbc2b0]/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8d4b00]/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Hero Text Content */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffdcc3] text-[#6e3900] rounded-full text-xs font-['Work_Sans'] font-bold uppercase tracking-wider shadow-xs">
              <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
              PREMIUM QUALITY
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-5xl text-[#351000] leading-tight">
              Kriuk Sempurna di <br />
              <span className="text-[#8d4b00] relative inline-block">
                Setiap Gigitan
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#ff665c]"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 20"
                >
                  <path
                    d="M0,10 Q50,20 100,10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="font-['Be_Vietnam_Pro'] text-sm sm:text-base text-[#554336] max-w-lg leading-relaxed">
              Bawang Goreng Krenyes dibuat dari bawang merah pilihan, digoreng dengan suhu yang presisi untuk menghasilkan tekstur renyah, warna keemasan, dan aroma yang menggugah selera. Rahasia masakan lezat keluarga Anda.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#katalog-grid"
                className="bg-[#8d4b00] text-white px-7 py-3 rounded-xl font-['Plus_Jakarta_Sans'] font-bold text-sm shadow-[0_4px_14px_0_rgba(141,75,0,0.35)] hover:bg-[#b15f00] hover:-translate-y-0.5 transition-all duration-200"
              >
                Lihat Produk
              </a>

              <button
                onClick={onOpenVideoModal}
                className="flex items-center gap-3 text-[#8d4b00] hover:text-[#b15f00] font-['Plus_Jakarta_Sans'] font-bold text-sm transition-colors group py-2"
              >
                <div className="w-10 h-10 rounded-full bg-[#8d4b00]/15 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <span className="material-symbols-outlined text-[#8d4b00]">play_arrow</span>
                </div>
                Cara Pembuatan
              </button>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="flex-1 relative w-full h-[320px] sm:h-[420px] lg:h-[480px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ffdcc3] to-[#ffeae1] rounded-3xl transform rotate-2 scale-95 shadow-lg"></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBavIMyW6LIRHApI5Re1bj_Yys2gqe8J1bh9He9U_5C0KdhqNtWMRHNixPRRxZjLiJKT93IQ6mcv-Rk8iBR7NYOE-XF3qbOklfvlgb2gpm0DunyCPrT25An5sxXaEZDqUwB26tskH5xxDlPf3onjCwSUCJqSrVucWFewhTpKzbnuu8VkR6W1Wfi2xIqJYNHjQi-4vtdYe_cHRlKGbT5Kz0dhL3hVasVWa1fvDmQ4GV__PRczU_CnF7KxA"
              alt="Bawang Goreng Premium Jar"
              className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500 z-10"
            />

            {/* Floating Quality Badge */}
            <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:-left-6 bg-white p-3 sm:p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-[#dbc2b0]/30 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-11 h-11 bg-[#ff665c] text-white rounded-full flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-2xl">workspace_premium</span>
              </div>
              <div>
                <p className="font-['Plus_Jakarta_Sans'] font-extrabold text-base text-[#351000] leading-tight">100%</p>
                <p className="font-['Work_Sans'] text-xs font-semibold text-[#554336]">Bawang Merah Asli</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section id="katalog-grid" className="scroll-mt-24">
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl sm:text-3xl text-[#351000]">
              Pilihan Terbaik Kami
            </h2>
            <p className="font-['Be_Vietnam_Pro'] text-xs sm:text-sm text-[#554336] mt-1">
              Pilih ukuran dan varian rasa sesuai kebutuhan dapur Anda.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap bg-white rounded-full p-1.5 shadow-xs border border-[#dbc2b0]/30">
            {['Semua', 'Original', 'Pedas', 'Kiloan'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full font-['Work_Sans'] text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#8d4b00] text-white shadow-xs'
                    : 'text-[#554336] hover:bg-[#ffeae1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Bento Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-xs border border-[#dbc2b0]/30 flex flex-col items-center">
            <div className="w-20 h-20 bg-[#ffeae1] rounded-full flex items-center justify-center text-[#8d4b00] mb-4">
              <span className="material-symbols-outlined text-4xl">search_off</span>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#351000]">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-xs text-[#554336] max-w-sm mt-1 mb-4">
              Tidak ada produk yang cocok dengan kata kunci atau filter yang Anda pilih.
            </p>
            <button
              onClick={() => setSelectedCategory('Semua')}
              className="px-4 py-2 bg-[#8d4b00] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col border border-[#dbc2b0]/30 relative transform hover:-translate-y-1"
              >
                {/* Badges */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  {p.isBestSeller && (
                    <span className="bg-[#b02d29] text-white px-3 py-1 rounded-full font-['Work_Sans'] text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      Best Seller
                    </span>
                  )}
                  {p.isPromo && (
                    <span className="bg-[#8d4b00] text-white px-3 py-1 rounded-full font-['Work_Sans'] text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      Promo
                    </span>
                  )}
                </div>

                {/* Image Container */}
                <div className="relative h-60 sm:h-64 overflow-hidden bg-[#ffeae1]">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow relative z-10 -mt-10 bg-white rounded-t-3xl pt-4">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <div>
                      <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#351000] group-hover:text-[#8d4b00] transition-colors">
                        {p.name}
                      </h3>
                      <p className="font-['Be_Vietnam_Pro'] text-xs text-[#554336] mt-0.5">
                        {p.variant}
                      </p>
                    </div>
                    <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg text-[#b02d29] shrink-0">
                      Rp {p.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <p className="text-xs text-[#554336] leading-relaxed line-clamp-2 mb-4">
                    {p.description}
                  </p>

                  <div className="flex items-center gap-2 mb-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#fff1eb] rounded-md font-['Work_Sans'] text-xs font-semibold text-[#554336]">
                      <span className="material-symbols-outlined text-[15px]">scale</span> {p.weight}
                    </span>

                    {p.stock > 5 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#ede3b8] rounded-md font-['Work_Sans'] text-xs font-bold text-[#201c02]">
                        <span className="material-symbols-outlined text-[15px]">check_circle</span> In Stock ({p.stock})
                      </span>
                    ) : p.stock > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#ffdcc3] rounded-md font-['Work_Sans'] text-xs font-bold text-[#6e3900]">
                        <span className="material-symbols-outlined text-[15px]">warning</span> Stok Menipis ({p.stock})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#ffdad6] rounded-md font-['Work_Sans'] text-xs font-bold text-[#93000a]">
                        <span className="material-symbols-outlined text-[15px]">block</span> Habis
                      </span>
                    )}
                  </div>

                  {/* Buy Button CTA */}
                  <div className="mt-auto">
                    <button
                      disabled={p.stock === 0}
                      onClick={() => onSelectProductToBuy(p)}
                      className={`w-full py-3 rounded-xl font-['Work_Sans'] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        p.stock === 0
                          ? 'bg-[#dbc2b0] text-white cursor-not-allowed opacity-60'
                          : 'bg-[#8d4b00] text-white hover:bg-[#b15f00] shadow-md shadow-[#8d4b00]/20 active:translate-y-0.5'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                      {p.stock === 0 ? 'Stok Habis' : 'Beli Sekarang'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Technical Excellence / API Architecture Section */}
      <section className="mt-16 py-12 px-6 sm:px-10 bg-white rounded-3xl border border-[#dbc2b0]/30 shadow-xs relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl text-[#351000] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8d4b00] text-3xl">api</span>
              Performa & Arsitektur Sistem
            </h2>
            <p className="font-['Be_Vietnam_Pro'] text-xs sm:text-sm text-[#554336] leading-relaxed">
              Di balik layar renyahnya Bawang Goreng Krenyes, kami menggunakan arsitektur teknologi modern untuk memastikan pengalaman berbelanja dan manajemen stok cepat dan akurat.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#fff1eb] p-4 rounded-2xl border border-[#dbc2b0]/30">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#b02d29] text-xl">bolt</span>
                  <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#351000]">Axios Integration</h4>
                </div>
                <p className="text-xs text-[#554336]">Request data real-time dengan interseptor cerdas untuk penanganan error otomatis.</p>
              </div>

              <div className="bg-[#fff1eb] p-4 rounded-2xl border border-[#dbc2b0]/30">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#665f3d] text-xl">layers</span>
                  <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#351000]">Service Layer</h4>
                </div>
                <p className="text-xs text-[#554336]">Pemisahan logika bisnis yang bersih menjamin stabilitas ketersediaan produk.</p>
              </div>
            </div>
          </div>

          {/* Interactive Flow Visual Representation */}
          <div className="flex-1 w-full h-[260px] bg-[#fff1eb] rounded-2xl p-6 flex items-center justify-center border border-[#dbc2b0]/30 relative overflow-hidden">
            <div className="flex items-center justify-between w-full max-w-sm relative z-10">
              <div className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl shadow-sm border border-[#dbc2b0]/30">
                <span className="material-symbols-outlined text-[#8d4b00] text-3xl">smartphone</span>
                <span className="text-[10px] font-bold text-[#351000]">Client App</span>
              </div>

              <div className="flex-1 mx-3 h-1 bg-[#8d4b00]/20 relative">
                <div className="absolute inset-y-0 w-3 bg-[#b02d29] rounded-full animate-ping"></div>
              </div>

              <div className="flex flex-col items-center gap-2 bg-[#8d4b00] text-white p-4 rounded-2xl shadow-md">
                <span className="material-symbols-outlined text-3xl">dns</span>
                <span className="text-[10px] font-bold">API Gateway</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
