'use client';
import { useEffect, useState } from 'react';
import { getLeads, updateLead, deleteLead } from '@/lib/supabase';
import type { LeadItem, LeadStatus } from '@/lib/types';
import { Trash2, ExternalLink } from 'lucide-react';
import { buildWaLink } from '@/lib/constants';

const STATUS_COLORS: Record<LeadStatus, { bg: string, text: string }> = {
  NEW: { bg: '#fef08a', text: '#854d0e' },
  CONTACTED: { bg: '#e0f2fe', text: '#0369a1' },
  IN_DISCUSSION: { bg: '#f3e8ff', text: '#7e22ce' },
  QUOTATION: { bg: '#ffedd5', text: '#c2410c' },
  WON: { bg: '#bbf7d0', text: '#166534' },
  LOST: { bg: '#fecaca', text: '#991b1b' },
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const data = await getLeads();
    setLeads(data);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    await updateLead(id, { status: newStatus });
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus lead ini?')) return;
    await deleteLead(id);
    setLeads(leads.filter(l => l.id !== id));
  };

  if (loading) {
    return <div style={{ padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ink-soft)' }}>Memuat data leads...</div>;
  }

  return (
    <div style={{ background: 'var(--paper)', border: '1px solid var(--line)' }}>
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)' }}>Manajemen Leads</h2>
      </div>
      
      {leads.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
          Belum ada leads masuk.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>TANGGAL</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>NAMA</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>KATEGORI</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>PESAN</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>STATUS</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)', textAlign: 'right' }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} style={{ borderBottom: '1px solid var(--line)', verticalAlign: 'top' }}>
                  <td style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-soft)' }}>
                    {new Date(l.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.2rem' }}>{l.name}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-soft)' }}>{l.email}</p>
                    {l.phone && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-soft)' }}>{l.phone}</p>}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-soft)' }}>
                    {l.category.toUpperCase()}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.2rem' }}>{l.subject}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--ink-soft)', lineHeight: 1.5, maxWidth: '280px' }}>
                      {l.message}
                    </p>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <select
                      value={l.status}
                      onChange={(e) => handleStatusChange(l.id, e.target.value as LeadStatus)}
                      style={{
                        padding: '0.3rem 0.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        background: STATUS_COLORS[l.status].bg,
                        color: STATUS_COLORS[l.status].text,
                        border: '1px solid transparent',
                        borderRadius: 0,
                        outline: 'none',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      {Object.keys(STATUS_COLORS).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <a
                        href={buildWaLink('default')}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--ink)',
                          cursor: 'pointer',
                          padding: '0.35rem',
                        }}
                        title="Balas via WA (Manual)"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button
                        onClick={() => handleDelete(l.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#b91c1c',
                          cursor: 'pointer',
                          padding: '0.35rem',
                        }}
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
