'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { buildWaLink, NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--paper)',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'border-color 0.2s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
        {/* Wordmark */}
        <a href="#" className="wordmark-sep">
          Incode<span>/</span>Solution
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link${active === l.href.replace('#', '') ? ' active' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="hidden-mobile">
          <a
            href={buildWaLink('default')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pine"
            style={{ fontSize: '0.85rem', padding: '0.5rem 1.1rem' }}
          >
            Hubungi via WhatsApp
          </a>
        </div>

        {/* Mobile: WA button + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="show-mobile">
          <a
            href={buildWaLink('default')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pine"
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
          >
            WhatsApp
          </a>
          <button
            id="navbar-mobile-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)', display: 'flex', alignItems: 'center' }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{ borderTop: '1px solid var(--line)', background: 'var(--paper-card)' }}>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: '0.85rem 1.5rem',
                  borderBottom: '1px solid var(--line)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--ink)',
                  textDecoration: 'none',
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
        @media (min-width: 861px) { .show-mobile { display: none !important; } .hidden-mobile { display: flex !important; } }
      `}</style>
    </header>
  );
}
