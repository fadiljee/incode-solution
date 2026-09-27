'use client';
import { useState } from 'react';
import { buildWaLink } from '@/lib/constants';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import type { ContactMessage } from '@/lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error';

const SEGMENTS = [
  { value: 'akademik', label: 'Akademik' },
  { value: 'bisnis',   label: 'Bisnis / UMKM' },
  { value: 'umum',     label: 'Umum' },
] as const;

export default function Contact() {
  const [form, setForm] = useState<ContactMessage>({ name: '', email: '', message: '', segment: 'umum' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (k: keyof ContactMessage, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (url && key && url !== 'your-supabase-url') {
        const { supabase } = await import('@/lib/supabase');
        const { error } = await supabase.from('contacts').insert([
          { name: form.name, email: form.email, message: form.message, segment: form.segment },
        ]);
        if (error) throw error;
      }
      setStatus('success');
      setForm({ name: '', email: '', message: '', segment: 'umum' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan.';
      setStatus('error');
      setErrorMsg(message);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--paper)',
    border: '1px solid var(--line)',
    borderRadius: 0,
    padding: '0.6rem 0.75rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    color: 'var(--ink-soft)',
    letterSpacing: '0.04em',
    marginBottom: '0.35rem',
  };

  return (
    <section
      id="kontak"
      className="section"
      style={{ background: 'var(--paper-card)', borderBottom: '1px solid var(--line)' }}
    >
      <div className="container">
        <p className="section-kicker" style={{ marginBottom: '2rem' }}>kontak</p>

        <div className="contact-grid">
          {/* Left — info */}
          <div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.015em',
                color: 'var(--ink)',
                marginBottom: '1rem',
                maxWidth: '20ch',
              }}
            >
              Siap mulai proyek Anda?
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '36ch' }}>
              Kirim pesan di sini atau langsung chat via WhatsApp — kami respons dalam kurang dari satu jam.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* WhatsApp */}
              <a
                href={buildWaLink('default')}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--line)',
                  background: 'var(--paper)',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--pine)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.121 1.532 5.852L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.031-1.384l-.36-.214-3.762.98.999-3.679-.234-.376A9.818 9.818 0 0112 2.182c5.428 0 9.818 4.39 9.818 9.818 0 5.428-4.39 9.818-9.818 9.818z"/>
                </svg>
                <div>
                  <p className="mono-label" style={{ marginBottom: '0' }}>WhatsApp</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>Chat langsung →</p>
                </div>
              </a>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', border: '1px solid var(--line)', background: 'var(--paper)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-soft)', minWidth: '16px' }}>@</span>
                <div>
                  <p className="mono-label" style={{ marginBottom: '0' }}>Email</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>incodesolution@gmail.com</p>
                </div>
              </div>

              {/* Instagram */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', border: '1px solid var(--line)', background: 'var(--paper)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-soft)', minWidth: '16px' }}>IG</span>
                <div>
                  <p className="mono-label" style={{ marginBottom: '0' }}>Instagram</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>@incodesolution</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div style={{ border: '1px solid var(--line)', background: 'var(--paper)', padding: '1.75rem' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <CheckCircle size={40} style={{ color: 'var(--pine)', margin: '0 auto 1rem' }} />
                <h4 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.5rem' }}>Pesan terkirim.</h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>
                  Kami akan menghubungi Anda segera. Respons lebih cepat via WhatsApp.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href={buildWaLink(form.segment)} target="_blank" rel="noopener noreferrer" className="btn-pine">
                    Chat WhatsApp
                  </a>
                  <button onClick={() => setStatus('idle')} className="btn-outline">Kirim lagi</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {/* Segment */}
                <div>
                  <label style={labelStyle}>kebutuhan</label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {SEGMENTS.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        id={`contact-segment-${s.value}`}
                        onClick={() => set('segment', s.value)}
                        style={{
                          padding: '0.4rem 0.85rem',
                          border: `1px solid ${form.segment === s.value ? 'var(--pine)' : 'var(--line)'}`,
                          background: form.segment === s.value ? 'var(--pine)' : 'transparent',
                          color: form.segment === s.value ? 'var(--paper-card)' : 'var(--ink-soft)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" style={labelStyle}>nama</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Nama lengkap"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--ink)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" style={labelStyle}>email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder="email@anda.com"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--ink)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" style={labelStyle}>pesan</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                    placeholder="Ceritakan kebutuhan Anda..."
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--ink)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                  />
                </div>

                {errorMsg && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#b91c1c' }}>{errorMsg}</p>
                )}

                <button
                  id="contact-submit"
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-pine"
                  style={{ justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
                >
                  {status === 'loading' ? (
                    <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Mengirim...</>
                  ) : (
                    <><Send size={14} /> Kirim Pesan</>
                  )}
                </button>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 861px) {
          .contact-grid { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        }
      `}</style>
    </section>
  );
}
