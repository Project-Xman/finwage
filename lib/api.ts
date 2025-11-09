/**
 * PocketBase API Utilities for Next.js 15 Server Components
 *
 * Optimized data fetching with proper caching strategies
 */

import { unstable_cache } from "next/cache";
import type {
  AuthorsResponse,
  BlogsResponse,
  CategoryResponse,
  CompanyMilestonesResponse,
  ComplianceItemsResponse,
  ContactOptionsResponse,
  CtaCardsResponse,
  EmployeeBenefitsResponse,
  EmployerStatsResponse,
  EnquiriesResponse,
  FaqsResponse,
  FaqTopicsResponse,
  FeaturesResponse,
  IntegrationsResponse,
  JobsResponse,
  LeadershipResponse,
  LocationsResponse,
  PartnersResponse,
  PressResponse,
  PricingPlansResponse,
  ProcessStepsResponse,
  SecurityFeaturesResponse,
  StatusResponse,
  SupportResponse,
  TestimonialsResponse,
  ValuesResponse,
} from "@/types/pocketbase";

// ============================================================
// CONFIGURATION
// ============================================================

import { CACHE_DURATION, CACHE_TAGS } from "@/lib/utils/cache-config";

const POCKETBASE_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";

// Re-export cache configuration for backward compatibility
export { CACHE_TAGS, CACHE_DURATION };

// ============================================================
// TYPES
// ============================================================

interface PocketBaseListResponse<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}

interface ListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
  fields?: string;
  expand?: string;
}

