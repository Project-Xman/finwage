/**
 * PocketBase Webhook Handler
 * 
 * This API route handles webhooks from PocketBase to trigger cache revalidation
 * when content is created, updated, or deleted.
 * 
 * Setup in PocketBase:
 * 1. Go to Settings > Webhooks
 * 2. Add webhook URL: https://your-domain.com/api/webhooks/pocketbase
 * 3. Select events: create, update, delete
 * 4. Select collections to monitor
 * 5. Add webhook secret to environment variables
 */

import { NextRequest, NextResponse } from 'next/server';
import { handlePocketBaseWebhook } from '@/lib/utils/revalidation';

// ============================================================
// TYPES
// ============================================================

interface PocketBaseWebhookPayload {
  action: 'create' | 'update' | 'delete';
  collection: string;
  record: {
    id: string;
    [key: string]: any;
  };
}

// ============================================================
// WEBHOOK HANDLER
// ============================================================

/**
 * POST handler for PocketBase webhooks
 * 
 * Validates webhook signature and triggers appropriate cache revalidation
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret for security
    const webhookSecret = request.headers.get('x-webhook-secret');
    const expectedSecret = process.env.POCKETBASE_WEBHOOK_SECRET;

    if (expectedSecret && webhookSecret !== expectedSecret) {
      console.error('Invalid webhook secret');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse webhook payload
    const payload: PocketBaseWebhookPayload = await request.json();
    const { action, collection, record } = payload;

    // Log webhook event
    console.log(`[Webhook] ${action} on ${collection}:${record.id}`);

    // Handle revalidation based on collection
    await handlePocketBaseWebhook(collection);

    // Return success response
    return NextResponse.json({
      success: true,
      message: `Cache revalidated for ${collection}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process webhook',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler for webhook health check
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'PocketBase webhook endpoint is active',
    timestamp: new Date().toISOString(),
  });
}

// ============================================================
// CONFIGURATION
// ============================================================

/**
 * Route segment config
 * 
 * - runtime: nodejs (required for revalidation APIs)
 * - dynamic: force-dynamic (always execute fresh)
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
