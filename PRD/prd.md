# Product Requirements Document (PRD)

# Landing Page & Admin Panel — Incode Solution

|              |                                                |
| ------------ | ---------------------------------------------- |
| **Dokumen**  | PRD Landing Page & Admin Panel Incode Solution |
| **Versi**    | 2.0                                            |
| **Tanggal**  | 28 September 2026                              |
| **Status**   | Draft                                          |
| **Platform** | Web Application                                |
| **Target**   | Public Website + Admin Panel                   |

---

# 1. Ringkasan & Latar Belakang

**Incode Solution** adalah brand jasa teknologi yang melayani dua segmen utama:

1. **Akademik** — mahasiswa/pelajar yang membutuhkan bantuan terkait tugas pemrograman, project, debugging, dan kebutuhan teknologi akademik.
2. **Bisnis / UMKM** — individu, UMKM, dan perusahaan yang membutuhkan website, landing page, sistem internal, aplikasi bisnis, dan solusi digital.

Website Incode Solution berfungsi sebagai **company profile sekaligus digital storefront** yang memperkenalkan layanan, portofolio, keunggulan, dan mempermudah calon pelanggan menghubungi Incode Solution.

Selain halaman publik, sistem memiliki **Admin Panel** yang memungkinkan administrator mengelola seluruh konten website tanpa harus melakukan perubahan kode secara manual.

### Tagline

> "Solusi Teknologi Terpadu: Dari Tugas Akademik hingga Transformasi Digital UMKM & Perusahaan."

---

# 2. Tujuan Produk

## 2.1 Tujuan Utama

1. Membangun citra profesional Incode Solution.
2. Menampilkan layanan secara jelas.
3. Menampilkan portofolio proyek.
4. Menghasilkan leads melalui WhatsApp dan form kontak.
5. Memudahkan administrator mengelola konten website.
6. Mengurangi kebutuhan perubahan kode untuk update konten.
7. Menyediakan sistem pengelolaan leads sederhana.
8. Menyediakan dashboard untuk memantau performa website.

## 2.2 Success Metrics

| Metrik                 | Target Awal |
| ---------------------- | ----------- |
| Klik WhatsApp CTA      | Terlacak    |
| Leads masuk            | Terlacak    |
| Portfolio views        | Terlacak    |
| Waktu loading          | < 2 detik   |
| Lighthouse Performance | > 90        |
| Mobile responsive      | 100%        |
| Uptime                 | > 99%       |
| Admin login success    | > 99%       |

---

# 3. Target Pengguna

| Segmen     | Kebutuhan                      | Persona                  |
| ---------- | ------------------------------ | ------------------------ |
| Akademik   | Tugas, project, debugging      | Mahasiswa Informatika    |
| Bisnis     | Website & sistem bisnis        | Pemilik UMKM             |
| Perusahaan | Sistem internal & digitalisasi | Business owner / manager |
| Admin      | Mengelola website              | Owner / Administrator    |

---

# 4. User Roles

Versi awal menggunakan dua jenis role.

## 4.1 Admin

Admin memiliki akses penuh terhadap:

* Dashboard
* Portfolio
* Services
* Testimonials
* Leads
* Website Settings
* Admin profile
* Content publishing

## 4.2 Super Admin

Super Admin memiliki seluruh akses Admin ditambah:

* Membuat admin baru
* Menghapus admin
* Mengubah role admin
* Mengelola permission
* Melihat activity log
* Mengelola konfigurasi sistem

Untuk MVP, sistem dapat menggunakan satu akun admin terlebih dahulu.

---

# 5. Arsitektur Sistem

Sistem terdiri dari dua area utama.

```text
Incode Solution
│
├── Public Website
│   ├── Home
│   ├── Services
│   ├── Portfolio
│   ├── Testimonials
│   ├── About
│   └── Contact
│
├── Admin Panel
│   ├── Login
│   ├── Dashboard
│   ├── Portfolio
│   ├── Services
│   ├── Testimonials
│   ├── Leads
│   ├── Website Settings
│   ├── Admin Users
│   └── Activity Logs
│
└── Backend
    ├── Supabase Auth
    ├── PostgreSQL
    ├── Supabase Storage
    └── Row Level Security
```

