/**
 * Company Service Layer
 * 
 * Provides data fetching functions for company-related content including
 * leadership team, company values, milestones, and statistics.
 */

import type {
  LeadershipResponse,
  ValuesResponse,
  CompanyMilestonesResponse,
  StatsResponse,
} from '@/types/pocketbase';
import {
  getLeadershipTeam as apiFetchLeadershipTeam,
  getFeaturedLeadership as apiFetchFeaturedLeadership,
  getCompanyValues as apiFetchCompanyValues,
  getFeaturedValues as apiFetchFeaturedValues,
  getMilestones as apiFetchMilestones,
  getFeaturedMilestones as apiFetchFeaturedMilestones,
  getCompanyStats as apiFetchCompanyStats,
} from '@/lib/api';

// ============================================================
// TYPES
// ============================================================

export interface CompanyListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
}

export interface LeadershipListResult {
  items: LeadershipResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

export interface ValuesListResult {
  items: ValuesResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

export interface MilestonesListResult {
  items: CompanyMilestonesResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

export interface StatsListResult {
  items: StatsResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

// ============================================================
// LEADERSHIP TEAM FUNCTIONS
// ============================================================

/**
 * Fetch leadership team members
 * 
 * @param options - Pagination and sorting options
 * @returns Paginated list of leadership team members
 * 
 * @example
 * ```ts
 * // Get all leadership team members
 * const leadership = await getLeadershipTeam();
 * 
 * // Get with custom sorting
 * const leadership = await getLeadershipTeam({ sort: 'name' });
 * ```
 */
export async function getLeadershipTeam(
  options: CompanyListOptions = {}
): Promise<LeadershipListResult> {
  try {
    const {
      page = 1,
      perPage = 20,
      sort = 'order',
    } = options;

    const response = await apiFetchLeadershipTeam({
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
    console.error('Failed to fetch leadership team:', error);
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
 * Fetch featured leadership team members
 * 
 * @returns Array of featured leadership team members
 * 
 * @example
 * ```ts
 * // Get featured leadership for about page
 * const featuredLeadership = await getFeaturedLeadership();
 * ```
 */
export async function getFeaturedLeadership(): Promise<LeadershipResponse[]> {
  try {
    const leadership = await apiFetchFeaturedLeadership();
    return leadership;
  } catch (error) {
    console.error('Failed to fetch featured leadership:', error);
    return [];
  }
}

// ============================================================
// COMPANY VALUES FUNCTIONS
// ============================================================

/**
 * Fetch company values
 * 
 * @param options - Pagination and sorting options
 * @returns Paginated list of company values
 * 
 * @example
 * ```ts
 * // Get all company values
 * const values = await getCompanyValues();
 * 
 * // Get with custom pagination
 * const values = await getCompanyValues({ perPage: 10 });
 * ```
 */
export async function getCompanyValues(
  options: CompanyListOptions = {}
): Promise<ValuesListResult> {
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

    return {
      items: response.items,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
      page: response.page,
      perPage: response.perPage,
    };
  } catch (error) {
    console.error('Failed to fetch company values:', error);
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
 * Fetch featured company values
 * 
 * @returns Array of featured company values
 * 
 * @example
 * ```ts
 * // Get featured values for homepage
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

// ============================================================
// COMPANY MILESTONES FUNCTIONS
// ============================================================

/**
 * Fetch company milestones
 * 
 * @param options - Pagination and sorting options
 * @returns Paginated list of company milestones sorted by year (descending by default)
 * 
 * @example
 * ```ts
 * // Get all milestones (newest first)
 * const milestones = await getMilestones();
 * 
 * // Get milestones in ascending order
 * const milestones = await getMilestones({ sort: 'year' });
 * ```
 */
export async function getMilestones(
  options: CompanyListOptions = {}
): Promise<MilestonesListResult> {
  try {
    const {
      page = 1,
      perPage = 20,
      sort = '-year',
    } = options;

    const response = await apiFetchMilestones({
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
    console.error('Failed to fetch company milestones:', error);
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
 * Fetch featured company milestones
 * 
 * @returns Array of featured company milestones
 * 
 * @example
 * ```ts
 * // Get featured milestones for about page
 * const featuredMilestones = await getFeaturedMilestones();
 * ```
 */
export async function getFeaturedMilestones(): Promise<CompanyMilestonesResponse[]> {
  try {
    const milestones = await apiFetchFeaturedMilestones();
    return milestones;
  } catch (error) {
    console.error('Failed to fetch featured milestones:', error);
    return [];
  }
}

// ============================================================
// COMPANY STATISTICS FUNCTIONS
// ============================================================

/**
 * Fetch company statistics
 * 
 * @param options - Pagination and sorting options
 * @returns Paginated list of company statistics
 * 
 * @example
 * ```ts
 * // Get all company stats
 * const stats = await getCompanyStats();
 * 
 * // Get stats with custom sorting
 * const stats = await getCompanyStats({ sort: 'label' });
 * ```
 */
export async function getCompanyStats(
  options: CompanyListOptions = {}
): Promise<StatsListResult> {
  try {
    const {
      page = 1,
      perPage = 20,
      sort = 'order',
    } = options;

    const response = await apiFetchCompanyStats({
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
    console.error('Failed to fetch company stats:', error);
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
 * Fetch all company statistics (convenience function)
 * 
 * @returns Array of all company statistics
 * 
 * @example
 * ```ts
 * // Get all stats for homepage display
 * const allStats = await getAllCompanyStats();
 * ```
 */
export async function getAllCompanyStats(): Promise<StatsResponse[]> {
  try {
    const response = await apiFetchCompanyStats({
      perPage: 100, // Get all stats
      sort: 'order',
    });
    return response.items;
  } catch (error) {
    console.error('Failed to fetch all company stats:', error);
    return [];
  }
}