interface CacheConfig {
  revalidate?: number | false;
  tags?: string[];
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Build query parameters for PocketBase API
 */
function buildQueryParams(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

/**
 * Generic fetch with error handling and caching
 */
async function fetchWithCache<T>(
  url: string,
  cacheConfig: CacheConfig = {},
): Promise<T> {
  const { revalidate = CACHE_DURATION.MEDIUM, tags = [] } = cacheConfig;

  try {
    const response = await fetch(url, {
      next: {
        revalidate,
        tags,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

/**
 * Generic function to fetch records from any collection with caching
 */
async function fetchCollection<T>(
  collectionName: string,
  options: ListOptions = {},
  cacheConfig: CacheConfig = {},
): Promise<PocketBaseListResponse<T>> {
  const {
    page = 1,
    perPage = 20,
    sort = "-created",
    filter,
    fields,
    expand,
  } = options;

  const query = buildQueryParams({
    page,
    perPage,
    sort,
    filter,
    fields,
    expand,
  });

  const url = `${POCKETBASE_URL}/api/collections/${collectionName}/records?${query}`;

  return fetchWithCache<PocketBaseListResponse<T>>(url, cacheConfig);
}

/**
 * Generic function to fetch a single record with caching
 */
async function fetchRecord<T>(
  collectionName: string,
  recordId: string,
  options: { expand?: string; fields?: string } = {},
  cacheConfig: CacheConfig = {},
): Promise<T> {
  const query = buildQueryParams(options);
  const url = `${POCKETBASE_URL}/api/collections/${collectionName}/records/${recordId}?${query}`;

  return fetchWithCache<T>(url, cacheConfig);
}

// ============================================================
// BLOGS API
// ============================================================

export async function getBlogs(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<BlogsResponse>> {
  return fetchCollection<BlogsResponse>(
    "blogs",
    {
      perPage: options.perPage || 20,
      expand: "author,category",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.SHORT,
      tags: [CACHE_TAGS.BLOGS],
    },
  );
}

export const getBlogBySlug = unstable_cache(
  async (slug: string): Promise<BlogsResponse> => {
    const response = await fetchCollection<BlogsResponse>(
      "blogs",
      {
        filter: `slug = "${slug}" && published = true`,
        perPage: 1,
        expand: "author,category",
      },
      {
        revalidate: CACHE_DURATION.MEDIUM,
        tags: [CACHE_TAGS.BLOGS, `blog-${slug}`],
      },
    );

    if (!response.items.length) {
      throw new Error(`Blog post not found: ${slug}`);
    }

    return response.items[0];
  },
  ["blog-by-slug"],
  {
    revalidate: CACHE_DURATION.MEDIUM,
    tags: [CACHE_TAGS.BLOGS],
  },
);

export async function getFeaturedBlogs(
  limit: number = 3,
): Promise<BlogsResponse[]> {
  const response = await fetchCollection<BlogsResponse>(
    "blogs",
    {
      filter: "featured = true && published = true",
      perPage: limit,
      sort: "-published_date",
      expand: "author,category",
    },
    {
      revalidate: CACHE_DURATION.MEDIUM,
      tags: [CACHE_TAGS.BLOGS, "featured-blogs"],
    },
  );

  return response.items;
}

export async function getBlogsByCategory(
  categoryId: string,
  limit: number = 10,
): Promise<BlogsResponse[]> {
  const response = await fetchCollection<BlogsResponse>(
    "blogs",
    {
      filter: `category = "${categoryId}" && published = true`,
      perPage: limit,
      sort: "-published_date",
      expand: "author,category",
    },
    {
      revalidate: CACHE_DURATION.SHORT,
      tags: [CACHE_TAGS.BLOGS, `category-${categoryId}`],
    },
  );

  return response.items;
}

// ============================================================
// AUTHORS API
// ============================================================

export async function getAuthors(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<AuthorsResponse>> {
  return fetchCollection<AuthorsResponse>(
    "authors",
    {
      filter: "active = true",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.AUTHORS],
    },
  );
}

export async function getAuthorById(
  authorId: string,
): Promise<AuthorsResponse> {
  return fetchRecord<AuthorsResponse>(
    "authors",
    authorId,
    {},
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.AUTHORS, `author-${authorId}`],
    },
  );
}

export async function getAuthorBySlug(slug: string): Promise<AuthorsResponse> {
  const response = await fetchCollection<AuthorsResponse>(
    "authors",
    {
      filter: `slug = "${slug}" && active = true`,
      perPage: 1,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.AUTHORS, `author-${slug}`],
    },
  );

  if (!response.items.length) {
    throw new Error(`Author not found: ${slug}`);
  }

  return response.items[0];
}

// ============================================================
// TESTIMONIALS API
// ============================================================

export async function getTestimonials(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<TestimonialsResponse>> {
  return fetchCollection<TestimonialsResponse>(
    "testimonials",
    {
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.TESTIMONIALS],
    },
  );
}

export async function getFeaturedTestimonials(
  limit: number = 6,
): Promise<TestimonialsResponse[]> {
  const response = await fetchCollection<TestimonialsResponse>(
    "testimonials",
    {
      filter: "featured = true",
      perPage: limit,
      sort: "order",
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.TESTIMONIALS, "featured-testimonials"],
    },
  );

  return response.items;
}

// ============================================================
// PRICING PLANS API
// ============================================================

export async function getPricingPlans(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<PricingPlansResponse>> {
  return fetchCollection<PricingPlansResponse>(
    "pricing_plans",
    {
      filter: options.filter || "active = true",
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.PRICING],
    },
  );
}

export async function getPopularPlan(): Promise<PricingPlansResponse | null> {
  const response = await fetchCollection<PricingPlansResponse>(
    "pricing_plans",
    {
      filter: "is_popular = true && active = true",
      perPage: 1,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.PRICING, "popular-plan"],
    },
  );

  return response.items.length > 0 ? response.items[0] : null;
}

// ============================================================
// PARTNERS API
// ============================================================

export async function getPartners(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<PartnersResponse>> {
  return fetchCollection<PartnersResponse>(
    "partners",
    {
      filter: options.filter || "active = true",
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.PARTNERS],
    },
  );
}

export async function getFeaturedPartners(
  limit: number = 8,
): Promise<PartnersResponse[]> {
  const response = await fetchCollection<PartnersResponse>(
    "partners",
    {
      filter: "featured = true && active = true",
      perPage: limit,
      sort: "order",
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.PARTNERS, "featured-partners"],
    },
  );

  return response.items;
}

// ============================================================
// FEATURES API
// ============================================================

export async function getFeatures(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<FeaturesResponse>> {
  return fetchCollection<FeaturesResponse>(
    "features",
    {
      filter: "active = true",
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.FEATURES],
    },
  );
}

export async function getFeaturesByCategory(
  category: string,
): Promise<FeaturesResponse[]> {
  const response = await fetchCollection<FeaturesResponse>(
    "features",
    {
      filter: `category = "${category}" && active = true`,
      sort: "order",
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.FEATURES, `features-${category}`],
    },
  );

  return response.items;
}

export async function getFeaturedFeatures(
  limit: number = 6,
): Promise<FeaturesResponse[]> {
  const response = await fetchCollection<FeaturesResponse>(
    "features",
    {
      filter: "featured = true && active = true",
      perPage: limit,
      sort: "order",
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.FEATURES, "featured-features"],
    },
  );

