/**
 * Utility Functions Index
 *
 * Re-exports all utility functions for easier imports
 */

// Environment utilities
export {
  getEnv,
  getEnvironment,
  isDevelopment,
  isProduction,
  isTest,
  validateEnv,
} from "./env";

// Error handling utilities
export {
  AuthenticationError,
  handleApiError,
  isAuthenticationError,
  isErrorType,
  isNotFoundError,
  isRateLimitError,
  isValidationError,
  logError,
  NotFoundError,
  PocketBaseError,
  RateLimitError,
  safeAsync,
  ValidationError,
} from "./error-handler";
// PocketBase utilities
export {
  getAllImages,
  getFileUrl,
  getFirstImage,
  getImageUrl,
  getPocketBaseUrl,
  hasImages,
} from "./pocketbase";
