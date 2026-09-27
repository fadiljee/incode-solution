# Product Requirements Document (PRD)
## Landing Page — Incode Solution

| | |
|---|---|
| **Dokumen** | PRD Landing Page Incode Solution |
| **Versi** | 1.0 |
| **Tanggal** | 27 September 2026 |
| **Status** | Draft |

---

## 1. Ringkasan & Latar Belakang

**Incode Solution** adalah brand jasa teknologi yang melayani dua segmen sekaligus: kebutuhan akademik (mahasiswa/pelajar) dan kebutuhan bisnis (UMKM/perusahaan). Landing page ini dibuat sebagai etalase digital utama untuk memperkenalkan layanan, membangun kepercayaan calon klien, dan mengarahkan mereka melakukan kontak (konversi) melalui WhatsApp.

**Tagline:**
> "Solusi Teknologi Terpadu: Dari Tugas Akademik hingga Transformasi Digital UMKM & Perusahaan."

---

## 2. Tujuan Produk (Goals)

1. Membangun citra profesional Incode Solution sebagai penyedia jasa teknologi yang kredibel.
2. Menjelaskan dengan jelas dua lini layanan (akademik & bisnis) tanpa membingungkan pengunjung.
3. Memaksimalkan konversi pengunjung menjadi leads melalui CTA WhatsApp yang tersegmentasi.
4. Menyediakan pengalaman yang cepat, responsif, dan mudah diakses dari perangkat apa pun.

### Metrik Keberhasilan (Success Metrics)
| Metrik | Target Awal |
|---|---|
| Klik tombol WhatsApp (CTA) | Terlacak & meningkat tiap bulan |
| Waktu loading halaman | < 2 detik (Lighthouse score > 90) |
| Bounce rate | < 50% |
| Tampilan mobile-friendly | 100% lolos uji responsif |

---

## 3. Target Pengguna (Target Audience)

| Segmen | Kebutuhan | Contoh Persona |
|---|---|---|
| **Akademik** | Bantuan tugas, skripsi, debugging kode | Mahasiswa Informatika/SI tingkat akhir |
| **Bisnis/UMKM** | Website, sistem internal, aplikasi kasir | Pemilik UMKM/perusahaan kecil-menengah |

---

## 4. Call to Action (CTA) Utama

- **Jenis:** Direct to WhatsApp.
- **Diferensiasi pesan otomatis:**
  - Untuk pengunjung akademik → pesan pra-isi terkait tugas/skripsi.
  - Untuk pengunjung bisnis → pesan pra-isi terkait pembuatan website/sistem.
- **Implementasi teknis:** link `https://wa.me/[NOMOR]?text=[PESAN_ENCODED]`, dengan variasi query text berbeda tergantung tombol yang diklik (di Hero, di tiap kartu layanan, dan di Footer).

---

## 5. Ruang Lingkup Fitur & Struktur Halaman (Scope)

### 5.1 Navbar
- Logo "Incode Solution".
- Menu navigasi: Layanan, Keunggulan, Portofolio, Kontak.
- Bersifat sticky/responsive, berubah jadi hamburger menu di mobile.

### 5.2 Hero Section
- Headline utama + sub-headline yang menjelaskan value proposition.
- Tombol CTA utama (WhatsApp) — pesan default umum.
- Visual pendukung (ilustrasi/mockup teknologi).

### 5.3 Section Layanan (Services)
Dibagi 2 kategori dengan CTA WhatsApp masing-masing:

**A. Akademik**
- Pengerjaan Tugas Informatika
- Bantuan Skripsi / Proyek Akhir
- Jasa Debugging Kode

**B. Bisnis / UMKM**
- Jasa Pembuatan Company Profile
- Landing Page Penjualan
- Sistem Kasir / Aplikasi Internal

### 5.4 Section Alur Kerja (How It Works)
3 langkah mudah:
1. Konsultasi
2. Pengerjaan
3. Selesai (Serah Terima)

### 5.5 Section Portofolio / Showcase
- Galeri proyek (grid/carousel) berisi mockup web/aplikasi yang pernah dikerjakan.
- Setiap item: judul proyek, kategori (akademik/bisnis), gambar preview.

### 5.6 Footer & Kontak
- Nomor WhatsApp resmi
- Email
- Sosial media (Instagram/LinkedIn)
- Hak cipta / copyright notice

---

## 6. Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend Framework | React.js / Next.js (disarankan Next.js untuk SEO) |
| Styling | Tailwind CSS |
| Icons | Lucide React / React Icons |
| Backend / BaaS | Supabase (opsional — form kontak & data portofolio dinamis) |
| Version Control | Git & GitHub |
| Hosting | Vercel / Netlify |
| Domain | Custom domain (.id / .com) via Niagahoster/Rumahweb |
| SSL | Otomatis via Vercel/Netlify (HTTPS) |

**Alasan pemilihan stack:** performa tinggi, developer experience baik, gratis untuk hosting awal, dan proses deploy otomatis terhubung ke GitHub (CI/CD sederhana).

---

## 7. Persyaratan Non-Fungsional

- **Responsif:** tampilan aman di HP, tablet, dan laptop (mobile-first design).
- **Kecepatan:** optimasi gambar & lazy loading agar loading time cepat.
- **SEO:** metadata, title, dan struktur heading yang sesuai (khususnya jika pakai Next.js).
- **Keamanan:** HTTPS wajib aktif di seluruh halaman.
- **Aksesibilitas dasar:** kontras warna cukup, tombol mudah diklik/tap.

---

## 8. Tahapan Pengembangan (Development Plan)

1. **Inisialisasi Project** — setup React/Next.js + instalasi Tailwind CSS.
2. **Desain Komponen** — pecah menjadi komponen terpisah: Navbar, Hero, Services, HowItWorks, Portfolio, Footer.
3. **Integrasi WhatsApp CTA** — buat fungsi/helper untuk generate link `wa.me` dengan pesan dinamis sesuai konteks tombol.
4. **Setup Supabase (opsional)** — koneksi database untuk menyimpan pesan masuk / data portofolio dinamis.
5. **Uji Responsif** — cek tampilan di berbagai breakpoint (mobile, tablet, desktop).

---

## 9. Rencana Deployment (Go-Live Plan)

| Tahap | Detail |
|---|---|
| Domain | Beli domain (mis. `incodesolution.id`) via Niagahoster/Rumahweb |
| Hosting | Deploy ke Vercel atau Netlify, terhubung ke repo GitHub |
| Custom Domain Setup | Arahkan DNS domain ke Vercel/Netlify |
| SSL | Pastikan HTTPS aktif otomatis |
| Testing Akhir | Cek semua link WhatsApp, pastikan tidak ada broken link, uji kecepatan loading (misal via PageSpeed Insights) |

---

## 10. Risiko & Catatan

- Supabase bersifat **opsional** — hanya diperlukan jika ada kebutuhan menyimpan data secara dinamis (form kontak, daftar portofolio yang bisa di-update tanpa redeploy).
- Perlu konsistensi pesan CTA WhatsApp agar tim (Incode Solution) bisa langsung tahu asal klien (akademik vs bisnis) saat chat masuk.
- Konten portofolio sebaiknya disiapkan (gambar/mockup) sebelum tahap development section Portofolio dimulai, agar tidak menghambat proses coding.

---

## 11. Out of Scope (Tidak Termasuk di Versi Ini)

- Sistem login/dashboard klien.
- Payment gateway / sistem pembayaran online.
- Multi-bahasa (Bahasa Indonesia saja untuk versi awal).

---

*Dokumen ini dapat diperbarui seiring perkembangan diskusi dan kebutuhan proyek.*