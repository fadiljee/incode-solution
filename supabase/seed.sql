-- Data Seeder untuk Incode Solution
-- File ini dapat dijalankan menggunakan command `supabase db seed` atau dieksekusi langsung di SQL Editor Supabase.

-- 1. Bersihkan data lama (opsional, uncomment jika ingin reset data setiap kali seed dijalankan)
-- TRUNCATE TABLE public.services CASCADE;
-- TRUNCATE TABLE public.portfolios CASCADE;
-- TRUNCATE TABLE public.testimonials CASCADE;
-- TRUNCATE TABLE public.website_settings CASCADE;

-- 2. Seed Services (Layanan)
INSERT INTO public.services (name, slug, category, short_description, description, icon, price_from, sort_order, is_published) VALUES
('Pengerjaan Tugas Informatika', 'pengerjaan-tugas-informatika', 'akademik', 'Bantuan pengerjaan tugas pemrograman, algoritma, database, & web.', 'Solusi pengerjaan tugas akademik secara terstruktur, rapi, dan dilengkapi penjelasan agar mudah dipahami.', 'Code', 50000, 1, true),
('Bantuan Skripsi & Project Akhir', 'bantuan-skripsi-project-akhir', 'akademik', 'Pendampingan & pengerjaan aplikasi skripsi/ta untuk mahasiswa.', 'Pengembangan sistem skripsi lengkap dengan source code, modul penjelasan, dan siap dipresentasikan.', 'GraduationCap', 500000, 2, true),
('Jasa Debugging & Fix Bug Kode', 'jasa-debugging-fix-bug-kode', 'akademik', 'Perbaikan error kode, refactoring, dan troubleshooting program.', 'Mengatasi masalah error, bug, dan optimasi performa program dalam waktu cepat.', 'Bug', 35000, 3, true),
('Company Profile Profesional', 'company-profile-profesional', 'bisnis', 'Website company profile modern, fast-loading, dan SEO-friendly.', 'Membangun citra kredibel perusahaan Anda di internet dengan desain editorial yang elegan.', 'Globe', 750000, 4, true),
('Landing Page Penjualan', 'landing-page-penjualan', 'bisnis', 'Landing page tinggi konversi terintegrasi WhatsApp & analytics.', 'Desain landing page interaktif yang mempercepat penjualan produk dan jasa bisnis Anda.', 'Zap', 500000, 5, true),
('Sistem Kasir & Aplikasi Internal', 'sistem-kasir-aplikasi-internal', 'bisnis', 'Sistem POS kasir, manajemen inventory, dan dashboard internal.', 'Sistem manajemen operasional bisnis berbasis web/cloud untuk mengotomatisasi pencatatan usaha.', 'LayoutDashboard', 1200000, 6, true)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  short_description = EXCLUDED.short_description,
  price_from = EXCLUDED.price_from;

-- 3. Seed Portfolios (Portofolio)
INSERT INTO public.portfolios (title, slug, description, category, client_name, project_year, technologies, demo_url, is_featured, is_published) VALUES
('Sistem Informasi Perpustakaan Web', 'sistem-informasi-perpustakaan-web', 'Sistem pengelolaan sirkulasi buku perpustakaan lengkap dengan scanner barcode dan laporan otomatis.', 'akademik', 'Tugas Akhir Mahasiswa', 2024, ARRAY['PHP', 'MySQL', 'Bootstrap'], '#', true, true),
('Landing Page Toko Online UMKM', 'landing-page-toko-online-umkm', 'Halaman landing page showcase produk busana lokal terintegrasi checkout langsung ke WhatsApp.', 'bisnis', 'Koleksi Busana Nusantara', 2024, ARRAY['Next.js', 'Tailwind CSS', 'Framer Motion'], '#', true, true),
('Aplikasi Kasir Digital Resto', 'aplikasi-kasir-digital-resto', 'Point of Sales (POS) berbasis PWA dengan fitur cetak struk thermal dan rekap omset harian.', 'system', 'Resto Sedap Rasa', 2024, ARRAY['React', 'Supabase', 'PWA'], '#', false, true),
('Klasifikasi Sentimen NLP Ulasan Produk', 'klasifikasi-sentimen-nlp-ulasan-produk', 'Model Deep Learning LSTM untuk analisis sentimen ulasan pembeli e-commerce.', 'akademik', 'Penelitian Tugas Akhir', 2024, ARRAY['Python', 'TensorFlow', 'Jupyter'], '#', false, true),
('Company Profile PT Kontraktor Utama', 'company-profile-pt-kontraktor-utama', 'Website profil perusahaan konstruksi nasional dengan galeri proyek interaktif.', 'website', 'PT Kontraktor Utama', 2024, ARRAY['Next.js', 'TypeScript', 'Tailwind'], '#', true, true),
('Dashboard IoT Monitoring Suhu Realtime', 'dashboard-iot-monitoring-suhu-realtime', 'Sistem telemetry IoT pemantauan lingkungan green house berbasis protokol MQTT.', 'system', 'Lab Agroteknologi', 2024, ARRAY['React', 'Node.js', 'MQTT', 'Chart.js'], '#', false, true)
ON CONFLICT (slug) DO UPDATE SET 
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description;

-- 4. Seed Testimonials (Testimoni)
INSERT INTO public.testimonials (name, position, company, content, rating, category, is_published) VALUES
('Ahmad Fauzi', 'Mahasiswa Teknik Informatika', 'Universitas Negeri', 'Pengerjaan tugas akhir saya sangat terbantu, kodenya rapi dan dijelaskan dengan teliti sampai paham saat sidang!', 5, 'akademik', true),
('Budi Santoso', 'Owner', 'Kopi Sedap Nusantara', 'Website landing page kami jadi sangat profesional. Leads WhatsApp meningkat 200% dalam bulan pertama.', 5, 'bisnis', true),
('Sinta Maharani', 'Founder', 'Batik Elegant', 'Respon Incode Solution cepat banget, pengerjaan website company profile selesai lebih cepat dari estimasi.', 5, 'bisnis', true)
ON CONFLICT DO NOTHING;

-- 5. Seed Website Settings (Pengaturan Website)
INSERT INTO public.website_settings (key, value) VALUES
('general', '{"site_name": "Incode Solution", "tagline": "Solusi Teknologi Terpadu: Dari Tugas Akademik hingga Transformasi Digital UMKM & Perusahaan.", "description": "Layanan pengembangan software, website, aplikasi bisnis, dan bantuan teknis akademik terpercaya."}'::jsonb),
('contact', '{"whatsapp": "6281234567890", "email": "incodesolution@gmail.com", "instagram": "@incodesolution", "address": "Indonesia"}'::jsonb),
('cta', '{"default_msg": "Halo Incode Solution! Saya ingin berkonsultasi mengenai layanan teknologi Anda.", "academic_msg": "Halo Incode Solution! Saya mahasiswa yang membutuhkan bantuan untuk tugas/skripsi. Bisakah kita diskusi?", "business_msg": "Halo Incode Solution! Saya tertarik dengan layanan pembuatan website/sistem bisnis untuk usaha saya."}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
