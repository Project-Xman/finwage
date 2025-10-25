/**
 * Scheduled Cache Revalidation Cron Job
 * 
 * This API route can be called by a cron service (like Vercel Cron, GitHub Actions, etc.)
 * to periodically revalidate cached content.
 * 
 * Setup with Vercel Cron:
 * 1. Add to vercel.json:
 *    {
 *      "crons": [
 *        {
 *          "path": "/api/cron/revalidate?frequency=hourly",
 *          "schedule": "0 * * * *"
 *        },
 *        {
 *          "path": "/api/cron/revalidate?frequency=daily",
 *          "schedule": "0 0 * * *"
 *        }
 *      ]
 *    }
 * 
 * 2. Add CRON_SECRET to environment variables
 * 3. Deploy to Vercel
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidateByFrequency } from '@/lib/utils/revalidation';

// ============================================================
// CRON HANDLER
// ============================================================

/**
 * GET handler for scheduled revalidation
 * 
 * Query parameters:
 * - frequency: 'hourly' | 'daily' | 'weekly'
 * 
 * Headers:
 * - Authorization: Bearer <CRON_SECRET>
 */
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.CRON_SECRET;

    if (expectedSecret) {
      const token = authHeader?.replace('Bearer ', '');
      if (token !== expectedSecret) {
        console.error('Invalid cron secret');
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    // Get frequency from query params
    const searchParams = request.nextUrl.searchParams;
    const frequency = searchParams.get('frequency') as 'hourly' | 'daily' | 'weekly';

    if (!frequency || !['hourly', 'daily', 'weekly'].includes(frequency)) {
      return NextResponse.json(
        { error: 'Invalid frequency parameter. Must be: hourly, daily, or weekly' },
        { status: 400 }
      );
    }

    // Log cron execution
    console.log(`[Cron] Running ${frequency} revalidation at ${new Date().toISOString()}`);

    // Execute revalidation
    const startTime = Date.now();
    await revalidateByFrequency(frequency);
    const duration = Date.now() - startTime;

    // Return success response
    return NextResponse.json({
      success: true,
      frequency,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cron revalidation error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to revalidate cache',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST handler for manual revalidation
 * 
 * Allows manual triggering of revalidation with custom parameters
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authorization
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.CRON_SECRET;

    if (expectedSecret) {
      const token = authHeader?.replace('Bearer ', '');
      if (token !== expectedSecret) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    // Parse request body
    const body = await request.json();
    const { frequency } = body;

    if (!frequency || !['hourly', 'daily', 'weekly'].includes(frequency)) {
      return NextResponse.json(
        { error: 'Invalid frequency. Must be: hourly, daily, or weekly' },
        { status: 400 }
      );
    }

    // Execute revalidation
    console.log(`[Manual] Running ${frequency} revalidation`);
    const startTime = Date.now();
    await revalidateByFrequency(frequency);
    const duration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      frequency,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Manual revalidation error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to revalidate cache',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// ============================================================
// CONFIGURATION
// ============================================================

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
