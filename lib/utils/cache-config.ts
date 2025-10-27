/**
 * Cache Configuration Utilities
 *
 * Centralized cache configuration for PocketBase data fetching.
 * This module provides cache duration constants and helper functions
 * for consistent caching across the application.
 */

// ============================================================
// CACHE DURATIONS (in seconds)
// ============================================================

/**
 * Cache duration constants based on content update frequency
 *
 * - STATIC: 1 week (604800s) - Rarely changing content (company info, values, leadership)
 * - LONG: 1 day (86400s) - Stable content (features, integrations, partners, testimonials)
 * - MEDIUM: 1 hour (3600s) - Moderately dynamic content (blogs, pricing, FAQs)
 * - SHORT: 5 minutes (300s) - Frequently updated content (jobs, press releases, stats)
 * - DYNAMIC: 0s - Real-time data (form submissions, user-specific data)
 */
export const CACHE_DURATION = {
  STATIC: 3600 * 24 * 7, // 1 week
  LONG: 3600 * 24, // 1 day
  MEDIUM: 3600, // 1 hour
  SHORT: 300, // 5 minutes
  DYNAMIC: 0, // No cache
} as const;

// ============================================================
// CACHE TAGS
// ============================================================

/**
 * Cache tags for granular cache invalidation
 *
 * Use these tags to revalidate specific content types without
 * invalidating the entire cache.
 *
 * @example
 * ```ts
 * import { revalidateTag } from 'next/cache';
 * import { CACHE_TAGS } from '@/lib/utils/cache-config';
 *
 * // Revalidate all blog-related caches
 * revalidateTag(CACHE_TAGS.BLOGS);
 *
 * // Revalidate specific blog
 * revalidateTag(`blog-${slug}`);
 * ```
 */
export const CACHE_TAGS = {
  // Content
  BLOGS: "blogs",
  AUTHORS: "authors",
  CATEGORIES: "categories",

  // Marketing
  TESTIMONIALS: "testimonials",
  PARTNERS: "partners",
  PRESS: "press",

  // Product
  FEATURES: "features",
  INTEGRATIONS: "integrations",
  PRICING: "pricing",

  // Company
  LEADERSHIP: "leadership",
  VALUES: "values",
  MILESTONES: "milestones",
  STATS: "stats",

  // Careers
  JOBS: "jobs",
  BENEFITS: "benefits",
  LOCATIONS: "locations",

  // Support
  SUPPORT: "support",
  FAQ: "faq",
  CONTACTS: "contacts",

  // User Data
  ENQUIRIES: "enquiries",

  // Marketing Pages Content
  COMPLIANCE: "compliance",
  SECURITY: "security",
  EMPLOYEE_BENEFITS: "employee-benefits",
  EMPLOYER_BENEFITS: "employer-benefits",
  PROCESS_STEPS: "process-steps",
  EMPLOYER_STATS: "employer-stats",
  CTA_CARDS: "cta-cards",
} as const;

// ============================================================
// CACHE CONFIGURATION BY COLLECTION
// ============================================================

/**
 * Recommended cache configuration for each PocketBase collection
 *
 * Maps collection names to their recommended cache duration and tags.
 * Use this to ensure consistent caching across the application.
 */