---

# 6. Public Website

## 6.1 Navbar

Navbar terdiri dari:

* Logo
* Home
* Layanan
* Keunggulan
* Portofolio
* Tentang Kami
* Kontak
* CTA WhatsApp

Navbar:

* Sticky
* Responsive
* Mobile hamburger menu
* Smooth scrolling

---

# 7. Hero Section

Hero section menampilkan:

* Headline
* Subheadline
* CTA utama
* CTA sekunder
* Visual/mockup teknologi
* Social proof jika tersedia

Contoh CTA:

**Konsultasi Sekarang**

Mengarah ke WhatsApp dengan pesan otomatis.

---

# 8. Services Section

Services dibagi menjadi:

## Akademik

* Pengerjaan Tugas Informatika
* Bantuan Project
* Bantuan Skripsi / Project Akhir
* Debugging Kode
* Konsultasi Teknologi

## Bisnis / UMKM

* Company Profile
* Landing Page
* Website Bisnis
* Sistem Kasir
* Sistem Inventory
* Aplikasi Internal
* Digitalisasi UMKM

Data services harus berasal dari database sehingga dapat dikelola melalui Admin Panel.

---

# 9. How It Works

Workflow:

### 1. Konsultasi

Customer menghubungi Incode Solution.

### 2. Analisis Kebutuhan

Kebutuhan dan scope proyek dianalisis.

### 3. Penawaran

Estimasi biaya dan timeline diberikan.

### 4. Pengerjaan

Proyek mulai dikerjakan.

### 5. Review

Customer melakukan review.

### 6. Serah Terima

Proyek diserahkan kepada customer.

---

# 10. Portfolio / Showcase

Portfolio ditampilkan dalam bentuk:

* Grid
* Card
* Filter kategori
* Detail project

Setiap portfolio memiliki:

* Judul
* Slug
* Deskripsi
* Thumbnail
* Gallery
* Kategori
* Client / project type
* Tahun
* Teknologi
* Demo URL
* Repository URL jika tersedia
* Status publish

Contoh kategori:

* Academic
* Business
* UMKM
* Website
* Mobile App
* Web App
* System

---

# 11. Testimonials

Website menyediakan section testimonial.

Data testimonial:

* Nama
* Role / pekerjaan
* Foto
* Testimonial
* Rating
* Kategori
* Status publish

Admin dapat:

* Tambah testimonial
* Edit testimonial
* Delete testimonial
* Publish / unpublish

---

# 12. Contact & Leads

Website menyediakan dua mekanisme kontak:

## 12.1 WhatsApp

Pengunjung diarahkan langsung ke WhatsApp.

Pesan otomatis disesuaikan berdasarkan konteks.

Contoh:

```text
Halo Incode Solution, saya tertarik dengan layanan pembuatan website.
Saya ingin berkonsultasi mengenai kebutuhan saya.
```

## 12.2 Contact Form

Form:

* Nama
* Email
* Nomor WhatsApp
* Kategori kebutuhan
* Subject
* Message

Data disimpan ke database.

---

# 13. Lead Management

Setiap contact form menjadi sebuah lead.

Status lead:

```text
NEW
↓
CONTACTED
↓
IN_DISCUSSION
↓
QUOTATION
↓
WON / LOST
```

Admin dapat:

* Melihat daftar leads
* Melihat detail lead
* Mengubah status
* Menambahkan catatan
* Menambahkan tag
* Menghapus lead
* Mencari lead
* Filter berdasarkan status
* Filter berdasarkan kategori
* Filter berdasarkan tanggal

---

# 14. Admin Panel

Admin Panel tersedia di:

```text
/admin
```

Area admin tidak boleh dapat diakses tanpa autentikasi.

---

# 15. Admin Authentication

Authentication menggunakan:

