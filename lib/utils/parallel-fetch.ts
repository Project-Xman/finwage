/**
 * Parallel Data Fetching Utilities
 * 
 * Helper functions and patterns for optimizing data fetching performance
 * by executing independent requests in parallel.
 */

/**
 * Fetch multiple data sources in parallel with error handling
 * 
 * This utility wraps Promise.all with individual error handling for each promise,
 * allowing some requests to fail without blocking others.
 * 
 * @param promises - Array of promise-returning functions
 * @param options - Configuration options
 * @returns Array of results (successful data or null for failures)
 * 
 * @example
 * ```ts
 * const [blogs, testimonials, features] = await fetchInParallel([
 *   () => getBlogs({ perPage: 10 }),
 *   () => getFeaturedTestimonials(6),
 *   () => getFeaturedFeatures(4),
 * ]);
 * ```
 */
export async function fetchInParallel<T extends any[]>(
  promises: Array<() => Promise<any>>,
  options: {
    logErrors?: boolean;
    fallbackValues?: T;
  } = {}
): Promise<T> {
  const { logErrors = true, fallbackValues = [] } = options;

  const results = await Promise.allSettled(
    promises.map(promiseFn => promiseFn())
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      if (logErrors) {
        console.error(`Parallel fetch failed at index ${index}:`, result.reason);
      }
      return fallbackValues[index] ?? null;
    }
  }) as T;
}

/**
 * Fetch data with a timeout to prevent slow requests from blocking the page
 * 
 * @param promiseFn - Function that returns a promise
 * @param timeoutMs - Timeout in milliseconds (default: 5000)
 * @param fallbackValue - Value to return on timeout
 * @returns Promise that resolves with data or fallback value
 * 
 * @example
 * ```ts
 * const blogs = await fetchWithTimeout(
 *   () => getBlogs({ perPage: 10 }),
 *   3000,
 *   { items: [], totalPages: 0, totalItems: 0 }
 * );
 * ```
 */
export async function fetchWithTimeout<T>(
  promiseFn: () => Promise<T>,
  timeoutMs: number = 5000,
  fallbackValue: T
): Promise<T> {
  const timeoutPromise = new Promise<T>((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), timeoutMs);
  });

  try {
    return await Promise.race([promiseFn(), timeoutPromise]);
  } catch (error) {
    console.error('Fetch timeout or error:', error);
    return fallbackValue;
  }
}

/**
 * Batch multiple requests with the same function but different parameters
 * 
 * @param fetchFn - Function to call for each parameter set
 * @param paramsList - Array of parameter objects
 * @returns Array of results
 * 
 * @example
 * ```ts
 * const categoryBlogs = await batchFetch(
 *   getBlogsByCategory,
 *   ['tech', 'finance', 'wellness']
 * );
 * ```
 */
export async function batchFetch<T, P>(
  fetchFn: (params: P) => Promise<T>,
  paramsList: P[]
): Promise<T[]> {
  return Promise.all(paramsList.map(params => fetchFn(params)));
}

/**
 * Fetch data with automatic retry on failure
 * 
 * @param promiseFn - Function that returns a promise
 * @param options - Retry configuration
 * @returns Promise that resolves with data or throws after max retries
 * 
 * @example
 * ```ts
 * const blogs = await fetchWithRetry(
 *   () => getBlogs({ perPage: 10 }),
 *   { maxRetries: 3, delayMs: 1000 }
 * );
 * ```
 */
export async function fetchWithRetry<T>(
  promiseFn: () => Promise<T>,
  options: {
    maxRetries?: number;
    delayMs?: number;
    backoff?: boolean;
  } = {}
): Promise<T> {
  const { maxRetries = 3, delayMs = 1000, backoff = true } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await promiseFn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries) {
        const delay = backoff ? delayMs * Math.pow(2, attempt) : delayMs;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Fetch failed after retries');
}

// ============================================================
// PARALLEL FETCHING PATTERNS
// ============================================================

/**
 * Parallel Fetching Best Practices
 * 
 * 1. INDEPENDENT REQUESTS:
 *    Use Promise.all for requests that don't depend on each other
 *    ```ts
 *    const [blogs, testimonials, features] = await Promise.all([
 *      getBlogs({ perPage: 10 }),
 *      getFeaturedTestimonials(6),
 *      getFeaturedFeatures(4),
 *    ]);
 *    ```
 * 
 * 2. DEPENDENT REQUESTS:
 *    Fetch sequentially when one request depends on another
 *    ```ts
 *    const blog = await getBlogBySlug(slug);
 *    const relatedBlogs = await getBlogsByCategory(blog.category);
 *    ```
 * 
 * 3. CONDITIONAL PARALLEL:
 *    Combine sequential and parallel patterns
 *    ```ts
 *    const blog = await getBlogBySlug(slug);
 *    const [author, relatedBlogs] = await Promise.all([
 *      getAuthorById(blog.author),
 *      getBlogsByCategory(blog.category),
 *    ]);
 *    ```
 * 
 * 4. CRITICAL VS NON-CRITICAL:
 *    Fetch critical data first, then non-critical in parallel
 *    ```ts
 *    const criticalData = await getCriticalData();
 *    const [optional1, optional2] = await Promise.all([
 *      getOptionalData1().catch(() => null),
 *      getOptionalData2().catch(() => null),
 *    ]);
 *    ```
 * 
 * 5. PAGE-LEVEL OPTIMIZATION:
 *    Fetch all page data in parallel at the top level
 *    ```ts
 *    export default async function Page() {
 *      const [hero, content, sidebar] = await Promise.all([
 *        getHeroData(),
 *        getContentData(),
 *        getSidebarData(),
 *      ]);
 *      return <PageLayout hero={hero} content={content} sidebar={sidebar} />;
 *    }
 *    ```
 * 
 * 6. STREAMING WITH SUSPENSE:
 *    Use Suspense boundaries for non-critical sections
 *    ```tsx
 *    export default async function Page() {
 *      const criticalData = await getCriticalData();
 *      return (
 *        <>
 *          <CriticalSection data={criticalData} />
 *          <Suspense fallback={<Skeleton />}>
 *            <NonCriticalSection />
 *          </Suspense>
 *        </>
 *      );
 *    }
 *    ```
 */

/**
 * Performance Metrics
 * 
 * Measure the impact of parallel fetching:
 * 
 * Sequential (3 requests × 200ms each):
 * Total time: 600ms
 * 
 * Parallel (3 requests × 200ms each):
 * Total time: 200ms (3x faster!)
 * 
 * Mixed (1 sequential + 2 parallel):
 * Total time: 400ms (1.5x faster)
 */
