/**
 * Webhook Testing Utilities
 * 
 * Utility functions and scripts for testing PocketBase webhook integration
 * with Next.js 15 cache revalidation.
 */

import { CACHE_TAGS } from '@/lib/utils/cache-config';

// ============================================================
// TEST DATA GENERATORS
// ============================================================

/**
 * Generate test webhook payloads for different collections
 */
export const generateTestPayloads = {
  blog: (action: 'create' | 'update' | 'delete' = 'create') => ({
    action,
    collection: 'blogs',
    record: {
      id: 'test-blog-123',
      slug: 'test-blog-post',
      title: 'Test Blog Post',
      published: true,
      featured: false,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
    admin: {
      id: 'admin-123',
      email: 'admin@example.com',
    },
  }),

  testimonial: (action: 'create' | 'update' | 'delete' = 'create') => ({
    action,
    collection: 'testimonials',
    record: {
      id: 'test-testimonial-123',
      name: 'John Doe',
      company: 'Test Company',
      quote: 'This is a test testimonial',
      verified: true,
      featured: true,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
    admin: {
      id: 'admin-123',
      email: 'admin@example.com',
    },
  }),

  job: (action: 'create' | 'update' | 'delete' = 'create') => ({
    action,
    collection: 'job_positions',
    record: {
      id: 'test-job-123',
      title: 'Senior Developer',
      department: 'Engineering',
      location: 'Remote',
      status: 'open',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
    admin: {
      id: 'admin-123',
      email: 'admin@example.com',
    },
  }),

  pricing: (action: 'create' | 'update' | 'delete' = 'update') => ({
    action,
    collection: 'pricing_plans',
    record: {
      id: 'test-pricing-123',
      name: 'Professional',
      price: 99.99,
      active: true,
      is_popular: true,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
    admin: {
      id: 'admin-123',
      email: 'admin@example.com',
    },
  }),
};

// ============================================================
// WEBHOOK TEST FUNCTIONS
// ============================================================

/**
 * Test webhook endpoint with different payloads
 */
export async function testWebhookEndpoint(
  webhookUrl: string,
  payload: any,
  options: {
    secret?: string;
    timeout?: number;
  } = {}
): Promise<{
  success: boolean;
  status: number;
  data: any;
  duration: number;
  error?: string;
}> {
  const startTime = Date.now();
  
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (options.secret) {
      headers['x-webhook-secret'] = options.secret;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json();
    const duration = Date.now() - startTime;

    return {
      success: response.ok,
      status: response.status,
      data,
      duration,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      success: false,
      status: 0,
      data: null,
      duration,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Test manual revalidation API
 */
export async function testRevalidationAPI(
  baseUrl: string,
  endpoint: 'collection' | 'tag' | 'path' | 'all',
  payload: any,
  apiKey?: string
): Promise<{
  success: boolean;
  status: number;
  data: any;
  duration: number;
  error?: string;
}> {
  const startTime = Date.now();
  
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }

    const response = await fetch(`${baseUrl}/api/revalidate/${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const duration = Date.now() - startTime;

    return {
      success: response.ok,
      status: response.status,
      data,
      duration,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      success: false,
      status: 0,
      data: null,
      duration,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================================
// TEST SCENARIOS
// ============================================================

/**
 * Run comprehensive webhook tests
 */
export async function runWebhookTests(
  webhookUrl: string,
  options: {
    secret?: string;
    verbose?: boolean;
  } = {}
): Promise<{
  passed: number;
  failed: number;
  results: Array<{
    test: string;
    success: boolean;
    duration: number;
    error?: string;
  }>;
}> {
  const results = [];
  let passed = 0;
  let failed = 0;

  const tests = [
    {
      name: 'Blog Create Webhook',
      payload: generateTestPayloads.blog('create'),
    },
    {
      name: 'Blog Update Webhook',
      payload: generateTestPayloads.blog('update'),
    },
    {
      name: 'Testimonial Create Webhook',
      payload: generateTestPayloads.testimonial('create'),
    },
    {
      name: 'Job Create Webhook',
      payload: generateTestPayloads.job('create'),
    },
    {
      name: 'Pricing Update Webhook',
      payload: generateTestPayloads.pricing('update'),
    },
  ];

  for (const test of tests) {
    if (options.verbose) {
      console.log(`Running test: ${test.name}...`);
    }

    const result = await testWebhookEndpoint(webhookUrl, test.payload, {
      secret: options.secret,
    });

    const testResult = {
      test: test.name,
      success: result.success,
      duration: result.duration,
      error: result.error,
    };

    results.push(testResult);

    if (result.success) {
      passed++;
      if (options.verbose) {
        console.log(`✅ ${test.name} passed (${result.duration}ms)`);
      }
    } else {
      failed++;
      if (options.verbose) {
        console.log(`❌ ${test.name} failed: ${result.error || 'Unknown error'}`);
      }
    }
  }

  return { passed, failed, results };
}

/**
 * Run revalidation API tests
 */
export async function runRevalidationTests(
  baseUrl: string,
  apiKey?: string,
  options: {
    verbose?: boolean;
  } = {}
): Promise<{
  passed: number;
  failed: number;
  results: Array<{
    test: string;
    success: boolean;
    duration: number;
    error?: string;
  }>;
}> {
  const results = [];
  let passed = 0;
  let failed = 0;

  const tests = [
    {
      name: 'Collection Revalidation',
      endpoint: 'collection' as const,
      payload: { collection: 'blogs', record: { id: 'test-123', slug: 'test-post' } },
    },
    {
      name: 'Tag Revalidation',
      endpoint: 'tag' as const,
      payload: { tags: [CACHE_TAGS.BLOGS, CACHE_TAGS.TESTIMONIALS] },
    },
    {
      name: 'Path Revalidation',
      endpoint: 'path' as const,
      payload: { paths: ['/blog', '/pricing'] },
    },
  ];

  for (const test of tests) {
    if (options.verbose) {
      console.log(`Running test: ${test.name}...`);
    }

    const result = await testRevalidationAPI(
      baseUrl,
      test.endpoint,
      test.payload,
      apiKey
    );

    const testResult = {
      test: test.name,
      success: result.success,
      duration: result.duration,
      error: result.error,
    };

    results.push(testResult);

    if (result.success) {
      passed++;
      if (options.verbose) {
        console.log(`✅ ${test.name} passed (${result.duration}ms)`);
      }
    } else {
      failed++;
      if (options.verbose) {
        console.log(`❌ ${test.name} failed: ${result.error || 'Unknown error'}`);
      }
    }
  }

  return { passed, failed, results };
}

// ============================================================
// DEVELOPMENT HELPERS
// ============================================================

/**
 * Log cache tag information for debugging
 */
export function logCacheInfo() {
  console.log('Available Cache Tags:', CACHE_TAGS);
  console.log('Collection mappings available for webhook revalidation');
}

/**
 * Generate curl commands for testing
 */
export function generateCurlCommands(
  webhookUrl: string,
  revalidationUrl: string,
  options: {
    webhookSecret?: string;
    apiKey?: string;
  } = {}
) {
  const commands = {
    webhook: {
      blog: `curl -X POST "${webhookUrl}" \\
  -H "Content-Type: application/json" \\
  ${options.webhookSecret ? `-H "x-webhook-secret: ${options.webhookSecret}" \\` : ''}
  -d '${JSON.stringify(generateTestPayloads.blog('create'), null, 2)}'`,
      
      testimonial: `curl -X POST "${webhookUrl}" \\
  -H "Content-Type: application/json" \\
  ${options.webhookSecret ? `-H "x-webhook-secret: ${options.webhookSecret}" \\` : ''}
  -d '${JSON.stringify(generateTestPayloads.testimonial('create'), null, 2)}'`,
    },
    
    revalidation: {
      collection: `curl -X POST "${revalidationUrl}/api/revalidate/collection" \\
  -H "Content-Type: application/json" \\
  ${options.apiKey ? `-H "x-api-key: ${options.apiKey}" \\` : ''}
  -d '{"collection": "blogs", "record": {"id": "test-123", "slug": "test-post"}}'`,
      
      tag: `curl -X POST "${revalidationUrl}/api/revalidate/tag" \\
  -H "Content-Type: application/json" \\
  ${options.apiKey ? `-H "x-api-key: ${options.apiKey}" \\` : ''}
  -d '{"tags": ["blogs", "testimonials"]}'`,
    },
  };

  return commands;
}

// ============================================================
// MONITORING HELPERS
// ============================================================

/**
 * Simple performance monitor for webhook processing
 */
export class WebhookMonitor {
  private metrics: Array<{
    timestamp: number;
    collection: string;
    action: string;
    duration: number;
    success: boolean;
  }> = [];

  recordWebhook(
    collection: string,
    action: string,
    duration: number,
    success: boolean
  ) {
    this.metrics.push({
      timestamp: Date.now(),
      collection,
      action,
      duration,
      success,
    });

    // Keep only last 100 entries
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }
  }

  getStats() {
    if (this.metrics.length === 0) {
      return { totalRequests: 0, successRate: 0, averageDuration: 0 };
    }

    const totalRequests = this.metrics.length;
    const successfulRequests = this.metrics.filter(m => m.success).length;
    const successRate = (successfulRequests / totalRequests) * 100;
    const averageDuration = this.metrics.reduce((sum, m) => sum + m.duration, 0) / totalRequests;

    return {
      totalRequests,
      successRate: Math.round(successRate * 100) / 100,
      averageDuration: Math.round(averageDuration * 100) / 100,
      recentActivity: this.metrics.slice(-10),
    };
  }

  reset() {
    this.metrics = [];
  }
}

// Global monitor instance
export const webhookMonitor = new WebhookMonitor();