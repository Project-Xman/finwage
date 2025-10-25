/**
 * Pricing Service Layer
 * 
 * Provides data fetching functions for pricing plans.
 * Implements clean separation between data fetching and UI logic.
 */

import type { PricingPlansResponse } from '@/types/pocketbase';
import {
  getPricingPlans as apiFetchPricingPlans,
  getPopularPlan as apiFetchPopularPlan,
} from '@/lib/api';

// ============================================================
// TYPES
// ============================================================

export interface PricingPlanListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  activeOnly?: boolean;
}

export interface PricingPlanListResult {
  items: PricingPlansResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all pricing plans with pagination support
 * 
 * @param options - Pagination and filtering options
 * @returns Paginated list of pricing plans with metadata
 * 
 * @example
 * ```ts
 * // Get all active pricing plans
 * const plans = await getPricingPlans();
 * 
 * // Get all plans including inactive ones
 * const plans = await getPricingPlans({ activeOnly: false });
 * 
 * // Get specific page with custom page size
 * const plans = await getPricingPlans({ page: 1, perPage: 5 });
 * ```
 */
export async function getPricingPlans(
  options: PricingPlanListOptions = {}
): Promise<PricingPlanListResult> {
  try {
    const {
      page = 1,
      perPage = 20,
      sort = 'order',
      activeOnly = true,
    } = options;

    // Build filter for active plans if specified
    const filter = activeOnly ? 'active = true' : undefined;

    const response = await apiFetchPricingPlans({
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
    console.error('Failed to fetch pricing plans:', error);
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
 * Fetch the popular pricing plan for highlighting
 * 
 * @returns The popular pricing plan, or null if none is marked as popular
 * 
 * @example
 * ```ts
 * // Get the popular plan to highlight on pricing page
 * const popularPlan = await getPopularPlan();
 * if (popularPlan) {
 *   console.log(`Popular plan: ${popularPlan.name}`);
 * }
 * ```
 */
export async function getPopularPlan(): Promise<PricingPlansResponse | null> {
  try {
    const plan = await apiFetchPopularPlan();
    return plan;
  } catch (error) {
    console.error('Failed to fetch popular plan:', error);
    return null;
  }
}
