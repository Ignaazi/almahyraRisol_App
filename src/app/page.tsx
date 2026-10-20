import HeroBanner from '@/components/home/HeroBanner';
import ProductGrid from '@/components/home/ProductGrid';
import TentangKami from '@/components/home/TentangKami';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <HeroBanner />
      <ProductGrid />
      <TentangKami />
    </div>
  );
}