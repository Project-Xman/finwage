/**
 * Seed Data Type Definitions
 *
 * Provides strong typing for all seed data structures across collections.
 * Follows Interface Segregation Principle - each interface represents one collection's seed data.
 */

// ============================================================
// BASE TYPES
// ============================================================

/**
 * Base seeder interface - all seeders must implement this
 * Follows Interface Segregation Principle
 */
export interface ISeeder {
  /**
   * Unique identifier for the seeder
   */
  readonly name: string;

  /**
   * Execute the seeding operation
   * @returns Array of created record IDs
   */
  seed(): Promise<string[]>;

  /**
   * Rollback/cleanup seeded data (optional)
   */
  cleanup?(): Promise<void>;
}

/**
 * Seeder result containing created records
 */
export interface SeederResult {
  collection: string;
  recordIds: string[];
  count: number;
  success: boolean;
  error?: Error;
}

/**
 * Seeder configuration options
 */
export interface SeederConfig {
  pocketbaseUrl: string;
  adminEmail: string;
  adminPassword: string;
  verbose?: boolean;
}

// ============================================================
// COLLECTION SEED DATA INTERFACES
// ============================================================

export interface CategorySeedData {
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  count?: string;
}

export interface AuthorSeedData {
  name: string;
  slug: string;
  email: string;
  bio: string;
  role: string;
  social_link?: Record<string, string>;
  active: boolean;
}

export interface BlogSeedData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string; // ID reference
  category: string; // ID reference
  tags?: string[];
  featured: boolean;
  published: boolean;
  published_date: string;
  views?: number;
  // SEO fields
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  og_image?: string | null;
  canonical_url?: string | null;
}

export interface CompanyMilestoneSeedData {
  year: number;
  event: string;
  description: string;
  order: number;
  featured: boolean;
}

export interface ComplianceItemSeedData {
  icon: string;
  title: string;
  description: string;
  details: Record<string, any>;
  order: number;
}

export interface ContactOptionSeedData {
  title: string;
  description: string;
  icon: string;
  type: string;
  action_url: string;
  is_featured: boolean;
}

export interface CtaCardSeedData {
  icon: string;
  bg_color: string;
  title: string;
  points: string[];
  order: number;
}

export interface EmployeeBenefitSeedData {
  title: string;
  description: string;
  icon: string;
  category: string; // ID reference
  order: number;
}

export interface EmployerStatSeedData {
  value: string;
  label: string;
  order: number;
}

export interface FaqTopicSeedData {
  name: string;
  description: string;
  order: number;
}

export interface FaqSeedData {
  question: string;
  answer: string;
  category: string; // ID reference
  category_text: string;
  order: number;
  featured: boolean;
}

export interface FeatureSeedData {
  title: string;
  slug: string;
  description: string;
  icon: string;
  category: string; // ID reference
  order: number;
  featured: boolean;
  active: boolean;
}

export interface IntegrationSeedData {
  name: string;
  slug: string;
  description: string;
  documentation_url: string;
  featured: boolean;
  order: number;
  active: boolean;
  category: string; // ID reference
}

export interface JobSeedData {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  salary_range: string;
  featured: boolean;
  status: string;
}

export interface LeadershipSeedData {
  name: string;
  role: string;
  bio: string;
  email: string;
  order: number;
  featured: boolean;
  social_links?: Record<string, string>;
}

export interface LocationSeedData {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  coordinates?: { lat: number; lng: number };
}

export interface PartnerSeedData {
  name: string;
  slug: string;
  website: string;
  description: string;
  featured: boolean;
  order: number;
  active: boolean;
  category: string; // ID reference
}

export interface PressSeedData {
  title: string;
  content: string;
  published_date: string;
  source: string;
  url: string;
  featured: boolean;
  published: boolean;
}

export interface PricingPlanSeedData {
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  limitations: string[];
  is_popular: boolean;
  is_enterprise: boolean;
  order: number;
  active: boolean;
}

export interface ProcessStepSeedData {
  step: string;
  title: string;
  description: string;
  icon: string;
  category: string; // ID reference
  order: number;
}

export interface SecurityFeatureSeedData {
  description: string;
  order: number;
}

export interface StatusSeedData {
  metric: string;
  value: string;
  label: string;
  description: string;
  order: number;
}

export interface SupportSeedData {
  title: string;
  description: string;
  field: string; // URL field
  category: string; // ID reference
  order: number;
}

export interface TestimonialSeedData {
  name: string;
  company: string;
  position: string;
  quote: string;
  rating: number;
  verified: boolean;
  featured: boolean;
  order: boolean;
}

export interface ValueSeedData {
  title: string;
  description: string;
  icon: string;
  order: number;
  featured: boolean;
}

// ============================================================
// SEEDER DEPENDENCY MAP
// ============================================================

/**
 * Defines dependencies between seeders
 * Used to ensure proper seeding order
 */
export interface SeederDependency {
  seederName: string;
  dependsOn: string[];
}

/**
 * Maps collection names to their dependencies
 */
export const SEEDER_DEPENDENCIES: Record<string, string[]> = {
  categories: [],
  authors: [],
  blogs: ["categories", "authors"],
  employee_benefits: ["categories"],
  faqs: ["categories"],
  features: ["categories"],
  integrations: ["categories"],
  partners: ["categories"],
  process_steps: ["categories"],
  support: ["categories"],
};