export const COLLECTION_CACHE_CONFIG = {
  // Content Collections
  Blogs: {
    duration: CACHE_DURATION.MEDIUM,
    tags: [CACHE_TAGS.BLOGS],
    description: "Blog posts - revalidate hourly for fresh content",
  },
  Authors: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.AUTHORS],
    description: "Author profiles - stable content",
  },
  Category: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.CATEGORIES],
    description: "Blog categories - rarely changes",
  },

  // Marketing Collections
  Testimonials: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.TESTIMONIALS],
    description: "Customer testimonials - stable content",
  },
  Partners: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.PARTNERS],
    description: "Partner logos and info - stable content",
  },
  Press: {
    duration: CACHE_DURATION.SHORT,
    tags: [CACHE_TAGS.PRESS],
    description: "Press releases - frequently updated",
  },

  // Product Collections
  Features: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.FEATURES],
    description: "Product features - stable content",
  },
  Integrations: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.INTEGRATIONS],
    description: "Platform integrations - stable content",
  },
  Pricing_Plans: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.PRICING],
    description: "Pricing plans - changes infrequently",
  },

  // Company Collections
  Leadership: {
    duration: CACHE_DURATION.STATIC,
    tags: [CACHE_TAGS.LEADERSHIP],
    description: "Leadership team - rarely changes",
  },
  Values: {
    duration: CACHE_DURATION.STATIC,
    tags: [CACHE_TAGS.VALUES],
    description: "Company values - rarely changes",
  },
  Company_Milestones: {
    duration: CACHE_DURATION.STATIC,
    tags: [CACHE_TAGS.MILESTONES],
    description: "Company milestones - rarely changes",
  },
  Stats: {
    duration: CACHE_DURATION.MEDIUM,
    tags: [CACHE_TAGS.STATS],
    description: "Company statistics - updated periodically",
  },

  // Careers Collections
  Jobs: {
    duration: CACHE_DURATION.SHORT,
    tags: [CACHE_TAGS.JOBS],
    description: "Job positions - frequently updated",
  },
  Employee_Benefits: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.BENEFITS],
    description: "Employee benefits - stable content",
  },
  Locations: {
    duration: CACHE_DURATION.STATIC,
    tags: [CACHE_TAGS.LOCATIONS],
    description: "Office locations - rarely changes",
  },

  // Support Collections
  Support: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.SUPPORT],
    description: "Support resources - stable content",
  },
  Faqs: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.FAQ],
    description: "FAQ items - stable content",
  },
  Faq_Topics: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.FAQ],
    description: "FAQ topics - stable content",
  },
  Contacts: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.CONTACTS],
    description: "Contact options - stable content",
  },

  // User Data Collections
  Enquiries: {
    duration: CACHE_DURATION.DYNAMIC,
    tags: [CACHE_TAGS.ENQUIRIES],
    description: "User enquiries - no caching for mutations",
  },

  // Marketing Pages Collections
  Compliance_Items: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.COMPLIANCE],
    description: "Compliance items - stable content",
  },
  Security_Features: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.SECURITY],
    description: "Security features - stable content",
  },
  Employer_Benefits: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.EMPLOYER_BENEFITS],
    description: "Employer benefits - stable content",
  },
  Employer_Stats: {
    duration: CACHE_DURATION.MEDIUM,
    tags: [CACHE_TAGS.EMPLOYER_STATS],
    description: "Employer statistics - updated periodically",
  },
  Process_Steps: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.PROCESS_STEPS],
    description: "Process steps - stable content",
  },
  CTA_Cards: {
    duration: CACHE_DURATION.LONG,
    tags: [CACHE_TAGS.CTA_CARDS],
    description: "CTA cards - stable content",
  },
} as const;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get cache configuration for a specific collection
 *
 * @param collectionName - Name of the PocketBase collection
 * @returns Cache configuration object with duration and tags
 *
 * @example
 * ```ts
 * const config = getCacheConfig('Blogs');
 * console.log(config.duration); // 3600
 * console.log(config.tags); // ['blogs']
 * ```
 */
export function getCacheConfig(
  collectionName: keyof typeof COLLECTION_CACHE_CONFIG,
) {
  return (
    COLLECTION_CACHE_CONFIG[collectionName] || {
      duration: CACHE_DURATION.MEDIUM,
      tags: [],
      description: "Default cache configuration",
    }
  );
}

/**
 * Create a cache tag for a specific record
 *
 * @param collectionTag - Base collection tag
 * @param identifier - Record identifier (slug, id, etc.)
 * @returns Formatted cache tag
 *
 * @example
 * ```ts
 * const tag = createRecordTag(CACHE_TAGS.BLOGS, 'my-blog-post');
 * // Returns: 'blog-my-blog-post'
 * ```
 */
export function createRecordTag(
  collectionTag: string,
  identifier: string,
): string {
  return `${collectionTag.slice(0, -1)}-${identifier}`;
}

/**
 * Get recommended revalidation period based on content type
 *
 * @param contentType - Type of content
 * @returns Revalidation period in seconds
 *
 * @example
 * ```ts
 * const revalidate = getRevalidationPeriod('blog');
 * // Returns: 3600 (1 hour)
 * ```
 */
export function getRevalidationPeriod(
  contentType: "static" | "stable" | "dynamic" | "realtime",
): number {
  switch (contentType) {
    case "static":
      return CACHE_DURATION.STATIC;
    case "stable":
      return CACHE_DURATION.LONG;
    case "dynamic":
      return CACHE_DURATION.MEDIUM;
    case "realtime":
      return CACHE_DURATION.SHORT;
    default:
      return CACHE_DURATION.MEDIUM;
  }
}

// ============================================================
// CACHE STRATEGY DOCUMENTATION
// ============================================================

/**
 * Cache Strategy Guidelines
 *
 * 1. STATIC (1 week):
 *    - Company information (leadership, values, milestones)
 *    - Office locations
 *    - Content that changes less than once per month
 *
 * 2. LONG (1 day):
 *    - Product features and integrations
 *    - Partners and testimonials
 *    - Employee benefits
 *    - FAQ content
 *    - Content that changes weekly or monthly
 *
 * 3. MEDIUM (1 hour):
 *    - Blog posts
 *    - Pricing plans
 *    - Company statistics
 *    - Content that changes daily
 *
 * 4. SHORT (5 minutes):
 *    - Job positions
 *    - Press releases
 *    - Content that changes multiple times per day
 *
 * 5. DYNAMIC (no cache):
 *    - Form submissions
 *    - User-specific data
 *    - Real-time data
 *
 * Use on-demand revalidation (revalidateTag, revalidatePath) for
 * immediate updates when content changes in PocketBase.
 */
