'use client';
import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { PortfolioItem } from '@/lib/supabase';

const STATIC_PORTFOLIO: PortfolioItem[] = [
  {
    id: 1,
    title: 'Sistem Informasi Perpustakaan',
    category: 'akademik',
    description: 'Manajemen peminjaman & pengembalian buku berbasis web.',
    image_url: '',
    tech_stack: ['PHP', 'MySQL', 'Bootstrap'],
    created_at: '2024-01-01',
  },
  {
    id: 2,
    title: 'Landing Page Toko Online',
    category: 'bisnis',
    description: 'Halaman penjualan produk UMKM dengan checkout via WhatsApp.',
    image_url: '',
    tech_stack: ['Next.js', 'Tailwind', 'Vercel'],
    live_url: '#',
    created_at: '2024-02-01',
  },
  {
    id: 3,
    title: 'Aplikasi Kasir Digital',
    category: 'bisnis',
    description: 'Sistem POS ringan untuk warung makan dengan laporan harian.',
    image_url: '',
    tech_stack: ['React', 'Supabase', 'PWA'],
    created_at: '2024-03-01',
  },
  {
    id: 4,
    title: 'Klasifikasi Sentimen NLP',
    category: 'akademik',
    description: 'Skripsi: LSTM untuk sentimen ulasan produk e-commerce.',
    image_url: '',
    tech_stack: ['Python', 'TensorFlow', 'Jupyter'],
    created_at: '2024-04-01',
  },
  {
    id: 5,
    title: 'Company Profile PT Maju Jaya',
    category: 'bisnis',
    description: 'Website company profile untuk perusahaan konstruksi.',
    image_url: '',
    tech_stack: ['Next.js', 'Framer Motion', 'Vercel'],
    live_url: '#',
    created_at: '2024-05-01',
  },
  {
    id: 6,
    title: 'Dashboard IoT Monitoring',
    category: 'akademik',
    description: 'Monitoring sensor suhu & kelembaban real-time via MQTT.',
    image_url: '',
    tech_stack: ['React', 'Node.js', 'MQTT'],
    created_at: '2024-06-01',
  },
];

type Filter = 'all' | 'akademik' | 'bisnis';

/* CSS ruled-lines placeholder that mimics the wireframe sketch */
function BrowserMockup({ category }: { category: 'akademik' | 'bisnis' }) {
  return (
    <div className="browser-frame" style={{ background: 'var(--paper-card)' }}>
      {/* Browser bar */}
      <div className="browser-bar">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span
          className="font-mono"
          style={{
            fontSize: '0.65rem',
            color: 'var(--line)',
            marginLeft: '0.5rem',
            flex: 1,
          }}
        >
          {category === 'akademik' ? 'app.local:3000' : 'project.vercel.app'}
        </span>
      </div>
      {/* Ruled-lines body */}
      <div
        className="ruled-lines"
        style={{ height: '120px', opacity: 0.5 }}
      />
    </div>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Mockup */}
      <BrowserMockup category={item.category} />

      {/* Meta */}
      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span
            className={item.category === 'akademik' ? 'mono-label-pine' : 'mono-label-brass'}
          >
            {item.category}
          </span>
          {item.live_url && (
            <a
              href={item.live_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--ink-soft)', display: 'flex', alignItems: 'center' }}
              aria-label="Lihat live"
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>

        <h3
          className="font-display"
          style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, letterSpacing: '-0.01em' }}
        >
          {item.title}
        </h3>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--ink-soft)', lineHeight: 1.5, flex: 1 }}>
          {item.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', paddingTop: '0.5rem', borderTop: '1px solid var(--line)' }}>
          {item.tech_stack.map((t) => (
            <span key={t} className="mono-label" style={{ fontSize: '0.68rem' }}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>(STATIC_PORTFOLIO);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key || url === 'your-supabase-url') return;

    import('@/lib/supabase').then(async ({ supabase }) => {
      const { data } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });
      if (data && data.length > 0) setItems(data as PortfolioItem[]);
    });
  }, []);

  const filtered = filter === 'all' ? items : items.filter((i) => i.category === filter);

  return (
    <section
      id="portofolio"
      className="section"
      style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}
    >
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <p className="section-kicker">portofolio</p>

          {/* Filter — plain text tabs */}
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {(['all', 'akademik', 'bisnis'] as Filter[]).map((f) => (
              <button
                key={f}
                id={`portfolio-filter-${f}`}
                onClick={() => setFilter(f)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.03em',
                  color: filter === f ? 'var(--ink)' : 'var(--ink-soft)',
                  borderBottom: filter === f ? '1px solid var(--ink)' : '1px solid transparent',
                  paddingBottom: '1px',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
              >
                {f === 'all' ? 'semua' : f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1px',
            background: 'var(--line)',
            border: '1px solid var(--line)',
          }}
        >
          {filtered.map((item) => (
            <div key={item.id} style={{ background: 'var(--paper)' }}>
              <PortfolioCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
