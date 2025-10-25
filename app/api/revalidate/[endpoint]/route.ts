/**
 * Manual Cache Revalidation API
 * 
 * This API route provides manual cache revalidation endpoints for testing
 * and administrative purposes. Use these endpoints to manually trigger
 * cache invalidation without waiting for PocketBase webhooks.
 * 
 * Routes:
 * - POST /api/revalidate/collection - Revalidate specific collection
 * - POST /api/revalidate/tag - Revalidate specific cache tag
 * - POST /api/revalidate/path - Revalidate specific path
 * - POST /api/revalidate/all - Revalidate all content (use sparingly)
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  handlePocketBaseWebhook,
  revalidateAllContent,
  revalidateTags,
  revalidatePaths
} from '@/lib/utils/revalidation';

// ============================================================
// TYPES
// ============================================================

interface RevalidateCollectionRequest {
  collection: string;
  record?: {
    id: string;
    slug?: string;
    [key: string]: any;
  };
  action?: 'create' | 'update' | 'delete';
}

interface RevalidateTagRequest {
  tags: string | string[];
}

interface RevalidatePathRequest {
  paths: string | string[];
  type?: 'page' | 'layout';
}

// ============================================================
// AUTHENTICATION
// ============================================================

function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key') || 
                 request.headers.get('authorization')?.replace('Bearer ', '');
  const expectedKey = process.env.REVALIDATION_API_KEY;
  
  if (!expectedKey) {
    console.warn('[Revalidation API] No REVALIDATION_API_KEY configured');
    return true; // Allow in development if no key is set
  }
  
  return apiKey === expectedKey;
}

// ============================================================
// MAIN HANDLER
// ============================================================

export async function POST(request: NextRequest) {
  // Validate API key for security
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid API key' },
      { status: 401 }
    );
  }

  try {
    const url = new URL(request.url);
    const endpoint = url.pathname.split('/').pop();
    
    const startTime = Date.now();
    let result;

    switch (endpoint) {
      case 'collection':
        result = await handleCollectionRevalidation(request);
        break;
      case 'tag':
        result = await handleTagRevalidation(request);
        break;
      case 'path':
        result = await handlePathRevalidation(request);
        break;
      case 'all':
        result = await handleAllRevalidation();
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid endpoint. Use: /collection, /tag, /path, or /all' },
          { status: 400 }
        );
    }

    const duration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      endpoint,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
      ...result,
    });

  } catch (error) {
    console.error('[Revalidation API] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Revalidation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// ============================================================
// REVALIDATION HANDLERS
// ============================================================

async function handleCollectionRevalidation(request: NextRequest) {
  const body: RevalidateCollectionRequest = await request.json();
  const { collection, record, action } = body;

  if (!collection) {
    throw new Error('Collection name is required');
  }

  const result = await handlePocketBaseWebhook(collection, record, action);
  
  return {
    type: 'collection',
    collection,
    recordId: record?.id,
    recordSlug: record?.slug,
    action,
    revalidated: result,
  };
}

async function handleTagRevalidation(request: NextRequest) {
  const body: RevalidateTagRequest = await request.json();
  const { tags } = body;

  if (!tags) {
    throw new Error('Tags are required');
  }

  const tagArray = Array.isArray(tags) ? tags : [tags];
  await revalidateTags(tagArray);
  
  return {
    type: 'tag',
    tags: tagArray,
  };
}

async function handlePathRevalidation(request: NextRequest) {
  const body: RevalidatePathRequest = await request.json();
  const { paths, type = 'page' } = body;

  if (!paths) {
    throw new Error('Paths are required');
  }

  const pathArray = Array.isArray(paths) ? paths : [paths];
  await revalidatePaths(pathArray, type);
  
  return {
    type: 'path',
    paths: pathArray,
    revalidationType: type,
  };
}

async function handleAllRevalidation() {
  await revalidateAllContent();
  
  return {
    type: 'all',
    message: 'All content caches invalidated',
    warning: 'This is a heavy operation - use sparingly',
  };
}

// ============================================================
// GET HANDLER - API DOCUMENTATION
// ============================================================

export async function GET() {
  return NextResponse.json({
    name: 'Manual Cache Revalidation API',
    version: '1.0.0',
    description: 'API for manually triggering cache revalidation',
    endpoints: {
      'POST /api/revalidate/collection': {
        description: 'Revalidate caches for a specific PocketBase collection',
        body: {
          collection: 'string (required) - Collection name',
          record: 'object (optional) - Record data',
          action: 'string (optional) - Action performed (create/update/delete)',
        },
        example: {
          collection: 'blogs',
          record: { id: 'abc123', slug: 'my-blog-post' },
          action: 'update',
        },
      },
      'POST /api/revalidate/tag': {
        description: 'Revalidate specific cache tags',
        body: {
          tags: 'string | string[] (required) - Cache tags to revalidate',
        },
        example: {
          tags: ['blogs', 'testimonials'],
        },
      },
      'POST /api/revalidate/path': {
        description: 'Revalidate specific paths',
        body: {
          paths: 'string | string[] (required) - Paths to revalidate',
          type: 'string (optional) - page | layout (default: page)',
        },
        example: {
          paths: ['/blog', '/pricing'],
          type: 'page',
        },
      },
      'POST /api/revalidate/all': {
        description: 'Revalidate all content caches (heavy operation)',
        body: {},
        warning: 'Use sparingly - invalidates all cached content',
      },
    },
    authentication: {
      method: 'API Key',
      headers: {
        'x-api-key': 'your-api-key',
        // OR
        'authorization': 'Bearer your-api-key',
      },
      setup: 'Set REVALIDATION_API_KEY in your environment variables',
    },
    examples: {
      curl: {
        collection: `curl -X POST https://your-domain.com/api/revalidate/collection \\\\\\n  -H \"Content-Type: application/json\" \\\\\\n  -H \"x-api-key: your-api-key\" \\\\\\n  -d '{\"collection\": \"blogs\", \"record\": {\"id\": \"abc123\", \"slug\": \"my-post\"}}'`,
        tag: `curl -X POST https://your-domain.com/api/revalidate/tag \\\\\\n  -H \"Content-Type: application/json\" \\\\\\n  -H \"x-api-key: your-api-key\" \\\\\\n  -d '{\"tags\": [\"blogs\", \"testimonials\"]}'`,
        path: `curl -X POST https://your-domain.com/api/revalidate/path \\\\\\n  -H \"Content-Type: application/json\" \\\\\\n  -H \"x-api-key: your-api-key\" \\\\\\n  -d '{\"paths\": [\"/blog\", \"/pricing\"]}'`,
      },
    },
    timestamp: new Date().toISOString(),
  });
}

// ============================================================
// ROUTE CONFIGURATION
// ============================================================

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';