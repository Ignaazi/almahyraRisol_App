import MainLayout from "@/components/layoutWeb/MainLayout";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Almahyra Risol - Pesan Risol Online",
  description: "Aplikasi Toko Online Almahyra Risol",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col font-[Arial,sans-serif]">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}