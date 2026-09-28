export type UserRole = 'ADMIN' | 'SUPER_ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE';

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
};

export type ServiceCategory = 'akademik' | 'bisnis';

export type ServiceItem = {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  short_description: string;
  description?: string;
  icon?: string;
  image_url?: string;
  price_from?: number;
  cta_message?: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
};

export type PortfolioCategory =
  | 'akademik'
  | 'bisnis'
  | 'umkm'
  | 'website'
  | 'mobile_app'
  | 'web_app'
  | 'system';

export type PortfolioItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: PortfolioCategory;
  thumbnail_url?: string;
  gallery?: string[];
  client_name?: string;
  project_year?: number;
  technologies: string[];
  demo_url?: string;
  repository_url?: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
};

export type TestimonialItem = {
  id: string;
  name: string;
  position?: string;
  company?: string;
  avatar_url?: string;
  content: string;
  rating: number;
  category: ServiceCategory;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
};

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'IN_DISCUSSION'
  | 'QUOTATION'
  | 'WON'
  | 'LOST';

export type LeadItem = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  subject?: string;
  message: string;
  status: LeadStatus;
  notes?: string;
  source?: string;
  created_at: string;
  updated_at?: string;
};

export type WebsiteSettings = {
  id?: string;
  key: string;
  value: Record<string, unknown>;
  updated_at?: string;
};

export type ActivityLogItem = {
  id: string;
  user_id?: string;
  user_email?: string;
  action: string;
  resource: string;
  resource_id?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
};
