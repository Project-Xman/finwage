/**
 * Testimonials Service Layer
 * 
 * Provides data fetching functions for customer testimonials.
 * Implements clean separation between data fetching and UI logic.
 */

import type { TestimonialsResponse } from '@/types/pocketbase';
import {
  getTestimonials as apiFetchTestimonials,
  getFeaturedTestimonials as apiFetchFeaturedTestimonials,
} from '@/lib/api';

// ============================================================
// TYPES
// ============================================================

export interface TestimonialListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  verified?: boolean;
}

export interface TestimonialListResult {
  items: TestimonialsResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all testimonials with pagination support
 * 
 * @param options - Pagination and filtering options
 * @returns Paginated list of testimonials with metadata
 * 
 * @example
 * ```ts
 * // Get all testimonials with default pagination
 * const testimonials = await getTestimonials();
 * 
 * // Get specific page with custom page size
 * const testimonials = await getTestimonials({ page: 2, perPage: 10 });
 * 
 * // Filter by verified testimonials only
 * const testimonials = await getTestimonials({ verified: true });
 * ```
 */
export async function getTestimonials(
  options: TestimonialListOptions = {}
): Promise<TestimonialListResult> {
  try {
    const {
      page = 1,
      perPage = 20,
      sort = 'order',
      verified,
    } = options;

    // Build filter for verified testimonials if specified
    let filter: string | undefined;
    if (verified !== undefined) {
      filter = `verified = ${verified}`;
    }

    const response = await apiFetchTestimonials({
      page,
      perPage,
      sort,
      filter,
    });

    return {
      items: response.items,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
      page: response.page,
      perPage: response.perPage,
    };
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    // Return empty result on error to allow graceful degradation
    return {
      items: [],
      totalPages: 0,
      totalItems: 0,
      page: options.page || 1,
      perPage: options.perPage || 20,
    };
  }
}

/**
 * Fetch featured testimonials for homepage and marketing sections
 * 
 * @param limit - Maximum number of featured testimonials to return (default: 6)
 * @returns Array of featured testimonials sorted by order
 * 
 * @example
 * ```ts
 * // Get 6 featured testimonials for homepage
 * const featuredTestimonials = await getFeaturedTestimonials();
 * 
 * // Get more featured testimonials
 * const featuredTestimonials = await getFeaturedTestimonials(12);
 * ```
 */
export async function getFeaturedTestimonials(
  limit: number = 6
): Promise<TestimonialsResponse[]> {
  try {
    const testimonials = await apiFetchFeaturedTestimonials(limit);
    return testimonials;
  } catch (error) {
    console.error('Failed to fetch featured testimonials:', error);
    return [];
  }
}