**Supabase Auth**

Fitur:

* Login
* Logout
* Session management
* Forgot password
* Reset password
* Protected routes

Login menggunakan:

* Email
* Password

Opsional:

* Google OAuth

---

# 16. Admin Dashboard

Dashboard menampilkan ringkasan data.

### Statistik

```text
Total Portfolio
Total Services
Total Leads
New Leads
Published Portfolio
Published Testimonials
```

### Contoh Dashboard

```text
┌──────────────────────────────────────┐
│ Dashboard                            │
├──────────┬──────────┬───────────────┤
│ Portfolio│ Services │ Total Leads   │
│    12    │     8    │      42       │
├──────────┴──────────┴───────────────┤
│ New Leads                            │
│ 17                                    │
├─────────────────────────────────────┤
│ Recent Leads                         │
│ - Ahmad       Business      NEW      │
│ - Budi        Academic      CONTACTED│
│ - Sinta       Business      WON      │
└─────────────────────────────────────┘
```

---

# 17. Admin Sidebar

Sidebar:

```text
Dashboard

Content
├── Services
├── Portfolio
├── Testimonials

CRM
└── Leads

Website
└── Settings

System
├── Admin Users
└── Activity Logs

Account
└── Profile

Logout
```

---

# 18. Portfolio Management

Admin dapat melakukan CRUD:

### Create

Menambahkan project baru.

Field:

* Title
* Slug
* Description
* Category
* Thumbnail
* Gallery
* Technologies
* Client
* Year
* Demo URL
* Repository URL
* Featured
* Published

### Read

Admin dapat melihat:

* Semua portfolio
* Portfolio published
* Draft
* Featured portfolio

### Update

Admin dapat mengubah seluruh informasi portfolio.

### Delete

Admin dapat menghapus portfolio dengan confirmation dialog.

---

# 19. Service Management

Admin dapat mengelola layanan.

Field:

* Service name
* Slug
* Category
* Short description
* Full description
* Icon
* Image
* Starting price (opsional)
* CTA message
* Sort order
* Published

Admin dapat:

* Create
* Read
* Update
* Delete
* Publish
* Unpublish
* Reorder

---

# 20. Testimonial Management

CRUD testimonial:

```text
Create
Read
Update
Delete
Publish
Unpublish
```

Field:

* Customer name
* Position
* Company
* Photo
* Testimonial
* Rating
* Category
* Published

---

# 21. Website Settings

Admin dapat mengubah informasi website tanpa menyentuh source code.

### General

* Website name
* Tagline
* Description
* Logo
* Favicon

### Contact

* WhatsApp
* Email
* Address
* Business hours

### Social Media

* Instagram
* LinkedIn
* GitHub
* Facebook
* TikTok

### SEO

* Meta title
* Meta description
* OG image
* Keywords

### CTA

Admin dapat menentukan:

* WhatsApp number
* Default message
* Academic message
* Business message

---

# 22. Media Management

Admin dapat upload:

* Portfolio image
* Logo
* Testimonial photo
* Website image
* OG image

Storage menggunakan:

**Supabase Storage**

Struktur:

```text
storage/
├── portfolio/
├── testimonials/
├── services/
├── branding/
└── general/
```

Admin dapat:

* Upload
* Preview
* Delete
* Copy URL

---

# 23. Admin Users

Super Admin dapat mengelola administrator.

Data:

* Name
* Email
* Role
* Status
* Last login
* Created at

Action:

* Create admin
* Edit admin
* Disable admin
* Delete admin
* Reset password

---

# 24. Activity Logs

Sistem mencatat aktivitas penting administrator.

Contoh:

```text
Admin Fadil created portfolio "QRKita"
Admin Fadil updated service "Website UMKM"
Admin Fadil published testimonial
Admin Fadil deleted portfolio
```

Data log:

* User
* Action
* Resource
* Resource ID
* Timestamp
* IP address jika tersedia

Activity log hanya dapat dilihat oleh Super Admin.

---