  return response.items;
}

// ============================================================
// INTEGRATIONS API
// ============================================================

export async function getIntegrations(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<IntegrationsResponse>> {
  return fetchCollection<IntegrationsResponse>(
    "integrations",
    {
      filter: options.filter || "active = true",
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.INTEGRATIONS],
    },
  );
}

export async function getIntegrationsByCategory(
  category: string,
): Promise<IntegrationsResponse[]> {
  const response = await fetchCollection<IntegrationsResponse>(
    "integrations",
    {
      filter: `category = "${category}" && active = true`,
      sort: "order",
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.INTEGRATIONS, `integrations-${category}`],
    },
  );

  return response.items;
}

export async function getFeaturedIntegrations(
  limit: number = 8,
): Promise<IntegrationsResponse[]> {
  const response = await fetchCollection<IntegrationsResponse>(
    "integrations",
    {
      filter: "featured = true && active = true",
      perPage: limit,
      sort: "order",
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.INTEGRATIONS, "featured-integrations"],
    },
  );

  return response.items;
}

// ============================================================
// LEADERSHIP API
// ============================================================

export async function getLeadershipTeam(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<LeadershipResponse>> {
  return fetchCollection<LeadershipResponse>(
    "leadership",
    {
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.STATIC,
      tags: [CACHE_TAGS.LEADERSHIP],
    },
  );
}

export async function getFeaturedLeadership(): Promise<LeadershipResponse[]> {
  const response = await fetchCollection<LeadershipResponse>(
    "leadership",
    {
      filter: "featured = true",
      sort: "order",
    },
    {
      revalidate: CACHE_DURATION.STATIC,
      tags: [CACHE_TAGS.LEADERSHIP, "featured-leadership"],
    },
  );

  return response.items;
}

// ============================================================
// COMPANY VALUES API
// ============================================================

export async function getCompanyValues(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<ValuesResponse>> {
  return fetchCollection<ValuesResponse>(
    "values",
    {
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.STATIC,
      tags: [CACHE_TAGS.VALUES],
    },
  );
}

export async function getFeaturedValues(): Promise<ValuesResponse[]> {
  const response = await fetchCollection<ValuesResponse>(
    "values",
    {
      filter: "featured = true",
      sort: "order",
    },
    {
      revalidate: CACHE_DURATION.STATIC,
      tags: [CACHE_TAGS.VALUES, "featured-values"],
    },
  );

  return response.items;
}

// ============================================================
// MILESTONES API
// ============================================================

export async function getMilestones(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<CompanyMilestonesResponse>> {
  return fetchCollection<CompanyMilestonesResponse>(
    "company_milestones",
    {
      sort: options.sort || "-year",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.STATIC,
      tags: [CACHE_TAGS.MILESTONES],
    },
  );
}

export async function getFeaturedMilestones(): Promise<
  CompanyMilestonesResponse[]
> {
  const response = await fetchCollection<CompanyMilestonesResponse>(
    "company_milestones",
    {
      filter: "featured = true",
      sort: "-year",
    },
    {
      revalidate: CACHE_DURATION.STATIC,
      tags: [CACHE_TAGS.MILESTONES, "featured-milestones"],
    },
  );

  return response.items;
}

// ============================================================
// JOB POSITIONS API
// ============================================================

export async function getJobPositions(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<JobsResponse>> {
  return fetchCollection<JobsResponse>(
    "jobs",
    {
      filter: options.filter || 'status = "open"',
      sort: options.sort || "-created",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.SHORT,
      tags: [CACHE_TAGS.JOBS],
    },
  );
}

export async function getFeaturedJobs(
  limit: number = 5,
): Promise<JobsResponse[]> {
  const response = await fetchCollection<JobsResponse>(
    "jobs",
    {
      filter: 'featured = true && status = "open"',
      perPage: limit,
      sort: "-created",
    },
    {
      revalidate: CACHE_DURATION.SHORT,
      tags: [CACHE_TAGS.JOBS, "featured-jobs"],
    },
  );

  return response.items;
}

export async function getJobsByDepartment(
  department: string,
): Promise<JobsResponse[]> {
  const response = await fetchCollection<JobsResponse>(
    "jobs",
    {
      filter: `department = "${department}" && status = "open"`,
      sort: "-created",
    },
    {
      revalidate: CACHE_DURATION.SHORT,
      tags: [CACHE_TAGS.JOBS, `jobs-${department}`],
    },
  );

  return response.items;
}

export async function getJobById(jobId: string): Promise<JobsResponse> {
  return fetchRecord<JobsResponse>(
    "jobs",
    jobId,
    {},
    {
      revalidate: CACHE_DURATION.SHORT,
      tags: [CACHE_TAGS.JOBS, `job-${jobId}`],
    },
  );
}

// ============================================================
// BENEFITS API
// ============================================================

export async function getBenefits(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<EmployeeBenefitsResponse>> {
  return fetchCollection<EmployeeBenefitsResponse>(
    "employee_benefits",
    {
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.BENEFITS],
    },
  );
}

export async function getBenefitsByCategory(
  category: string,
): Promise<EmployeeBenefitsResponse[]> {
  const response = await fetchCollection<EmployeeBenefitsResponse>(
    "employee_benefits",
    {
      filter: `category = "${category}"`,
      sort: "order",
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.BENEFITS, `benefits-${category}`],
    },
  );

  return response.items;
}

// ============================================================
// COMPANY STATS API
// ============================================================

export async function getCompanyStats(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<StatusResponse>> {
  return fetchCollection<StatusResponse>(
    "status",
    {
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.MEDIUM,
      tags: [CACHE_TAGS.STATS],
    },
  );
}

// ============================================================
// CONTACT OPTIONS API
// ============================================================

export async function getContactOptions(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<ContactOptionsResponse>> {
  return fetchCollection<ContactOptionsResponse>(
    "contact_options",
    {
      sort: options.sort || "-is_featured",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.CONTACTS],
    },
  );
}

export async function getFeaturedContactOptions(): Promise<
  ContactOptionsResponse[]
> {
  const response = await fetchCollection<ContactOptionsResponse>(
    "contact_options",
    {
      filter: "is_featured = true",
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.CONTACTS, "featured-contacts"],
    },
  );

  return response.items;
}

// ============================================================
// SUPPORT RESOURCES API
// ============================================================

export async function getSupportResources(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<SupportResponse>> {
  return fetchCollection<SupportResponse>(
    "support",
    {
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.SUPPORT],
    },
  );
}

export async function getSupportResourcesByCategory(
  category: string,
): Promise<SupportResponse[]> {
  const response = await fetchCollection<SupportResponse>(
    "support",
    {
      filter: `category = "${category}"`,
      sort: "order",
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.SUPPORT, `support-${category}`],
    },
  );

  return response.items;
}

// ============================================================
// OFFICE LOCATIONS API
// ============================================================

export async function getOfficeLocations(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<LocationsResponse>> {
  return fetchCollection<LocationsResponse>("locations", options, {
    revalidate: CACHE_DURATION.STATIC,
    tags: [CACHE_TAGS.LOCATIONS],
  });
}

export async function getOfficeLocationsByCity(
  city: string,
): Promise<LocationsResponse[]> {
  const response = await fetchCollection<LocationsResponse>(
    "locations",
    {
      filter: `city = "${city}"`,
    },
    {
      revalidate: CACHE_DURATION.STATIC,
      tags: [CACHE_TAGS.LOCATIONS, `locations-${city}`],
    },
  );

  return response.items;
}

// ============================================================
// FAQ API
// ============================================================

export async function getFaqTopics(
  options: ListOptions & { category?: string } = {},
): Promise<PocketBaseListResponse<FaqTopicsResponse>> {
  const filter = options.category
    ? `name = "${options.category}"`
    : options.filter;

  return fetchCollection<FaqTopicsResponse>(
    "faq_topics",
    {
      sort: options.sort || "order",
      filter,
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.FAQ],
    },
  );
}

export async function getFaqItems(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<FaqsResponse>> {
  return fetchCollection<FaqsResponse>(
    "faqs",
    {
      sort: options.sort || "order",
      expand: "category",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.FAQ],
    },
  );
}

export async function getFeaturedFaqItems(
  limit: number = 6,
): Promise<FaqsResponse[]> {
  const response = await fetchCollection<FaqsResponse>(
    "faqs",
    {
      filter: "featured = true",
      perPage: limit,
      sort: "order",
      expand: "category",
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.FAQ, "featured-faqs"],
    },
  );

  return response.items;
}

export async function getFaqItemsByCategory(
  categoryId: string,
): Promise<FaqsResponse[]> {
  const response = await fetchCollection<FaqsResponse>(
    "faqs",
    {
      filter: `category = "${categoryId}"`,
      sort: "order",
      expand: "category",
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.FAQ, `faqs-${categoryId}`],
    },
  );

  return response.items;
}

