/**
 * Careers Service Layer
 *
 * Provides data fetching functions for job positions and career-related content.
 * Implements clean separation between data fetching and UI logic.
 */

import {
  getFeaturedJobs as apiFetchFeaturedJobs,
  getJobById as apiFetchJobById,
  getJobPositions as apiFetchJobPositions,
  getJobsByDepartment as apiFetchJobsByDepartment,
} from "@/lib/api";
import type { JobsResponse } from "@/types/pocketbase";

// ============================================================
// TYPES
// ============================================================

export interface JobListOptions {
  page?: number;
  perPage?: number;
  status?: string;
  department?: string;
  location?: string;
  type?: string;
  sort?: string;
}

export interface JobListResult {
  items: JobsResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch job positions with status filtering
 *
 * @param options - Filtering and pagination options
 * @returns Paginated list of job positions
 *
 * @example
 * ```ts
 * // Get all open positions
 * const jobs = await getJobPositions();
 *
 * // Filter by department
 * const engineeringJobs = await getJobPositions({ department: 'Engineering' });
 *
 * // Filter by status
 * const closedJobs = await getJobPositions({ status: 'closed' });
 * ```
 */
export async function getJobPositions(
  options: JobListOptions = {},
): Promise<JobListResult> {
  try {
    const {
      page = 1,
      perPage = 20,
      status = "open",
      department,
      location,
      type,
      sort = "-created",
    } = options;

    // Build filter for job positions
    let filter = `status = "${status}"`;

    if (department) {
      filter += ` && department = "${department}"`;
    }

    if (location) {
      filter += ` && location = "${location}"`;
    }

    if (type) {
      filter += ` && type = "${type}"`;
    }

    const response = await apiFetchJobPositions({
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
    console.error("Failed to fetch job positions:", error);
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
 * Fetch featured jobs for prominent display
 *
 * @param limit - Maximum number of featured jobs to return (default: 5)
 * @returns Array of featured job positions
 *
 * @example
 * ```ts
 * // Get featured jobs for careers page
 * const featuredJobs = await getFeaturedJobs();
 *
 * // Get more featured jobs
 * const featuredJobs = await getFeaturedJobs(10);
 * ```
 */
export async function getFeaturedJobs(
  limit: number = 5,
): Promise<JobsResponse[]> {
  try {
    const jobs = await apiFetchFeaturedJobs(limit);
    return jobs;
  } catch (error) {
    console.error("Failed to fetch featured jobs:", error);
    return [];
  }
}

/**
 * Fetch jobs filtered by department
 *
 * @param department - The department name to filter by
 * @param options - Additional filtering options
 * @returns Array of job positions in the specified department
 *
 * @example
 * ```ts
 * // Get all engineering jobs
 * const engineeringJobs = await getJobsByDepartment('Engineering');
 *
 * // Get sales jobs with custom options
 * const salesJobs = await getJobsByDepartment('Sales', { status: 'open' });
 * ```
 */
export async function getJobsByDepartment(
  department: string,
  options: Omit<JobListOptions, "department"> = {},
): Promise<JobsResponse[]> {
  try {
    const jobs = await apiFetchJobsByDepartment(department);
    return jobs;
  } catch (error) {
    console.error(`Failed to fetch jobs by department: ${department}`, error);
    return [];
  }
}

/**
 * Fetch a single job position by ID
 *
 * @param jobId - The job position ID
 * @returns Job position details, or null if not found
 *
 * @example
 * ```ts
 * const job = await getJobById('job-id-123');
 * if (job) {
 *   console.log(job.title);
 *   console.log(job.department);
 *   console.log(job.description);
 * }
 * ```
 */
export async function getJobById(jobId: string): Promise<JobsResponse | null> {
  try {
    const job = await apiFetchJobById(jobId);
    return job;
  } catch (error) {
    console.error(`Failed to fetch job by ID: ${jobId}`, error);
    return null;
  }
}

/**
 * Get unique list of departments from open job positions
 * Useful for building department filter UI
 *
 * @returns Array of unique department names
 *
 * @example
 * ```ts
 * const departments = await getDepartments();
 * // ['Engineering', 'Sales', 'Marketing', 'Support']
 * ```
 */
export async function getDepartments(): Promise<string[]> {
  try {
    const response = await getJobPositions({ perPage: 100 });
    const departments = new Set<string>();

    response.items.forEach((job) => {
      if (job.department) {
        departments.add(job.department);
      }
    });

    return Array.from(departments).sort();
  } catch (error) {
    console.error("Failed to fetch departments:", error);
    return [];
  }
}

/**
 * Get unique list of job types from open positions
 * Useful for building job type filter UI
 *
 * @returns Array of unique job types
 *
 * @example
 * ```ts
 * const types = await getJobTypes();
 * // ['Full-time', 'Part-time', 'Contract', 'Remote']
 * ```
 */
export async function getJobTypes(): Promise<string[]> {
  try {
    const response = await getJobPositions({ perPage: 100 });
    const types = new Set<string>();

    response.items.forEach((job) => {
      if (job.type) {
        types.add(job.type);
      }
    });

    return Array.from(types).sort();
  } catch (error) {
    console.error("Failed to fetch job types:", error);
    return [];
  }
}

/**
 * Get unique list of locations from open positions
 * Useful for building location filter UI
 *
 * @returns Array of unique locations
 *
 * @example
 * ```ts
 * const locations = await getJobLocations();
 * // ['New York', 'San Francisco', 'Remote', 'London']
 * ```
 */
export async function getJobLocations(): Promise<string[]> {
  try {
    const response = await getJobPositions({ perPage: 100 });
    const locations = new Set<string>();

    response.items.forEach((job) => {
      if (job.location) {
        locations.add(job.location);
      }
    });

    return Array.from(locations).sort();
  } catch (error) {
    console.error("Failed to fetch job locations:", error);
    return [];
  }
}