# 25. Database Schema

Database menggunakan PostgreSQL melalui Supabase.

## 25.1 profiles

```text
id
full_name
email
avatar_url
role
status
created_at
updated_at
```

## 25.2 services

```text
id
name
slug
category
short_description
description
icon
image_url
price_from
cta_message
sort_order
is_published
created_at
updated_at
```

## 25.3 portfolios

```text
id
title
slug
description
category
thumbnail_url
gallery
client_name
project_year
technologies
demo_url
repository_url
is_featured
is_published
created_at
updated_at
```

## 25.4 testimonials

```text
id
name
position
company
avatar_url
content
rating
category
is_published
created_at
updated_at
```

## 25.5 leads

```text
id
name
email
phone
category
subject
message
status
notes
source
created_at
updated_at
```

## 25.6 website_settings

```text
id
key
value
updated_at
```

## 25.7 activity_logs

```text
id
user_id
action
resource
resource_id
metadata
created_at
```

---

# 26. Database Relationship

```text
auth.users
     │
     ▼
 profiles
     │
     ├──────────────► activity_logs
     │
     ▼

services
portfolios
testimonials
leads
website_settings
```

---

# 27. Security

Security menjadi bagian wajib.

## Authentication

* Supabase Auth
* Secure session
* Protected admin routes
* Password reset

## Authorization

Menggunakan role:

```text
ADMIN
SUPER_ADMIN
```

## Row Level Security

Supabase RLS wajib diaktifkan.

Contoh:

```text
Public
 ├── Read published services
 ├── Read published portfolios
 └── Read published testimonials

Admin
 ├── CRUD services
 ├── CRUD portfolios
 ├── CRUD testimonials
 ├── Read/update leads
 └── Update settings

Super Admin
 └── Full access
```

## Security Rules

* Jangan expose Supabase service role key ke frontend.
* Gunakan environment variables.
* Validasi input.
* Sanitasi input.
* Rate limiting untuk contact form jika diperlukan.
* Proteksi upload file.
* Batasi tipe dan ukuran file.
* Jangan menyimpan password secara manual.
* Jangan menyimpan secret API key di database publik.

---

# 28. SEO

Public website harus memiliki:

* Metadata
* Dynamic title
* Dynamic description
* Open Graph
* Twitter/X Card
* Sitemap
* Robots.txt
* Canonical URL
* Semantic HTML
* Structured data jika relevan

Portfolio dapat memiliki halaman SEO:

```text
/portfolio/project-name
```

Services:

```text
/services/website-umkm
/services/company-profile
```

---

# 29. Analytics

Website dapat mengukur:

* Page views
* WhatsApp CTA clicks
* Portfolio clicks
* Contact form submissions
* Service clicks
* Traffic source

Analytics dapat menggunakan:

* Google Analytics
* Vercel Analytics
* Plausible

Untuk MVP, analytics dapat dibuat sederhana terlebih dahulu.

---

# 30. WhatsApp Tracking

Setiap CTA WhatsApp diberi source.

Contoh:

```text
hero
service_academic
service_business
portfolio
footer
```

Sistem dapat mengetahui CTA mana yang menghasilkan interaksi paling banyak.

Contoh:

```text
Hero CTA             42 clicks
Academic Service     27 clicks
Business Service     63 clicks
Portfolio             18 clicks
Footer                6 clicks
```

---

# 31. Admin UI/UX Requirements

Admin Panel harus:

* Responsive
* Desktop-first
* Mobile-friendly
* Sidebar navigation
* Data table
* Search
* Filter
* Pagination
* Modal / drawer
* Confirmation dialog
* Toast notification
* Loading state
* Empty state
* Error state

### Design

Style:

* Modern
* Minimal
* Professional
* Clean
* Consistent
* Tidak terlalu banyak dekorasi

---

# 32. Public UI/UX Requirements

Landing page:

* Modern
* Professional
* Responsive
* Mobile-first
* Fast
* Clear CTA
* Strong typography
* Consistent spacing

Target:

