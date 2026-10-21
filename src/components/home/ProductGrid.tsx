'use client';
import { ArrowLeft, Eye, Image as ImageIcon, ShoppingCart, Star, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Custom SVG Icon: Best Seller Sharp (Warna Hitam)
function BestSellerSharpIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`${className} text-gray-900`}
    >
      <title>best-seller-sharp</title>
      <g fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="2" strokeWidth="1.5">
        <path d="M8.66 5.75h12.59v12.5H8.66l-.886-.002l-.594-.658l-3.86-4.25L2.111 12l1.209-1.34l3.86-4.25l.594-.658z" />
        <circle cx="7.5" cy="12" r="1.1" />
        <path d="m14.64 8.67l.82 1.84l.15.32l.34.04l2.01.21l.34.03l-.26.24l-1.49 1.35l-.26.23l.07.34l.42 1.97l.07.35l-.3-.18l-1.75-1.01l-.3-.17l-.3.17l-1.75 1.01l-.3.18l.07-.35l.42-1.97l.07-.34l-.26-.24l.34-.03l2.01-.21l.34-.04l.15-.32l.82-1.84l.14-.32z" />
      </g>
    </svg>
  );
}

// Data Produk Best Risol (4 Varian Utama)
const PRODUCTS = [
  {
    id: 1,
    name: 'Risol Ayam',
    desc: 'Isian daging ayam suwir gurih melimpah dengan bumbu rempah pilihan khas resep keluarga yang lezat.',
    price: 3000,
    priceFormatted: 'Rp 3.000',
    imageUrl: '/risolayam.png',
  },
  {
    id: 2,
    name: 'Risol Mayo',
    desc: 'Kombinasi mayo kental, telur, & smoked beef lumer di mulut saat dimakan hangat-hangat.',
    price: 3000,
    priceFormatted: 'Rp 3.000',
    imageUrl: '/risolmayo.png',
  },
  {
    id: 3,
    name: 'Risol Matcha',
    desc: 'Sensasi manis creamy saus matcha lumer dipadu kulit renyah garing sempurna.',
    price: 3000,
    priceFormatted: 'Rp 3.000',
    imageUrl: '/risolmatcha.png',
  },
  {
    id: 4,
    name: 'Risol Taro',
    desc: 'Cokelat taro manis legit beraroma harum, cocok untuk camilan manis saat bersantai.',
    price: 3000,
    priceFormatted: 'Rp 3.000',
    imageUrl: '/risoltaro.png',
  },
];

// Komponen Deskripsi Kustom (Lebih dari 2 baris auto "Selengkapnya" warna Oranye tanpa Underline)
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

export default function ProductGrid() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    name: string;
    desc: string;
    price: number;
    imageUrl: string;
  } | null>(null);

  // Fungsi Menambahkan Item ke Keranjang lalu Navigasi ke /keranjang
  const handlePesan = (product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  }) => {
    const existingCart = JSON.parse(localStorage.getItem('almahryra_cart') || '[]');
    const existingIndex = existingCart.findIndex((item: any) => item.id === product.id);

    if (existingIndex > -1) {
      existingCart[existingIndex].qty += 1;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
        imageUrl: product.imageUrl,
      });
    }

    localStorage.setItem('almahryra_cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('storage'));
    router.push('/keranjang');
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto space-y-4">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-wide">
            Best Risol
          </h2>
          <BestSellerSharpIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>

        {/* TOMBOL LIHAT SEMUA KE HALAMAN PRODUCTS */}
        <Link
          href="/products"
          className="px-3.5 sm:px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-bold text-xs sm:text-sm tracking-wide transition shadow-sm active:scale-95"
        >
          Lihat semua
        </Link>
      </div>

      {/* GRID PRODUK */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-1">
        {PRODUCTS.map((item) => (
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

              {/* Badge Best */}
              <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-white/95 backdrop-blur-md text-gray-900 text-[9px] sm:text-xs font-extrabold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md shadow-sm border border-gray-200 flex items-center gap-0.5 sm:gap-1">
                <span>Best</span>
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 fill-amber-400" />
              </span>
            </div>

            {/* DETAIL PRODUK */}
            <div className="p-2.5 sm:p-4 flex flex-col justify-between flex-1 gap-3">
              <div className="space-y-1">
                <h3 className="font-extrabold text-xs sm:text-base text-gray-900 tracking-wide leading-tight group-hover:text-orange-500 transition-colors truncate">
                  {item.name}
                </h3>

                <ProductDescription desc={item.desc} />
              </div>

              {/* HARGA & ACTION BUTTONS */}
              <div className="flex items-center justify-between gap-1 pt-2 border-t border-gray-100">
                <p className="font-black text-orange-500 text-xs sm:text-base whitespace-nowrap">
                  {item.priceFormatted}
                </p>

                <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => setSelectedProduct({ id: item.id, name: item.name, desc: item.desc, price: item.price, imageUrl: item.imageUrl })}
                    title="Preview Gambar"
                    className="p-1 sm:p-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white rounded-md transition-all duration-200 shadow-sm"
                  >
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>

                  <button
                    onClick={() => handlePesan({ id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl })}
                    title="Pesan / Keranjang"
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
                  const productToOrder = { ...selectedProduct };
                  setSelectedProduct(null);
                  handlePesan(productToOrder);
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
    </div>
  );
}