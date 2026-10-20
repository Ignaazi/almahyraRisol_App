'use client';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-[calc(100vh-4rem)] p-4 hidden md:block">
      <nav className="space-y-2 text-sm font-medium">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Menu Utama</div>
        <Link href="/" className="block px-3 py-2 rounded-lg hover:bg-amber-50 text-gray-700 hover:text-amber-600">
          📜 Katalog Risol
        </Link>
        <Link href="/cart" className="block px-3 py-2 rounded-lg hover:bg-amber-50 text-gray-700 hover:text-amber-600">
          🛒 Keranjang
        </Link>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2">Admin</div>
        <Link href="/admin" className="block px-3 py-2 rounded-lg hover:bg-amber-50 text-gray-700 hover:text-amber-600">
          ⚙️ Dashboard Admin
        </Link>
      </nav>
    </aside>
  );
}