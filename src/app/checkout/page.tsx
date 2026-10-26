import Checkout from '@/components/checkout/Checkout';

export const metadata = {
  title: 'Checkout Pesanan - Almahyra Risol',
  description: 'Selesaikan pemesanan Almahyra Risol favoritmu',
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <Checkout />
    </main>
  );
}