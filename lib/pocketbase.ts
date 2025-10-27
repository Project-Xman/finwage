/**
 * PocketBase Configuration and Utilities
 *
 * This module provides utilities for interacting with PocketBase API.
 * Install pocketbase-js SDK: npm install pocketbase
 */

// PocketBase URL - adjust based on your environment
export const POCKETBASE_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://localhost:8090";

/**
 * Generic fetch wrapper for PocketBase API calls
 */
export async function pb<T>(
  endpoint: string,
  options: RequestInit & { method?: string } = {},
): Promise<T> {
  const { method = "GET", ...rest } = options;

  const response = await fetch(
    `${POCKETBASE_URL}/api/collections/${endpoint}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        ...rest.headers,
      },
      ...rest,
    },
  );

  if (!response.ok) {
    throw new Error(`PocketBase request failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Helper to build query parameters
 */
export function buildQueryParams(params: Record<string, any>): string {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        query.append(key, value.join(","));
      } else {
        query.append(key, String(value));
      }
    }
  });

  return query.toString();
}
