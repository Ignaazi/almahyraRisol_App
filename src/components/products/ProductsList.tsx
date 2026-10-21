'use client';
import { ArrowLeft, ArrowUpDown, Eye, Filter, Image as ImageIcon, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Data Produk Risol Lengkap (8 Varian)
const ALL_PRODUCTS = [
  // BARIS 1
  {
    id: 1,
    name: 'Risol Ayam',
    desc: 'Isian daging ayam suwir gurih melimpah dengan bumbu rempah pilihan khas resep keluarga yang lezat.',
    price: 'Rp 3.000',
    imageUrl: '/risolayam.png',
  },
  {
    id: 2,
    name: 'Risol Mayo',
    desc: 'Kombinasi mayo kental, telur, & smoked beef lumer di mulut saat dimakan hangat-hangat.',
    price: 'Rp 3.000',
    imageUrl: '/risolmayo.png',
  },
  {
    id: 3,
    name: 'Risol Matcha',
    desc: 'Sensasi manis creamy saus matcha lumer dipadu kulit renyah garing sempurna.',
    price: 'Rp 3.000',
    imageUrl: '/risolmatcha.png',
  },
  {
    id: 4,
    name: 'Risol Taro',
    desc: 'Cokelat taro manis legit beraroma harum, cocok untuk camilan manis saat bersantai.',
    price: 'Rp 3.000',
    imageUrl: '/risoltaro.png',
  },
  // BARIS 2
  {
    id: 5,
    name: 'Risol Makaroni Bolognese',
    desc: 'Saus keju gurih dipadu makaroni dan daging giling khas Italian Bolognese super mantap.',
    price: 'Rp 4.000',
    imageUrl: '/risolbolognese.png',
  },
  {
    id: 6,
    name: 'Risol Tiramisu',
    desc: 'Saus tiramisu manis beraroma kopi khas yang meleleh dan creamy di setiap gigitan.',
    price: 'Rp 3.000',
    imageUrl: '/risoltiramisu.png',
  },
  {
    id: 7,
    name: 'Risol Cokelat',
    desc: 'Isian cokelat leleh melimpah yang meluap saat digigit hangat-hangat bikin ketagihan.',
    price: 'Rp 3.000',
    imageUrl: '/risolcoklat.png',
  },
  {
    id: 8,
    name: 'Risol Rogout Ayam',
    desc: 'Isian adonan ragout ayam dan sayuran wortel gurih dengan tekstur creamy melimpah.',
    price: 'Rp 3.500',
    imageUrl: '/risolrogout.png',
  },
];

// Komponen Deskripsi dengan Otomatis "Selengkapnya" (Tanpa Underline)
function ProductDescription({ desc }: { desc: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = desc.length > 70;

  return (
    <div className="space-y-0.5">
      <p
        className={`text-[10px] sm:text-xs text-gray-700 font-medium leading-snug transition-all ${
          !isExpanded && isLong ? 'line-clamp-2' : ''
        }`}
      >
        {desc}
      </p>

      {isLong && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="text-[10px] sm:text-xs font-bold text-orange-500 hover:text-orange-600 transition block no-underline"
        >
          {isExpanded ? 'Sembunyikan' : 'Selengkapnya'}
        </button>
      )}
    </div>
  );
}

export default function ProductsList() {
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    desc: string;
    imageUrl: string;
  } | null>(null);

  const handlePesan = () => {
    window.open('https://wa.me/6285211489443', '_blank');
  };

  return (
    <section className="w-full py-6 sm:py-8 text-gray-900">
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-8 space-y-5">
        
        {/* TOMBOL KEMBALI ABU-ABU DENGAN BORDER HITAM TIPIS */}
        <div className="flex justify-start">
          <Link
            href="/"
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs sm:text-sm rounded-md border border-black transition flex items-center gap-2 active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </Link>
        </div>

        {/* HEADER JUDUL & DESKRIPSI */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-5xl font-black text-orange-500 tracking-tight flex items-center gap-2.5 flex-wrap">
            <span>List Product</span>
            <span>({ALL_PRODUCTS.length})</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-900 font-bold">
            Jelajahi semua product kami disini
          </p>
        </div>

        {/* BARIS TOMBOL: FILTER (POJOK KIRI) & URUTKAN (POJOK KANAN) */}
        <div className="pt-1 flex items-center justify-between gap-3">
          <button
            type="button"
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-md transition flex items-center gap-2 shadow-sm"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>

          <button
            type="button"
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-md transition flex items-center gap-2 shadow-sm"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>Urutkan</span>
          </button>
        </div>

        {/* GRID PRODUK (2 KOLOM DI MOBILE, 4 KOLOM DI DESKTOP) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-3">
          {ALL_PRODUCTS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-300 hover:border-orange-500 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
            >
              {/* GAMBAR PRODUK */}
              <div className="w-full relative aspect-[4/3] bg-slate-100 select-none overflow-hidden border-b border-gray-200">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                    <ImageIcon className="w-8 h-8 opacity-50 text-slate-500" />
                  </div>
                )}
              </div>

              {/* DETAIL & DESKRIPSI SINGKAT */}
              <div className="p-2.5 sm:p-4 flex flex-col justify-between flex-1 gap-3">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-xs sm:text-base text-gray-900 tracking-wide leading-tight group-hover:text-orange-500 transition-colors truncate">
                    {item.name}
                  </h3>
                  
                  <ProductDescription desc={item.desc} />
                </div>

                {/* BARIS HARGA & ACTION BUTTONS */}
                <div className="flex items-center justify-between gap-1 pt-2 border-t border-gray-100">
                  <p className="font-black text-orange-500 text-xs sm:text-base whitespace-nowrap">
                    {item.price}
                  </p>

                  <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => setSelectedProduct({ name: item.name, desc: item.desc, imageUrl: item.imageUrl })}
                      title="Preview Gambar"
                      className="p-1 sm:p-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white rounded-md transition-all duration-200 shadow-sm"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>

                    <button
                      onClick={handlePesan}
                      title="Pesan via WhatsApp"
                      className="px-2 py-1 sm:px-3.5 sm:py-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-[11px] sm:text-xs rounded-md transition-all duration-200 flex items-center gap-1 shadow-sm whitespace-nowrap"
                    >
                      <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Pesan</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* MODAL POPUP PREVIEW GAMBAR */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 space-y-4 p-4 sm:p-6">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-base sm:text-lg text-gray-900">
                {selectedProduct.name}
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition active:scale-95 shadow-sm"
                title="Tutup Preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200">
              {selectedProduct.imageUrl ? (
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon className="w-10 h-10 opacity-50 mb-1" />
                  <span className="text-xs font-semibold">Gambar Belum Tersedia</span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed bg-orange-50/50 p-3 rounded-lg border border-orange-100">
              {selectedProduct.desc}
            </p>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs sm:text-sm rounded-md transition flex items-center gap-1.5 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>

              <button
                onClick={() => {
                  setSelectedProduct(null);
                  handlePesan();
                }}
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs sm:text-sm rounded-md transition flex items-center gap-1.5 shadow-[0_4px_12px_-2px_rgba(249,115,22,0.35)] active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Pesan</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}