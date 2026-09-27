export const WA_NUMBER = '6281234567890'; // Ganti dengan nomor aktif

export function buildWaLink(segment: 'akademik' | 'bisnis' | 'default' | string) {
  const messages: Record<string, string> = {
    akademik:
      'Halo Incode Solution! Saya mahasiswa yang membutuhkan bantuan untuk tugas/skripsi. Bisakah kita diskusi lebih lanjut?',
    bisnis:
      'Halo Incode Solution! Saya tertarik dengan layanan bisnis (website/sistem) untuk usaha saya. Bisakah kita diskusi lebih lanjut?',
    default:
      'Halo Incode Solution! Saya ingin berkonsultasi mengenai layanan yang tersedia.',
  };

  const text = encodeURIComponent(messages[segment] ?? messages.default);
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

export const NAV_LINKS = [
  { label: 'Layanan', href: '#layanan' },
  { label: 'Keunggulan', href: '#keunggulan' },
  { label: 'Portofolio', href: '#portofolio' },
  { label: 'Kontak', href: '#kontak' },
];