// ============================================================
// CATEGORIES API
// ============================================================

export async function getCategories(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<CategoryResponse>> {
  return fetchCollection<CategoryResponse>("category", options, {
    revalidate: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.CATEGORIES],
  });
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CategoryResponse> {
  const response = await fetchCollection<CategoryResponse>(
    "category",
    {
      filter: `slug = "${slug}"`,
      perPage: 1,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.CATEGORIES, `category-${slug}`],
    },
  );

  if (!response.items.length) {
    throw new Error(`Category not found: ${slug}`);
  }

  return response.items[0];
}

// ============================================================
// PRESS RELEASES API
// ============================================================

export async function getPressReleases(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<PressResponse>> {
  return fetchCollection<PressResponse>(
    "press",
    {
      filter: options.filter || "published = true",
      sort: options.sort || "-published_date",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.SHORT,
      tags: [CACHE_TAGS.PRESS],
    },
  );
}

export async function getFeaturedPressReleases(
  limit: number = 5,
): Promise<PressResponse[]> {
  const response = await fetchCollection<PressResponse>(
    "press",
    {
      filter: "featured = true && published = true",
      perPage: limit,
      sort: "-published_date",
    },
    {
      revalidate: CACHE_DURATION.SHORT,
      tags: [CACHE_TAGS.PRESS, "featured-press"],
    },
  );

  return response.items;
}

// ============================================================
// ENQUIRIES API
// ============================================================

export async function getEnquiries(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<EnquiriesResponse>> {
  return fetchCollection<EnquiriesResponse>(
    "enquiries",
    {
      sort: options.sort || "-created",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.SHORT,
      tags: [CACHE_TAGS.ENQUIRIES],
    },
  );
}

export async function createEnquiry(
  data: Partial<EnquiriesResponse>,
): Promise<EnquiriesResponse> {
  const url = `${POCKETBASE_URL}/api/collections/enquiries/records`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new PocketBaseError(
      `Failed to create enquiry: ${response.statusText}`,
      response.status,
      "enquiries",
    );
  }

  return response.json();
}

// ============================================================
// COMPLIANCE ITEMS API
// ============================================================

export async function getComplianceItems(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<ComplianceItemsResponse>> {
  return fetchCollection<ComplianceItemsResponse>(
    "compliance_items",
    {
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.COMPLIANCE],
    },
  );
}

// ============================================================
// SECURITY FEATURES API
// ============================================================

export async function getSecurityFeatures(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<SecurityFeaturesResponse>> {
  return fetchCollection<SecurityFeaturesResponse>(
    "security_features",
    {
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.SECURITY],
    },
  );
}

// ============================================================
// EMPLOYEE BENEFITS API (Marketing Pages)
// ============================================================

export async function getEmployeeBenefitsMarketing(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<EmployeeBenefitsResponse>> {
  return fetchCollection<EmployeeBenefitsResponse>(
    "employee_benefits",
    {
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.EMPLOYEE_BENEFITS],
    },
  );
}

// ============================================================
// FAQS API (Marketing Pages with Category Filtering)
// ============================================================

export async function getFAQsMarketing(
  options: ListOptions & { category?: string } = {},
): Promise<PocketBaseListResponse<FaqsResponse>> {
  const filter = options.category
    ? `category.name = "${options.category}"`
    : options.filter;

  return fetchCollection<FaqsResponse>(
    "faqs",
    {
      sort: options.sort || "order",
      filter,
      perPage: options.perPage || 50,
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [
        CACHE_TAGS.FAQ,
        options.category ? `faq-${options.category}` : undefined,
      ].filter(Boolean) as string[],
    },
  );
}

// ============================================================
// PROCESS STEPS API
// ============================================================

export async function getProcessSteps(
  options: ListOptions & { category?: string } = {},
): Promise<PocketBaseListResponse<ProcessStepsResponse>> {
  const filter = options.category
    ? `category.name = "${options.category}"`
    : options.filter;

  return fetchCollection<ProcessStepsResponse>(
    "process_steps",
    {
      sort: options.sort || "order",
      filter,
      perPage: options.perPage || 10,
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [
        CACHE_TAGS.PROCESS_STEPS,
        options.category ? `process-${options.category}` : undefined,
      ].filter(Boolean) as string[],
    },
  );
}

// ============================================================
// EMPLOYER STATS API
// ============================================================

export async function getEmployerStats(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<EmployerStatsResponse>> {
  return fetchCollection<EmployerStatsResponse>(
    "employer_stats",
    {
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.MEDIUM,
      tags: [CACHE_TAGS.EMPLOYER_STATS],
    },
  );
}

// ============================================================
// CTA CARDS API
// ============================================================

export async function getCTACards(
  options: ListOptions = {},
): Promise<PocketBaseListResponse<CtaCardsResponse>> {
  return fetchCollection<CtaCardsResponse>(
    "cta_cards",
    {
      sort: options.sort || "order",
      ...options,
    },
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.CTA_CARDS],
    },
  );
}

// ============================================================
// CACHE REVALIDATION HELPERS
// ============================================================

/**
 * Revalidate specific cache tags
 * Use this in Server Actions or API routes for on-demand revalidation
 */
export async function revalidateCache(tags: string[]) {
  const { revalidateTag } = await import("next/cache");
  tags.forEach((tag) => revalidateTag(tag, "default"));
}

/**
 * Revalidate all blog-related caches
 */
export async function revalidateBlogs() {
  await revalidateCache([CACHE_TAGS.BLOGS]);
}

/**
 * Revalidate specific blog by slug
 */
export async function revalidateBlogBySlug(slug: string) {
  await revalidateCache([CACHE_TAGS.BLOGS, `blog-${slug}`]);
}

// ============================================================
// ERROR HANDLING
// ============================================================

export class PocketBaseError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public collection?: string,
  ) {
    super(message);
    this.name = "PocketBaseError";
  }
}

export function handleApiError(error: unknown): PocketBaseError {
  if (error instanceof PocketBaseError) {
    return error;
  }

  if (error instanceof Error) {
    return new PocketBaseError(error.message);
  }

  return new PocketBaseError("An unknown error occurred");
}
