/**
 * Benefits Service Layer
 * 
 * Provides data fetching functions for employee and employer benefits content.
 * Implements clean separation between data fetching and UI logic.
 */

import type {
  EmployeeBenefitsResponse,
} from '@/types/pocketbase';
import {
  getEmployeeBenefitsMarketing as apiFetchEmployeeBenefits,
} from '@/lib/api';

// ============================================================
// TYPES
// ============================================================

export interface BenefitsListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all employee benefits with pagination support
 * 
 * @param options - Pagination and sorting options
 * @returns Array of employee benefits
 * 
 * @example
 * ```ts
 * // Get all employee benefits
 * const benefits = await getEmployeeBenefits();
 * 
 * // Get with custom page size
 * const benefits = await getEmployeeBenefits({ perPage: 20 });
 * ```
 */
export async function getEmployeeBenefits(
  options: BenefitsListOptions = {}
): Promise<EmployeeBenefitsResponse[]> {
  try {
    const {
      page = 1,
      perPage = 20,
      sort = 'order',
    } = options;

    const response = await apiFetchEmployeeBenefits({
      page,
      perPage,
      sort,
    });

    return response.items;
  } catch (error) {
    console.error('Failed to fetch employee benefits:', error);
    // Return empty array on error to allow graceful degradation
    return [];
  }
}

/**
 * Fetch employee benefits grouped by category
 * 
 * @returns Object with categories as keys and arrays of benefits as values
 * 
 * @example
 * ```ts
 * const grouped = await getBenefitsGroupedByCategory();
 * // { 'Health & Wellness': [...], 'Financial': [...] }
 * ```
 */
export async function getBenefitsGroupedByCategory(): Promise<Record<string, EmployeeBenefitsResponse[]>> {
  try {
    const benefits = await getEmployeeBenefits({ perPage: 100 });
    
    const grouped: Record<string, EmployeeBenefitsResponse[]> = {};
    
    for (const benefit of benefits) {
      const category = benefit.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(benefit);
    }
    
    return grouped;
  } catch (error) {
    console.error('Failed to fetch benefits grouped by category:', error);
    return {};
  }
}
