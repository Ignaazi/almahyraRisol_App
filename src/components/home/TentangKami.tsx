'use client';
import { Award, Clock, ExternalLink, Heart, MapPin, MessageCircle, Navigation, ShieldCheck, Star } from 'lucide-react';

export default function TentangKami() {
  return (
    <section id="about" className="w-full py-8 text-gray-900">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 space-y-8">
        
        {/* JUDUL UTAMA (DI TENGAH) */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-snug">
            TENTANG KAMI
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* PARAGRAF DESKRIPSI UTAMA */}
        <p className="text-sm sm:text-base text-gray-900 font-semibold leading-relaxed max-w-5xl mx-auto text-center sm:text-left">
          <strong className="text-black font-black">Almahyra Risol</strong> Usaha UMKM di sektor makanan ringan untuk ganjel perut sebelum melakukan aktifitas pekerjaan , sekolah, dll. Didirikan oleh Bang fajar "The father of mounter" ide ini muncul ketika anak-anak engineering kelaparan pada saat menghadapi kerjaan , namun almahyra risol juga dibuat untuk kalian para penggemar risol sedunia untuk keadaan darurat ketika kelaparan , camilan, teman push rank mobile legend.
        </p>

        {/* GRID 4 KEUNGGULAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100/80 border border-orange-300 flex items-center justify-center flex-shrink-0 text-orange-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-black text-gray-900">
                100% Halal & Higienis
              </h3>
              <p className="text-xs sm:text-sm text-gray-900 font-semibold leading-relaxed">
                Diproduksi menggunakan bahan-bahan pilihan bersih dan terjamin kehalalannya untuk keluarga Anda.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100/80 border border-orange-300 flex items-center justify-center flex-shrink-0 text-orange-600">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-black text-gray-900">
                Fresh & Fast Delivery
              </h3>
              <p className="text-xs sm:text-sm text-gray-900 font-semibold leading-relaxed">
                Pengiriman cepat tepat waktu namun enggan bayar buat besok "bayar sekarang not tomorrow, if tomorrow ya tomorrow"
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100/80 border border-orange-300 flex items-center justify-center flex-shrink-0 text-orange-600">
              <Heart className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-black text-gray-900">
                Racikan Dewa
              </h3>
              <p className="text-xs sm:text-sm text-gray-900 font-semibold leading-relaxed">
                Racikan dewa membuat rasa renyah dan konsisten lezat di setiap gigitan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100/80 border border-orange-300 flex items-center justify-center flex-shrink-0 text-orange-600">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-black text-gray-900">
                Kualitas Premium
              </h3>
              <p className="text-xs sm:text-sm text-gray-900 font-semibold leading-relaxed">
                Menggunakan bahan baku segar tanpa pemanis/pengawet buatan, aman dikonsumsi setiap hari.
              </p>
            </div>
          </div>

        </div>

        {/* SECTION BAWAH: ALAMAT & MAPS GOOGLE STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 items-stretch">
          
          {/* BOX KIRI: ALAMAT & KONTAK (BORDER ABU-ABU GELAP) */}
          <div className="border-2 border-gray-600 border-b-[6px] border-b-gray-800 rounded-2xl p-5 bg-white space-y-4 shadow-md flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold text-sm px-4 py-1.5 rounded-lg shadow-sm">
                <MapPin className="w-4 h-4 fill-white text-gray-900" />
                <span>Alamat Dapur / Outlet</span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm font-extrabold text-gray-900 leading-relaxed pt-1">
                <p><strong className="text-black font-black">Alamat :</strong> </p>
                <p><strong className="text-black font-black">Des :</strong> </p>
                <p><strong className="text-black font-black">Kec :</strong> </p>
                <p><strong className="text-black font-black">Kab :</strong> </p>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t-2 border-gray-200">
              <div className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold text-xs px-3 py-1 rounded-md shadow-sm">
                <MessageCircle className="w-3.5 h-3.5 fill-white text-gray-900" />
                <span>Hubungi Kami</span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm font-extrabold text-gray-900">
                <p><strong className="text-black font-black">No Hp :</strong> </p>
                <p><strong className="text-black font-black">WhatsApp :</strong> </p>
              </div>
            </div>
          </div>

          {/* BOX KANAN: GOOGLE MAPS TAMPILAN RESMI (SEPERTI FOTO SAMPLING) */}
          <div className="border-2 border-emerald-600 border-b-[6px] border-b-emerald-800 rounded-2xl p-3 sm:p-4 bg-white shadow-md flex flex-col justify-between space-y-3">
            
            {/* BADGE HEADER HIJAU ATAS */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-700 text-white font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-lg shadow-sm">
                <MapPin className="w-4 h-4 fill-white text-emerald-700" />
                <span>Google Maps Official Location</span>
              </div>
            </div>

            {/* CONTAINER MAPS + FLOATING INFO CARD DI POJOK KIRI ATAS */}
            <div className="relative w-full flex-1 rounded-xl overflow-hidden border border-gray-300 min-h-[300px]">
              
              {/* GOOGLE MAPS IFRAME BACKGROUND */}
              <iframe
                title="Google Maps Location Fajar House"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.862211912852!2d107.2608!3d-6.2753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTYnMzEuMSJTIDEwN8KwMTUnMzgwOSJF!5e0!3m2!1sid!2sid!4v1680000000000!5m2!1sid!2sid"
                className="w-full h-full min-h-[300px]"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* FLOATING CARD KANAN/KIRI ATAS (SESUAI DESAIN CONTOH GAMBAR) */}
              <div className="absolute top-2.5 left-2.5 max-w-[250px] sm:max-w-[270px] bg-white rounded-xl p-3 shadow-xl border border-gray-200 z-10 space-y-2">
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 leading-snug">
                    Fajar House - Almahyra Risol
                  </h4>
                  <p className="text-[10px] text-gray-600 font-medium leading-tight line-clamp-2">
                    P7V6+XP5, Waringinjaya, Kedungwaringin, Kabupaten Bekasi, Jawa Barat 17540
                  </p>
                </div>

                {/* RATING & REVIEWS */}
                <div className="flex items-center gap-1 text-[11px] font-bold text-gray-800">
                  <span>5.0</span>
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-blue-600 font-semibold cursor-pointer underline">(3)</span>
                </div>

                {/* ACTION BUTTONS (Buka di Maps & Directions) */}
                <div className="flex items-center gap-1.5 pt-1">
                  <a
                    href="https://maps.app.goo.gl/TvdG2N2LqsyDcTTG7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-full flex items-center gap-1 shadow-sm transition active:scale-95"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Buka di Maps</span>
                  </a>

                  <a
                    href="https://maps.app.goo.gl/TvdG2N2LqsyDcTTG7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition active:scale-95"
                    title="Petunjuk Arah"
                  >
                    <Navigation className="w-3.5 h-3.5 fill-blue-600" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}