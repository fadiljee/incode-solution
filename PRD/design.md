# UI/UX Design Specification
## Landing Page — Incode Solution

| | |
|---|---|
| **Konsep** | "Buku Catatan bertemu Blueprint Teknis" |
| **Versi** | 1.0 |
| **Tanggal** | 27 September 2026 |

---

## 1. Konsep Desain

Incode Solution menjembatani dua dunia: akademik (mahasiswa, tugas, skripsi) dan teknis/bisnis (sistem, kode, UMKM). Konsep visualnya menggabungkan nuansa **kertas catatan/ruled paper** (dunia akademik) dengan **garis blueprint/dokumentasi teknis** (dunia rekayasa perangkat lunak) — tanpa jatuh ke tampilan generik "AI slop" (bukan kombinasi krem hangat + serif kontras + aksen terracotta, bukan kartu SaaS seragam membulat, tanpa gradient, tanpa emoticon, tanpa label ALL-CAPS berjarak).

**Prinsip utama:**
- Satu warna aksen yang dipakai konsisten dan disiplin, bukan warna-warni.
- Garis tipis (hairline) dan sudut tegas menggantikan bayangan lembut & border-radius seragam.
- Tipografi sebagai elemen desain aktif, bukan sekadar wadah teks.
- Motion minimal — tanpa animasi hover/reveal bertebaran di setiap elemen.

---

## 2. Palet Warna

| Token | Hex | Peran |
|---|---|---|
| `paper` | `#EDEAE1` | Latar utama (krem-abu netral, bukan cream hangat klise) |
| `paper-card` | `#FAF8F2` | Latar kartu/panel |
| `ink` | `#1D2420` | Warna teks utama (hitam kehijauan gelap) |
| `ink-soft` | `#4B534D` | Teks sekunder / deskripsi |
| `pine` (aksen utama) | `#234B3E` | Tombol CTA, tautan aktif, penanda "akademik" |
| `brass` (aksen sekunder) | `#A67C33` | Penanda kategori "bisnis", highlight kecil |
| `line` | `#CFC9BA` | Garis pembatas antar-elemen |

**Catatan:** tidak ada gradasi warna di mana pun — semua warna solid/flat. Mode gelap tersedia sebagai varian (latar `#161A17`, aksen `pine` jadi `#6FA98F`, `brass` jadi `#D3A75B`).

---

## 3. Tipografi

| Peran | Font | Alasan |
|---|---|---|
| Headline / Display | **Space Grotesk** (600–700) | Geometris, tegas, punya karakter teknis tanpa terkesan generik |
| Body text | **IBM Plex Sans** (400–500) | Netral, sangat terbaca, cocok untuk konten panjang |
| Label teknis / data kecil | **IBM Plex Mono** (400–500) | Menegaskan nuansa "kode" secara halus, dipakai terbatas (label kategori, kode layanan) |

**Skala tipografi (contoh):**
- H1: 34–54px, line-height 1.08, letter-spacing -0.015em
- H2: 26–34px
- H3: 18–22px
- Body: 16px, line-height 1.55
- Label mono: 12–13px

Tidak ada kata tunggal yang di-*bold*/italic sebagai aksen di headline, dan tidak ada label ALL-CAPS.

---

## 4. Struktur Layout & Wireframe

### 4.1 Navbar (sticky)
```
┌─────────────────────────────────────────────────────────┐
│ Incode/Solution      Layanan Keunggulan Portofolio Kontak │  [Hubungi via WhatsApp]
└─────────────────────────────────────────────────────────┘
```
- Logo sebagai wordmark (bukan ikon generik), garis bawah tipis saat hover menu.
- Di mobile: menu tautan disembunyikan, tombol WhatsApp tetap terlihat.

### 4.2 Hero
```
┌───────────────────────────────┬───────────────┐
│ kicker: incodesolution.id      │ hero-side box │
│                                 │ "dua jalur    │
│ H1: Solusi teknologi terpadu,  │  layanan"     │
│ dari tugas kuliah sampai       │ - list poin   │
│ sistem bisnis.                 │               │
│                                 │               │
│ lede paragraph...               │               │
│                                 │               │
│ [CTA akademik] [CTA bisnis]     │               │
└───────────────────────────────┴───────────────┘
```
- Rasio kolom ±70/30, sejajar kiri (bukan center-aligned generik).
- Dua CTA berbeda pesan WhatsApp: satu untuk akademik, satu untuk bisnis.

### 4.3 Section Layanan
```
┌─────────────────────┬─────────────────────┐
│ akademik             │ bisnis / umkm        │
│ Untuk mahasiswa      │ Untuk pemilik usaha  │
│ - Tugas informatika   TASK │ - Company profile  PROFILE│
│ - Skripsi/proyek akhir THESIS│ - Landing page   LANDING │
│ - Debugging kode      DEBUG │ - Sistem kasir    SYSTEM │
└─────────────────────┴─────────────────────┘
```
- Dua kolom dipisah garis vertikal tipis, masing-masing punya label mono kecil di kanan tiap item (bukan ikon generik).

### 4.4 Alur Kerja (3 langkah — penomoran dipakai karena memang berurutan)
```
01 Konsultasi   │ 02 Pengerjaan   │ 03 Selesai
deskripsi...    │ deskripsi...    │ deskripsi...
```

### 4.5 Portofolio
```
┌───────────┐ ┌───────────┐ ┌───────────┐
│ ●●●        │ │ ●●●        │ │ ●●●        │   ← frame ala jendela browser (CSS, bukan gambar asli)
│ [ruled     │ │ [ruled     │ │ [ruled     │
│  lines]    │ │  lines]    │ │  lines]    │
│───────────│ │───────────│ │───────────│
│ bisnis     │ │ bisnis     │ │ akademik   │
│ Judul...   │ │ Judul...   │ │ Judul...   │
└───────────┘ └───────────┘ └───────────┘
```
- Placeholder visual dibuat dari CSS (garis-garis halus meniru kertas), diganti dengan tangkapan layar proyek asli saat konten tersedia.

### 4.6 Footer
```
incode solution     kontak                sosial media
deskripsi singkat    WhatsApp              Instagram
                      Email                 LinkedIn
─────────────────────────────────────────────────────
© 2026 Incode Solution.        Dibuat dengan React, Next.js & Tailwind CSS
```

---

## 5. Komponen & Interaksi

| Komponen | Perilaku |
|---|---|
| Tombol CTA solid | Latar `pine`, hover jadi `pine-dark` — tanpa gradient, tanpa animasi berlebih |
| Tombol CTA outline | Border tipis, hover berubah warna teks & border ke `pine` |
| Kartu portofolio | Border hairline, tanpa shadow lembut seragam ala SaaS |
| Fokus keyboard | Outline terlihat jelas di semua elemen interaktif (aksesibilitas) |
| Motion | Tidak ada animasi fade/slide otomatis di setiap section; transisi hover singkat saja |

---

## 6. Responsif

- **Desktop (>860px):** layout grid multi-kolom seperti wireframe di atas.
- **Mobile (≤860px):** menu navbar disembunyikan (tombol WhatsApp tetap tampil), semua grid dua/tiga kolom berubah jadi satu kolom bertumpuk, garis pembatas berpindah dari vertikal ke horizontal.
- Ukuran teks headline memakai `clamp()` agar menyesuaikan lebar layar tanpa breakpoint tambahan.

---

## 7. Referensi Implementasi

Versi hidup (HTML) dari desain ini sudah dipublikasikan sebagai artifact terpisah dan bisa dijadikan acuan langsung saat membangun komponen React/Tailwind sesuai PRD.