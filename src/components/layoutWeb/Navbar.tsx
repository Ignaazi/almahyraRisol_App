'use client';
import { LogIn, Menu, Search, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Custom SVG Icon: Food Bank
function FoodBankIcon({ className = "w-8 h-8" }: { className?: string }) {
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

export default function Navbar() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const updateCount = () => {
      const items = JSON.parse(localStorage.getItem('almahryra_cart') || '[]');
      const total = items.reduce((sum: number, item: any) => sum + item.qty, 0);
      setCartCount(total);
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* SISI KIRI: LOGO BRAND + MENU NAVIGASI */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Hamburger (Mobile Only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-gray-700 hover:text-orange-500 rounded-md focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* LOGO BRAND */}
          <Link 
            href="/" 
            className="hidden sm:flex items-center gap-2.5 flex-shrink-0 mr-1 py-1 transition-all duration-200 hover:opacity-85"
          >
            <FoodBankIcon className="w-8 h-8" />
            <span className="font-black text-2xl tracking-wide text-gray-900 leading-none">
              Almahyra<span className="text-orange-500">Risol</span>
            </span>
          </Link>

          {/* MENU NAVIGASI DESKTOP */}
          <nav className="hidden md:flex items-center gap-2 sm:gap-3 font-bold text-base text-gray-800 tracking-wide">
            {/* HOME: Aktif hanya jika di route '/' dan tanpa hash */}
            <Link
              href="/"
              onClick={() => setActiveHash('')}
              className={`px-3 py-1.5 rounded-md font-black tracking-wide transition-all duration-200 ${
                pathname === '/' && activeHash === ''
                  ? 'bg-orange-500 text-white shadow-[0_6px_16px_-2px_rgba(249,115,22,0.4)]' 
                  : 'text-gray-800 hover:text-orange-500'
              }`}
            >
              Home
            </Link>

            {/* PRODUCTS: Pindah Page ke /products */}
            <Link
              href="/products"
              onClick={() => setActiveHash('')}
              className={`px-2.5 py-1.5 rounded-md transition tracking-wide ${
                pathname === '/products'
                  ? 'bg-orange-500 text-white shadow-[0_6px_16px_-2px_rgba(249,115,22,0.4)]'
                  : 'text-gray-800 hover:text-orange-500'
              }`}
            >
              Products
            </Link>

            {/* PROMO: Anchor Link ke #promo */}
            <Link
              href="/#promo"
              onClick={() => setActiveHash('#promo')}
              className={`px-3 py-1.5 border-[1px] border-orange-500 rounded-md transition flex items-center gap-1 font-bold tracking-wide ${
                pathname === '/' && activeHash === '#promo'
                  ? 'bg-orange-500 text-white shadow-[0_6px_16px_-2px_rgba(249,115,22,0.4)]'
                  : 'text-orange-500 hover:bg-orange-50'
              }`}
            >
              Promo 🎉
            </Link>

            {/* TENTANG KAMI: Anchor Link ke #about */}
            <Link
              href="/#about"
              onClick={() => setActiveHash('#about')}
              className={`px-2.5 py-1.5 rounded-md transition whitespace-nowrap tracking-wide ${
                pathname === '/' && activeHash === '#about'
                  ? 'bg-orange-500 text-white shadow-[0_6px_16px_-2px_rgba(249,115,22,0.4)]'
                  : 'text-gray-800 hover:text-orange-500'
              }`}
            >
              Tentang Kami
            </Link>
          </nav>
        </div>

        {/* SISI KANAN: SEARCH BAR + CART + LOGIN */}
        <div className="flex items-center gap-2 sm:gap-5">
          <div className="relative hidden sm:block w-40 sm:w-64 lg:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Cari Product..."
              className="w-full bg-gray-50 border border-gray-400 text-gray-900 placeholder:text-gray-500 rounded-full pl-9 pr-3 py-1.5 text-xs sm:text-sm font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            <Link
              href="/cart"
              className="relative p-1.5 text-gray-800 hover:text-orange-500 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-md border border-white shadow-sm min-w-[18px] text-center">
                {cartCount}
              </span>
            </Link>

            <Link
              href="/admin"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-base px-3 sm:px-3.5 py-1.5 rounded-md transition flex items-center gap-1.5 tracking-wider shadow-[0_6px_16px_-2px_rgba(249,115,22,0.4)] active:scale-95 whitespace-nowrap"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          </div>
        </div>

      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2 text-base font-bold tracking-wide">
          <Link
            href="/"
            onClick={() => {
              setActiveHash('');
              setMobileMenuOpen(false);
            }}
            className={`block px-3.5 py-2 rounded-md tracking-wider ${
              pathname === '/' && activeHash === '' 
                ? 'bg-orange-500 text-white shadow-sm' 
                : 'text-gray-800 hover:bg-orange-50'
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => {
              setActiveHash('');
              setMobileMenuOpen(false);
            }}
            className={`block px-3.5 py-2 rounded-md tracking-wide ${
              pathname === '/products' 
                ? 'bg-orange-500 text-white shadow-sm' 
                : 'text-gray-800 hover:bg-orange-50'
            }`}
          >
            Products
          </Link>
          <Link
            href="/#promo"
            onClick={() => {
              setActiveHash('#promo');
              setMobileMenuOpen(false);
            }}
            className={`block px-3.5 py-2 border-[1px] border-orange-500 rounded-md tracking-wide ${
              pathname === '/' && activeHash === '#promo' 
                ? 'bg-orange-500 text-white shadow-sm' 
                : 'text-orange-500'
            }`}
          >
            Promo 🎉
          </Link>
          <Link
            href="/#about"
            onClick={() => {
              setActiveHash('#about');
              setMobileMenuOpen(false);
            }}
            className={`block px-3.5 py-2 rounded-md tracking-wide ${
              pathname === '/' && activeHash === '#about' 
                ? 'bg-orange-500 text-white shadow-sm' 
                : 'text-gray-800 hover:bg-orange-50'
            }`}
          >
            Tentang Kami
          </Link>

          <div className="pt-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                placeholder="Cari Product..."
                className="w-full bg-gray-50 border border-gray-400 text-gray-900 placeholder:text-gray-500 rounded-full pl-9 pr-3 py-2 text-xs font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}