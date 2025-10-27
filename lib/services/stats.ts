/**
 * Stats Service Layer
 *
 * Provides data fetching functions for employer statistics content.
 * Implements clean separation between data fetching and UI logic.
 */

import { getEmployerStats as apiFetchEmployerStats } from "@/lib/api";
import type { EmployerStatsResponse } from "@/types/pocketbase";

// ============================================================
// TYPES
// ============================================================

export interface StatsListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all employer statistics with pagination support
 *
 * @param options - Pagination and sorting options
 * @returns Array of employer statistics
 *
 * @example
 * ```ts
 * // Get all employer stats
 * const stats = await getEmployerStats();
 *
 * // Get with custom page size
 * const stats = await getEmployerStats({ perPage: 10 });
 * ```
 */
export async function getEmployerStats(
  options: StatsListOptions = {},
): Promise<EmployerStatsResponse[]> {
  try {
    const { page = 1, perPage = 10, sort = "order" } = options;

    const response = await apiFetchEmployerStats({
      page,
      perPage,
      sort,
    });

    return response.items;
  } catch (error) {
    console.error("Failed to fetch employer stats:", error);
    // Return empty array on error to allow graceful degradation
    return [];
  }
}
