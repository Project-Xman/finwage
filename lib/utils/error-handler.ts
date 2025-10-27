/**
 * Error Handling Utilities
 *
 * This module provides custom error classes and error handling utilities
 * for PocketBase integration.
 */

/**
 * Custom error class for PocketBase-related errors
 */
export class PocketBaseError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public collection?: string,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "PocketBaseError";

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PocketBaseError);
    }
  }
}

/**
 * Error thrown when a requested resource is not found
 */
export class NotFoundError extends PocketBaseError {
  constructor(collection: string, identifier: string) {
    super(
      `Resource not found in ${collection}: ${identifier}`,
      404,
      collection,
    );
    this.name = "NotFoundError";
  }
}

/**
 * Error thrown when validation fails
 */
export class ValidationError extends PocketBaseError {
  constructor(
    message: string,
    public fields?: Record<string, string[]>,
  ) {
    super(message, 400);
    this.name = "ValidationError";
  }
}

/**
 * Error thrown when authentication fails
 */
export class AuthenticationError extends PocketBaseError {
  constructor(message: string = "Authentication failed") {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}

/**
 * Error thrown when rate limit is exceeded
 */
export class RateLimitError extends PocketBaseError {
  constructor(message: string = "Rate limit exceeded") {
    super(message, 429);
    this.name = "RateLimitError";
  }
}

/**
 * Handle and normalize errors from various sources
 *
 * @param error - The error to handle
 * @param context - Optional context information
 * @returns A normalized PocketBaseError
 */
export function handleApiError(
  error: unknown,
  context?: {
    collection?: string;
    operation?: string;
  },
): PocketBaseError {
  // Already a PocketBaseError
  if (error instanceof PocketBaseError) {
    return error;
  }

  // Handle fetch/network errors
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return new PocketBaseError(
      "Network error: Unable to connect to PocketBase",
      0,
      context?.collection,
      error,
    );
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return new PocketBaseError(
      error.message,
      undefined,
      context?.collection,
      error,
    );
  }

  // Handle unknown error types
  return new PocketBaseError(
    "An unknown error occurred",
    undefined,
    context?.collection,
    error,
  );
}

/**
 * Log error with context information
 *
 * @param error - The error to log
 * @param context - Additional context information
 */
export function logError(
  error: Error | PocketBaseError,
  context?: Record<string, unknown>,
): void {
  const errorInfo: {
    name: string;
    message: string;
    stack: string | undefined;
    timestamp: string;
    statusCode?: number;
    collection?: string;
    [key: string]: unknown;
  } = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    ...context,
  };

  // Add PocketBase-specific information if available
  if (error instanceof PocketBaseError) {
    errorInfo.statusCode = error.statusCode;
    errorInfo.collection = error.collection;
  }

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", errorInfo);
  } else {
    // In production, you might want to send to a logging service
    console.error("Error:", {
      name: error.name,
      message: error.message,
      timestamp: errorInfo.timestamp,
    });
  }

  // TODO: Send to monitoring service (e.g., Sentry) in production
  // if (process.env.NODE_ENV === 'production') {
  //   Sentry.captureException(error, { extra: context });
  // }
}

/**
 * Safely execute an async function with error handling
 *
 * @param fn - The async function to execute
 * @param fallback - Fallback value to return on error
 * @param context - Context information for error logging
 * @returns The result of the function or the fallback value
 *
 * @example
 * ```ts
 * const blogs = await safeAsync(
 *   () => getBlogs(),
 *   { items: [], totalPages: 0, totalItems: 0 },
 *   { operation: 'getBlogs' }
 * );
 * ```
 */
export async function safeAsync<T>(
  fn: () => Promise<T>,
  fallback: T,
  context?: Record<string, unknown>,
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    const normalizedError = handleApiError(error);
    logError(normalizedError, context);
    return fallback;
  }
}

/**
 * Check if an error is a specific type of PocketBase error
 *
 * @param error - The error to check
 * @param statusCode - The status code to check for
 * @returns True if the error matches the status code
 */
export function isErrorType(error: unknown, statusCode: number): boolean {
  return error instanceof PocketBaseError && error.statusCode === statusCode;
}

/**
 * Check if an error is a not found error
 */
export function isNotFoundError(error: unknown): error is NotFoundError {
  return error instanceof NotFoundError || isErrorType(error, 404);
}

/**
 * Check if an error is a validation error
 */
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError || isErrorType(error, 400);
}

/**
 * Check if an error is an authentication error
 */
export function isAuthenticationError(
  error: unknown,
): error is AuthenticationError {
  return error instanceof AuthenticationError || isErrorType(error, 401);
}

/**
 * Check if an error is a rate limit error
 */
export function isRateLimitError(error: unknown): error is RateLimitError {
  return error instanceof RateLimitError || isErrorType(error, 429);
}
