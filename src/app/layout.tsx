import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Incode Solution — Solusi Teknologi Terpadu Akademik & Bisnis',
  description:
    'Jasa teknologi profesional: pengerjaan tugas, skripsi, debugging kode, pembuatan website company profile, landing page penjualan, dan sistem kasir UMKM. Konsultasi gratis via WhatsApp.',
  keywords: [
    'jasa pengerjaan tugas', 'jasa skripsi', 'jasa debugging kode',
    'jasa pembuatan website', 'company profile', 'landing page UMKM',
    'sistem kasir', 'Incode Solution',
  ],
  openGraph: {
    title: 'Incode Solution — Solusi Teknologi Terpadu',
    description: 'Dari bantuan tugas akademik hingga transformasi digital UMKM. Konsultasi gratis!',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
