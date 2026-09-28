'use client';
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import type { TestimonialItem } from '@/lib/supabase';

export default function Testimonials() {
  const [items, setItems] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    import('@/lib/supabase').then(async ({ getTestimonials }) => {
      const data = await getTestimonials();
      if (data && data.length > 0) setItems(data.filter((t) => t.is_published));
    });
  }, []);

  if (items.length === 0) return null;

  return (
    <section
      id="testimoni"
      className="section"
      style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}
    >
      <div className="container">
        <p className="section-kicker" style={{ marginBottom: '2rem' }}>testimoni</p>

        <div className="testimonials-grid">
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '1.5rem',
                border: '1px solid var(--line)',
                background: 'var(--paper-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Rating */}
              <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--pine)' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < item.rating ? 'currentColor' : 'none'}
                    opacity={i < item.rating ? 1 : 0.3}
                  />
                ))}
              </div>

              {/* Content */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'var(--ink)',
                  fontStyle: 'italic',
                  flex: 1,
                }}
              >
                "{item.content}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                  }}
                >
                  {item.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p
                    className="font-display"
                    style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--ink-soft)',
                      letterSpacing: '0.02em',
                      marginTop: '0.1rem'
                    }}
                  >
                    {item.position} {item.company ? `— ${item.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
