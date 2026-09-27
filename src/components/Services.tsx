'use client';
import { buildWaLink } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

const akademik = [
  { title: 'Pengerjaan Tugas Informatika', mono: 'TASK' },
  { title: 'Bantuan Skripsi / Proyek Akhir', mono: 'THESIS' },
  { title: 'Jasa Debugging Kode', mono: 'DEBUG' },
];

const bisnis = [
  { title: 'Jasa Pembuatan Company Profile', mono: 'PROFILE' },
  { title: 'Landing Page Penjualan', mono: 'LANDING' },
  { title: 'Sistem Kasir / Aplikasi Internal', mono: 'SYSTEM' },
];

export default function Services() {
  return (
    <section id="layanan" className="section" style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        {/* Section kicker */}
        <p className="section-kicker" style={{ marginBottom: '2rem' }}>layanan</p>

        {/* Two-column grid, separated by vertical hairline */}
        <div className="services-grid">
          {/* Akademik */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <p className="mono-label-pine" style={{ marginBottom: '0.4rem' }}>akademik</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                Untuk mahasiswa dan pelajar yang butuh bantuan teknis.
              </p>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {akademik.map((item, i) => (
                <li
                  key={item.mono}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    padding: '0.875rem 0',
                    borderTop: i === 0 ? '1px solid var(--line)' : 'none',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--ink)' }}>
                    {item.title}
                  </span>
                  <span className="mono-label-pine" style={{ flexShrink: 0, marginLeft: '1rem' }}>
                    {item.mono}
                  </span>
                </li>
              ))}
            </ul>

            <a
              id="services-cta-akademik"
              href={buildWaLink('akademik')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pine"
              style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}
            >
              Konsultasi Akademik
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Vertical divider (desktop) */}
          <div className="services-divider" />

          {/* Bisnis */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <p className="mono-label-brass" style={{ marginBottom: '0.4rem' }}>bisnis / umkm</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                Untuk pemilik usaha yang ingin transformasi digital.
              </p>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {bisnis.map((item, i) => (
                <li
                  key={item.mono}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    padding: '0.875rem 0',
                    borderTop: i === 0 ? '1px solid var(--line)' : 'none',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--ink)' }}>
                    {item.title}
                  </span>
                  <span className="mono-label-brass" style={{ flexShrink: 0, marginLeft: '1rem' }}>
                    {item.mono}
                  </span>
                </li>
              ))}
            </ul>

            <a
              id="services-cta-bisnis"
              href={buildWaLink('bisnis')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}
            >
              Konsultasi Bisnis
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        .services-divider { display: none; }
        @media (min-width: 861px) {
          .services-grid {
            grid-template-columns: 1fr 1px 1fr;
            gap: 0;
            column-gap: 0;
          }
          .services-grid > *:first-child { padding-right: 3rem; }
          .services-grid > *:last-child  { padding-left: 3rem; }
          .services-divider {
            display: block;
            background: var(--line);
            width: 1px;
          }
        }
      `}</style>
    </section>
  );
}
