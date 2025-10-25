/**
 * Cache Revalidation Utilities
 * 
 * Helper functions for on-demand cache revalidation in Next.js 15.
 * Use these functions in Server Actions or API routes to invalidate
 * cached data when content changes in PocketBase.
 */

'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import { CACHE_TAGS } from '@/lib/utils/cache-config';

// ============================================================
// TAG-BASED REVALIDATION
// ============================================================

/**
 * Revalidate specific cache tags
 * 
 * @param tags - Array of cache tags to revalidate
 * 
 * @example
 * ```ts
 * await revalidateTags([CACHE_TAGS.BLOGS, CACHE_TAGS.AUTHORS]);
 * ```
 */
export async function revalidateTags(tags: string[]): Promise<void> {
  for (const tag of tags) {
    revalidateTag(tag, 'page');
  }
}

/**
 * Revalidate a single cache tag
 * 
 * @param tag - Cache tag to revalidate
 * 
 * @example
 * ```ts
 * await revalidateSingleTag(CACHE_TAGS.BLOGS);
 * ```
 */
export async function revalidateSingleTag(tag: string): Promise<void> {
  revalidateTag(tag, 'page');
}

// ============================================================
// PATH-BASED REVALIDATION
// ============================================================

/**
 * Revalidate specific paths
 * 
 * @param paths - Array of paths to revalidate
 * @param type - Revalidation type ('page' or 'layout')
 * 
 * @example
 * ```ts
 * await revalidatePaths(['/blog', '/blog/my-post']);
 * ```
 */
export async function revalidatePaths(
  paths: string[],
  type: 'page' | 'layout' = 'page'
): Promise<void> {
  for (const path of paths) {
    revalidatePath(path, type);
  }
}

/**
 * Revalidate a single path
 * 
 * @param path - Path to revalidate
 * @param type - Revalidation type ('page' or 'layout')
 * 
 * @example
 * ```ts
 * await revalidateSinglePath('/blog/my-post');
 * ```
 */
export async function revalidateSinglePath(
  path: string,
  type: 'page' | 'layout' = 'page'
): Promise<void> {
  revalidatePath(path, type);
}

// ============================================================
// COLLECTION-SPECIFIC REVALIDATION
// ============================================================

/**
 * Revalidate all blog-related caches
 * 
 * Invalidates:
 * - Blog list pages
 * - Blog detail pages
 * - Featured blogs
 * - Category pages
 * 
 * @example
 * ```ts
 * await revalidateBlogs();
 * ```
 */
export async function revalidateBlogs(): Promise<void> {
  await revalidateTags([CACHE_TAGS.BLOGS, CACHE_TAGS.AUTHORS, CACHE_TAGS.CATEGORIES]);
  await revalidatePaths(['/blog']);
}

/**
 * Revalidate a specific blog post by slug
 * 
 * @param slug - Blog post slug
 * 
 * @example
 * ```ts
 * await revalidateBlogBySlug('my-blog-post');
 * ```
 */
export async function revalidateBlogBySlug(slug: string): Promise<void> {
  await revalidateTags([CACHE_TAGS.BLOGS, `blog-${slug}`]);
  await revalidatePaths(['/blog', `/blog/${slug}`]);
}

/**
 * Revalidate all pricing-related caches
 * 
 * @example
 * ```ts
 * await revalidatePricing();
 * ```
 */
export async function revalidatePricing(): Promise<void> {
  await revalidateTags([CACHE_TAGS.PRICING]);
  await revalidatePaths(['/pricing', '/']);
}

/**
 * Revalidate all testimonial-related caches
 * 
 * @example
 * ```ts
 * await revalidateTestimonials();
 * ```
 */
export async function revalidateTestimonials(): Promise<void> {
  await revalidateTags([CACHE_TAGS.TESTIMONIALS]);
  await revalidatePaths(['/']);
}

/**
 * Revalidate all feature-related caches
 * 
 * @example
 * ```ts
 * await revalidateFeatures();
 * ```
 */
export async function revalidateFeatures(): Promise<void> {
  await revalidateTags([CACHE_TAGS.FEATURES]);
  await revalidatePaths(['/']);
}

/**
 * Revalidate all integration-related caches
 * 
 * @example
 * ```ts
 * await revalidateIntegrations();
 * ```
 */
