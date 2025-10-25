# Cache Revalidation Guide

This guide explains how to implement and use cache revalidation in the Next.js 15 application with PocketBase.

## Overview

Cache revalidation allows you to invalidate cached data when content changes, ensuring users always see fresh content without sacrificing performance.

## Revalidation Methods

### 1. On-Demand Revalidation

Manually trigger revalidation when content changes.

#### In Server Actions

```tsx
'use server';

import { revalidateBlogBySlug } from '@/lib/utils/revalidation';

export async function updateBlog(slug: string, data: BlogData) {
  // Update blog in database
  await updateBlogInDB(slug, data);
  
  // Revalidate cache
  await revalidateBlogBySlug(slug);
  
  return { success: true };
}
```

#### In API Routes

```tsx
import { NextResponse } from 'next/server';
import { revalidateBlogs } from '@/lib/utils/revalidation';

export async function POST(request: Request) {
  const { slug } = await request.json();
  
  // Update content
  await updateContent(slug);
  
  // Revalidate
  await revalidateBlogs();
  
  return NextResponse.json({ success: true });
}
```

### 2. Webhook-Based Revalidation

Automatically revalidate when PocketBase content changes.

#### Setup PocketBase Webhooks

1. **In PocketBase Admin UI:**
   - Go to Settings > Webhooks
   - Click "New webhook"
   - Set URL: `https://your-domain.com/api/webhooks/pocketbase`
   - Select events: `create`, `update`, `delete`
   - Select collections to monitor
   - Save webhook

2. **Add Webhook Secret:**
   ```bash
   # .env.local
   POCKETBASE_WEBHOOK_SECRET=your-secret-key-here
   ```

3. **Test Webhook:**
   ```bash
   curl -X POST https://your-domain.com/api/webhooks/pocketbase \
     -H "Content-Type: application/json" \
     -H "x-webhook-secret: your-secret-key-here" \
     -d '{
       "action": "update",
       "collection": "Blogs",
       "record": { "id": "abc123", "title": "Test" }
     }'
   ```

#### Webhook Handler

The webhook handler at `/app/api/webhooks/pocketbase/route.ts` automatically:
- Validates webhook signature
- Determines which caches to invalidate based on collection
- Triggers appropriate revalidation functions
- Returns success/error response

### 3. Scheduled Revalidation

Periodically refresh caches using cron jobs.

#### Setup Vercel Cron

1. **Create vercel.json:**
   ```json
   {
     "crons": [
       {
         "path": "/api/cron/revalidate?frequency=hourly",
         "schedule": "0 * * * *"
       },
       {
         "path": "/api/cron/revalidate?frequency=daily",
         "schedule": "0 0 * * *"
       },
       {
         "path": "/api/cron/revalidate?frequency=weekly",
         "schedule": "0 0 * * 0"
       }
     ]
   }
   ```

2. **Add Cron Secret:**
   ```bash
   # .env.local
   CRON_SECRET=your-cron-secret-here
   ```

3. **Deploy to Vercel:**
   ```bash
   vercel deploy
   ```

#### Cron Schedule Syntax

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of week (0 - 6) (Sunday to Saturday)
│ │ │ │ │
* * * * *
```

Examples:
- `0 * * * *` - Every hour
- `0 0 * * *` - Every day at midnight
- `0 0 * * 0` - Every Sunday at midnight
- `*/15 * * * *` - Every 15 minutes
- `0 9,17 * * *` - Every day at 9am and 5pm

#### Alternative Cron Services

**GitHub Actions:**
```yaml
# .github/workflows/revalidate.yml
name: Revalidate Cache
on:
  schedule:
    - cron: '0 * * * *'  # Every hour
  workflow_dispatch:  # Manual trigger

jobs:
  revalidate:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Revalidation
        run: |
          curl -X GET "https://your-domain.com/api/cron/revalidate?frequency=hourly" \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

