/**
 * Features Service Layer
 *
 * Provides data fetching functions for product features.
 * Implements clean separation between data fetching and UI logic.
 */

import {
  getFeaturedFeatures as apiFetchFeaturedFeatures,
  getFeatures as apiFetchFeatures,
  getFeaturesByCategory as apiFetchFeaturesByCategory,
} from "@/lib/api";
import type { FeaturesResponse } from "@/types/pocketbase";

// ============================================================
// TYPES
// ============================================================

export interface FeatureListOptions {
  page?: number;
  perPage?: number;
  category?: string;
  sort?: string;
}

export interface FeatureListResult {
  items: FeaturesResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all active features with pagination support
 *
 * @param options - Pagination and filtering options
 * @returns Paginated list of features with metadata
 *
 * @example
 * ```ts
 * // Get all features with default pagination
 * const features = await getFeatures();
 *
 * // Get specific page with custom page size
 * const features = await getFeatures({ page: 2, perPage: 10 });
 *
 * // Filter by category
 * const features = await getFeatures({ category: 'analytics' });
 * ```
 */
export async function getFeatures(
  options: FeatureListOptions = {},
): Promise<FeatureListResult> {
  try {
    const { page = 1, perPage = 20, category, sort = "order" } = options;

    // Build filter for active features
    let filter = "active = true";
    if (category) {
      filter += ` && category = "${category}"`;
    }

    const response = await apiFetchFeatures({
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
    console.error("Failed to fetch features:", error);
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
 * Fetch featured features for homepage or prominent display
 *
 * @param limit - Maximum number of featured features to return (default: 6)
 * @returns Array of featured features
 *
 * @example
 * ```ts
 * // Get 6 featured features for homepage
 * const featuredFeatures = await getFeaturedFeatures();
 *
 * // Get more featured features
 * const featuredFeatures = await getFeaturedFeatures(12);
 * ```
 */
export async function getFeaturedFeatures(
  limit: number = 6,
): Promise<FeaturesResponse[]> {
  try {
    const features = await apiFetchFeaturedFeatures(limit);
    return features;
  } catch (error) {
    console.error("Failed to fetch featured features:", error);
    return [];
  }
}

/**
 * Fetch features filtered by category
 *
 * @param category - The category to filter by
 * @returns Array of features in the specified category
 *
 * @example
 * ```ts
 * // Get features in a specific category
 * const analyticsFeatures = await getFeaturesByCategory('analytics');
 *
 * // Get security features
 * const securityFeatures = await getFeaturesByCategory('security');
 * ```
 */
export async function getFeaturesByCategory(
  category: string,
): Promise<FeaturesResponse[]> {
  try {
    const features = await apiFetchFeaturesByCategory(category);
    return features;
  } catch (error) {
    console.error(`Failed to fetch features by category: ${category}`, error);
    return [];
  }
}
