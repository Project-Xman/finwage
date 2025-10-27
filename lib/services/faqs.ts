/**
 * FAQs Service Layer
 *
 * Provides data fetching functions for FAQ content with category filtering.
 * Implements clean separation between data fetching and UI logic.
 */

import { getFAQsMarketing as apiFetchFAQs } from "@/lib/api";
import type { FaqsResponse } from "@/types/pocketbase";

// ============================================================
// TYPES
// ============================================================

export interface FAQListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  category?: string;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all FAQs with optional category filtering
 *
 * @param options - Pagination, sorting, and filtering options
 * @returns Array of FAQ items
 *
 * @example
 * ```ts
 * // Get all FAQs
 * const faqs = await getFAQs();
 *
 * // Get FAQs for employee category
 * const employeeFaqs = await getFAQs({ category: 'employee' });
 *
 * // Get FAQs for employer category
 * const employerFaqs = await getFAQs({ category: 'employer' });
 *
 * // Get with custom page size
 * const faqs = await getFAQs({ perPage: 50, category: 'employee' });
 * ```
 */
export async function getFAQs(
  options: FAQListOptions = {},
): Promise<FaqsResponse[]> {
  try {
    const { page = 1, perPage = 50, sort = "order", category } = options;

    const response = await apiFetchFAQs({
      page,
      perPage,
      sort,
      category,
    });

    return response.items;
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    // Return empty array on error to allow graceful degradation
    return [];
  }
}
