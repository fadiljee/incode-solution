import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ContactMessage = {
  id?: number;
  name: string;
  email: string;
  message: string;
  segment: 'akademik' | 'bisnis' | 'umum';
  created_at?: string;
};

export type PortfolioItem = {
  id: number;
  title: string;
  category: 'akademik' | 'bisnis';
  description: string;
  image_url: string;
  tech_stack: string[];
  live_url?: string;
  created_at: string;
};
