/**
 * CTA Service Layer
 *
 * Provides data fetching functions for call-to-action cards content.
 * Implements clean separation between data fetching and UI logic.
 */

import { getCTACards as apiFetchCTACards } from "@/lib/api";
import type { CtaCardsResponse } from "@/types/pocketbase";

// ============================================================
// TYPES
// ============================================================

export interface CTAListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all CTA cards with pagination support
 *
 * @param options - Pagination and sorting options
 * @returns Array of CTA cards
 *
 * @example
 * ```ts
 * // Get all CTA cards
 * const cards = await getCTACards();
 *
 * // Get with custom page size
 * const cards = await getCTACards({ perPage: 10 });
 * ```
 */
export async function getCTACards(
  options: CTAListOptions = {},
): Promise<CtaCardsResponse[]> {
  try {
    const { page = 1, perPage = 10, sort = "order" } = options;

    const response = await apiFetchCTACards({
      page,
      perPage,
      sort,
    });

    return response.items;
  } catch (error) {
    console.error("Failed to fetch CTA cards:", error);
    // Return empty array on error to allow graceful degradation
    return [];
  }
}
