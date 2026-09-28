'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  MonitorPlay,
  MessageSquare,
  Users,
  Settings,
  Shield,
  Activity,
  Menu,
  X,
  LogOut,
  User,
} from 'lucide-react';

const MENU = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, group: 'Menu Utama' },
  { label: 'Services', href: '/admin/services', icon: Briefcase, group: 'Konten' },
  { label: 'Portfolio', href: '/admin/portfolio', icon: MonitorPlay, group: 'Konten' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare, group: 'Konten' },
  { label: 'Leads', href: '/admin/leads', icon: Users, group: 'CRM' },
  { label: 'Settings', href: '/admin/settings', icon: Settings, group: 'Website' },
  { label: 'Admin Users', href: '/admin/users', icon: Shield, group: 'Sistem' },
  { label: 'Activity Logs', href: '/admin/logs', icon: Activity, group: 'Sistem' },
];

export function AdminSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="admin-overlay"
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${open ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          width: '260px',
          background: 'var(--paper)',
          borderRight: '1px solid var(--line)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease',
        }}
      >
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
          <Link href="/admin/dashboard" className="wordmark-sep" style={{ textDecoration: 'none' }}>
            Incode<span>/</span>Admin
          </Link>
          <button className="close-btn hidden-desktop" onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)' }}>
            <X size={20} />
          </button>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {['Menu Utama', 'Konten', 'CRM', 'Website', 'Sistem'].map((group) => {
            const items = MENU.filter((m) => m.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group}>
                <p className="mono-label" style={{ marginBottom: '0.75rem', fontSize: '0.65rem' }}>{group}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {items.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.6rem 0.85rem',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.85rem',
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? 'var(--paper)' : 'var(--ink-soft)',
                          background: isActive ? 'var(--pine)' : 'transparent',
                          transition: 'all 0.15s',
                        }}
                      >
                        <item.icon size={16} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--line)' }}>
          <Link
            href="/admin/profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.6rem 0.85rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              color: 'var(--ink-soft)',
            }}
          >
            <User size={16} />
            My Profile
          </Link>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.6rem 0.85rem',
              borderRadius: '6px',
              border: 'none',
              background: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              color: '#b91c1c',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              marginTop: '0.5rem',
            }}
            onClick={() => {
              // TODO: Handle logout
              window.location.href = '/admin/login';
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .hidden-desktop { display: block; }
        }
        @media (min-width: 1025px) {
          .hidden-desktop { display: none; }
        }
      `}</style>
    </>
  );
}
