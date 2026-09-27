'use client';
import { buildWaLink } from '@/lib/constants';

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/incodesolution' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/incodesolution' },
  { label: 'GitHub',    href: 'https://github.com/incodesolution' },
];

const contactLinks = [
  { label: 'WhatsApp', href: buildWaLink('default') },
  { label: 'incodesolution@gmail.com', href: 'mailto:incodesolution@gmail.com' },
];

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.875rem',
  color: 'var(--ink-soft)',
  textDecoration: 'none',
  borderBottom: '1px solid transparent',
  paddingBottom: '1px',
  transition: 'color 0.15s, border-color 0.15s',
};

export default function Footer() {
  return (
    <footer style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        {/* ── Top grid ── */}
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <a href="#" className="wordmark-sep" style={{ display: 'block', marginBottom: '0.75rem' }}>
              Incode<span>/</span>Solution
            </a>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.55, maxWidth: '28ch' }}>
              Solusi teknologi terpadu untuk kebutuhan akademik dan bisnis — profesional, cepat, terpercaya.
            </p>
          </div>

          {/* Kontak */}
          <div>
            <p className="mono-label" style={{ marginBottom: '1rem' }}>kontak</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {contactLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--ink)';
                      e.currentTarget.style.borderColor = 'var(--ink)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--ink-soft)';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sosial media */}
          <div>
            <p className="mono-label" style={{ marginBottom: '1rem' }}>sosial media</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--ink)';
                      e.currentTarget.style.borderColor = 'var(--ink)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--ink-soft)';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            marginTop: '2.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p className="mono-label">© {new Date().getFullYear()} Incode Solution.</p>
          <p className="mono-label">Dibuat dengan React, Next.js &amp; Tailwind CSS</p>
        </div>
      </div>

      {/* Floating WA badge */}
      <a
        id="wa-floating-badge"
        href={buildWaLink('default')}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Chat WhatsApp"
        title="Chat via WhatsApp"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.121 1.532 5.852L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.031-1.384l-.36-.214-3.762.98.999-3.679-.234-.376A9.818 9.818 0 0112 2.182c5.428 0 9.818 4.39 9.818 9.818 0 5.428-4.39 9.818-9.818 9.818z"/>
        </svg>
      </a>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr; gap: 3rem; }
        }
      `}</style>
    </footer>
  );
}
