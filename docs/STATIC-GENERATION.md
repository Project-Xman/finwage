# Static Generation and ISR Configuration

This document describes the static generation and Incremental Static Regeneration (ISR) configuration for the FinWage Next.js application.

## Overview

The application uses Next.js 15's App Router with a hybrid rendering strategy:
- **Static Generation (SSG)**: Pages are pre-rendered at build time
- **Incremental Static Regeneration (ISR)**: Static pages are revalidated and regenerated in the background
- **On-Demand Revalidation**: Pages can be manually revalidated via API routes

## Dynamic Routes with Static Generation

### Blog Posts (`/blog/[slug]`)

**Implementation**: `app/blog/[slug]/page.tsx`

```typescript
export async function generateStaticParams() {
  try {
    const blogsResult = await getBlogs({ perPage: 500 });
    return blogsResult.items.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export const revalidate = 3600; // Revalidate every hour
```

**Behavior**:
- At build time, all blog posts are fetched from PocketBase
- Static HTML pages are generated for each blog post
- Pages are revalidated every hour (3600 seconds)
- If a blog post doesn't exist at build time, it will be generated on-demand (ISR)

**Benefits**:
- Instant page loads (pre-rendered HTML)
- SEO-friendly (fully rendered content)
- Automatic updates every hour
- Graceful fallback for new posts

## Revalidation Periods

Different content types have different revalidation periods based on update frequency:

| Page/Content | Revalidation Period | Reason |
|--------------|---------------------|--------|
| Blog Listing | 1 hour (3600s) | New posts added regularly |
| Blog Detail | 1 hour (3600s) | Content may be updated |
| Pricing | 1 day (86400s) | Rarely changes |
| Testimonials | 1 day (86400s) | Stable content |
| Features | 1 day (86400s) | Stable content |
| Company Info | 1 week (604800s) | Very stable |
| Careers | 5 minutes (300s) | Frequently updated |

### Setting Revalidation Period

Add the `revalidate` export to any page:

```typescript
// app/example/page.tsx
export const revalidate = 3600; // 1 hour

export default async function ExamplePage() {
  // Page content
}
```

## On-Demand Revalidation

### Revalidation API Route

**Implementation**: `app/api/cron/revalidate/route.ts`

```typescript
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { path, tag } = await request.json();
  
  if (path) {
    revalidatePath(path);
  }
  
  if (tag) {
    revalidateTag(tag);
  }
  
  return NextResponse.json({ revalidated: true });
}
```

### Triggering Revalidation

#### From PocketBase Webhook

Configure a webhook in PocketBase to trigger revalidation when content is updated:

```javascript
// PocketBase webhook configuration
{
  "url": "https://yoursite.com/api/cron/revalidate",
  "method": "POST",
  "body": {
    "path": "/blog",
    "tag": "blogs"
  }
}
```

#### Manual Revalidation

```bash
curl -X POST https://yoursite.com/api/cron/revalidate \
  -H "Content-Type: application/json" \
  -d '{"path": "/blog/my-post-slug"}'
```

#### From Server Actions

```typescript
'use server';

import { revalidatePath } from 'next/cache';

export async function updateBlogPost(slug: string) {
  // Update logic...
  
  // Revalidate the specific blog post and listing
  revalidatePath(`/blog/${slug}`);
  revalidatePath('/blog');
}
```

## Cache Tags

Cache tags allow for granular cache invalidation:

```typescript
// lib/services/blogs.ts
export async function getBlogs() {
  return fetch(url, {
    next: {
      revalidate: 3600,
      tags: ['blogs', 'blog-list'],
    },
  });
}

export async function getBlogBySlug(slug: string) {
  return fetch(url, {
    next: {
      revalidate: 3600,
      tags: ['blogs', `blog-${slug}`],
    },
  });
}
```

Invalidate specific tags:

