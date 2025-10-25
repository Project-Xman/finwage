/**
 * Authors Service Layer
 * 
 * Provides data fetching functions for author-related content.
 * Implements clean separation between data fetching and UI logic.
 */

import type { AuthorsResponse } from '@/types/pocketbase';
import {
  getAuthors as apiFetchAuthors,
  getAuthorBySlug as apiFetchAuthorBySlug,
} from '@/lib/api';

// ============================================================
// TYPES
// ============================================================

export interface AuthorListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
}

export interface AuthorListResult {
  items: AuthorsResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all active authors
 * 
 * @param options - Pagination and sorting options
 * @returns Paginated list of authors
 * 
 * @example
 * ```ts
 * // Get all authors with default pagination
 * const authors = await getAuthors();
 * 
 * // Get specific page
 * const authors = await getAuthors({ page: 2, perPage: 10 });
 * 
 * // Sort by name
 * const authors = await getAuthors({ sort: 'name' });
 * ```
 */
export async function getAuthors(
  options: AuthorListOptions = {}
): Promise<AuthorListResult> {
  try {
    const {
      page = 1,
      perPage = 20,
      sort = 'name',
    } = options;

    const response = await apiFetchAuthors({
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
    console.error('Failed to fetch authors:', error);
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
 * Fetch a single author by slug
 * 
 * @param slug - The author slug
 * @returns Author data, or null if not found
 * 
 * @example
 * ```ts
 * const author = await getAuthorBySlug('john-doe');
 * if (author) {
 *   console.log(author.name);
 *   console.log(author.bio);
 *   console.log(author.social_links);
 * }
 * ```
 */
export async function getAuthorBySlug(
  slug: string
): Promise<AuthorsResponse | null> {
  try {
    const author = await apiFetchAuthorBySlug(slug);
    return author;
  } catch (error) {
    console.error(`Failed to fetch author by slug: ${slug}`, error);
    return null;
  }
}
