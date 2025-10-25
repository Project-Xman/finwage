/**
 * Integrations Service Layer
 * 
 * Provides data fetching functions for platform integrations.
 * Implements clean separation between data fetching and UI logic.
 */

import type { IntegrationsResponse } from '@/types/pocketbase';
import {
  getIntegrations as apiFetchIntegrations,
  getFeaturedIntegrations as apiFetchFeaturedIntegrations,
  getIntegrationsByCategory as apiFetchIntegrationsByCategory,
} from '@/lib/api';

// ============================================================
// TYPES
// ============================================================

export interface IntegrationListOptions {
  page?: number;
  perPage?: number;
  category?: string;
  sort?: string;
}

export interface IntegrationListResult {
  items: IntegrationsResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all active integrations with pagination support
 * 
 * @param options - Pagination and filtering options
 * @returns Paginated list of integrations with metadata
 * 
 * @example
 * ```ts
 * // Get all integrations with default pagination
 * const integrations = await getIntegrations();
 * 
 * // Get specific page with custom page size
 * const integrations = await getIntegrations({ page: 2, perPage: 10 });
 * 
 * // Filter by category
 * const integrations = await getIntegrations({ category: 'payroll' });
 * ```
 */
export async function getIntegrations(
  options: IntegrationListOptions = {}
): Promise<IntegrationListResult> {
  try {
    const {
      page = 1,
      perPage = 20,
      category,
      sort = 'order',
    } = options;

    // Build filter for active integrations
    let filter = 'active = true';
    if (category) {
      filter += ` && category = "${category}"`;
    }

    const response = await apiFetchIntegrations({
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
    console.error('Failed to fetch integrations:', error);
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
 * Fetch featured integrations for homepage or prominent display
 * 
 * @param limit - Maximum number of featured integrations to return (default: 8)
 * @returns Array of featured integrations
 * 
 * @example
 * ```ts
 * // Get 8 featured integrations for homepage
 * const featuredIntegrations = await getFeaturedIntegrations();
 * 
 * // Get more featured integrations
 * const featuredIntegrations = await getFeaturedIntegrations(12);
 * ```
 */
export async function getFeaturedIntegrations(
  limit: number = 8
): Promise<IntegrationsResponse[]> {
  try {
    const integrations = await apiFetchFeaturedIntegrations(limit);
    return integrations;
  } catch (error) {
    console.error('Failed to fetch featured integrations:', error);
    return [];
  }
}

/**
 * Fetch integrations filtered by category
 * 
 * @param category - The category to filter by
 * @returns Array of integrations in the specified category
 * 
 * @example
 * ```ts
 * // Get integrations in a specific category
 * const payrollIntegrations = await getIntegrationsByCategory('payroll');
 * 
 * // Get HR integrations
 * const hrIntegrations = await getIntegrationsByCategory('hr');
 * ```
 */
export async function getIntegrationsByCategory(
  category: string
): Promise<IntegrationsResponse[]> {
  try {
    const integrations = await apiFetchIntegrationsByCategory(category);
    return integrations;
  } catch (error) {
    console.error(`Failed to fetch integrations by category: ${category}`, error);
    return [];
  }
}
