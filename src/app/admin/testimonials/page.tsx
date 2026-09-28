'use client';
import { useEffect, useState } from 'react';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '@/lib/supabase';
import type { TestimonialItem, ServiceCategory } from '@/lib/types';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<TestimonialItem>>({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const data = await getTestimonials();
    setItems(data);
    setLoading(false);
  };

  const handleEdit = (item: TestimonialItem) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setFormData({
      name: '',
      position: '',
      company: '',
      content: '',
      rating: 5,
      category: 'bisnis',
      is_published: true,
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveTestimonial(formData);
    setIsEditing(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus testimoni ini?')) return;
    await deleteTestimonial(id);
    setItems(items.filter(i => i.id !== id));
  };

  if (loading) {
    return <div style={{ padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ink-soft)' }}>Memuat data testimoni...</div>;
  }

  if (isEditing) {
    return (
      <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', padding: '1.5rem' }}>
        <h2 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '1.5rem' }}>
          {formData.id ? 'Edit Testimoni' : 'Tambah Testimoni'}
        </h2>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>NAMA KLIEN</label>
              <input type="text" required value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
            </div>
            <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>RATING (1-5)</label>
              <input type="number" min="1" max="5" required value={formData.rating || 5} onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>POSISI / PEKERJAAN</label>
              <input type="text" value={formData.position || ''} onChange={e => setFormData({ ...formData, position: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
            </div>
             <div>
              <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>PERUSAHAAN (Opsional)</label>
              <input type="text" value={formData.company || ''} onChange={e => setFormData({ ...formData, company: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
            </div>
          </div>

          <div>
             <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>KATEGORI LAYANAN</label>
              <select value={formData.category || 'bisnis'} onChange={e => setFormData({ ...formData, category: e.target.value as ServiceCategory })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }}>
                <option value="akademik">Akademik</option>
                <option value="bisnis">Bisnis</option>
              </select>
          </div>

          <div>
            <label className="mono-label" style={{ marginBottom: '0.4rem', display: 'block' }}>ISI TESTIMONI</label>
            <textarea rows={4} required value={formData.content || ''} onChange={e => setFormData({ ...formData, content: e.target.value })} style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--line)', background: 'var(--paper-card)' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
            <input type="checkbox" id="is_published" checked={formData.is_published ?? true} onChange={e => setFormData({ ...formData, is_published: e.target.checked })} />
            <label htmlFor="is_published" className="mono-label" style={{ marginBottom: 0 }}>PUBLISHED</label>
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
        <h2 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)' }}>Testimoni</h2>
        <button onClick={handleCreate} className="btn-pine" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
          <Plus size={14} style={{ marginRight: '0.4rem' }} /> Tambah Testimoni
        </button>
      </div>
      
      {items.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
          Belum ada testimoni.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>NAMA</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>KATEGORI</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>RATING</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)' }}>STATUS</th>
                <th style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)', textAlign: 'right' }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>{i.name}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-soft)' }}>{i.position} {i.company && `— ${i.company}`}</p>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-soft)' }}>{i.category.toUpperCase()}</td>
                  <td style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--pine)' }}>{i.rating}/5</td>
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
