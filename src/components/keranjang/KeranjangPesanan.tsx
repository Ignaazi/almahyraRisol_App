'use client';

import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
}

export default function KeranjangPesanan() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ambil data dari LocalStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const savedCart = localStorage.getItem('almahryra_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart data:', error);
      }
    } else {
      // Data dummy awal jika keranjang masih kosong
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

  // Simpan update keranjang ke LocalStorage & picu event
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
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
        
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

      </div>
    </section>
  );
}