import HeroBanner from '@/components/home/HeroBanner';
import ProductGrid from '@/components/home/ProductGrid';

export default function Home() {
  return (
    <div className="space-y-10 pb-10">
      {/* 1. Banner Slideshow */}
      <HeroBanner />

      {/* 2. Product Grid 2 Row (4 Kotak x 2) */}
      <ProductGrid />
    </div>
  );
}