'use client';
import { buildWaLink } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

const sideItems = [
  { label: '01', title: 'Akademik', desc: 'Tugas, skripsi, debugging kode — untuk mahasiswa yang butuh bantuan teknis.' },
  { label: '02', title: 'Bisnis & UMKM', desc: 'Website, sistem, aplikasi kasir — untuk usaha yang ingin go digital.' },
];

export default function Hero() {
  return (
    <section
      id="hero"
      style={{ borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}
    >
      <div className="container" style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
        {/* ── Main grid: 70 / 30 ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'start' }} className="hero-grid">
          {/* Left column */}
          <div>
            {/* Kicker */}
            <p className="mono-label" style={{ marginBottom: '1.5rem' }}>
              incodesolution.id
            </p>

            {/* H1 */}
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.015em',
                color: 'var(--ink)',
                maxWidth: '22ch',
                marginBottom: '1.25rem',
              }}
            >
              Solusi teknologi terpadu, dari tugas kuliah sampai sistem bisnis.
            </h1>

            {/* Lede */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.55,
                color: 'var(--ink-soft)',
                maxWidth: '46ch',
                marginBottom: '2rem',
              }}
            >
              Kami mengerjakan kebutuhan teknis Anda — dari debugging kode hingga
              membangun sistem bisnis — dengan teliti, transparan, dan tepat waktu.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <a
                id="hero-cta-akademik"
                href={buildWaLink('akademik')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pine"
              >
                Bantuan Akademik
                <ArrowRight size={15} />
              </a>
              <a
                id="hero-cta-bisnis"
                href={buildWaLink('bisnis')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Layanan Bisnis
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Right column — two-path box */}
          <aside
            style={{
              border: '1px solid var(--line)',
              background: 'var(--paper-card)',
              padding: '1.5rem',
            }}
          >
            <p className="mono-label" style={{ marginBottom: '1rem' }}>dua jalur layanan</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {sideItems.map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span
                    className="font-mono"
                    style={{ fontSize: '0.7rem', color: 'var(--line)', paddingTop: '0.2rem', minWidth: '1.5rem' }}
                  >
                    {item.label}
                  </span>
                  <div>
                    <p
                      className="font-display"
                      style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.25rem' }}
                    >
                      {item.title}
                    </p>
                    <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--ink-soft)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative ruled lines */}
            <div
              className="ruled-lines"
              style={{ height: '3.5rem', marginTop: '1.5rem', opacity: 0.4 }}
            />
          </aside>
        </div>
      </div>

      <style>{`
        @media (min-width: 861px) {
          .hero-grid { grid-template-columns: 70fr 30fr !important; }
        }
      `}</style>
    </section>
  );
}