```text
Mobile
Tablet
Desktop
Large Desktop
```

---

# 33. Tech Stack

| Layer           | Teknologi                           |
| --------------- | ----------------------------------- |
| Framework       | Next.js                             |
| Language        | TypeScript                          |
| Styling         | Tailwind CSS                        |
| UI Components   | shadcn/ui                           |
| Icons           | Lucide React                        |
| Backend         | Supabase                            |
| Database        | PostgreSQL                          |
| Authentication  | Supabase Auth                       |
| Storage         | Supabase Storage                    |
| Validation      | Zod                                 |
| Forms           | React Hook Form                     |
| Deployment      | Vercel                              |
| Version Control | Git + GitHub                        |
| Analytics       | Vercel Analytics / Google Analytics |

### Kenapa Supabase?

Supabase digunakan untuk:

* PostgreSQL
* Authentication
* Storage
* Row Level Security
* Database API
* Realtime jika diperlukan

Dengan demikian, sistem tidak membutuhkan backend server terpisah untuk MVP.

---

# 34. Project Structure

Struktur aplikasi yang disarankan:

```text
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── about/
│   │   └── contact/
│   │
│   ├── admin/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── testimonials/
│   │   ├── leads/
│   │   ├── settings/
│   │   ├── users/
│   │   └── logs/
│   │
│   └── api/
│
├── components/
│   ├── public/
│   ├── admin/
│   └── ui/
│
├── lib/
│   ├── supabase/
│   ├── auth/
│   ├── whatsapp/
│   └── validations/
│
├── types/
├── hooks/
└── utils/
```

---

# 35. API / Data Layer

Public website:

```text
GET services
GET portfolios
GET testimonials
GET website settings
POST contact form
```

Admin:

```text
CRUD services
CRUD portfolios
CRUD testimonials
GET leads
UPDATE lead
DELETE lead
CRUD settings
CRUD admin users
GET activity logs
```

Data access harus tetap mengikuti authorization Supabase.

---

# 36. Contact Form Flow

```text
User
 │
 ▼
Contact Form
 │
 ▼
Validation
 │
 ▼
Supabase
 │
 ▼
leads table
 │
 ▼
Admin Dashboard
 │
 ▼
Admin processes lead
```

Status:

```text
NEW
CONTACTED
IN_DISCUSSION
QUOTATION
WON
LOST
```

---

# 37. Portfolio Flow

```text
Admin Login
     │
     ▼
Portfolio
     │
     ▼
Create Portfolio
     │
     ├── Upload Thumbnail
     ├── Add Description
     ├── Add Category
     ├── Add Technology
     └── Add Demo
     │
     ▼
Save Draft
     │
     ▼
Publish
     │
     ▼
Public Website
```

---

# 38. Deployment

## Production

```text
GitHub
   │
   ▼
Vercel
   │
   ▼
Next.js Application
   │
   ▼
Supabase
```

## Environment Variables

Contoh:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Secret key hanya digunakan pada environment server yang sesuai dan tidak boleh dikirim ke browser.

---

# 39. Non-Functional Requirements

## Performance

Target:

* Lighthouse > 90
* LCP < 2.5s
* Optimized images
* Lazy loading
* Code splitting

## Availability

Target:

* Production uptime > 99%

## Security

* HTTPS
* RLS
* Authentication
* Authorization
* Input validation

## Accessibility

Target:

* Keyboard navigation
* Proper semantic HTML
* Alt text
* Sufficient contrast
* Accessible form labels

---

# 40. Development Plan

## Phase 1 — Foundation

* Setup Next.js
* Setup TypeScript
* Setup Tailwind
* Setup shadcn/ui
* Setup Supabase
* Setup GitHub
* Setup Vercel

## Phase 2 — Database

* Create database
* Create tables
* Configure relationships
* Configure RLS
* Create seed data

## Phase 3 — Authentication

* Supabase Auth
* Admin login
* Protected routes
* Role management
* Logout

## Phase 4 — Public Website

