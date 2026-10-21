'use client';

import { ArrowLeft, Eye, Minus, Plus, ShoppingBag, ShoppingCart, Star, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
}

// Data Produk Lainnya untuk Rekomendasi Karosel Slider
const RECOMMEND_PRODUCTS = [
  {
    id: 1,
    name: 'Risol Ayam',
    desc: 'Isian daging ayam suwir gurih melimpah dengan bumbu rempah pilihan.',
    price: 3000,
    priceFormatted: 'Rp 3.000',
    imageUrl: '/risolayam.png',
  },
  {
    id: 2,
    name: 'Risol Mayo',
    desc: 'Kombinasi mayo kental, telur, & smoked beef lumer di mulut.',
    price: 3000,
    priceFormatted: 'Rp 3.000',
    imageUrl: '/risolmayo.png',
  },
  {
    id: 3,
    name: 'Risol Matcha',
    desc: 'Sensasi manis creamy saus matcha lumer dipadu kulit renyah.',
    price: 3000,
    priceFormatted: 'Rp 3.000',
    imageUrl: '/risolmatcha.png',
  },
  {
    id: 4,
    name: 'Risol Taro',
    desc: 'Cokelat taro manis legit beraroma harum khas.',
    price: 3000,
    priceFormatted: 'Rp 3.000',
    imageUrl: '/risoltaro.png',
  },
  {
    id: 5,
    name: 'Risol Makaroni Bolognese',
    desc: 'Saus keju gurih dipadu makaroni & daging giling Italian Bolognese.',
    price: 4000,
    priceFormatted: 'Rp 4.000',
    imageUrl: '/risolbolognese.png',
  },
  {
    id: 6,
    name: 'Risol Tiramisu',
    desc: 'Saus tiramisu manis beraroma kopi khas yang meleleh.',
    price: 3000,
    priceFormatted: 'Rp 3.000',
    imageUrl: '/risoltiramisu.png',
  },
];