export async function revalidateIntegrations(): Promise<void> {
  await revalidateTags([CACHE_TAGS.INTEGRATIONS]);
  await revalidatePaths(['/']);
}

/**
 * Revalidate all partner-related caches
 * 
 * @example
 * ```ts
 * await revalidatePartners();
 * ```
 */
export async function revalidatePartners(): Promise<void> {
  await revalidateTags([CACHE_TAGS.PARTNERS]);
  await revalidatePaths(['/']);
}

/**
 * Revalidate all job-related caches
 * 
 * @example
 * ```ts
 * await revalidateJobs();
 * ```
 */
export async function revalidateJobs(): Promise<void> {
  await revalidateTags([CACHE_TAGS.JOBS, CACHE_TAGS.BENEFITS, CACHE_TAGS.LOCATIONS]);
  await revalidatePaths(['/careers']);
}

/**
 * Revalidate all company information caches
 * 
 * @example
 * ```ts
 * await revalidateCompanyInfo();
 * ```
 */
export async function revalidateCompanyInfo(): Promise<void> {
  await revalidateTags([
    CACHE_TAGS.LEADERSHIP,
    CACHE_TAGS.VALUES,
    CACHE_TAGS.MILESTONES,
    CACHE_TAGS.STATS,
  ]);
  await revalidatePaths(['/about', '/']);
}

/**
 * Revalidate all support-related caches
 * 
 * @example
 * ```ts
 * await revalidateSupport();
 * ```
 */
export async function revalidateSupport(): Promise<void> {
  await revalidateTags([CACHE_TAGS.SUPPORT, CACHE_TAGS.FAQ, CACHE_TAGS.CONTACTS]);
  await revalidatePaths(['/contact', '/resources']);
}

/**
 * Revalidate all press release caches
 * 
 * @example
 * ```ts
 * await revalidatePress();
 * ```
 */
export async function revalidatePress(): Promise<void> {
  await revalidateTags([CACHE_TAGS.PRESS]);
  await revalidatePaths(['/resources']);
}

// ============================================================
// BULK REVALIDATION
// ============================================================

/**
 * Revalidate all content caches
 * 
 * Use this when you want to refresh all cached content across the site.
 * This is a heavy operation and should be used sparingly.
 * 
 * @example
 * ```ts
 * await revalidateAllContent();
 * ```
 */
export async function revalidateAllContent(): Promise<void> {
  const allTags = Object.values(CACHE_TAGS);
  await revalidateTags(allTags);
  
  const allPaths = [
    '/',
    '/blog',
    '/pricing',
    '/careers',
    '/contact',
    '/about',
    '/resources',
    '/for-employees',
    '/for-employers',
    '/how-it-works',
    '/compliance',
  ];
  await revalidatePaths(allPaths);
}

/**
 * Revalidate homepage content
 * 
 * Invalidates all caches that affect the homepage
 * 
 * @example
 * ```ts
 * await revalidateHomepage();
 * ```
 */
export async function revalidateHomepage(): Promise<void> {
  await revalidateTags([
    CACHE_TAGS.BLOGS,
    CACHE_TAGS.TESTIMONIALS,
    CACHE_TAGS.FEATURES,
    CACHE_TAGS.INTEGRATIONS,
    CACHE_TAGS.PARTNERS,
    CACHE_TAGS.PRICING,
    CACHE_TAGS.STATS,
  ]);
  await revalidatePaths(['/']);
}

// ============================================================
// SCHEDULED REVALIDATION
// ============================================================

/**
 * Revalidate content based on update frequency
 * 
 * Call this from a cron job or scheduled task to keep content fresh
 * 
 * @param frequency - Update frequency ('hourly', 'daily', 'weekly')
 * 
 * @example
 * ```ts
 * // In a cron job
 * await revalidateByFrequency('hourly');
 * ```
 */
