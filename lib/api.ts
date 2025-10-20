/**
 * PocketBase API Utilities
 * 
 * Centralized data fetching functions for all collections
 */

import { POCKETBASE_URL, buildQueryParams } from './pocketbase';
import type {
  Blog,
  Author,
  Testimonial,
  PricingPlan,
  Partner,
  Feature,
  Integration,
  Leadership,
  CompanyValue,
  Milestone,
  JobPosition,
  Benefit,
  CompanyStat,
  ContactOption,
  SupportResource,
  OfficeLocation,
  FaqCategory,
  FaqItem,
  Category,
  PressRelease,
  PocketBaseListResponse,
} from '@/types/pocketbase';

// ============================================================
// GENERIC UTILITIES
// ============================================================

interface ListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
  fields?: string;
  expand?: string;
}

/**
 * Generic function to fetch records from any collection
 */
async function fetchCollection<T>(
  collectionName: string,
  options: ListOptions = {}
): Promise<PocketBaseListResponse<T>> {
  const {
    page = 1,
    perPage = 20,
    sort,
    filter,
    fields,
    expand,
  } = options;

  const query = buildQueryParams({
    page,
    perPage,
    sort: sort || '-created',
    filter,
    fields,
    expand,
  });

  try {
    const response = await fetch(
      `${POCKETBASE_URL}/api/collections/${collectionName}/records?${query}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${collectionName}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Generic function to fetch a single record
 */
async function fetchRecord<T>(
  collectionName: string,
  recordId: string,
  options: { expand?: string; fields?: string } = {}
): Promise<T> {
  const query = buildQueryParams(options);

  try {
    const response = await fetch(
      `${POCKETBASE_URL}/api/collections/${collectionName}/records/${recordId}?${query}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch record from ${collectionName}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching record from ${collectionName}:`, error);
    throw error;
  }
}

// ============================================================
// BLOGS API
// ============================================================

export async function getBlogs(options: ListOptions = {}): Promise<PocketBaseListResponse<Blog>> {
  return fetchCollection<Blog>('blogs', {
    perPage: options.perPage || 20,
    ...options,
  });
}

export async function getBlogBySlug(slug: string): Promise<Blog> {
  const response = await getBlogs({
    filter: `slug = "${slug}"`,
    perPage: 1,
  });

  if (!response.items.length) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  return response.items[0];
}

export async function getFeaturedBlogs(limit: number = 3): Promise<Blog[]> {
  const response = await getBlogs({
    filter: 'featured = true',
    perPage: limit,
    sort: '-date',
  });

  return response.items;
}

export async function getBlogsByCategory(
  category: string,
  limit: number = 10
): Promise<Blog[]> {
  const response = await getBlogs({
    filter: `category = "${category}"`,
    perPage: limit,
    sort: '-date',
  });

  return response.items;
}

// ============================================================
// AUTHORS API
// ============================================================

export async function getAuthors(options: ListOptions = {}): Promise<PocketBaseListResponse<Author>> {
  return fetchCollection<Author>('authors', options);
}

export async function getAuthorById(authorId: string): Promise<Author> {
  return fetchRecord<Author>('authors', authorId);
}

// ============================================================
// TESTIMONIALS API
// ============================================================

export async function getTestimonials(options: ListOptions = {}): Promise<PocketBaseListResponse<Testimonial>> {
  return fetchCollection<Testimonial>('testimonials', {
    sort: options.sort || '-order',
    ...options,
  });
}

export async function getFeaturedTestimonials(limit: number = 6): Promise<Testimonial[]> {
  const response = await getTestimonials({
    filter: 'featured = true',
    perPage: limit,
    sort: 'order',
  });

  return response.items;
}

// ============================================================
// PRICING PLANS API
// ============================================================

export async function getPricingPlans(options: ListOptions = {}): Promise<PocketBaseListResponse<PricingPlan>> {
  return fetchCollection<PricingPlan>('pricing_plans', {
    filter: options.filter || 'active = true',
    sort: options.sort || 'order',
    ...options,
  });
}

export async function getPopularPlan(): Promise<PricingPlan | null> {
  const response = await getPricingPlans({
    filter: 'isPopular = true && active = true',
    perPage: 1,
  });

  return response.items.length > 0 ? response.items[0] : null;
}

// ============================================================
// PARTNERS API
// ============================================================

export async function getPartners(options: ListOptions = {}): Promise<PocketBaseListResponse<Partner>> {
  return fetchCollection<Partner>('partners', {
    filter: options.filter || 'active = true',
    sort: options.sort || 'order',
    ...options,
  });
}

export async function getFeaturedPartners(limit: number = 8): Promise<Partner[]> {
  const response = await getPartners({
    filter: 'featured = true && active = true',
    perPage: limit,
  });

  return response.items;
}

// ============================================================
// FEATURES API
// ============================================================

export async function getFeatures(options: ListOptions = {}): Promise<PocketBaseListResponse<Feature>> {
  return fetchCollection<Feature>('features', {
    sort: options.sort || 'order',
    ...options,
  });
}

export async function getFeaturesByCategory(category: string): Promise<Feature[]> {
  const response = await getFeatures({
    filter: `category = "${category}"`,
  });

  return response.items;
}

// ============================================================
// INTEGRATIONS API
// ============================================================

export async function getIntegrations(options: ListOptions = {}): Promise<PocketBaseListResponse<Integration>> {
  return fetchCollection<Integration>('integrations', {
    filter: options.filter || 'active = true',
    sort: options.sort || 'order',
    ...options,
  });
}

export async function getIntegrationsByCategory(category: string): Promise<Integration[]> {
  const response = await getIntegrations({
    filter: `category = "${category}" && active = true`,
  });

  return response.items;
}

// ============================================================
// LEADERSHIP API
// ============================================================

export async function getLeadershipTeam(options: ListOptions = {}): Promise<PocketBaseListResponse<Leadership>> {
  return fetchCollection<Leadership>('leadership', {
    sort: options.sort || 'order',
    ...options,
  });
}

export async function getFeaturedLeadership(): Promise<Leadership[]> {
  const response = await getLeadershipTeam({
    filter: 'featured = true',
  });

  return response.items;
}

// ============================================================
// COMPANY VALUES API
// ============================================================

export async function getCompanyValues(options: ListOptions = {}): Promise<PocketBaseListResponse<CompanyValue>> {
  return fetchCollection<CompanyValue>('company_values', {
    sort: options.sort || 'order',
    ...options,
  });
}

// ============================================================
// MILESTONES API
// ============================================================

export async function getMilestones(options: ListOptions = {}): Promise<PocketBaseListResponse<Milestone>> {
  return fetchCollection<Milestone>('milestones', {
    sort: options.sort || '-year',
    ...options,
  });
}

// ============================================================
// JOB POSITIONS API
// ============================================================

export async function getJobPositions(options: ListOptions = {}): Promise<PocketBaseListResponse<JobPosition>> {
  return fetchCollection<JobPosition>('job_positions', {
    filter: options.filter || 'status = "open"',
    sort: options.sort || '-created',
    ...options,
  });
}

export async function getFeaturedJobs(limit: number = 5): Promise<JobPosition[]> {
  const response = await getJobPositions({
    filter: 'featured = true && status = "open"',
    perPage: limit,
  });

  return response.items;
}

export async function getJobsByDepartment(department: string): Promise<JobPosition[]> {
  const response = await getJobPositions({
    filter: `department = "${department}" && status = "open"`,
  });

  return response.items;
}

// ============================================================
// BENEFITS API
// ============================================================

export async function getBenefits(options: ListOptions = {}): Promise<PocketBaseListResponse<Benefit>> {
  return fetchCollection<Benefit>('benefits', {
    sort: options.sort || 'order',
    ...options,
  });
}

export async function getBenefitsByCategory(category: string): Promise<Benefit[]> {
  const response = await getBenefits({
    filter: `category = "${category}"`,
  });

  return response.items;
}

// ============================================================
// COMPANY STATS API
// ============================================================

export async function getCompanyStats(options: ListOptions = {}): Promise<PocketBaseListResponse<CompanyStat>> {
  return fetchCollection<CompanyStat>('company_stats', {
    sort: options.sort || 'order',
    ...options,
  });
}

// ============================================================
// CONTACT OPTIONS API
// ============================================================

export async function getContactOptions(options: ListOptions = {}): Promise<PocketBaseListResponse<ContactOption>> {
  return fetchCollection<ContactOption>('contact_options', {
    sort: options.sort || '-featured',
    ...options,
  });
}

// ============================================================
// SUPPORT RESOURCES API
// ============================================================

export async function getSupportResources(options: ListOptions = {}): Promise<PocketBaseListResponse<SupportResource>> {
  return fetchCollection<SupportResource>('support_resources', {
    sort: options.sort || 'order',
    ...options,
  });
}

export async function getSupportResourcesByCategory(category: string): Promise<SupportResource[]> {
  const response = await getSupportResources({
    filter: `category = "${category}"`,
  });

  return response.items;
}

// ============================================================
// OFFICE LOCATIONS API
// ============================================================

export async function getOfficeLocations(options: ListOptions = {}): Promise<PocketBaseListResponse<OfficeLocation>> {
  return fetchCollection<OfficeLocation>('office_locations', options);
}

export async function getOfficeLocationsByCity(city: string): Promise<OfficeLocation[]> {
  const response = await getOfficeLocations({
    filter: `city = "${city}"`,
  });

  return response.items;
}

// ============================================================
// FAQ API
// ============================================================

export async function getFaqCategories(options: ListOptions = {}): Promise<PocketBaseListResponse<FaqCategory>> {
  return fetchCollection<FaqCategory>('faq_categories', {
    sort: options.sort || 'order',
    ...options,
  });
}

export async function getFaqItems(options: ListOptions = {}): Promise<PocketBaseListResponse<FaqItem>> {
  return fetchCollection<FaqItem>('faq_items', {
    sort: options.sort || 'order',
    expand: options.expand || 'category',
    ...options,
  });
}

export async function getFeaturedFaqItems(limit: number = 6): Promise<FaqItem[]> {
  const response = await getFaqItems({
    filter: 'featured = true',
    perPage: limit,
  });

  return response.items;
}

export async function getFaqItemsByCategory(categoryId: string): Promise<FaqItem[]> {
  const response = await getFaqItems({
    filter: `category = "${categoryId}"`,
  });

  return response.items;
}

// ============================================================
// CATEGORIES API
// ============================================================

export async function getCategories(options: ListOptions = {}): Promise<PocketBaseListResponse<Category>> {
  return fetchCollection<Category>('categories', options);
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const response = await getCategories({
    filter: `slug = "${slug}"`,
    perPage: 1,
  });

  if (!response.items.length) {
    throw new Error(`Category not found: ${slug}`);
  }

  return response.items[0];
}

// ============================================================
// PRESS RELEASES API
// ============================================================

export async function getPressReleases(options: ListOptions = {}): Promise<PocketBaseListResponse<PressRelease>> {
  return fetchCollection<PressRelease>('press_releases', {
    filter: options.filter || 'published = true',
    sort: options.sort || '-published_date',
    ...options,
  });
}

export async function getFeaturedPressReleases(limit: number = 5): Promise<PressRelease[]> {
  const response = await getPressReleases({
    filter: 'featured = true && published = true',
    perPage: limit,
  });

  return response.items;
}

// ============================================================
// ERROR HANDLING HELPER
// ============================================================

export function handleApiError(error: unknown): { message: string; code?: number } {
  if (error instanceof Error) {
    return {
      message: error.message || 'An error occurred while fetching data',
    };
  }

  return {
    message: 'An unknown error occurred',
  };
}
