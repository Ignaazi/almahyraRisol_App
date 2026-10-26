'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
}

interface LayoutKeranjangPesananProps {
  items: CartItem[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function LayoutKeranjangPesanan({
  items,
  onIncrease,
  onDecrease,
  onRemove,
}: LayoutKeranjangPesananProps) {
  const [deletingItem, setDeletingItem] = useState<CartItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const confirmRemove = () => {
    if (deletingItem) {
      onRemove(deletingItem.id);
      setDeletingItem(null);
      
      // TRIGGER EVENT AGAR NAVBAR & CHECKOUT LANGSUNG RE-RENDER TANPA REFRESH MANUAL
      window.dispatchEvent(new Event('cart-updated'));
    }
  };

  return (
    <>
      <div className="space-y-2.5">
        {items.map((item, index) => {
          const subtotal = item.price * item.qty;
          const formattedNo = (index + 1).toString().padStart(2, '0');

          return (
            <div
              key={item.id}
              className="bg-white border border-slate-700 rounded-xl p-2 sm:p-2.5 shadow-[2px_2px_0px_#334155] transition-all flex items-center justify-between gap-1 sm:gap-2.5 w-full overflow-hidden"
            >
              {/* SISI KIRI: NO, FOTO, INFO NAMA & HARGA SATUAN */}
              <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                <span className="text-[10px] sm:text-xs font-black text-black w-3 sm:w-4 flex-shrink-0 text-center">
                  {formattedNo}
                </span>

                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-md border border-slate-700 bg-gray-100 flex-shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-black text-[10px] sm:text-xs text-black truncate leading-tight">
                    {item.name}
                  </h3>
                  <p className="font-extrabold text-[8px] sm:text-[10px] text-slate-600">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              {/* SISI TENGAH & KANAN: TOMBOL QTY, HARGA TOTAL & IKON TONG SAMPAH */}
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <div className="flex items-center border border-slate-700 rounded-md bg-gray-50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      onDecrease(item.id);
                      window.dispatchEvent(new Event('cart-updated'));
                    }}
                    className="p-0.5 sm:p-1 text-black hover:bg-gray-200 transition active:scale-95"
                    title="Kurangi"
                  >
                    <Minus className="w-2.5 h-2.5 stroke-[2.5]" />
                  </button>
                  <span className="px-1 sm:px-1.5 font-black text-black text-[10px] sm:text-xs">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onIncrease(item.id);
                      window.dispatchEvent(new Event('cart-updated'));
                    }}
                    className="p-0.5 sm:p-1 text-black hover:bg-gray-200 transition active:scale-95"
                    title="Tambah"
                  >
                    <Plus className="w-2.5 h-2.5 stroke-[2.5]" />
                  </button>
                </div>

                <div className="text-right min-w-[50px] sm:min-w-[65px]">
                  <span className="text-[7px] sm:text-[9px] font-extrabold text-black block uppercase leading-none mb-0.5">
                    Harga
                  </span>
                  <span className="font-black text-orange-600 text-[10px] sm:text-xs block leading-none">
                    Rp {subtotal.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setDeletingItem(item)}
                  className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition active:scale-95 flex-shrink-0"
                  title="Hapus Item"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 stroke-[2]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* POPUP DENGAN GAMBAR /poster4.png DITENGAH LAYAR */}
      {deletingItem && mounted && createPortal(
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
                Hapus Pesanan?
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                Apakah kamu yakin ingin menghapus{' '}
                <span className="font-black text-gray-900">"{deletingItem.name}"</span>{' '}
                dari keranjang?
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="flex-1 py-2 sm:py-2.5 px-3 bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs sm:text-sm rounded-lg transition active:scale-95 shadow-md"
              >
                Lanjutkan
              </button>

              <button
                type="button"
                onClick={confirmRemove}
                className="flex-1 py-2 sm:py-2.5 px-3 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs sm:text-sm rounded-lg transition active:scale-95 shadow-md"
              >
                Hapus
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}