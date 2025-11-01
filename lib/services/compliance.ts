/**
 * Compliance Service Layer
 *
 * Provides data fetching functions for compliance and security-related content.
 * Implements clean separation between data fetching and UI logic.
 */

import {
  getComplianceItems as apiFetchComplianceItems,
  getSecurityFeatures as apiFetchSecurityFeatures,
} from "@/lib/api";
import type {
  ComplianceItemsResponse,
  SecurityFeaturesResponse,
} from "@/types/pocketbase";

// ============================================================
// TYPES
// ============================================================

export interface ComplianceListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
}

export interface ComplianceListResult {
  items: ComplianceItemsResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all compliance items with pagination support
 *
 * @param options - Pagination and sorting options
 * @returns Paginated list of compliance items with metadata
 *
 * @example
 * ```ts
 * // Get all compliance items with default pagination
 * const result = await getComplianceItems();
 *
 * // Get specific page with custom page size
 * const result = await getComplianceItems({ page: 1, perPage: 20 });
 * ```
 */
export async function getComplianceItems(
  options: ComplianceListOptions = {},
): Promise<ComplianceListResult> {
  try {
    const { page = 1, perPage = 20, sort = "order" } = options;

    const response = await apiFetchComplianceItems({
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
    console.error("Failed to fetch compliance items:", error);
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
 * Fetch all security features with pagination support
 *
 * @param options - Pagination and sorting options
 * @returns Array of security features
 *
 * @example
 * ```ts
 * // Get all security features
 * const features = await getSecurityFeatures();
 *
 * // Get with custom page size
 * const features = await getSecurityFeatures({ perPage: 50 });
 * ```
 */
export async function getSecurityFeatures(
  options: ComplianceListOptions = {},
): Promise<SecurityFeaturesResponse[]> {
  try {
    const { page = 1, perPage = 50, sort = "order" } = options;

    const response = await apiFetchSecurityFeatures({
      page,
      perPage,
      sort,
    });

    return response.items;
  } catch (error) {
    console.error("Failed to fetch security features:", error);
    // Return empty array on error to allow graceful degradation
    return [];
  }
}
