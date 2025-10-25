/**
 * Utility Functions Index
 * 
 * Re-exports all utility functions for easier imports
 */

// PocketBase utilities
export {
  getPocketBaseUrl,
  getFileUrl,
  getImageUrl,
  getFirstImage,
  getAllImages,
  hasImages,
} from './pocketbase';

// Error handling utilities
export {
  PocketBaseError,
  NotFoundError,
  ValidationError,
  AuthenticationError,
  RateLimitError,
  handleApiError,
  logError,
  safeAsync,
  isErrorType,
  isNotFoundError,
  isValidationError,
  isAuthenticationError,
  isRateLimitError,
} from './error-handler';

// Environment utilities
export {
  validateEnv,
  getEnv,
  isDevelopment,
  isProduction,
  isTest,
  getEnvironment,
} from './env';