* Navbar
* Hero
* Services
* How It Works
* Portfolio
* Testimonials
* Contact
* Footer

## Phase 5 — Admin Panel

* Dashboard
* Portfolio CRUD
* Services CRUD
* Testimonials CRUD
* Leads
* Settings
* Media management

## Phase 6 — Security

* RLS
* Authorization
* Input validation
* Upload security
* Route protection

## Phase 7 — SEO & Analytics

* Metadata
* Sitemap
* Robots
* Open Graph
* Analytics
* CTA tracking

## Phase 8 — Testing

* Responsive testing
* Authentication testing
* CRUD testing
* Form testing
* Security testing
* Lighthouse testing
* Browser compatibility testing

## Phase 9 — Deployment

* Production Supabase
* Production environment variables
* Vercel deployment
* Custom domain
* SSL
* Final testing

---

# 41. Acceptance Criteria

## Public Website

* [ ] Website dapat diakses tanpa login.
* [ ] Responsive di mobile, tablet, desktop.
* [ ] Semua CTA WhatsApp bekerja.
* [ ] Services berasal dari database.
* [ ] Portfolio berasal dari database.
* [ ] Testimonials berasal dari database.
* [ ] Contact form dapat dikirim.
* [ ] Contact form tersimpan sebagai lead.
* [ ] SEO metadata tersedia.
* [ ] Sitemap tersedia.

## Admin

* [ ] `/admin` membutuhkan authentication.
* [ ] Admin dapat login.
* [ ] Admin dapat logout.
* [ ] Admin dapat melihat dashboard.
* [ ] Admin dapat CRUD portfolio.
* [ ] Admin dapat CRUD services.
* [ ] Admin dapat CRUD testimonials.
* [ ] Admin dapat melihat leads.
* [ ] Admin dapat mengubah status leads.
* [ ] Admin dapat mengubah website settings.
* [ ] Admin dapat upload gambar.
* [ ] Admin dapat publish/unpublish content.
* [ ] Admin tidak dapat mengakses data yang tidak memiliki permission.

## Security

* [ ] Supabase RLS aktif.
* [ ] Protected admin routes.
* [ ] Service role key tidak terekspos.
* [ ] Form tervalidasi.
* [ ] Upload file tervalidasi.
* [ ] Authorization berdasarkan role.

---

# 42. Out of Scope

Fitur berikut belum termasuk versi 1:

* Client dashboard
* Online payment
* Payment gateway
* Invoice management
* Project management
* Live chat
* Mobile application
* Multi-language
* Advanced CRM
* Email marketing automation
* Subscription system
* AI chatbot

Fitur tersebut dapat menjadi roadmap versi berikutnya.

---

# 43. Future Roadmap

## Version 2

* Advanced CRM
* Email notification
* WhatsApp notification
* Customer management
* Project management
* Quotation management

## Version 3

* Customer portal
* Online quotation approval
* Invoice
* Payment gateway
* Project tracking

## Version 4

* AI chatbot
* AI lead qualification
* AI proposal generator
* AI content generator
* Automated follow-up

---

# 44. Kesimpulan

Incode Solution bukan hanya landing page statis, tetapi menjadi **content-managed company website** dengan dua sisi:

### Public

```text
Landing Page
Services
Portfolio
Testimonials
Contact
WhatsApp CTA
```

### Internal

```text
Admin Login
Dashboard
Portfolio Management
Service Management
Testimonial Management
Lead Management
Media Management
Website Settings
Admin Users
Activity Logs
```

Seluruh konten utama dapat dikelola melalui Admin Panel tanpa perlu mengubah source code atau melakukan redeploy untuk perubahan konten.

Supabase menjadi backend utama yang menyediakan:

```text
PostgreSQL
Authentication
Storage
Row Level Security
Database API
```

Sistem dirancang agar dapat dimulai sebagai MVP sederhana, tetapi tetap memiliki fondasi yang memungkinkan Incode Solution berkembang menjadi platform operasional bisnis yang lebih lengkap.