**External Cron Services:**
- [cron-job.org](https://cron-job.org)
- [EasyCron](https://www.easycron.com)
- [Cronitor](https://cronitor.io)

### 4. Time-Based Revalidation (ISR)

Set revalidation periods in page components.

```tsx
// app/blog/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const blogs = await getBlogs();
  return <BlogList blogs={blogs} />;
}
```

## Revalidation Functions

### Collection-Specific Functions

```tsx
import {
  revalidateBlogs,
  revalidateBlogBySlug,
  revalidatePricing,
  revalidateTestimonials,
  revalidateFeatures,
  revalidateIntegrations,
  revalidatePartners,
  revalidateJobs,
  revalidateCompanyInfo,
  revalidateSupport,
  revalidatePress,
} from '@/lib/utils/revalidation';

// Revalidate all blogs
await revalidateBlogs();

// Revalidate specific blog
await revalidateBlogBySlug('my-blog-post');

// Revalidate pricing
await revalidatePricing();
```

### Bulk Revalidation Functions

```tsx
import {
  revalidateAllContent,
  revalidateHomepage,
  revalidateByFrequency,
} from '@/lib/utils/revalidation';

// Revalidate everything (use sparingly!)
await revalidateAllContent();

// Revalidate homepage content
await revalidateHomepage();

// Revalidate by frequency
await revalidateByFrequency('hourly');
await revalidateByFrequency('daily');
await revalidateByFrequency('weekly');
```

### Low-Level Functions

```tsx
import {
  revalidateTags,
  revalidatePaths,
  revalidateSingleTag,
  revalidateSinglePath,
} from '@/lib/utils/revalidation';
import { CACHE_TAGS } from '@/lib/utils/cache-config';

// Revalidate specific tags
await revalidateTags([CACHE_TAGS.BLOGS, CACHE_TAGS.AUTHORS]);

// Revalidate specific paths
await revalidatePaths(['/blog', '/blog/my-post']);

// Revalidate single tag
await revalidateSingleTag(CACHE_TAGS.PRICING);

// Revalidate single path
await revalidateSinglePath('/pricing');
```

## Best Practices

### 1. Granular Revalidation

Revalidate only what changed, not everything.

```tsx
// ❌ Bad: Revalidates too much
await revalidateAllContent();

// ✅ Good: Revalidates only affected content
await revalidateBlogBySlug(slug);
```

### 2. Combine Tag and Path Revalidation

Ensure complete cache invalidation.

```tsx
// Revalidate both cache tags and paths
await revalidateTags([CACHE_TAGS.BLOGS]);
await revalidatePaths(['/blog', `/blog/${slug}`]);
```

### 3. Handle Errors Gracefully

```tsx
try {
  await updateContent(slug);
  await revalidateBlogBySlug(slug);
} catch (error) {
  console.error('Failed to revalidate:', error);
  // Content is updated but cache might be stale
  // Consider retry logic or alerting
}
```

### 4. Log Revalidation Events

```tsx
import { logRevalidation } from '@/lib/utils/revalidation';

await revalidateBlogBySlug(slug);
logRevalidation('collection', `Blogs:${slug}`);
```

### 5. Use Appropriate Frequencies

Match revalidation frequency to content update patterns:

- **Hourly**: Blogs, jobs, press releases, stats
- **Daily**: Pricing, testimonials, features, integrations
- **Weekly**: Leadership, values, milestones, partners, locations

## Testing Revalidation

### Manual Testing

```bash
# Test webhook endpoint
curl -X POST http://localhost:3000/api/webhooks/pocketbase \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: test-secret" \
  -d '{
    "action": "update",
    "collection": "Blogs",
    "record": { "id": "test123" }
  }'

# Test cron endpoint
curl -X GET "http://localhost:3000/api/cron/revalidate?frequency=hourly" \
  -H "Authorization: Bearer test-secret"
```

### Automated Testing

```tsx
import { revalidateBlogBySlug } from '@/lib/utils/revalidation';

describe('Revalidation', () => {
  it('should revalidate blog by slug', async () => {
    await expect(revalidateBlogBySlug('test-slug')).resolves.not.toThrow();
  });
});
```

### Verify Revalidation

1. **Check Response Headers:**
   ```bash
   curl -I https://your-domain.com/blog
   # Look for: x-vercel-cache: MISS (after revalidation)
   ```

2. **Monitor Logs:**
   ```bash
   vercel logs --follow
   ```

3. **Use Vercel Analytics:**
   - Check cache hit rates
   - Monitor revalidation frequency
   - Track performance impact

## Troubleshooting

### Revalidation Not Working

1. **Check Environment Variables:**
   ```bash
   # Verify secrets are set
   echo $POCKETBASE_WEBHOOK_SECRET
   echo $CRON_SECRET
   ```

2. **Verify Webhook Configuration:**
   - Check PocketBase webhook URL
   - Verify webhook secret matches
   - Test webhook manually

3. **Check Logs:**
   ```bash
   # Vercel logs
   vercel logs --follow
   
   # Local logs
   npm run dev
   ```

4. **Verify Cache Tags:**
   ```tsx
   // Ensure tags are used in fetch calls
   fetch(url, {
     next: {
       tags: [CACHE_TAGS.BLOGS],
     },
   });
   ```

### Performance Issues

1. **Too Frequent Revalidation:**
   - Reduce cron frequency
   - Use more granular revalidation
   - Increase cache durations

2. **Too Many Tags:**
   - Consolidate related tags
   - Use path-based revalidation
   - Optimize tag structure

3. **Slow Revalidation:**
   - Use parallel revalidation
   - Optimize data fetching
   - Consider background jobs

## Security Considerations

### 1. Protect Webhook Endpoints

```tsx
// Verify webhook secret
const webhookSecret = request.headers.get('x-webhook-secret');
if (webhookSecret !== process.env.POCKETBASE_WEBHOOK_SECRET) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### 2. Protect Cron Endpoints

```tsx
// Verify authorization header
const authHeader = request.headers.get('authorization');
const token = authHeader?.replace('Bearer ', '');
if (token !== process.env.CRON_SECRET) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### 3. Rate Limiting

```tsx
// Implement rate limiting for webhook endpoints
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

await limiter.check(request, 10); // 10 requests per minute
```

### 4. Validate Payloads

```tsx
// Validate webhook payload structure
const schema = z.object({
  action: z.enum(['create', 'update', 'delete']),
  collection: z.string(),
  record: z.object({
    id: z.string(),
  }),
});

const payload = schema.parse(await request.json());
```

## Monitoring and Alerting

### 1. Log Revalidation Events

```tsx
console.log({
  type: 'revalidation',
  collection: 'Blogs',
  recordId: 'abc123',
  timestamp: new Date().toISOString(),
});
```

### 2. Track Metrics

```tsx
// Track revalidation duration
const startTime = Date.now();
await revalidateBlogs();
const duration = Date.now() - startTime;

console.log(`Revalidation took ${duration}ms`);
```

### 3. Set Up Alerts

Use services like:
- Vercel Monitoring
- Sentry
- DataDog
- New Relic

## Resources

- [Next.js Revalidation Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- [PocketBase Webhooks](https://pocketbase.io/docs/webhooks/)
