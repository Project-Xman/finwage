/**
 * Categories Service Layer
 *
 * Provides data fetching functions for blog category content.
 * Implements clean separation between data fetching and UI logic.
 */

import {
  getCategories as apiFetchCategories,
  getCategoryBySlug as apiFetchCategoryBySlug,
} from "@/lib/api";
import type { CategoryResponse } from "@/types/pocketbase";

// ============================================================
// TYPES
// ============================================================

export interface CategoryListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
}

export interface CategoryListResult {
  items: CategoryResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all blog categories
 *
 * @param options - Pagination and sorting options
 * @returns Paginated list of categories
 *
 * @example
 * ```ts
 * // Get all categories with default pagination
 * const categories = await getCategories();
 *
 * // Get specific page
 * const categories = await getCategories({ page: 1, perPage: 50 });
 *
 * // Sort by name
 * const categories = await getCategories({ sort: 'name' });
 * ```
 */
export async function getCategories(
  options: CategoryListOptions = {},
): Promise<CategoryListResult> {
  try {
    const { page = 1, perPage = 50, sort = "name" } = options;

    const response = await apiFetchCategories({
      page,
      perPage,
      sort,
    });

    return {
      items: response.items,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
      page: response.page,
      perPage: response.perPage,
    };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    // Return empty result on error to allow graceful degradation
    return {
      items: [],
      totalPages: 0,
      totalItems: 0,
      page: options.page || 1,
      perPage: options.perPage || 50,
    };
  }
}

/**
 * Fetch a single category by slug
 *
 * @param slug - The category slug
 * @returns Category data, or null if not found
 *
 * @example
 * ```ts
 * const category = await getCategoryBySlug('technology');
 * if (category) {
 *   console.log(category.name);
 *   console.log(category.description);
 *   console.log(category.count);
 * }
 * ```
 */
export async function getCategoryBySlug(
  slug: string,
): Promise<CategoryResponse | null> {
  try {
    const category = await apiFetchCategoryBySlug(slug);
    return category;
  } catch (error) {
    console.error(`Failed to fetch category by slug: ${slug}`, error);
    return null;
  }
}
