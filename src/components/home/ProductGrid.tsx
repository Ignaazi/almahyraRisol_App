'use client';
import { Image as ImageIcon, ShoppingCart } from 'lucide-react';

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
        <path d="m14.64 8.67l.82 1.84l.15.32l.34.04l2.01.21l.34.03l-.26.24l-1.49 1.35l-.26.23l.07.34l.42 1.97l.07.35l-.3-.18l-1.75-1.01l-.3-.17l-.3.17l-1.75 1.01l-.3.18l.07-.35l.42-1.97l.07-.34l-.26-.23l-1.49-1.35l-.26-.24l.34-.03l2.01-.21l.34-.04l.15-.32l.82-1.84l.14-.32z" />
      </g>
    </svg>
  );
}

// Data Produk Risol
const PRODUCTS = [
  {
    id: 1,
    name: 'Risol Ayam',
    price: 'Rp 12.000',
    stock: 25,
    imageUrl: '', // Masukkan URL foto risol ayam
  },
  {
    id: 2,
    name: 'Risol Mayo',
    price: 'Rp 15.000',
    stock: 18,
    imageUrl: '', // Masukkan URL foto risol mayo
  },
  {
    id: 3,
    name: 'Risol Bihun',
    price: 'Rp 10.000',
    stock: 30,
    imageUrl: '', // Masukkan URL foto risol bihun
  },
  {
    id: 4,
    name: 'Risol Tiramisu',
    price: 'Rp 18.000',
    stock: 12,
    imageUrl: '', // Masukkan URL foto risol tiramisu
  },
];

export default function ProductGrid() {
  const handlePesan = (productName: string) => {
    const message = encodeURIComponent(`Halo Almahyra Risol, saya ingin memesan *${productName}*.`);
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  return (
    <div className="w-full space-y-4">
      {/* HEADER SECTION: BEST RISOL + ICON HITAM DI KANAN TEKS */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-wide">
            Best Risol
          </h2>
          <BestSellerSharpIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>

        {/* TOMBOL "LIHAT SEMUA" ORANYE FULL TULISAN PUTIH */}
        <button className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-bold text-xs sm:text-sm tracking-wide transition shadow-sm active:scale-95">
          Lihat Semua
        </button>
      </div>

      {/* GRID 4 CARD PRODUK (GARIS HITAM TIPIS, UJUNG MELENGKUNG TIPIS, TINGGI TERTATA) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
        {PRODUCTS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg overflow-hidden border border-gray-300 hover:border-orange-500 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
          >
            {/* BAGIAN 1 (ATAS): FULL FOTO PRODUK (TINGGI DITINGKATKAN SEDIKIT) */}
            <div className="w-full relative aspect-[4/3.2] bg-slate-100 select-none overflow-hidden border-b border-gray-200">
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

              {/* Badge Stok Mengambang */}
              <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-md text-gray-900 text-[10px] sm:text-xs font-extrabold px-2 py-0.5 rounded-md shadow-sm border border-gray-200">
                Stok: {item.stock}
              </span>
            </div>

            {/* BAGIAN 2 (BAWAH): KONTEN INFORMASI & BUTTON */}
            <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 space-y-3">
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm sm:text-base text-gray-900 tracking-wide leading-tight group-hover:text-orange-500 transition-colors">
                  {item.name}
                </h3>
                <p className="font-black text-orange-500 text-sm sm:text-base">
                  {item.price}
                </p>
              </div>

              {/* TOMBOL PESAN ORANYE PANJANG */}
              <button
                onClick={() => handlePesan(item.name)}
                className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black text-xs sm:text-sm py-2 px-3 rounded-md transition-all duration-200 flex items-center justify-center gap-1.5 shadow-[0_4px_12px_-2px_rgba(249,115,22,0.35)]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Pesan</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}