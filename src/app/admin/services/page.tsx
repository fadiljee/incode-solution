'use client';
import { useEffect, useState } from 'react';
import { getServices, saveService, deleteService } from '@/lib/supabase';
import type { ServiceItem } from '@/lib/types';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Minimal Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ServiceItem>>({});

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const data = await getServices();
    setServices(data);
    setLoading(false);
  };

  const handleEdit = (item: ServiceItem) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setFormData({
      name: '',
      slug: '',
      category: 'bisnis',
      short_description: '',
      icon: 'Code',
      price_from: 0,
      sort_order: services.length + 1,
      is_published: true,
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveService(formData);
    setIsEditing(false);
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus layanan ini?')) return;
    await deleteService(id);
    setServices(services.filter(s => s.id !== id));
  };

  if (loading) {
    return <div style={{ padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ink-soft)' }}>Memuat data services...</div>;
  }

  if (isEditing) {
    return (
      <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', padding: '1.5rem' }}>
        <h2 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '1.5rem' }}>
          {formData.id ? 'Edit Layanan' : 'Tambah Layanan'}
        </h2>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>NAMA LAYANAN</label>
              <input type="text" required value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
            </div>
            <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>SLUG</label>
              <input type="text" required value={formData.slug || ''} onChange={e => setFormData({ ...formData, slug: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>KATEGORI</label>
              <select value={formData.category || 'bisnis'} onChange={e => setFormData({ ...formData, category: e.target.value as 'akademik' | 'bisnis' })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }}>
                <option value="bisnis">Bisnis</option>
                <option value="akademik">Akademik</option>
              </select>
            </div>
            <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>HARGA MULAI DARI</label>
              <input type="number" value={formData.price_from || 0} onChange={e => setFormData({ ...formData, price_from: Number(e.target.value) })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
            </div>
          </div>

          <div>
            <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>DESKRIPSI SINGKAT</label>
            <textarea rows={2} required value={formData.short_description || ''} onChange={e => setFormData({ ...formData, short_description: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>SORT ORDER</label>
              <input type="number" required value={formData.sort_order || 0} onChange={e => setFormData({ ...formData, sort_order: Number(e.target.value) })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
              <input type="checkbox" id="is_published" checked={formData.is_published ?? true} onChange={e => setFormData({ ...formData, is_published: e.target.checked })} />
              <label htmlFor="is_published" className="mono-label" style={{ marginBottom: 0 }}>PUBLISHED</label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn-pine">Simpan</button>
            <button type="button" className="btn-outline" onClick={() => setIsEditing(false)}>Batal</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--paper)', border: '1px solid var(--line)' }}>
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)' }}>Layanan (Services)</h2>
        <button onClick={handleCreate} className="btn-pine" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
          <Plus size={14} style={{ marginRight: '0.4rem' }} /> Tambah Layanan
        </button>
      </div>
      
      {services.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
          Belum ada layanan.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>ORDER</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>NAMA</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>KATEGORI</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>STATUS</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)', textAlign: 'right' }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-soft)' }}>{s.sort_order}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>{s.name}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--ink-soft)', maxWidth: '280px' }}>{s.short_description}</p>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-soft)' }}>{s.category.toUpperCase()}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    {s.is_published ? (
                      <span className="mono-label" style={{ color: '#166534', background: '#bbf7d0', padding: '0.2rem 0.5rem' }}>PUBLISHED</span>
                    ) : (
                      <span className="mono-label" style={{ color: '#991b1b', background: '#fecaca', padding: '0.2rem 0.5rem' }}>DRAFT</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleEdit(s)} style={{ background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer', padding: '0.35rem' }} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(s.id)} style={{ background: 'none', border: 'none', color: '#b91c1c', cursor: 'pointer', padding: '0.35rem' }} title="Hapus">
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
