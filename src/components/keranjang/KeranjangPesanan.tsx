'use client';

import LayoutKeranjangPesanan, { CartItem } from '@/components/keranjang/LayoutKeranjangPesanan';
import { ChevronDown, ChevronUp, ShoppingCart, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface KeranjangPesananProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function KeranjangPesanan({ 
  isOpen = true, 
  onClose = () => {} 
}: KeranjangPesananProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('almahryra_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Gagal membaca data keranjang:', e);
      }
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      loadCart();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 240);
  };

  const updateCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    localStorage.setItem('almahryra_cart', JSON.stringify(newItems));
    window.dispatchEvent(new Event('storage'));
  };

  const handleIncrease = (id: number) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  const handleDecrease = (id: number) => {
    const updated = cartItems
      .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
      .filter((item) => item.qty > 0);
    updateCart(updated);
  };

  const handleRemove = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const handleClearAll = () => {
    updateCart([]);
    setShowClearAllModal(false);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // MENGARAHKAN LANGSUNG KE HALAMAN CHECKOUT
  const handleCheckoutPage = () => {
    if (cartItems.length === 0) return;
    handleClose();
    router.push('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <style>{`
        @keyframes drawerSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes drawerSlideOut {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        @keyframes backdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes backdropFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>

      {/* BACKDROP GELAP BURAM */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        style={{
          animation: isClosing
            ? 'backdropFadeOut 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            : 'backdropFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
        onClick={handleClose}
      />

      {/* PANEL DRAWER */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full justify-end">
        <div 
          className="w-full sm:w-[420px] max-w-full bg-white shadow-2xl flex flex-col justify-between h-full"
          style={{
            animation: isClosing
              ? 'drawerSlideOut 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              : 'drawerSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {/* HEADER */}
          <div className="p-4 sm:p-5 pb-3 bg-white border-b border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black text-gray-900 tracking-wide">
                  Keranjang
                </h2>
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 fill-gray-900" />
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="p-2 bg-sky-500 hover:bg-sky-600 rounded-md text-white transition active:scale-95 shadow-sm"
                title="Tutup Keranjang"
              >
                <X className="w-4 h-4 text-white stroke-[3]" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs sm:text-sm font-extrabold text-black block">
                List Keranjang Pesanan
              </span>

              {cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowClearAllModal(true)}
                  className="px-2.5 py-1 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-extrabold text-[11px] rounded transition shadow-sm flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5 text-white stroke-[2]" />
                  <span>Remove all</span>
                </button>
              )}
            </div>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                <img
                  src="/poster3.png"
                  alt="Wah Kok Belum Mesen Nih?"
                  className="w-full max-w-[260px] sm:max-w-[320px] h-auto object-contain"
                />
                <p className="text-sm sm:text-base font-bold text-gray-700 whitespace-nowrap px-2">
                  Kamu belum menambahkan produk!
                </p>
              </div>
            ) : (
              <LayoutKeranjangPesanan
                items={cartItems}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            )}
          </div>

          {/* FOOTER & DROPDOWN DETAIL CLEAN STYLE */}
          <div className="p-3.5 sm:p-5 bg-white space-y-3 border-t border-gray-100">
            {cartItems.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-black text-gray-900">
                  <span>Total Pembayaran</span>
                  <span className="text-sm sm:text-base text-orange-500 font-black">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDetail(!showDetail)}
                  className="flex items-center gap-1 text-[11px] sm:text-xs font-extrabold text-gray-600 hover:text-black focus:outline-none"
                >
                  <span>Lihat semua pesanan</span>
                  {showDetail ? (
                    <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                  )}
                </button>

                {showDetail && (
                  <div className="py-2 space-y-2 text-xs text-gray-800 animate-fade-in max-h-40 overflow-y-auto">
                    {cartItems.map((item, idx) => (
                      <div key={item.id} className="flex justify-between items-center gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="font-extrabold text-gray-400 text-[11px] w-4 text-left">
                            {idx + 1}.
                          </span>
                          <span className="font-extrabold text-gray-900 truncate">
                            {item.name}
                          </span>
                          <span className="font-bold text-gray-500 text-[11px]">
                            x{item.qty}
                          </span>
                        </div>
                        <span className="font-extrabold text-gray-900 whitespace-nowrap">
                          Rp {(item.price * item.qty).toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {cartItems.length === 0 ? (
              <Link
                href="/products"
                onClick={handleClose}
                className="w-full py-2.5 sm:py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-md transition shadow-md flex items-center justify-center tracking-wide"
              >
                Mulai Belanja
              </Link>
            ) : (
              /* TOMBOL CHECKOUT DENGAN UKURAN DAN STYLING YANG SAMA */
              <button
                type="button"
                onClick={handleCheckoutPage}
                className="w-full py-2.5 sm:py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-md transition shadow-md flex items-center justify-center tracking-wide"
              >
                Checkout
              </button>
            )}
          </div>

        </div>
      </div>

      {/* POPUP CONFIRMATION REMOVE ALL */}
      {showClearAllModal && mounted && createPortal(
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 max-w-sm w-full shadow-2xl text-center space-y-3.5 transform transition-all scale-100 mx-auto">
            
            <div className="w-full flex justify-center">
              <img
                src="/poster4.png"
                alt="Yakin hapus keranjang?"
                className="w-full max-w-[220px] sm:max-w-[260px] h-auto object-contain"
              />
            </div>

            <div className="space-y-1">
              <h4 className="font-black text-base sm:text-lg text-gray-900">
                Hapus Semua Pesanan?
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                Apakah kamu yakin ingin menghapus <span className="font-black text-gray-900">semua pesanan</span> dari keranjang?
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowClearAllModal(false)}
                className="flex-1 py-2 sm:py-2.5 px-3 bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs sm:text-sm rounded-lg transition active:scale-95 shadow-md"
              >
                Lanjutkan
              </button>

              <button
                type="button"
                onClick={handleClearAll}
                className="flex-1 py-2 sm:py-2.5 px-3 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs sm:text-sm rounded-lg transition active:scale-95 shadow-md"
              >
                Hapus
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}
    </div>
  );
}