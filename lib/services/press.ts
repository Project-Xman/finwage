/**
 * Press Service Layer
 *
 * Provides data fetching functions for press releases and media content.
 * Implements clean separation between data fetching and UI logic.
 */

import {
  getFeaturedPressReleases as apiFetchFeaturedPressReleases,
  getPressReleases as apiFetchPressReleases,
} from "@/lib/api";
import type { PressResponse } from "@/types/pocketbase";

// ============================================================
// TYPES
// ============================================================

export interface PressListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
}

export interface PressListResult {
  items: PressResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all published press releases with pagination support
 *
 * @param options - Pagination and sorting options
 * @returns Paginated list of press releases with metadata
 *
 * @example
 * ```ts
 * // Get first page with default pagination
 * const pressReleases = await getPressReleases();
 *
 * // Get specific page with custom page size
 * const pressReleases = await getPressReleases({ page: 2, perPage: 10 });
 *
 * // Custom sorting
 * const pressReleases = await getPressReleases({ sort: '-published_date' });
 * ```
 */
export async function getPressReleases(
  options: PressListOptions = {},
): Promise<PressListResult> {
  try {
    const { page = 1, perPage = 20, sort = "-published_date" } = options;

    const response = await apiFetchPressReleases({
      page,
      perPage,
      sort,
      filter: "published = true",
    });

    return {
      items: response.items,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
      page: response.page,
      perPage: response.perPage,
    };
  } catch (error) {
    console.error("Failed to fetch press releases:", error);
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
 * Fetch featured press releases for homepage or prominent display
 *
 * @param limit - Maximum number of featured press releases to return (default: 5)
 * @returns Array of featured press releases
 *
 * @example
 * ```ts
 * // Get 5 featured press releases for homepage
 * const featuredPress = await getFeaturedPressReleases();
 *
 * // Get more featured press releases
 * const featuredPress = await getFeaturedPressReleases(10);
 * ```
 */
export async function getFeaturedPressReleases(
  limit: number = 5,
): Promise<PressResponse[]> {
  try {
    const pressReleases = await apiFetchFeaturedPressReleases(limit);
    return pressReleases;
  } catch (error) {
    console.error("Failed to fetch featured press releases:", error);
    return [];
  }
}
