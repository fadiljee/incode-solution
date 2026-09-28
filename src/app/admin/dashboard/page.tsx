'use client';
import { useEffect, useState } from 'react';
import { getPortfolios, getServices, getLeads, getTestimonials } from '@/lib/supabase';
import type { PortfolioItem, ServiceItem, LeadItem, TestimonialItem } from '@/lib/types';
import { Briefcase, MonitorPlay, Users, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPortfolios(), getServices(), getLeads(), getTestimonials()]).then(
      ([p, s, l, t]) => {
        setPortfolios(p);
        setServices(s);
        setLeads(l);
        setTestimonials(t);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ink-soft)' }}>Memuat dashboard...</div>;
  }

  const newLeads = leads.filter(l => l.status === 'NEW');

  const STATS = [
    { label: 'Total Portfolio', value: portfolios.length, icon: MonitorPlay, color: 'var(--ink)' },
    { label: 'Total Services', value: services.length, icon: Briefcase, color: 'var(--brass)' },
    { label: 'Total Leads', value: leads.length, icon: Users, color: 'var(--pine)' },
    { label: 'New Leads', value: newLeads.length, icon: Users, color: '#eab308' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Stats */}
      <div className="stats-grid">
        {STATS.map((stat, i) => (
          <div key={i} style={{ padding: '1.25rem', background: 'var(--paper)', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <p className="mono-label" style={{ marginBottom: 0 }}>{stat.label}</p>
              <stat.icon size={16} color={stat.color} />
            </div>
            <p className="font-display" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--ink)' }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div style={{ background: 'var(--paper)', border: '1px solid var(--line)' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)' }}>Recent Leads</h2>
          <Link href="/admin/leads" className="mono-label" style={{ textDecoration: 'none', color: 'var(--ink)' }}>Lihat Semua →</Link>
        </div>
        
        {leads.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
            Belum ada leads masuk.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>NAMA</th>
                  <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>KATEGORI</th>
                  <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>STATUS</th>
                  <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>TANGGAL</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 5).map((l) => (
                  <tr key={l.id} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '0.85rem 1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--ink)' }}>{l.name}</td>
                    <td style={{ padding: '0.85rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-soft)' }}>{l.category.toUpperCase()}</td>
                    <td style={{ padding: '0.85rem 1.5rem' }}>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        background: l.status === 'NEW' ? '#fef08a' : l.status === 'WON' ? '#bbf7d0' : 'var(--paper-card)',
                        color: l.status === 'NEW' ? '#854d0e' : l.status === 'WON' ? '#166534' : 'var(--ink-soft)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                      }}>
                        {l.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-soft)' }}>
                      {new Date(l.created_at).toLocaleDateString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </div>
  );
}