```typescript
import { revalidateTag } from 'next/cache';

// Revalidate all blog-related caches
revalidateTag('blogs');

// Revalidate specific blog post
revalidateTag('blog-my-post-slug');
```

## Build-Time Generation

### Build Process

1. **Static Generation**: All pages with `generateStaticParams` are pre-rendered
2. **Data Fetching**: PocketBase data is fetched during build
3. **HTML Generation**: Static HTML files are created
4. **Deployment**: Static files are deployed to CDN

### Build Command

```bash
npm run build
```

### Build Output

```
Route (app)                              Size     First Load JS
┌ ○ /                                    1.2 kB         100 kB
├ ○ /blog                                2.5 kB         105 kB
├ ● /blog/[slug]                         3.1 kB         108 kB
│   ├ /blog/post-1
│   ├ /blog/post-2
│   └ [+48 more paths]
└ ○ /pricing                             1.8 kB         102 kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
```

## Fallback Behavior

### Dynamic Route Fallback

If a blog post is requested that wasn't generated at build time:

1. Next.js generates the page on-demand (ISR)
2. The generated page is cached
3. Subsequent requests serve the cached version
4. Page is revalidated according to `revalidate` period

### Error Handling

```typescript
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogBySlug(params.slug);
  
  if (!post) {
    notFound(); // Returns 404 page
  }
  
  return <BlogContent post={post} />;
}
```

## Performance Optimization

### Parallel Data Fetching

Fetch multiple data sources in parallel:

```typescript
const [blogs, categories, featured] = await Promise.all([
  getBlogs(),
  getCategories(),
  getFeaturedBlogs(),
]);
```

### Streaming with Suspense

Stream page sections independently:

```typescript
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<BlogsSkeleton />}>
        <BlogsSection />
      </Suspense>
    </>
  );
}
```

### Prefetching

Next.js automatically prefetches links in the viewport:

```typescript
<Link href="/blog/my-post" prefetch={true}>
  Read More
</Link>
```

## Monitoring and Debugging

### Enable Fetch Logging

In `next.config.ts`:

```typescript
export default {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
```

### Check Cache Status

Response headers indicate cache status:
- `x-nextjs-cache: HIT` - Served from cache
- `x-nextjs-cache: MISS` - Generated on-demand
- `x-nextjs-cache: STALE` - Revalidating in background

### Build Analysis

Analyze build output:

```bash
npm run build
```

Look for:
- Number of static pages generated
- Build time
- Bundle sizes

## Best Practices

1. **Set Appropriate Revalidation Periods**
   - Frequently updated content: 5-60 minutes
   - Occasionally updated content: 1-24 hours
   - Rarely updated content: 1-7 days

2. **Use Cache Tags**
   - Tag related content for batch invalidation
   - Use specific tags for granular control

3. **Implement Error Handling**
   - Return empty arrays on fetch failures
   - Prevent build failures with try-catch

4. **Monitor Performance**
   - Track cache hit rates
   - Monitor revalidation frequency
   - Analyze build times

5. **Test Revalidation**
   - Verify on-demand revalidation works
   - Test webhook integration
   - Confirm cache invalidation

## Troubleshooting

### Pages Not Updating

**Issue**: Changes in PocketBase not reflected on site

**Solutions**:
1. Check revalidation period hasn't expired
2. Trigger manual revalidation
3. Verify webhook is configured correctly
4. Check cache tags are correct

### Build Failures

**Issue**: Build fails during static generation

**Solutions**:
1. Verify PocketBase is accessible during build
2. Check environment variables are set
3. Add error handling to `generateStaticParams`
4. Reduce `perPage` limit if timeout occurs

### Slow Build Times

**Issue**: Build takes too long

**Solutions**:
1. Reduce number of pages generated at build time
2. Use smaller `perPage` values
3. Implement pagination for large datasets
4. Consider on-demand generation for less critical pages

## Additional Resources

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [Incremental Static Regeneration](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