export async function revalidateByFrequency(
  frequency: 'hourly' | 'daily' | 'weekly'
): Promise<void> {
  switch (frequency) {
    case 'hourly':
      // Revalidate frequently updated content
      await revalidateTags([
        CACHE_TAGS.BLOGS,
        CACHE_TAGS.JOBS,
        CACHE_TAGS.PRESS,
        CACHE_TAGS.STATS,
      ]);
      break;
      
    case 'daily':
      // Revalidate moderately updated content
      await revalidateTags([
        CACHE_TAGS.PRICING,
        CACHE_TAGS.TESTIMONIALS,
        CACHE_TAGS.FEATURES,
        CACHE_TAGS.INTEGRATIONS,
      ]);
      break;
      
    case 'weekly':
      // Revalidate rarely updated content
      await revalidateTags([
        CACHE_TAGS.LEADERSHIP,
        CACHE_TAGS.VALUES,
        CACHE_TAGS.MILESTONES,
        CACHE_TAGS.PARTNERS,
        CACHE_TAGS.LOCATIONS,
      ]);
      break;
  }
}

// ============================================================
// WEBHOOK HANDLERS
// ============================================================

/**
 * Handle PocketBase webhook for content updates
 * 
 * Call this from an API route that receives PocketBase webhooks
 * 
 * @param collection - PocketBase collection name
 * 
 * @example
 * ```ts
 * // In app/api/webhooks/pocketbase/route.ts
 * export async function POST(request: Request) {
 *   const { collection } = await request.json();
 *   await handlePocketBaseWebhook(collection);
 *   return Response.json({ success: true });
 * }
 * ```
 */
export async function handlePocketBaseWebhook(
  collection: string
): Promise<void> {
  const collectionMap: Record<string, () => Promise<void>> = {
    Blogs: revalidateBlogs,
    Authors: revalidateBlogs,
    Category: revalidateBlogs,
    Testimonials: revalidateTestimonials,
    Pricing_Plans: revalidatePricing,
    Features: revalidateFeatures,
    Integrations: revalidateIntegrations,
    Partners: revalidatePartners,
    Jobs: revalidateJobs,
    Employee_Benefits: revalidateJobs,
    Locations: revalidateJobs,
    Leadership: revalidateCompanyInfo,
    Values: revalidateCompanyInfo,
    Company_Milestones: revalidateCompanyInfo,
    Stats: revalidateCompanyInfo,
    Support: revalidateSupport,
    Faqs: revalidateSupport,
    Faq_Topics: revalidateSupport,
    Contacts: revalidateSupport,
    Press: revalidatePress,
  };

  const revalidateFn = collectionMap[collection];
  if (revalidateFn) {
    await revalidateFn();
  }
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Create a revalidation function for a specific collection
 * 
 * @param tags - Cache tags to revalidate
 * @param paths - Paths to revalidate
 * @returns Revalidation function
 * 
 * Note: These utility functions have been removed to avoid conflicts with Server Actions.
 * Use the specific revalidation functions above instead.
 */

// ============================================================
// REVALIDATION PATTERNS
// ============================================================

/**
 * Revalidation Best Practices
 * 
 * 1. GRANULAR REVALIDATION:
 *    Revalidate only what changed, not everything
 *    ```ts
 *    // ❌ Bad
 *    await revalidateAllContent();
 *    
 *    // ✅ Good
 *    await revalidateBlogBySlug(slug);
 *    ```
 * 
 * 2. COMBINE TAG AND PATH:
 *    Revalidate both cache tags and paths for complete invalidation
 *    ```ts
 *    await revalidateTags([CACHE_TAGS.BLOGS]);
 *    await revalidatePaths(['/blog', `/blog/${slug}`]);
 *    ```
 * 
 * 3. USE IN SERVER ACTIONS:
 *    Call revalidation functions after mutations
 *    ```ts
 *    'use server';
 *    export async function updateBlog(slug: string, data: BlogData) {
 *      await updateBlogInDB(slug, data);
 *      await revalidateBlogBySlug(slug);
 *    }
 *    ```
 * 
 * 4. WEBHOOK INTEGRATION:
 *    Set up webhooks in PocketBase to trigger revalidation
 *    ```ts
 *    // app/api/webhooks/pocketbase/route.ts
 *    export async function POST(request: Request) {
 *      const { collection, record } = await request.json();
 *      await handlePocketBaseWebhook(collection, record.id);
 *      return Response.json({ success: true });
 *    }
 *    ```
 * 
 * 5. SCHEDULED REVALIDATION:
 *    Use cron jobs for periodic cache refresh
 *    ```ts
 *    // Run hourly
 *    await revalidateByFrequency('hourly');
 *    ```
 */
