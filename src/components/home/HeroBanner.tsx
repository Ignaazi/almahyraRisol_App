'use client';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

// Data Banner (Kosongkan imageUrl untuk menampilkan placeholder default)
const BANNERS = [
  {
    id: 1,
    imageUrl: '', // Masukkan URL foto banner 1 di sini (misal: '/banner1.jpg')
    alt: 'Banner Promo Almahyra Risol 1',
  },
  {
    id: 2,
    imageUrl: '', // Masukkan URL foto banner 2 di sini
    alt: 'Banner Promo Almahyra Risol 2',
  },
];

export default function BannerSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm bg-slate-100">
      
      {/* Container Slideshow (Rasio Persegi Panjang Lebih Pipih) */}
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {BANNERS.map((banner) => (
          <div 
            key={banner.id}
            className="w-full flex-shrink-0 relative aspect-[16/6] sm:aspect-[21/6] md:aspect-[24/6]"
          >
            {banner.imageUrl ? (
              /* TAMPILAN GAMBAR/FOTO BANNER */
              <img
                src={banner.imageUrl}
                alt={banner.alt}
                className="w-full h-full object-cover rounded-2xl sm:rounded-3xl"
              />
            ) : (
              /* DEFAULT FALLBACK: BACKGROUND SOFT ABU-ABU */
              <div className="w-full h-full bg-slate-200 flex flex-col items-center justify-center p-3 text-slate-400 select-none">
                <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 mb-1 opacity-60 text-slate-500" />
                <span className="bg-slate-400/80 text-white font-bold text-xs sm:text-sm px-3.5 py-1 rounded-full shadow-sm">
                  Gambar belum di update
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tombol Navigasi Kiri */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition active:scale-90 z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Tombol Navigasi Kanan */}
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition active:scale-90 z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-5 sm:w-7 bg-orange-500' : 'w-1.5 sm:w-2 bg-slate-400/50'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}