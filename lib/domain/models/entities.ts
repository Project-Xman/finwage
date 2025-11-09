/**
 * Domain Models (SRP - Single Responsibility Principle)
 *
 * Domain models represent business entities with their rules and behaviors.
 * They are separate from API response types and database schemas.
 */

/**
 * Base entity interface that all domain entities extend
 */
export interface BaseEntity {
  id: string;
  created: Date;
  updated: Date;
}

/**
 * Blog entity - represents a blog post in the domain
 */
export interface Blog extends BaseEntity {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
  publishedDate: Date | null;
  featuredImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  readingTime: number;
  viewCount: number;

  // Relations
  authorId: string;
  categoryId: string;
  author?: Author;
  category?: Category;
}

/**
 * Author entity
 */
export interface Author extends BaseEntity {
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  socialLinks: SocialLinks;
}

/**
 * Category entity
 */
export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  color: string;
  icon: string | null;
}

/**
 * Social links structure
 */
export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

/**
 * Contact enquiry entity
 */
export interface ContactEnquiry extends BaseEntity {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  interest: EnquiryInterest;
  status: EnquiryStatus;
  resolvedAt: Date | null;
  notes: string | null;
}

/**
 * Enquiry interest types
 */
export enum EnquiryInterest {
  Demo = "demo",
  Pricing = "pricing",
  Partnership = "partnership",
  Support = "support",
  Other = "other",
}

/**
 * Enquiry status types
 */
export enum EnquiryStatus {
  New = "new",
  InProgress = "in_progress",
  Resolved = "resolved",
  Closed = "closed",
}

/**
 * Pricing plan entity
 */
export interface PricingPlan extends BaseEntity {
  name: string;
  description: string;
  price: number | null; // null for custom pricing
  currency: string;
  billingPeriod: BillingPeriod;
  features: string[];
  limitations: string[];
  isPopular: boolean;
  isActive: boolean;
  employeeMin: number | null;
  employeeMax: number | null;
}

/**
 * Billing period types
 */
export enum BillingPeriod {
  Monthly = "monthly",
  Yearly = "yearly",
  Custom = "custom",
}

/**
 * Partner entity
 */
export interface Partner extends BaseEntity {
  name: string;
  logo: string;
  website: string | null;
  description: string | null;
  isFeatured: boolean;
  displayOrder: number;
}

/**
 * Testimonial entity
 */
export interface Testimonial extends BaseEntity {
  content: string;
  authorName: string;
  authorTitle: string;
  authorCompany: string;
  authorAvatar: string | null;
  rating: number;
  isFeatured: boolean;
  displayOrder: number;
}

/**
 * Feature entity
 */
export interface Feature extends BaseEntity {
  title: string;
  description: string;
  icon: string;
  category: FeatureCategory;
  benefits: string[];
  isFeatured: boolean;
  displayOrder: number;
}

/**
 * Feature categories
 */
export enum FeatureCategory {
  Core = "core",
  Security = "security",
  Integration = "integration",
  Analytics = "analytics",
  Compliance = "compliance",
}

/**
 * Company stats entity
 */
export interface CompanyStats extends BaseEntity {
  label: string;
  value: string;
  description: string | null;
  icon: string | null;
  displayOrder: number;
}

/**
 * Job posting entity
 */
export interface JobPosting extends BaseEntity {
  title: string;
  department: string;
  location: string;
  type: JobType;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salaryRange: SalaryRange | null;
  isActive: boolean;
  isRemote: boolean;
  applicationUrl: string;
}

/**
 * Job types
 */
export enum JobType {
  FullTime = "full_time",
  PartTime = "part_time",
  Contract = "contract",
  Intern = "intern",
}

/**
 * Salary range structure
 */
export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: "hourly" | "monthly" | "yearly";
}
