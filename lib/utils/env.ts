/**
 * Environment Variable Validation
 * 
 * This module provides utilities for validating and accessing
 * environment variables required for PocketBase integration.
 */

/**
 * Environment variable configuration
 */
interface EnvConfig {
  NEXT_PUBLIC_POCKETBASE_URL: string;
}

/**
 * Validate URL format
 * 
 * @param url - The URL to validate
 * @returns true if valid, false otherwise
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validate that required environment variables are set
 * 
 * @throws Error if required environment variables are missing or invalid
 */
export function validateEnv(): void {
  const required: (keyof EnvConfig)[] = [
    'NEXT_PUBLIC_POCKETBASE_URL',
  ];

  const missing: string[] = [];
  const invalid: string[] = [];

  for (const key of required) {
    const value = process.env[key];
    
    if (!value) {
      missing.push(key);
    } else if (key === 'NEXT_PUBLIC_POCKETBASE_URL') {
      // Validate PocketBase URL format
      if (!isValidUrl(value)) {
        invalid.push(`${key} (invalid URL format: ${value})`);
      } else if (value.endsWith('/')) {
        invalid.push(`${key} (should not end with a trailing slash)`);
      }
    }
  }

  const errors: string[] = [];

  if (missing.length > 0) {
    errors.push(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (invalid.length > 0) {
    errors.push(`Invalid environment variables: ${invalid.join(', ')}`);
  }

  if (errors.length > 0) {
    throw new Error(
      errors.join('\n') + '\n\n' +
      'Please check your .env.local file and ensure all required variables are set correctly.\n' +
      'See docs/ENVIRONMENT.md for more information.'
    );
  }
}

/**
 * Get environment variable with validation
 * 
 * @param key - The environment variable key
 * @param defaultValue - Optional default value if not set
 * @returns The environment variable value
 * @throws Error if the variable is not set and no default is provided
 */
export function getEnv(key: keyof EnvConfig, defaultValue?: string): string {
  const value = process.env[key];

  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
}

/**
 * Get PocketBase URL with validation
 * 
 * @returns The PocketBase URL
 */
export function getPocketBaseUrl(): string {
  return getEnv('NEXT_PUBLIC_POCKETBASE_URL', 'http://127.0.0.1:8090');
}

/**
 * Check if running in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if running in production mode
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Check if running in test mode
 */
export function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}

/**
 * Get environment name
 */
export function getEnvironment(): 'development' | 'production' | 'test' {
  return (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development';
}

/**
 * Validate environment on module load (only in production)
 * This ensures that the application won't start if required variables are missing
 */
if (isProduction() && typeof window === 'undefined') {
  try {
    validateEnv();
  } catch (error) {
    console.error('Environment validation failed:', error);
    // In production, we want to fail fast if environment is not properly configured
    throw error;
  }
}