export default function KeranjangPesanan() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    desc: string;
    imageUrl: string;
  } | null>(null);

  // Ambil data dari LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('almahryra_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart data:', error);
      }
    } else {
      setCartItems([
        {
          id: 1,
          name: 'Risol Ayam',
          price: 3000,
          qty: 2,
          imageUrl: '/risolayam.png',
        },
        {
          id: 2,
          name: 'Risol Mayo',
          price: 3000,
          qty: 3,
          imageUrl: '/risolmayo.png',
        },
      ]);
    }
    setIsLoaded(true);
  }, []);

  // Simpan update keranjang ke LocalStorage
  const updateCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    localStorage.setItem('almahryra_cart', JSON.stringify(newItems));
    window.dispatchEvent(new Event('storage'));
  };

  // Tambah Qty
  const handleIncrease = (id: number) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  // Kurang Qty
  const handleDecrease = (id: number) => {
    const updated = cartItems
      .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
      .filter((item) => item.qty > 0);
    updateCart(updated);
  };

  // Hapus Item
  const handleRemove = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  // Tambah Produk dari Slider Rekomendasi
  const handleAddToCart = (product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  }) => {
    const existingIndex = cartItems.findIndex((item) => item.id === product.id);
    let updated: CartItem[];

    if (existingIndex > -1) {
      updated = cartItems.map((item, idx) =>
        idx === existingIndex ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updated = [
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
          imageUrl: product.imageUrl,
        },
      ];
    }
    updateCart(updated);
  };

  // Hitung Total Belanja
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // Kirim Pesanan via WhatsApp
  const handleCheckoutWA = () => {
    if (cartItems.length === 0) return;

    let message = 'Halo Almahyra Risol, saya ingin memesan:\n\n';
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* x${item.qty} = Rp ${(
        item.price * item.qty
      ).toLocaleString('id-ID')}\n`;
    });
    message += `\n*Total Pembayaran:* Rp ${totalPrice.toLocaleString('id-ID')}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6285211489443?text=${encodedMessage}`, '_blank');
  };

  if (!isLoaded) {
    return <div className="w-full py-12 text-center text-gray-500 font-bold">Memuat keranjang...</div>;
  }

  return (
    <section className="w-full py-6 sm:py-8 text-gray-900">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 space-y-8">
        
        {/* TOMBOL KEMBALI */}
        <div className="flex justify-start">
          <Link
            href="/products"
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs sm:text-sm rounded-md border border-black transition flex items-center gap-2 active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Produk</span>
          </Link>
        </div>

        {/* HEADER JUDUL */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-black text-orange-500 tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
            <span>Keranjang Pesanan</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-700 font-bold">
            Cek kembali pesanan risol favoritmu sebelum melakukan checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* KERANJANG KOSONG */
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200 space-y-4 shadow-sm">
            <p className="text-gray-500 font-bold text-base">Keranjang belanjaanmu masih kosong nih.</p>
            <Link
              href="/products"
              className="inline-block px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-md transition shadow-md"
            >
              Pilih Risol Sekarang
            </Link>
          </div>
        ) : (
          /* DAFTAR KERANJANG & RINGKASAN */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ITEM PESANAN (2 KOLOM DESKTOP) */}
            <div className="lg:col-span-2 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-300 rounded-xl p-3 sm:p-4 flex items-center justify-between gap-3 shadow-sm hover:border-orange-400 transition"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg bg-slate-100 border border-gray-200"
                    />
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-sm sm:text-base text-gray-900">
                        {item.name}
                      </h3>
                      <p className="font-black text-orange-500 text-xs sm:text-sm">
                        Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* KONTROL QTY & HAPUS */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="p-1.5 hover:bg-gray-200 text-gray-700 transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs sm:text-sm font-extrabold text-gray-900">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="p-1.5 hover:bg-gray-200 text-gray-700 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition"
                      title="Hapus Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RINGKASAN PEMBAYARAN (1 KOLOM DESKTOP) */}
            <div className="bg-white border border-gray-300 rounded-xl p-5 space-y-4 shadow-sm h-fit">
              <h2 className="font-black text-lg text-gray-900 border-b pb-3">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-2 text-xs sm:text-sm font-semibold text-gray-700">
                <div className="flex justify-between">
                  <span>Total Item</span>
                  <span>{cartItems.reduce((acc, i) => acc + i.qty, 0)} pcs</span>
                </div>
                <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t">
                  <span>Total Harga</span>
                  <span className="text-orange-500">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckoutWA}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black text-sm rounded-md transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Pesan via WhatsApp</span>
              </button>
            </div>

          </div>
        )}

        {/* SECTION SLIDER KAROSEL REKOMENDASI PRODUK LAINNYA */}
        <div className="pt-6 border-t border-gray-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-wide">
                Tambah Varian Lainnya
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Geser untuk melihat dan menambahkan varian risol lezat lainnya ke keranjang.
              </p>
            </div>

            <Link
              href="/products"
              className="text-xs sm:text-sm font-extrabold text-orange-500 hover:text-orange-600 transition whitespace-nowrap"
            >
              Lihat Semua &rarr;
            </Link>
          </div>

          {/* CONTAINER SLIDER SCROLLABLE */}
          <div className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100">
            {RECOMMEND_PRODUCTS.map((item) => (
              <div
                key={item.id}
                className="min-w-[200px] sm:min-w-[240px] max-w-[240px] bg-white rounded-lg overflow-hidden border border-gray-300 hover:border-orange-500 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between snap-start flex-shrink-0"
              >
                {/* GAMBAR PRODUK */}
                <div className="w-full relative aspect-[4/3] bg-slate-100 select-none overflow-hidden border-b border-gray-200">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                      <ShoppingBag className="w-8 h-8 opacity-50" />
                    </div>
                  )}

                  <span className="absolute top-1.5 right-1.5 bg-white/95 backdrop-blur-md text-gray-900 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-sm border border-gray-200 flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                    <span>Best</span>
                  </span>
                </div>

                {/* DETAIL & TOMBOL AKSI */}
                <div className="p-3 flex flex-col justify-between flex-1 gap-2">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-xs sm:text-sm text-gray-900 tracking-wide leading-tight truncate">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-gray-600 font-medium leading-snug line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-1 pt-2 border-t border-gray-100">
                    <p className="font-black text-orange-500 text-xs sm:text-sm">
                      {item.priceFormatted}
                    </p>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedProduct({ name: item.name, desc: item.desc, imageUrl: item.imageUrl })}
                        title="Preview"
                        className="p-1.5 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white rounded-md transition shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleAddToCart(item)}
                        title="Tambah ke Keranjang"
                        className="px-2.5 py-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-[10px] sm:text-xs rounded-md transition flex items-center gap-1 shadow-sm whitespace-nowrap"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>+ Tambah</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MODAL PREVIEW GAMBAR */}
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
                  <ShoppingBag className="w-10 h-10 opacity-50 mb-1" />
                  <span className="text-xs font-semibold">Gambar Belum Tersedia</span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed bg-orange-50/50 p-3 rounded-lg border border-orange-100">
              {selectedProduct.desc}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs sm:text-sm rounded-md transition flex items-center gap-1.5 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}