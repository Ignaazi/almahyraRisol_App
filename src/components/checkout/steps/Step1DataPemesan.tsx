'use client';

import { ArrowRight, MapPin, User } from 'lucide-react';
import { useState } from 'react';

interface Step1Props {
  nama: string;
  setNama: (v: string) => void;
  noHp: string;
  setNoHp: (v: string) => void;
  alamat: string;
  setAlamat: (v: string) => void;
  catatan: string;
  setCatatan: (v: string) => void;
  onNext: (e: React.FormEvent) => void;
}

export default function Step1DataPemesan({
  nama,
  setNama,
  noHp,
  setNoHp,
  alamat,
  setAlamat,
  catatan,
  setCatatan,
  onNext,
}: Step1Props) {
  const [loadingLocation, setLoadingLocation] = useState(false);

  // FUNGSI AUTO GET LOCATION VIA GEOLOCATION & REVERSE GEOCODING
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Fitur lokasi tidak didukung oleh browser kamu.');
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Menggunakan OpenStreetMap Reverse Geocoding API (Gratis tanpa API Key)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.display_name) {
            setAlamat(data.display_name);
          } else {
            setAlamat(`Latitude: ${latitude}, Longitude: ${longitude}`);
          }
        } catch (error) {
          console.error('Gagal mengambil alamat:', error);
          setAlamat(`Lokasi GPS: https://maps.google.com/?q=${latitude},${longitude}`);
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        setLoadingLocation(false);
        alert('Gagal mengambil lokasi. Pastikan izin lokasi/GPS di HP kamu sudah diizinkan.');
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <form onSubmit={onNext} className="bg-white border-2 border-blue-600 rounded-2xl p-3.5 sm:p-6 shadow-[3px_3px_0px_#2563eb] space-y-4">
      <div className="flex items-center gap-2 border-b border-blue-100 pb-3">
        <User className="w-5 h-5 text-blue-600" />
        <h2 className="text-base sm:text-lg font-black text-gray-900">
          Langkah 1: Data Pemesan & Alamat
        </h2>
      </div>

      <div className="space-y-3.5">
        <div>
          <label className="block text-xs font-black text-gray-700 mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            required
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm border border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 font-extrabold text-gray-900 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-gray-700 mb-1">
            Nomor HP
          </label>
          <input
            type="tel"
            required
            placeholder="081234567890"
            value={noHp}
            onChange={(e) => setNoHp(e.target.value)}
            className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm border border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 font-extrabold text-gray-900 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-black text-gray-700">
              Alamat Pengiriman
            </label>
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={loadingLocation}
              className="text-[11px] font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 transition active:scale-95"
            >
              <MapPin className="w-3 h-3 text-blue-600" />
              <span>{loadingLocation ? 'Mengambil Lokasi...' : 'Ambil Lokasi Saat ini'}</span>
            </button>
          </div>
          <textarea
            rows={3}
            required
            placeholder="Masukkan alamat pengiriman..."
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm border border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 font-extrabold text-gray-900 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-gray-700 mb-1">
            Catatan Tambahan (Opsional)
          </label>
          <input
            type="text"
            placeholder=""
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm border border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 font-extrabold text-gray-900 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* TOMBOL NEXT BIRU (HOVER BIRU GELAP) */}
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-md border border-blue-700 transition flex items-center gap-1.5 active:scale-95 shadow-sm"
        >
          <span>Next</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </form>
  );
}