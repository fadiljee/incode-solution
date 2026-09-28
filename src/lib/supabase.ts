import { createClient } from '@supabase/supabase-js';
import type {
  ServiceItem,
  PortfolioItem,
  TestimonialItem,
  LeadItem,
  ActivityLogItem,
  Profile,
} from './types';

export type {
  ServiceItem,
  PortfolioItem,
  TestimonialItem,
  LeadItem,
  ActivityLogItem,
  Profile,
} from './types';
import {
  DEFAULT_SERVICES,
  DEFAULT_PORTFOLIOS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_LEADS,
  DEFAULT_LOGS,
  DEFAULT_PROFILES,
  getLocalStore,
  setLocalStore,
} from './data-store';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  supabaseUrl !== 'your-supabase-url' &&
  !supabaseUrl.includes('your-supabase');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Re-export old types for backwards compatibility
export type ContactMessage = {
  id?: number | string;
  name: string;
  email: string;
  message: string;
  segment: 'akademik' | 'bisnis' | 'umum';
  created_at?: string;
};

// ----------------------------------------------------------------------
// DATA FETCHERS & MUTATORS (Hybrid Supabase / Local Fallback)
// ----------------------------------------------------------------------

// Services
export async function getServices(): Promise<ServiceItem[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true });
    if (!error && data && data.length > 0) return data as ServiceItem[];
  }
  return getLocalStore('services', DEFAULT_SERVICES);
}

export async function saveService(service: Partial<ServiceItem>): Promise<ServiceItem> {
  const isNew = !service.id;
  const item: ServiceItem = {
    id: service.id || `srv-${Date.now()}`,
    name: service.name || 'Layanan Baru',
    slug: service.slug || `layanan-${Date.now()}`,
    category: service.category || 'bisnis',
    short_description: service.short_description || '',
    description: service.description || '',
    icon: service.icon || 'Code',
    price_from: service.price_from || 0,
    cta_message: service.cta_message || '',
    sort_order: service.sort_order ?? 99,
    is_published: service.is_published ?? true,
    created_at: service.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (supabase) {
    if (isNew) {
      const { data, error } = await supabase.from('services').insert([item]).select().single();
      if (!error && data) return data as ServiceItem;
    } else {
      const { data, error } = await supabase.from('services').update(item).eq('id', item.id).select().single();
      if (!error && data) return data as ServiceItem;
    }
  }

  const current = getLocalStore('services', DEFAULT_SERVICES);
  const updated = isNew
    ? [item, ...current]
    : current.map((s) => (s.id === item.id ? item : s));
  setLocalStore('services', updated);
  return item;
}

export async function deleteService(id: string): Promise<boolean> {
  if (supabase) {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (!error) return true;
  }
  const current = getLocalStore('services', DEFAULT_SERVICES);
  setLocalStore(
    'services',
    current.filter((s) => s.id !== id)
  );
  return true;
}

// Portfolios
export async function getPortfolios(): Promise<PortfolioItem[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data as PortfolioItem[];
  }
  return getLocalStore('portfolios', DEFAULT_PORTFOLIOS);
}

export async function savePortfolio(item: Partial<PortfolioItem>): Promise<PortfolioItem> {
  const isNew = !item.id;
  const portfolio: PortfolioItem = {
    id: item.id || `port-${Date.now()}`,
    title: item.title || 'Portofolio Baru',
    slug: item.slug || `portfolio-${Date.now()}`,
    description: item.description || '',
    category: item.category || 'bisnis',
    thumbnail_url: item.thumbnail_url || '',
    client_name: item.client_name || '',
    project_year: item.project_year || new Date().getFullYear(),
    technologies: item.technologies || ['Next.js'],
    demo_url: item.demo_url || '#',
    repository_url: item.repository_url || '',
    is_featured: item.is_featured ?? false,
    is_published: item.is_published ?? true,
    created_at: item.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (supabase) {
    if (isNew) {
      const { data, error } = await supabase.from('portfolios').insert([portfolio]).select().single();
      if (!error && data) return data as PortfolioItem;
    } else {
      const { data, error } = await supabase.from('portfolios').update(portfolio).eq('id', portfolio.id).select().single();
      if (!error && data) return data as PortfolioItem;
    }
  }

  const current = getLocalStore('portfolios', DEFAULT_PORTFOLIOS);
  const updated = isNew
    ? [portfolio, ...current]
    : current.map((p) => (p.id === portfolio.id ? portfolio : p));
  setLocalStore('portfolios', updated);
  return portfolio;
}

export async function deletePortfolio(id: string): Promise<boolean> {
  if (supabase) {
    const { error } = await supabase.from('portfolios').delete().eq('id', id);
    if (!error) return true;
  }
  const current = getLocalStore('portfolios', DEFAULT_PORTFOLIOS);
  setLocalStore(
    'portfolios',
    current.filter((p) => p.id !== id)
  );
  return true;
}

// Testimonials
export async function getTestimonials(): Promise<TestimonialItem[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data as TestimonialItem[];
  }
  return getLocalStore('testimonials', DEFAULT_TESTIMONIALS);
}

