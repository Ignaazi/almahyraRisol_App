'use client';

import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CartItem } from '../keranjang/LayoutKeranjangPesanan';
import Step1DataPemesan from './steps/Step1DataPemesan';
import Step2Pembayaran from './steps/Step2Pembayaran';
import Step3SuksesWA from './steps/Step3SuksesWA';

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [nama, setNama] = useState('');
  const [noHp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [catatan, setCatatan] = useState('');
  const [metodePembayaran, setMetodePembayaran] = useState<'COD' | 'QRIS'>('COD');
  const [timeLeft, setTimeLeft] = useState(60);

  // SINKRONISASI DATALOCALSTORAGE REAL-TIME
  useEffect(() => {
    setMounted(true);

    const checkCart = () => {
      const savedCart = localStorage.getItem('almahryra_cart');
      if (savedCart) {
        try {
          const items = JSON.parse(savedCart);
          if (!items || items.length === 0) {
            router.push('/products');
          } else {
            setCartItems(items);
          }
        } catch (e) {
          console.error('Gagal membaca keranjang:', e);
          router.push('/products');
        }
      } else {
        router.push('/products');
      }
    };

    checkCart();

    // DENGARKAN EVENT PERUBAHAN KERANJANG LOKAL MAUPUN ANTAR TAB
    window.addEventListener('storage', checkCart);
    window.addEventListener('cart-updated', checkCart);

    return () => {
      window.removeEventListener('storage', checkCart);
      window.removeEventListener('cart-updated', checkCart);
    };
  }, [router]);

  // HITUNG TIMER STEP 2
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentStep === 2 && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentStep, timeLeft]);

  // DERIVED STATE TOTAL HARGA DARI CARTITEMS AKTIF
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !noHp || !alamat) {
      alert('Harap isi Nama, No HP, dan Alamat lengkap!');
      return;
    }
    setCurrentStep(2);
    setTimeLeft(60);
  };

  if (!mounted) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 px-1 sm:px-4 pb-12">
      
      {/* HEADER & TOMBOL KEMBALI */}
      <div className="flex items-center justify-between px-1 sm:px-0">
        <Link
          href="/products"
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs sm:text-sm rounded-md border border-slate-700 transition flex items-center gap-1.5 active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Kembali</span>
        </Link>

        <h1 className="text-base sm:text-2xl font-black text-gray-900 tracking-tight">
          Checkout Pesanan
        </h1>
      </div>

      {/* STEPPER HEADER DENGAN ANIMASI ANIMATED BULATAN KUNING-HIJAU-BIRU */}
      <div className="bg-white border-2 border-slate-700 rounded-2xl p-3 sm:p-4 shadow-[3px_3px_0px_#334155]">
        <div className="flex items-center justify-between max-w-lg mx-auto relative px-2">
          
          {/* STEP 1: ISI DATA DIRI (BIRU) */}
          <div className="flex flex-col items-center gap-1.5 z-10">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm border-2 transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-blue-500 border-blue-700 text-white shadow-[2px_2px_0px_#1e3a8a] animate-bounce'
                  : currentStep > 1
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
            >
              1
            </div>
            <span
              className={`text-[10px] sm:text-xs font-extrabold ${
                currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              Isi Data Diri
            </span>
          </div>

          {/* LINE STEP 1 -> STEP 2 */}
          <div className="flex-1 h-1 bg-gray-200 absolute top-4 sm:top-5 left-8 right-1/2 -z-0">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: currentStep >= 2 ? '100%' : '0%' }}
            />
          </div>

          {/* STEP 2: PEMBAYARAN (KUNING) */}
          <div className="flex flex-col items-center gap-1.5 z-10">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm border-2 transition-all duration-300 ${
                currentStep === 2
                  ? 'bg-amber-400 border-amber-600 text-slate-900 shadow-[2px_2px_0px_#b45309] animate-bounce'
                  : currentStep > 2
                  ? 'bg-amber-400 border-amber-500 text-slate-900'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
            >
              2
            </div>
            <span
              className={`text-[10px] sm:text-xs font-extrabold ${
                currentStep >= 2 ? 'text-amber-600' : 'text-gray-400'
              }`}
            >
              Pembayaran
            </span>
          </div>

          {/* LINE STEP 2 -> STEP 3 */}
          <div className="flex-1 h-1 bg-gray-200 absolute top-4 sm:top-5 left-1/2 right-8 -z-0">
            <div
              className="h-full bg-amber-400 transition-all duration-300"
              style={{ width: currentStep === 3 ? '100%' : '0%' }}
            />
          </div>

          {/* STEP 3: SELESAI (HIJAU TERANG) */}
          <div className="flex flex-col items-center gap-1.5 z-10">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm border-2 transition-all duration-300 ${
                currentStep === 3
                  ? 'bg-emerald-400 border-emerald-600 text-slate-900 shadow-[2px_2px_0px_#047857] animate-bounce'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
            >
              3
            </div>
            <span
              className={`text-[10px] sm:text-xs font-extrabold ${
                currentStep === 3 ? 'text-emerald-600 font-black' : 'text-gray-400'
              }`}
            >
              Selesai
            </span>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        <div className="lg:col-span-7 space-y-5">
          {currentStep === 1 && (
            <Step1DataPemesan
              nama={nama}
              setNama={setNama}
              noHp={noHp}
              setNoHp={setNoHp}
              alamat={alamat}
              setAlamat={setAlamat}
              catatan={catatan}
              setCatatan={setCatatan}
              onNext={handleNextToPayment}
            />
          )}

          {currentStep === 2 && (
            <Step2Pembayaran
              metodePembayaran={metodePembayaran}
              setMetodePembayaran={setMetodePembayaran}
              totalPrice={totalPrice}
              timeLeft={timeLeft}
              onEditData={() => setCurrentStep(1)}
              onNext={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 3 && (
            <Step3SuksesWA
              nama={nama}
              noHp={noHp}
              alamat={alamat}
              catatan={catatan}
              metodePembayaran={metodePembayaran}
              totalPrice={totalPrice}
              cartItems={cartItems}
              onBack={() => setCurrentStep(2)}
            />
          )}
        </div>

        {/* RINGKASAN PESANAN */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border-2 border-slate-700 rounded-2xl p-4 sm:p-6 shadow-[3px_3px_0px_#334155] space-y-4 sticky top-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="text-base sm:text-lg font-black text-gray-900">
                Ringkasan Pesanan
              </h2>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-2 pb-2 border-b border-gray-50">
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded-md border border-slate-700" />
                    <div className="min-w-0">
                      <p className="font-extrabold text-xs text-gray-900 truncate">{item.name}</p>
                      <p className="text-[10px] font-bold text-gray-500">{item.qty} x Rp {item.price.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                  <span className="font-black text-xs text-gray-900 whitespace-nowrap">
                    Rp {(item.price * item.qty).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-200 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                <span>Subtotal ({cartItems.length} Produk)</span>
                <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-black text-gray-900 pt-1 border-t border-dashed border-gray-200">
                <span>Total Pembayaran</span>
                <span className="text-base text-amber-600">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}