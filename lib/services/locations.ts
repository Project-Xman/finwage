/**
 * Office Locations Service Layer
 * 
 * Provides data fetching functions for office location information.
 * Implements clean separation between data fetching and UI logic.
 */

import type { LocationsResponse } from '@/types/pocketbase';
import {
  getOfficeLocations as apiFetchOfficeLocations,
  getOfficeLocationsByCity as apiFetchOfficeLocationsByCity,
} from '@/lib/api';

// ============================================================
// TYPES
// ============================================================

export interface LocationListOptions {
  page?: number;
  perPage?: number;
  city?: string;
  country?: string;
  state?: string;
  sort?: string;
}

export interface LocationListResult {
  items: LocationsResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all office locations
 * 
 * @param options - Filtering and pagination options
 * @returns Paginated list of office locations
 * 
 * @example
 * ```ts
 * // Get all office locations
 * const locations = await getOfficeLocations();
 * 
 * // Get locations with pagination
 * const locations = await getOfficeLocations({ page: 1, perPage: 10 });
 * 
 * // Filter by country
 * const usLocations = await getOfficeLocations({ country: 'United States' });
 * ```
 */
export async function getOfficeLocations(
  options: LocationListOptions = {}
): Promise<LocationListResult> {
  try {
    const {
      page = 1,
      perPage = 50,
      city,
      country,
      state,
      sort = 'name',
    } = options;

    // Build filter based on provided options
    let filter: string | undefined;
    const filters: string[] = [];
    
    if (city) {
      filters.push(`city = "${city}"`);
    }
    
    if (country) {
      filters.push(`country = "${country}"`);
    }
    
    if (state) {
      filters.push(`state = "${state}"`);
    }
    
    if (filters.length > 0) {
      filter = filters.join(' && ');
    }

    const response = await apiFetchOfficeLocations({
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
    console.error('Failed to fetch office locations:', error);
    // Return empty result on error to allow graceful degradation
    return {
      items: [],
      totalPages: 0,
      totalItems: 0,
      page: options.page || 1,
      perPage: options.perPage || 50,
    };
  }
}

/**
 * Fetch office locations filtered by city
 * 
 * @param city - The city name to filter by
 * @returns Array of office locations in the specified city
 * 
 * @example
 * ```ts
 * // Get all offices in New York
 * const nyOffices = await getOfficeLocationsByCity('New York');
 * 
 * // Get all offices in San Francisco
 * const sfOffices = await getOfficeLocationsByCity('San Francisco');
 * ```
 */
export async function getOfficeLocationsByCity(
  city: string
): Promise<LocationsResponse[]> {
  try {
    const locations = await apiFetchOfficeLocationsByCity(city);
    return locations;
  } catch (error) {
    console.error(`Failed to fetch office locations by city: ${city}`, error);
    return [];
  }
}

/**
 * Fetch office locations filtered by country
 * 
 * @param country - The country name to filter by
 * @returns Array of office locations in the specified country
 * 
 * @example
 * ```ts
 * // Get all offices in the United States
 * const usOffices = await getOfficeLocationsByCountry('United States');
 * 
 * // Get all offices in the United Kingdom
 * const ukOffices = await getOfficeLocationsByCountry('United Kingdom');
 * ```
 */
export async function getOfficeLocationsByCountry(
  country: string
): Promise<LocationsResponse[]> {
  try {
    const response = await getOfficeLocations({ country, perPage: 100 });
    return response.items;
  } catch (error) {
    console.error(`Failed to fetch office locations by country: ${country}`, error);
    return [];
  }
}

/**
 * Get unique list of cities with offices
 * Useful for building location filter UI
 * 
 * @returns Array of unique city names
 * 
 * @example
 * ```ts
 * const cities = await getOfficeCities();
 * // ['New York', 'San Francisco', 'London', 'Tokyo']
 * ```
 */
export async function getOfficeCities(): Promise<string[]> {
  try {
    const response = await getOfficeLocations({ perPage: 100 });
    const cities = new Set<string>();
    
    response.items.forEach(location => {
      if (location.city) {
        cities.add(location.city);
      }
    });
    
    return Array.from(cities).sort();
  } catch (error) {
    console.error('Failed to fetch office cities:', error);
    return [];
  }
}

/**
 * Get unique list of countries with offices
 * Useful for building location filter UI
 * 
 * @returns Array of unique country names
 * 
 * @example
 * ```ts
 * const countries = await getOfficeCountries();
 * // ['United States', 'United Kingdom', 'Japan', 'Germany']
 * ```
 */
export async function getOfficeCountries(): Promise<string[]> {
  try {
    const response = await getOfficeLocations({ perPage: 100 });
    const countries = new Set<string>();
    
    response.items.forEach(location => {
      if (location.country) {
        countries.add(location.country);
      }
    });
    
    return Array.from(countries).sort();
  } catch (error) {
    console.error('Failed to fetch office countries:', error);
    return [];
  }
}

/**
 * Group office locations by country for organized display
 * 
 * @returns Object with countries as keys and arrays of locations as values
 * 
 * @example
 * ```ts
 * const groupedLocations = await getLocationsGroupedByCountry();
 * // {
 * //   'United States': [location1, location2],
 * //   'United Kingdom': [location3],
 * //   'Japan': [location4, location5]
 * // }
 * ```
 */
export async function getLocationsGroupedByCountry(): Promise<Record<string, LocationsResponse[]>> {
  try {
    const response = await getOfficeLocations({ perPage: 100 });
    const grouped: Record<string, LocationsResponse[]> = {};
    
    response.items.forEach(location => {
      const country = location.country || 'Other';
      if (!grouped[country]) {
        grouped[country] = [];
      }
      grouped[country].push(location);
    });
    
    return grouped;
  } catch (error) {
    console.error('Failed to group locations by country:', error);
    return {};
  }
}

/**
 * Get a single office location by ID
 * 
 * @param locationId - The location ID
 * @returns Office location details, or null if not found
 * 
 * @example
 * ```ts
 * const location = await getOfficeLocationById('location-id-123');
 * if (location) {
 *   console.log(location.name);
 *   console.log(location.address);
 *   console.log(location.city);
 * }
 * ```
 */
export async function getOfficeLocationById(
  locationId: string
): Promise<LocationsResponse | null> {
  try {
    const response = await getOfficeLocations({ perPage: 100 });
    const location = response.items.find(loc => loc.id === locationId);
    return location || null;
  } catch (error) {
    console.error(`Failed to fetch office location by ID: ${locationId}`, error);
    return null;
  }
}
