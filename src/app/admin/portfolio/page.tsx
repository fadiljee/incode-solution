'use client';
import { useEffect, useState } from 'react';
import { getPortfolios, savePortfolio, deletePortfolio } from '@/lib/supabase';
import type { PortfolioItem, PortfolioCategory } from '@/lib/types';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const data = await getPortfolios();
    setItems(data);
    setLoading(false);
  };

  const handleEdit = (item: PortfolioItem) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setFormData({
      title: '',
      slug: '',
      category: 'bisnis',
      description: '',
      technologies: [],
      client_name: '',
      project_year: new Date().getFullYear(),
      is_featured: false,
      is_published: true,
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await savePortfolio(formData);
    setIsEditing(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus portfolio ini?')) return;
    await deletePortfolio(id);
    setItems(items.filter(i => i.id !== id));
  };

  if (loading) {
    return <div style={{ padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ink-soft)' }}>Memuat data portfolio...</div>;
  }

  if (isEditing) {
    return (
      <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', padding: '1.5rem' }}>
        <h2 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '1.5rem' }}>
          {formData.id ? 'Edit Portfolio' : 'Tambah Portfolio'}
        </h2>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>JUDUL</label>
              <input type="text" required value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
            </div>
            <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>SLUG</label>
              <input type="text" required value={formData.slug || ''} onChange={e => setFormData({ ...formData, slug: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>KATEGORI</label>
              <select value={formData.category || 'bisnis'} onChange={e => setFormData({ ...formData, category: e.target.value as PortfolioCategory })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }}>
                <option value="akademik">Akademik</option>
                <option value="bisnis">Bisnis</option>
                <option value="umkm">UMKM</option>
                <option value="website">Website</option>
                <option value="mobile_app">Mobile App</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>TAHUN PROYEK</label>
              <input type="number" value={formData.project_year || new Date().getFullYear()} onChange={e => setFormData({ ...formData, project_year: Number(e.target.value) })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
            </div>
          </div>

          <div>
            <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>DESKRIPSI</label>
            <textarea rows={3} required value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
          </div>

          <div>
            <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>TEKNOLOGI (Pisahkan dengan koma)</label>
            <input type="text" required value={formData.technologies?.join(', ') || ''} onChange={e => setFormData({ ...formData, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} placeholder="Next.js, Tailwind CSS, Supabase" style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
             <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>DEMO URL</label>
              <input type="text" value={formData.demo_url || ''} onChange={e => setFormData({ ...formData, demo_url: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
            </div>
            <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>CLIENT NAME</label>
              <input type="text" value={formData.client_name || ''} onChange={e => setFormData({ ...formData, client_name: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input type="checkbox" id="is_published" checked={formData.is_published ?? true} onChange={e => setFormData({ ...formData, is_published: e.target.checked })} />
              <label htmlFor="is_published" className="mono-label" style={{ marginBottom: 0 }}>PUBLISHED</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input type="checkbox" id="is_featured" checked={formData.is_featured ?? false} onChange={e => setFormData({ ...formData, is_featured: e.target.checked })} />
              <label htmlFor="is_featured" className="mono-label" style={{ marginBottom: 0 }}>FEATURED</label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
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
        <h2 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)' }}>Portofolio</h2>
        <button onClick={handleCreate} className="btn-pine" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
          <Plus size={14} style={{ marginRight: '0.4rem' }} /> Tambah Portofolio
        </button>
      </div>
      
      {items.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
          Belum ada portofolio.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>JUDUL</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>KATEGORI</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>TAHUN</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>STATUS</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)', textAlign: 'right' }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>{i.title}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.35rem' }}>
                       {i.technologies.map(t => (
                         <span key={t} style={{ background: 'var(--line)', padding: '0.1rem 0.35rem', borderRadius: '3px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>{t}</span>
                       ))}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-soft)' }}>{i.category.toUpperCase()}</td>
                  <td style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-soft)' }}>{i.project_year}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    {i.is_published ? (
                      <span className="mono-label" style={{ color: '#166534', background: '#bbf7d0', padding: '0.2rem 0.5rem' }}>PUBLISHED</span>
                    ) : (
                      <span className="mono-label" style={{ color: '#991b1b', background: '#fecaca', padding: '0.2rem 0.5rem' }}>DRAFT</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleEdit(i)} style={{ background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer', padding: '0.35rem' }} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(i.id)} style={{ background: 'none', border: 'none', color: '#b91c1c', cursor: 'pointer', padding: '0.35rem' }} title="Hapus">
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