export async function saveTestimonial(item: Partial<TestimonialItem>): Promise<TestimonialItem> {
  const isNew = !item.id;
  const testimonial: TestimonialItem = {
    id: item.id || `test-${Date.now()}`,
    name: item.name || 'Nama Pelanggan',
    position: item.position || '',
    company: item.company || '',
    content: item.content || '',
    rating: item.rating ?? 5,
    category: item.category || 'bisnis',
    is_published: item.is_published ?? true,
    created_at: item.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (supabase) {
    if (isNew) {
      const { data, error } = await supabase.from('testimonials').insert([testimonial]).select().single();
      if (!error && data) return data as TestimonialItem;
    } else {
      const { data, error } = await supabase.from('testimonials').update(testimonial).eq('id', testimonial.id).select().single();
      if (!error && data) return data as TestimonialItem;
    }
  }

  const current = getLocalStore('testimonials', DEFAULT_TESTIMONIALS);
  const updated = isNew
    ? [testimonial, ...current]
    : current.map((t) => (t.id === testimonial.id ? testimonial : t));
  setLocalStore('testimonials', updated);
  return testimonial;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  if (supabase) {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) return true;
  }
  const current = getLocalStore('testimonials', DEFAULT_TESTIMONIALS);
  setLocalStore(
    'testimonials',
    current.filter((t) => t.id !== id)
  );
  return true;
}

// Leads
export async function getLeads(): Promise<LeadItem[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) return data as LeadItem[];
  }
  return getLocalStore('leads', DEFAULT_LEADS);
}

export async function createLead(lead: Partial<LeadItem>): Promise<LeadItem> {
  const newLead: LeadItem = {
    id: `lead-${Date.now()}`,
    name: lead.name || 'Tanpa Nama',
    email: lead.email || '',
    phone: lead.phone || '',
    category: lead.category || 'umum',
    subject: lead.subject || 'Form Kontak',
    message: lead.message || '',
    status: lead.status || 'NEW',
    notes: lead.notes || '',
    source: lead.source || 'contact_form',
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    const { data, error } = await supabase.from('leads').insert([newLead]).select().single();
    if (!error && data) return data as LeadItem;
  }

  const current = getLocalStore('leads', DEFAULT_LEADS);
  setLocalStore('leads', [newLead, ...current]);
  return newLead;
}

export async function updateLead(id: string, updateData: Partial<LeadItem>): Promise<LeadItem | null> {
  if (supabase) {
    const { data, error } = await supabase
      .from('leads')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (!error && data) return data as LeadItem;
  }

  const current = getLocalStore('leads', DEFAULT_LEADS);
  let updatedItem: LeadItem | null = null;
  const updatedList = current.map((l) => {
    if (l.id === id) {
      updatedItem = { ...l, ...updateData, updated_at: new Date().toISOString() };
      return updatedItem;
    }
    return l;
  });
  setLocalStore('leads', updatedList);
  return updatedItem;
}

export async function deleteLead(id: string): Promise<boolean> {
  if (supabase) {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (!error) return true;
  }
  const current = getLocalStore('leads', DEFAULT_LEADS);
  setLocalStore(
    'leads',
    current.filter((l) => l.id !== id)
  );
  return true;
}

// Activity Logs
export async function getActivityLogs(): Promise<ActivityLogItem[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) return data as ActivityLogItem[];
  }
  return getLocalStore('activity_logs', DEFAULT_LOGS);
}

export async function addActivityLog(
  action: string,
  resource: string,
  resourceId?: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  const log: ActivityLogItem = {
    id: `log-${Date.now()}`,
    user_email: 'admin@incodesolution.id',
    action,
    resource,
    resource_id: resourceId,
    metadata,
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    await supabase.from('activity_logs').insert([log]);
  }

  const current = getLocalStore('activity_logs', DEFAULT_LOGS);
  setLocalStore('activity_logs', [log, ...current]);
}

// Admin Users Profiles
export async function getAdminProfiles(): Promise<Profile[]> {
  if (supabase) {
    const { data, error } = await supabase.from('profiles').select('*');
    if (!error && data) return data as Profile[];
  }
  return getLocalStore('profiles', DEFAULT_PROFILES);
}
