'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        localStorage.setItem('incode_admin_auth', 'true');
        router.push('/admin/dashboard');
      } else {
        // Mock login for offline / dev mode without Supabase
        if (email === 'admin@incodesolution.id' && password === 'admin123') {
          localStorage.setItem('incode_admin_auth', 'true');
          router.push('/admin/dashboard');
        } else {
          throw new Error('Email atau password salah. (Dev: admin@incodesolution.id / admin123)');
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper-card)', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: 'var(--paper)', border: '1px solid var(--line)', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="wordmark-sep" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Incode<span>/</span>Admin</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>Silakan login untuk mengelola website.</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-soft)', marginBottom: '0.4rem', letterSpacing: '0.02em' }}>
              EMAIL
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@incodesolution.id"
              style={{
                width: '100%', padding: '0.6rem 0.75rem', background: 'var(--paper-card)', border: '1px solid var(--line)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink)', outline: 'none',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--ink)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-soft)', marginBottom: '0.4rem', letterSpacing: '0.02em' }}>
              PASSWORD
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%', padding: '0.6rem 0.75rem', background: 'var(--paper-card)', border: '1px solid var(--line)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--ink)', outline: 'none',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--ink)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
            />
          </div>

          {error && (
            <div style={{ padding: '0.75rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-pine"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? <Loader2 size={16} className="spin" /> : 'Login'}
          </button>
        </form>

        {!isSupabaseConfigured && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-soft)', textAlign: 'center', marginTop: '2rem' }}>
            Local Mode: Active (Supabase env not configured)
          </p>
        )}
      </div>
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
