/**
 * Partners Service Layer
 *
 * Provides data fetching functions for company partners.
 * Implements clean separation between data fetching and UI logic.
 */

import {
  getFeaturedPartners as apiFetchFeaturedPartners,
  getPartners as apiFetchPartners,
} from "@/lib/api";
import type { PartnersResponse } from "@/types/pocketbase";

// ============================================================
// TYPES
// ============================================================

export interface PartnerListOptions {
  page?: number;
  perPage?: number;
  category?: string;
  sort?: string;
}

export interface PartnerListResult {
  items: PartnersResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all active partners with pagination support
 *
 * @param options - Pagination and filtering options
 * @returns Paginated list of partners with metadata
 *
 * @example
 * ```ts
 * // Get all partners with default pagination
 * const partners = await getPartners();
 *
 * // Get specific page with custom page size
 * const partners = await getPartners({ page: 2, perPage: 10 });
 *
 * // Filter by category
 * const partners = await getPartners({ category: 'technology' });
 * ```
 */
export async function getPartners(
  options: PartnerListOptions = {},
): Promise<PartnerListResult> {
  try {
    const { page = 1, perPage = 20, category, sort = "order" } = options;

    // Build filter for active partners
    let filter = "active = true";
    if (category) {
      filter += ` && category = "${category}"`;
    }

    const response = await apiFetchPartners({
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
    console.error("Failed to fetch partners:", error);
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
 * Fetch featured partners for homepage or prominent display
 *
 * @param limit - Maximum number of featured partners to return (default: 8)
 * @returns Array of featured partners
 *
 * @example
 * ```ts
 * // Get 8 featured partners for homepage
 * const featuredPartners = await getFeaturedPartners();
 *
 * // Get more featured partners
 * const featuredPartners = await getFeaturedPartners(12);
 * ```
 */
export async function getFeaturedPartners(
  limit: number = 8,
): Promise<PartnersResponse[]> {
  try {
    const partners = await apiFetchFeaturedPartners(limit);
    return partners;
  } catch (error) {
    console.error("Failed to fetch featured partners:", error);
    return [];
  }
}
