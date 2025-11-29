/**
 * PocketBase Configuration and Utilities
 *
 * This module provides utilities for interacting with PocketBase API.
 * Install pocketbase-js SDK: npm install pocketbase
 */

import PocketBase from "pocketbase";

// PocketBase URL - adjust based on your environment
export const POCKETBASE_URL =
  process.env.POCKETBASE_URL ||
  process.env.POCKETBASE_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_POCKETBASE_URL ||
  "http://localhost:8090";

// PocketBase SDK instance
let pbInstance: PocketBase | null = null;

/**
 * Get PocketBase SDK instance (singleton)
 */
export function getPocketBase(): PocketBase {
  if (!pbInstance) {
    pbInstance = new PocketBase(POCKETBASE_URL);
    // Disable auto-cancellation for server-side usage
    pbInstance.autoCancellation(false);
  }
  return pbInstance;
}

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
