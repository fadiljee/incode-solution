'use client';
import { Menu } from 'lucide-react';

export function AdminTopbar({
  setOpen,
  title = 'Dashboard',
}: {
  setOpen: (v: boolean) => void;
  title?: string;
}) {
  return (
    <header
      style={{
        height: '70px',
        borderBottom: '1px solid var(--line)',
        background: 'var(--paper)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        gap: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      <button
        className="menu-btn"
        onClick={() => setOpen(true)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--ink)',
          display: 'flex',
          alignItems: 'center',
          padding: 0,
        }}
      >
        <Menu size={20} />
      </button>

      <h1 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)' }}>
        {title}
      </h1>

      <style>{`
        .menu-btn { display: none !important; }
        @media (max-width: 1024px) {
          .menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
