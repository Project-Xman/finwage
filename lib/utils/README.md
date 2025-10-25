# PocketBase Utility Functions

This directory contains utility functions for working with PocketBase in the Next.js application.

## Files

### `pocketbase.ts`
Utilities for constructing PocketBase file URLs and handling images.

**Functions:**
- `getPocketBaseUrl()` - Get the PocketBase base URL from environment
- `getFileUrl(record, filename)` - Construct a file URL for a PocketBase record
- `getImageUrl(record, filename, options?)` - Construct an image URL with optional thumbnail support
- `getFirstImage(record, images, options?)` - Get the first image from an array
- `getAllImages(record, images, options?)` - Get all image URLs from an array
- `hasImages(images)` - Check if a record has any images

**Example:**
```typescript
import { getImageUrl, getFirstImage } from '@/lib/utils';

// Get image URL with thumbnail
const imageUrl = getImageUrl(blog, blog.featured_image[0], { thumb: '100x100' });

// Get first image with fallback
const firstImage = getFirstImage(blog, blog.featured_image, { 
  fallback: '/placeholder.jpg' 
});
```

### `error-handler.ts`
Custom error classes and error handling utilities for PocketBase integration.

**Error Classes:**
- `PocketBaseError` - Base error class for PocketBase-related errors
- `NotFoundError` - Error for resource not found (404)
- `ValidationError` - Error for validation failures (400)
- `AuthenticationError` - Error for authentication failures (401)
- `RateLimitError` - Error for rate limit exceeded (429)

**Functions:**
- `handleApiError(error, context?)` - Handle and normalize errors
- `logError(error, context?)` - Log error with context information
- `safeAsync(fn, fallback, context?)` - Safely execute async function with error handling
- `isNotFoundError(error)` - Check if error is a not found error
- `isValidationError(error)` - Check if error is a validation error
- `isAuthenticationError(error)` - Check if error is an authentication error
- `isRateLimitError(error)` - Check if error is a rate limit error

**Example:**
```typescript
import { safeAsync, NotFoundError, logError } from '@/lib/utils';

// Safe async execution with fallback
const blogs = await safeAsync(
  () => getBlogs(),
  { items: [], totalPages: 0, totalItems: 0 },
  { operation: 'getBlogs' }
);

// Throw custom error
if (!blog) {
  throw new NotFoundError('Blogs', slug);
}

// Handle errors
try {
  await fetchData();
} catch (error) {
  logError(error, { collection: 'Blogs', slug });
}
```

### `env.ts`
Environment variable validation and access utilities.

**Functions:**
- `validateEnv()` - Validate that required environment variables are set
- `getEnv(key, defaultValue?)` - Get environment variable with validation
- `getPocketBaseUrl()` - Get PocketBase URL with validation
- `isDevelopment()` - Check if running in development mode
- `isProduction()` - Check if running in production mode
- `isTest()` - Check if running in test mode
- `getEnvironment()` - Get current environment name

**Example:**
```typescript
import { getPocketBaseUrl, isDevelopment } from '@/lib/utils';

const baseUrl = getPocketBaseUrl();

if (isDevelopment()) {
  console.log('Running in development mode');
}
```

## Environment Variables

The following environment variables are required:

### `NEXT_PUBLIC_POCKETBASE_URL`
The URL of your PocketBase instance.

**Default:** `http://127.0.0.1:8090` (for local development)

**Example:**
```bash
# .env.local
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090

# .env.production
NEXT_PUBLIC_POCKETBASE_URL=https://api.yoursite.com
```

## Usage

All utilities are re-exported from `lib/utils/index.ts` for convenient importing:

```typescript
import {
  // PocketBase utilities
  getFileUrl,
  getImageUrl,
  getFirstImage,
  getAllImages,
  hasImages,
  
  // Error handling
  PocketBaseError,
  NotFoundError,
  ValidationError,
  handleApiError,
  logError,
  safeAsync,
  
  // Environment
  getPocketBaseUrl,
  isDevelopment,
  isProduction,
} from '@/lib/utils';
```

## Requirements Coverage

This implementation satisfies the following requirements:

- **Requirement 11.1-11.3**: Type safety and error handling
- **Requirement 14.1-14.4**: Image URL construction and handling
- **Requirement 15.1-15.3**: Environment variable validation

## Testing

All utilities have been tested and verified to work correctly. The implementation includes:

- ✓ File URL construction
- ✓ Image URL with thumbnail support
- ✓ Fallback image handling
- ✓ Array image handling
- ✓ Custom error classes
- ✓ Error type checking
- ✓ Environment variable validation
- ✓ TypeScript type safety
