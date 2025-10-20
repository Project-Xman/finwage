/**
 * PocketBase Collection Type Definitions
 * Generated from schema - update when schema changes
 */

// ============================================================
// EXISTING COLLECTIONS (7)
// ============================================================

/** Blog post record */
export interface Blog {
  id: string;
  created: string;
  updated: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featured: boolean;
  author_id: string;
  image: string;
  date: string;
  readTime: string;
  tags?: string;
  published: boolean;
  metadata?: Record<string, any>;
}

/** Blog author record */
export interface Author {
  id: string;
  created: string;
  updated: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  email?: string;
  social_links?: Record<string, string>;
}

/** Customer testimonial record */
export interface Testimonial {
  id: string;
  created: string;
  updated: string;
  name: string;
  title: string;
  quote: string;
  rating: number;
  image: string;
  company?: string;
  featured: boolean;
  order: number;
  verified: boolean;
}

/** Pricing plan record */
export interface PricingPlan {
  id: string;
  created: string;
  updated: string;
  title: string;
  subtitle?: string;
  description?: string;
  price: number;
  period: string;
  buttonText: string;
  isPopular: boolean;
  order: number;
  features: Array<{
    text: string;
    enabled: boolean;
  }>;
  cta_url?: string;
  active: boolean;
}

/** Company partner record */
export interface Partner {
  id: string;
  created: string;
  updated: string;
  name: string;
  logo: string;
  logo_url?: string;
  website?: string;
  description?: string;
  category?: string;
  order: number;
  featured: boolean;
  active: boolean;
}

/** Product feature record */
export interface Feature {
  id: string;
  created: string;
  updated: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  order: number;
  category?: string;
}

/** Platform integration record */
export interface Integration {
  id: string;
  created: string;
  updated: string;
  name: string;
  description?: string;
  logo?: string;
  category: string;
  order: number;
  active: boolean;
}

// ============================================================
// NEW COLLECTIONS (13)
// ============================================================

/** Leadership team member record */
export interface Leadership {
  id: string;
  created: string;
  updated: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  email?: string;
  order?: number;
  featured?: boolean;
  social_links?: Record<string, string>;
}

/** Company value record */
export interface CompanyValue {
  id: string;
  created: string;
  updated: string;
  title: string;
  description: string;
  icon?: string;
  order?: number;
  featured?: boolean;
}

/** Company milestone record */
export interface Milestone {
  id: string;
  created: string;
  updated: string;
  year: number;
  event: string;
  description?: string;
  order?: number;
  featured?: boolean;
}

/** Job position record */
export interface JobPosition {
  id: string;
  created: string;
  updated: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  description: string;
  requirements?: string;
  salary_range?: string;
  featured?: boolean;
  status?: string;
}

/** Employee benefit record */
export interface Benefit {
  id: string;
  created: string;
  updated: string;
  title: string;
  description: string;
  icon?: string;
  category?: string;
  order?: number;
}

/** Company statistics record */
export interface CompanyStat {
  id: string;
  created: string;
  updated: string;
  metric: string;
  value: string;
  label?: string;
  description?: string;
  order?: number;
}

/** Contact option record */
export interface ContactOption {
  id: string;
  created: string;
  updated: string;
  title: string;
  description?: string;
  icon?: string;
  type?: string;
  action_url?: string;
  featured?: boolean;
}

/** Support resource record */
export interface SupportResource {
  id: string;
  created: string;
  updated: string;
  title: string;
  description?: string;
  url: string;
  category?: string;
  order?: number;
}

/** Office location record */
export interface OfficeLocation {
  id: string;
  created: string;
  updated: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  email?: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

/** FAQ category record */
export interface FaqCategory {
  id: string;
  created: string;
  updated: string;
  name: string;
  description?: string;
  order?: number;
}

/** FAQ item record */
export interface FaqItem {
  id: string;
  created: string;
  updated: string;
  question: string;
  answer: string;
  category?: string; // relation to faq_categories
  order?: number;
  featured?: boolean;
}

/** Content category record */
export interface Category {
  id: string;
  created: string;
  updated: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  count?: number;
}

/** Press release record */
export interface PressRelease {
  id: string;
  created: string;
  updated: string;
  title: string;
  content: string;
  published_date: string;
  source?: string;
  url?: string;
  featured?: boolean;
  published?: boolean;
}

// ============================================================
// UNION TYPES
// ============================================================

export type AnyRecord = 
  | Blog
  | Author
  | Testimonial
  | PricingPlan
  | Partner
  | Feature
  | Integration
  | Leadership
  | CompanyValue
  | Milestone
  | JobPosition
  | Benefit
  | CompanyStat
  | ContactOption
  | SupportResource
  | OfficeLocation
  | FaqCategory
  | FaqItem
  | Category
  | PressRelease;

export type CollectionName =
  | 'blogs'
  | 'authors'
  | 'testimonials'
  | 'pricing_plans'
  | 'partners'
  | 'features'
  | 'integrations'
  | 'leadership'
  | 'company_values'
  | 'milestones'
  | 'job_positions'
  | 'benefits'
  | 'company_stats'
  | 'contact_options'
  | 'support_resources'
  | 'office_locations'
  | 'faq_categories'
  | 'faq_items'
  | 'categories'
  | 'press_releases';

// ============================================================
// API RESPONSE TYPES
// ============================================================

export interface PocketBaseListResponse<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}

export interface PocketBaseError {
  code: number;
  message: string;
  data?: Record<string, any>;
}
