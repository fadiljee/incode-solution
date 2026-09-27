'use client';

const STEPS = [
  {
    num: '01',
    title: 'Konsultasi',
    desc: 'Ceritakan kebutuhan Anda via WhatsApp. Kami respons cepat, pahami detail, dan berikan estimasi harga serta waktu pengerjaan.',
  },
  {
    num: '02',
    title: 'Pengerjaan',
    desc: 'Tim kami mengerjakan proyek secara teliti dengan update berkala. Revisi terbuka selama proses berlangsung.',
  },
  {
    num: '03',
    title: 'Selesai',
    desc: 'Hasil diserahkan tepat waktu: file source, dokumentasi, dan garansi revisi pascapengiriman.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="keunggulan"
      className="section"
      style={{ background: 'var(--paper-card)', borderBottom: '1px solid var(--line)' }}
    >
      <div className="container">
        <p className="section-kicker" style={{ marginBottom: '2rem' }}>alur kerja</p>

        <div className="how-grid">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              style={{
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--line)',
                position: 'relative',
              }}
            >
              {/* Number */}
              <p
                className="font-mono"
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--line)',
                  letterSpacing: '0.08em',
                  marginBottom: '0.75rem',
                }}
              >
                {step.num}
              </p>

              {/* Title */}
              <h3
                className="font-display"
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                  marginBottom: '0.6rem',
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: 'var(--ink-soft)',
                }}
              >
                {step.desc}
              </p>

              {/* Vertical divider between steps (desktop) */}
              {i < STEPS.length - 1 && (
                <div className="step-divider" />
              )}
            </div>
          ))}
        </div>

        {/* Trust features — bottom row */}
        <div
          style={{
            marginTop: '3rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {['Revisi terbuka', 'Harga transparan', 'NDA tersedia', 'On-time delivery', 'Support pasca-selesai'].map((f) => (
            <span
              key={f}
              className="font-mono"
              style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', letterSpacing: '0.02em' }}
            >
              — {f}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .how-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        .step-divider { display: none; }
        @media (min-width: 861px) {
          .how-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
          }
          .how-grid > * { padding-right: 2.5rem; }
          .how-grid > *:last-child { padding-right: 0; }
          .step-divider {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            width: 1px;
            height: 100%;
            background: var(--line);
          }
        }
      `}</style>
    </section>
  );
}
