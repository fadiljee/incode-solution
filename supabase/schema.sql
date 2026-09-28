-- SQL Schema for Incode Solution
-- Supabase PostgreSQL Database Initialization Script

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create ENUM Types
CREATE TYPE user_role AS ENUM ('ADMIN', 'SUPER_ADMIN');
CREATE TYPE user_status AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE service_category AS ENUM ('akademik', 'bisnis');
CREATE TYPE portfolio_category AS ENUM ('akademik', 'bisnis', 'umkm', 'website', 'mobile_app', 'web_app', 'system');
CREATE TYPE lead_status AS ENUM ('NEW', 'CONTACTED', 'IN_DISCUSSION', 'QUOTATION', 'WON', 'LOST');

-- 3. Table: profiles (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'ADMIN',
  status user_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Table: services
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category service_category NOT NULL DEFAULT 'bisnis',
  short_description TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  price_from NUMERIC(12, 2),
  cta_message TEXT,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Table: portfolios
CREATE TABLE IF NOT EXISTS public.portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category portfolio_category NOT NULL DEFAULT 'bisnis',
  thumbnail_url TEXT,
  gallery TEXT[] DEFAULT '{}',
  client_name TEXT,
  project_year INT DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  technologies TEXT[] DEFAULT '{}',
  demo_url TEXT,
  repository_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Table: testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  position TEXT,
  company TEXT,
  avatar_url TEXT,
  content TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  category service_category NOT NULL DEFAULT 'bisnis',
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Table: leads (Contact form & WhatsApp leads)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  category TEXT DEFAULT 'umum',
  subject TEXT,
  message TEXT NOT NULL,
  status lead_status NOT NULL DEFAULT 'NEW',
  notes TEXT,
  source TEXT DEFAULT 'contact_form',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Table: website_settings
CREATE TABLE IF NOT EXISTS public.website_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Table: activity_logs
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  resource_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Automatically update updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_services_modtime BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_portfolios_modtime BEFORE UPDATE ON public.portfolios FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_testimonials_modtime BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_leads_modtime BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_website_settings_modtime BEFORE UPDATE ON public.website_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 11. Trigger to create Profile on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    'ADMIN'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 12. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 13. RLS Policies

-- Public Read Policies
CREATE POLICY "Public can view published services" ON public.services FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published portfolios" ON public.portfolios FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view website settings" ON public.website_settings FOR SELECT USING (true);
CREATE POLICY "Public can insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Admin All-Access Policies
CREATE POLICY "Admins full access to services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to portfolios" ON public.portfolios FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to leads" ON public.leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to website settings" ON public.website_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access to activity logs" ON public.activity_logs FOR ALL USING (auth.role() = 'authenticated');

-- 14. Seed Data
INSERT INTO public.services (name, slug, category, short_description, description, icon, price_from, sort_order, is_published) VALUES
('Pengerjaan Tugas Informatika', 'pengerjaan-tugas-informatika', 'akademik', 'Bantuan pengerjaan tugas pemrograman, algoritma, database, & web.', 'Solusi pengerjaan tugas akademik secara terstruktur, rapi, dan dilengkapi penjelasan agar mudah dipahami.', 'Code', 50000, 1, true),
('Bantuan Skripsi & Project Akhir', 'bantuan-skripsi-project-akhir', 'akademik', 'Pendampingan & pengerjaan aplikasi skripsi/ta untuk mahasiswa.', 'Pengembangan sistem skripsi lengkap dengan source code, modul penjelasan, dan siap dipresentasikan.', 'GraduationCap', 500000, 2, true),
('Jasa Debugging & Fix Bug Kode', 'jasa-debugging-fix-bug-kode', 'akademik', 'Perbaikan error kode, refactoring, dan troubleshooting program.', 'Mengatasi masalah error, bug, dan optimasi performa program dalam waktu cepat.', 'Bug', 35000, 3, true),
('Company Profile Profesional', 'company-profile-profesional', 'bisnis', 'Website company profile modern, fast-loading, dan SEO-friendly.', 'Membangun citra kredibel perusahaan Anda di internet dengan desain editorial yang elegan.', 'Globe', 750000, 4, true),
('Landing Page Penjualan', 'landing-page-penjualan', 'bisnis', 'Landing page tinggi konversi terintegrasi WhatsApp & analytics.', 'Desain landing page interaktif yang mempercepat penjualan produk dan jasa bisnis Anda.', 'Zap', 500000, 5, true),
('Sistem Kasir & Aplikasi Internal', 'sistem-kasir-aplikasi-internal', 'bisnis', 'Sistem POS kasir, manajemen inventory, dan dashboard internal.', 'Sistem manajemen operasional bisnis berbasis web/cloud untuk mengotomatisasi pencatatan usaha.', 'LayoutDashboard', 1200000, 6, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.portfolios (title, slug, description, category, client_name, project_year, technologies, demo_url, is_featured, is_published) VALUES
('Sistem Informasi Perpustakaan Web', 'sistem-informasi-perpustakaan-web', 'Sistem pengelolaan sirkulasi buku perpustakaan lengkap dengan scanner barcode dan laporan otomatis.', 'akademik', 'Tugas Akhir Mahasiswa', 2024, ARRAY['PHP', 'MySQL', 'Bootstrap'], '#', true, true),
('Landing Page Toko Online UMKM', 'landing-page-toko-online-umkm', 'Halaman landing page showcase produk busana lokal terintegrasi checkout langsung ke WhatsApp.', 'bisnis', 'Koleksi Busana Nusantara', 2024, ARRAY['Next.js', 'Tailwind CSS', 'Framer Motion'], '#', true, true),
('Aplikasi Kasir Digital Resto', 'aplikasi-kasir-digital-resto', 'Point of Sales (POS) berbasis PWA dengan fitur cetak struk thermal dan rekap omset harian.', 'system', 'Resto Sedap Rasa', 2024, ARRAY['React', 'Supabase', 'PWA'], '#', false, true),
('Klasifikasi Sentimen NLP Ulasan Produk', 'klasifikasi-sentimen-nlp-ulasan-produk', 'Model Deep Learning LSTM untuk analisis sentimen ulasan pembeli e-commerce.', 'akademik', 'Penelitian Tugas Akhir', 2024, ARRAY['Python', 'TensorFlow', 'Jupyter'], '#', false, true),
('Company Profile PT Kontraktor Utama', 'company-profile-pt-kontraktor-utama', 'Website profil perusahaan konstruksi nasional dengan galeri proyek interaktif.', 'website', 'PT Kontraktor Utama', 2024, ARRAY['Next.js', 'TypeScript', 'Tailwind'], '#', true, true),
('Dashboard IoT Monitoring Suhu Realtime', 'dashboard-iot-monitoring-suhu-realtime', 'Sistem telemetry IoT pemantauan lingkungan green house berbasis protokol MQTT.', 'system', 'Lab Agroteknologi', 2024, ARRAY['React', 'Node.js', 'MQTT', 'Chart.js'], '#', false, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.testimonials (name, position, company, content, rating, category, is_published) VALUES
('Ahmad Fauzi', 'Mahasiswa Teknik Informatika', 'Universitas Negeri', 'Pengerjaan tugas akhir saya sangat terbantu, kodenya rapi dan dijelaskan dengan teliti sampai paham saat sidang!', 5, 'akademik', true),
('Budi Santoso', 'Owner', 'Kopi Sedap Nusantara', 'Website landing page kami jadi sangat profesional. Leads WhatsApp meningkat 200% dalam bulan pertama.', 5, 'bisnis', true),
('Sinta Maharani', 'Founder', 'Batik Elegant', 'Respon Incode Solution cepat banget, pengerjaan website company profile selesai lebih cepat dari estimasi.', 5, 'bisnis', true);

INSERT INTO public.website_settings (key, value) VALUES
('general', '{"site_name": "Incode Solution", "tagline": "Solusi Teknologi Terpadu: Dari Tugas Akademik hingga Transformasi Digital UMKM & Perusahaan.", "description": "Layanan pengembangan software, website, aplikasi bisnis, dan bantuan teknis akademik terpercaya."}'::jsonb),
('contact', '{"whatsapp": "6281234567890", "email": "incodesolution@gmail.com", "instagram": "@incodesolution", "address": "Indonesia"}'::jsonb),
('cta', '{"default_msg": "Halo Incode Solution! Saya ingin berkonsultasi mengenai layanan teknologi Anda.", "academic_msg": "Halo Incode Solution! Saya mahasiswa yang membutuhkan bantuan untuk tugas/skripsi. Bisakah kita diskusi?", "business_msg": "Halo Incode Solution! Saya tertarik dengan layanan pembuatan website/sistem bisnis untuk usaha saya."}'::jsonb)
ON CONFLICT (key) DO NOTHING;
