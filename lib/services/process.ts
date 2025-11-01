/**
 * Process Steps Service Layer
 *
 * Provides data fetching functions for process steps content with category filtering.
 * Implements clean separation between data fetching and UI logic.
 */

import { getProcessSteps as apiFetchProcessSteps } from "@/lib/api";
import type { ProcessStepsResponse } from "@/types/pocketbase";

// ============================================================
// TYPES
// ============================================================

export interface ProcessListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  category?: string;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all process steps with optional category filtering
 *
 * @param options - Pagination, sorting, and filtering options
 * @returns Array of process steps
 *
 * @example
 * ```ts
 * // Get all process steps
 * const steps = await getProcessSteps();
 *
 * // Get process steps for employee category
 * const employeeSteps = await getProcessSteps({ category: 'employee' });
 *
 * // Get process steps for employer category
 * const employerSteps = await getProcessSteps({ category: 'employer' });
 *
 * // Get with custom page size
 * const steps = await getProcessSteps({ perPage: 10, category: 'employee' });
 * ```
 */
export async function getProcessSteps(
  options: ProcessListOptions = {},
): Promise<ProcessStepsResponse[]> {
  try {
    const { page = 1, perPage = 10, sort = "order", category } = options;

    const response = await apiFetchProcessSteps({
      page,
      perPage,
      sort,
      category,
    });

    return response.items;
  } catch (error) {
    console.error("Failed to fetch process steps:", error);
    // Return empty array on error to allow graceful degradation
    return [];
  }
}
