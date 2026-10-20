'use client';
import { ArrowRight, Box, MessageCircle, Phone, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

// Custom SVG Icon: Food Bank
function FoodBankIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${className} text-orange-500`}
    >
      <title>food-bank</title>
      <path d="M10 18h1v-4q.625 0 1.063-.437T12.5 12.5v-3h-1v3H11v-3h-1v3h-.5v-3h-1v3q0 .625.438 1.063T10 14zm4 0h1V9.5q-.825 0-1.412.588T13 11.5v3h1zM4 21V9l8-6l8 6v12z" />
    </svg>
  );
}

// Custom SVG Icon: Instagram
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Custom SVG Icon: TikTok
function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-1.42V8.9a6.34 6.34 0 0 0-5.38 2.22 6.34 6.34 0 0 0 10.72 4.55V8.92a8.17 8.17 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-.001-.31z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-12 pb-6 border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* GRID UTAMA (4 KOLOM) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* KOLOM 1: KOTAK BRAND CARD + SOSMED BULAT */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <FoodBankIcon className="w-8 h-8" />
                <span className="font-black text-xl tracking-tight text-gray-900 leading-none">
                  Almahyra<span className="text-orange-500">Risol</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Solusi camilan risol mayo premium, frozen food, dan aneka olahan risol renyah lezat untuk acara keluarga dan katering anda.
              </p>
            </div>

            {/* Tombol Bulat Sosmed Di Bawah Card */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* KOLOM 2: USEFUL LINKS */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5">
              Useful Links
            </h3>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <Link href="/" className="hover:text-orange-400 transition flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-orange-400 transition flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-orange-400 transition flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Products</span>
                </Link>
              </li>
              <li>
                <Link href="/#promo" className="hover:text-orange-400 transition flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Promo </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: OUR SERVICES */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5">
              Our Services
            </h3>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <Link href="/#products" className="hover:text-orange-400 transition flex items-center gap-2">
                  <Box className="w-4 h-4 text-orange-500" />
                  <span>Product dan Layanan</span>
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-orange-400 transition flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-orange-500" />
                  <span>Cara Pemesanan</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 4: CONTACT US */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5">
              Contact Us
            </h3>
            <ul className="space-y-3.5 text-xs font-semibold">
              <li className="flex items-center gap-2.5 text-slate-400 hover:text-white transition">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Telephone: </span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400 hover:text-white transition">
                <MessageCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Whatsapp: </span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400 hover:text-white transition">
                <InstagramIcon className="w-4 h-4 text-pink-500 flex-shrink-0" />
                <span>Instagram: </span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400 hover:text-white transition">
                <TikTokIcon className="w-4 h-4 text-slate-300 flex-shrink-0" />
                <span>Tiktok: </span>
              </li>
            </ul>
          </div>

        </div>

        {/* GARIS PEMBATAS BOTTOM & COPYRIGHT */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs font-medium text-slate-500 space-y-1">
          <p>&copy; Copyright <strong className="text-white font-bold">Almahyra Risol Store</strong>. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}