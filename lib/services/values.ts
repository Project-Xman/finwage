/**
 * Values Service Layer
 * 
 * Provides data fetching functions for company values content.
 * Implements clean separation between data fetching and UI logic.
 */

import type { ValuesResponse } from '@/types/pocketbase';
import {
  getCompanyValues as apiFetchCompanyValues,
  getFeaturedValues as apiFetchFeaturedValues,
} from '@/lib/api';

// ============================================================
// TYPES
// ============================================================

export interface ValuesListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all company values with pagination support
 * 
 * @param options - Pagination and sorting options
 * @returns Array of company values
 * 
 * @example
 * ```ts
 * // Get all values
 * const values = await getCompanyValues();
 * 
 * // Get with custom page size
 * const values = await getCompanyValues({ perPage: 10 });
 * ```
 */
export async function getCompanyValues(
  options: ValuesListOptions = {}
): Promise<ValuesResponse[]> {
  try {
    const {
      page = 1,
      perPage = 20,
      sort = 'order',
    } = options;

    const response = await apiFetchCompanyValues({
      page,
      perPage,
      sort,
    });

    return response.items;
  } catch (error) {
    console.error('Failed to fetch company values:', error);
    // Return empty array on error to allow graceful degradation
    return [];
  }
}

/**
 * Fetch featured company values for prominent display
 * 
 * @returns Array of featured company values
 * 
 * @example
 * ```ts
 * // Get featured values for careers page
 * const featuredValues = await getFeaturedValues();
 * ```
 */
export async function getFeaturedValues(): Promise<ValuesResponse[]> {
  try {
    const values = await apiFetchFeaturedValues();
    return values;
  } catch (error) {
    console.error('Failed to fetch featured values:', error);
    return [];
  }
}
