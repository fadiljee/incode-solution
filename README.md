# Landing Page Incode Solution

Etalase digital resmi untuk **Incode Solution** — brand penyedia jasa teknologi terpadu yang melayani dua segmen utama: akademik (bantuan tugas, skripsi, debugging kode) dan bisnis (pembuatan website company profile, landing page, sistem kasir, dan aplikasi internal UMKM/perusahaan).

Project ini dibangun menggunakan **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, dan **Supabase**.

---

## 1. Konsep Visual & Desain

Desain landing page mengusung konsep **"Buku Catatan bertemu Blueprint Teknis"**:
- **Pendekatan Dual-Target**: Memadukan nuansa kertas catatan/ruled paper (dunia akademik) dengan garis pembatas tipis/blueprint (dunia rekayasa sistem).
- **Warna Solid & Flat**: Menggunakan palet terkurasi tanpa gradasi warna (Paper `#EDEAE1`, Ink `#1D2420`, Pine `#234B3E`, Brass `#A67C33`, Line `#CFC9BA`).
- **Tipografi Berkarakter**:
  - **Space Grotesk**: Display / Headline utama.
  - **IBM Plex Sans**: Body text.
  - **IBM Plex Mono**: Label teknis dan penanda kode layanan.
- **Tampilan Bebas AI Slop**: Sudut tegas (hairline borders), tanpa bayangan lembut generik, tanpa elemen membulat berlebihan, dan tanpa animasi berlebihan.

---

## 2. Fitur Utama

- **Navbar Sticky & Responsif**: Wordmark brand, penanda section aktif via IntersectionObserver, serta tombol kontak WhatsApp cepat.
- **Hero Section Dual-CTA**: Headline terstruktur dengan 70/30 grid layout dan dua tombol WhatsApp terpisah untuk rute Akademik dan Bisnis.
- **Katalog Layanan Tersegmentasi**:
  - **Akademik**: Pengerjaan tugas informatika (`TASK`), skripsi/proyek akhir (`THESIS`), dan debugging kode (`DEBUG`).
  - **Bisnis/UMKM**: Company profile (`PROFILE`), landing page (`LANDING`), dan sistem internal/kasir (`SYSTEM`).
- **Alur Kerja 3-Langkah**: Penjelasan proses konsultasi, pengerjaan, dan pengerjaan/serah terima.
- **Showcase Portofolio**: Tampilan mockup browser ala CSS kustom dengan filter kategori (Semua, Akademik, Bisnis). Terhubung dengan Supabase dan dilengkapi fallback data statis jika belum terhubung database.
- **Form Kontak & Segmentasi Pesan**: Form pengiriman pesan langsung yang terintegrasi dengan Supabase, serta pengalihan cepat ke chat WhatsApp dengan pesan ter-encode sesuai segmen kebutuhan.
- **Footer Terstruktur**: Informasi navigasi, kontak resmi, media sosial, dan hak cipta.

---

## 3. Tech Stack

| Layer | Teknologi |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Bahasa** | TypeScript |
| **Styling** | Tailwind CSS v4 & CSS Variables (`globals.css`) |
| **Ikon** | Lucide React |
| **Database / BaaS** | Supabase (Opsional for Contact Form & Portfolio) |
| **Font Optimasi** | Google Fonts (Space Grotesk, IBM Plex Sans, IBM Plex Mono) |

---

## 4. Struktur Direktori

```text
incode_solutions/
├── PRD/                    # Dokumen spesifikasi PRD & Design System
│   ├── prd.md
│   └── design.md
├── public/                 # Assets statis & gambar preview
├── src/
│   ├── app/
│   │   ├── globals.css     # Design tokens, CSS variables, & custom utility classes
│   │   ├── layout.tsx      # Root layout & SEO Metadata
│   │   └── page.tsx        # Halaman utama landing page
│   ├── components/         # Komponen UI modular
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── lib/                # Utility & konfigurasi
│       ├── constants.ts    # Nomor WA, fungsi generator link WA, & nav links
│       ├── hooks.ts        # Custom React hooks (useInView, dll)
│       └── supabase.ts     # Client Supabase & tipe TypeScript
├── .env.local              # File konfigurasi environment variable
├── next.config.ts          # Konfigurasi Next.js
├── package.json            # Manifest dependensi & script project
├── tsconfig.json           # Konfigurasi TypeScript
└── README.md               # Dokumentasi project
```

---

## 5. Cara Memulai (Local Development)

### Prasyarat
- **Node.js**: versi 18.x atau lebih baru
- **npm** / **yarn** / **pnpm** / **bun**

### Langkah-langkah
1. **Clone repository ini**:
   ```bash
   git clone https://github.com/fadiljee/incode-solution.git
   cd incode_solutions
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Salin file `.env.local` atau buat file baru bernama `.env.local` di root project:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
   *Catatan: Jika variabel Supabase di atas tidak diisi atau masih menggunakan placeholder, aplikasi akan secara otomatis mengalihkan penyimpanan pesan kontak dan portofolio ke mode fallback statis.*

4. **Jalankan Server Pengembang (Dev Server)**:
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

---

## 6. Konfigurasi WhatsApp

Nomor WhatsApp resmi diatur secara terpusat pada file `src/lib/constants.ts`.

Untuk mengubah nomor WhatsApp target:
1. Buka [src/lib/constants.ts](file:///home/fadil/fadil/incode_solutions/src/lib/constants.ts).
2. Ubah nilai konstanta `WA_NUMBER`:
   ```typescript
   export const WA_NUMBER = '628xxxxxxxxxx'; // Gunakan format kode negara tanpa tanda +
   ```

Fungsi `buildWaLink()` akan otomatis menyesuaikan pesan pra-isi sesuai konteks segmen (akademik, bisnis, atau default).

---

## 7. Skema Database Supabase (Opsional)

Jika ingin mengintegrasikan fitur pengiriman form kontak dan portofolio dinamis via Supabase, buat tabel berikut di Query Editor Supabase:

### Tabel `contact_messages`
```sql
create table public.contact_messages (
  id bigint generated by default as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  segment text check (segment in ('akademik', 'bisnis', 'umum')) default 'umum',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### Tabel `portfolio_items`
```sql
create table public.portfolio_items (
  id bigint generated by default as identity primary key,
  title text not null,
  category text check (category in ('akademik', 'bisnis')) not null,
  description text not null,
  image_url text not null,
  tech_stack text[] default '{}',
  live_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

---

## 8. Build & Deployment

### Build untuk Produksi
```bash
npm run build
```

### Jalankan hasil build secara lokal
```bash
npm run start
```

### Deploy ke Vercel
Project ini dapat dideploy dengan mudah di **Vercel**:
1. Push kode Anda ke repository GitHub.
2. Impor project di Vercel Dashboard.
3. Masukkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` pada menu Environment Variables di Vercel (jika menggunakan Supabase).
4. Klik **Deploy**.

---

## 9. Lisensi & Hak Cipta

(c) 2026 Incode Solution. All rights reserved.
