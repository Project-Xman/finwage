/**
 * Resources Service Layer
 *
 * Provides data fetching functions for resource articles, categories, and downloads.
 * Handles resources content including guides, case studies, webinars, and downloadable materials.
 */

import {
  getFeaturedResourceArticles as apiFetchFeaturedResourceArticles,
  getFeaturedResourceDownloads as apiFetchFeaturedResourceDownloads,
  getResourceArticleBySlug as apiFetchResourceArticleBySlug,
  getResourceArticles as apiFetchResourceArticles,
  getResourceArticlesByCategory as apiFetchResourceArticlesByCategory,
  getResourceCategories as apiFetchResourceCategories,
  getResourceCategoryBySlug as apiFetchResourceCategoryBySlug,
  getResourceDownloads as apiFetchResourceDownloads,
} from "@/lib/api";
import type {
  ResourceArticlesResponse,
  ResourceCategoriesResponse,
  ResourceDownloadsResponse,
} from "@/types/pocketbase";

// ============================================================
// TYPES
// ============================================================

export interface ResourceArticlesOptions {
  category?: string;
  featured?: boolean;
  limit?: number;
}

export interface ResourceCategoriesOptions {
  active?: boolean;
  limit?: number;
}

export interface ResourceDownloadsOptions {
  featured?: boolean;
  type?: string;
  limit?: number;
}

// ============================================================
// RESOURCE ARTICLES FUNCTIONS
// ============================================================

/**
 * Fetch all resource articles
 *
 * Returns resource articles (guides, case studies, webinars, etc.)
 * with optional filtering by category and featured status.
 *
 * @param options - Optional filtering and pagination options
 * @returns Array of resource articles
 *
 * @example
 * ```ts
 * // Get all resource articles
 * const articles = await getResourceArticles();
 *
 * // Get featured articles only
 * const featured = await getResourceArticles({ featured: true, limit: 3 });
 * ```
 */
export async function getResourceArticles(
  options: ResourceArticlesOptions = {},
): Promise<ResourceArticlesResponse[]> {
  try {
    const { category, featured, limit } = options;

    if (category) {
      // Fetch articles by category
      const articles = await apiFetchResourceArticlesByCategory(category);
      return limit ? articles.slice(0, limit) : articles;
    }

    if (featured) {
      // Fetch featured articles
      return apiFetchFeaturedResourceArticles(limit || 3);
    }

    // Fetch all articles
    const response = await apiFetchResourceArticles({
      perPage: limit || 50,
      sort: "-published_date",
    });

    return response.items;
  } catch (error) {
    console.error("Failed to fetch resource articles:", error);
    return [];
  }
}

/**
 * Fetch featured resource articles for homepage or resources page
 *
 * Returns the most important articles marked as featured.
 *
 * @param limit - Maximum number of featured articles to return (default: 3)
 * @returns Array of featured resource articles
 *
 * @example
 * ```ts
 * // Get 3 featured articles for homepage
 * const featuredArticles = await getFeaturedResourceArticles();
 *
 * // Get more featured articles
 * const featuredArticles = await getFeaturedResourceArticles(6);
 * ```
 */
export async function getFeaturedResourceArticles(
  limit: number = 3,
): Promise<ResourceArticlesResponse[]> {
  try {
    return await apiFetchFeaturedResourceArticles(limit);
  } catch (error) {
    console.error("Failed to fetch featured resource articles:", error);
    return [];
  }
}

/**
 * Fetch a single resource article by slug
 *
 * @param slug - The article slug
 * @returns Resource article or null if not found
 *
 * @example
 * ```ts
 * const article = await getResourceArticleBySlug('guide-to-wage-access');
 * ```
 */
export async function getResourceArticleBySlug(
  slug: string,
): Promise<ResourceArticlesResponse | null> {
  try {
    return await apiFetchResourceArticleBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch resource article by slug:", error);
    return null;
  }
}

// ============================================================
// RESOURCE CATEGORIES FUNCTIONS
// ============================================================

/**
 * Fetch all resource categories
 *
 * Returns categories for organizing and filtering resource articles.
 *
 * @param options - Optional filtering options
 * @returns Array of resource categories
 *
 * @example
 * ```ts
 * // Get all active categories
 * const categories = await getResourceCategories();
 *
 * // Get limited number of categories
 * const categories = await getResourceCategories({ limit: 5 });
 * ```
 */
export async function getResourceCategories(
  options: ResourceCategoriesOptions = {},
): Promise<ResourceCategoriesResponse[]> {
  try {
    const { limit } = options;

    const response = await apiFetchResourceCategories({
      perPage: limit || 50,
      sort: "order",
    });

    return response.items;
  } catch (error) {
    console.error("Failed to fetch resource categories:", error);
    return [];
  }
}

/**
 * Fetch a single resource category by slug
 *
 * @param slug - The category slug
 * @returns Resource category or null if not found
 *
 * @example
 * ```ts
 * const category = await getResourceCategoryBySlug('financial-wellness');
 * ```
 */
export async function getResourceCategoryBySlug(
  slug: string,
): Promise<ResourceCategoriesResponse | null> {
  try {
    return await apiFetchResourceCategoryBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch resource category by slug:", error);
    return null;
  }
}

// ============================================================
// RESOURCE DOWNLOADS FUNCTIONS
// ============================================================

/**
 * Fetch all resource downloads
 *
 * Returns downloadable resources like guides, whitepapers, ebooks, etc.
 *
 * @param options - Optional filtering options
 * @returns Array of resource downloads
 *
 * @example
 * ```ts
 * // Get all downloads
 * const downloads = await getResourceDownloads();
 *
 * // Get featured downloads only
 * const featured = await getResourceDownloads({ featured: true });
 * ```
 */
export async function getResourceDownloads(
  options: ResourceDownloadsOptions = {},
): Promise<ResourceDownloadsResponse[]> {
  try {
    const { featured, type, limit } = options;

    if (featured) {
      return await apiFetchFeaturedResourceDownloads(limit || 1);
    }

    let filter = "active = true";
    if (type) {
      filter += ` && type = "${type}"`;
    }

    const response = await apiFetchResourceDownloads({
      filter,
      perPage: limit || 50,
      sort: "order",
    });

    return response.items;
  } catch (error) {
    console.error("Failed to fetch resource downloads:", error);
    return [];
  }
}

/**
 * Fetch featured resource downloads
 *
 * Returns the most important downloadable resources marked as featured.
 *
 * @param limit - Maximum number of featured downloads to return (default: 1)
 * @returns Array of featured resource downloads
 *
 * @example
 * ```ts
 * // Get featured download for resources page sidebar
 * const featuredDownload = await getFeaturedResourceDownloads();
 * ```
 */
export async function getFeaturedResourceDownloads(
  limit: number = 1,
): Promise<ResourceDownloadsResponse[]> {
  try {
    return await apiFetchFeaturedResourceDownloads(limit);
  } catch (error) {
    console.error("Failed to fetch featured resource downloads:", error);
    return [];
  }
}
