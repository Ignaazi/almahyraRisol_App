import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F2] text-gray-800">
      {/* Navbar Atas Tetap Putih Bersih */}
      <Navbar />

      {/* Area Konten Utama dengan Background Oranye Tipis */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}