'use client';
import { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { usePathname, useRouter } from 'next/navigation';

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Very basic auth check for demo purposes
  // In production, Supabase Auth hook or middleware should handle this
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('incode_admin_auth') === 'true';
    if (!isLoggedIn && !pathname.includes('/login')) {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  if (pathname.includes('/login')) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--paper-card)' }}>
      <AdminSidebar open={open} setOpen={setOpen} />
      
      <main className="admin-main">
        {/* We will inject setOpen via React context if needed, but for now we pass it to page via children? No, pages can't accept props.
            Instead, we should render the Topbar HERE. But each page might want a different title.
            We can use a simple Context to set the title from the page, or just use pathname. 
            For simplicity, we'll derive title from pathname. */}
        
        {/* We moved Topbar here to share state */}
        <AdminTopbar setOpen={setOpen} title={formatTitle(pathname)} />
        
        <div style={{ padding: '1.5rem' }}>
          {children}
        </div>
      </main>

      <style>{`
        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        @media (min-width: 1025px) {
          .admin-main {
            padding-left: 260px; /* Width of sidebar */
          }
        }
      `}</style>
    </div>
  );
}

function formatTitle(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length <= 1) return 'Dashboard';
  const last = parts[parts.length - 1];
  return last.charAt(0).toUpperCase() + last.slice(1);
}

import { AdminTopbar } from './AdminTopbar';
