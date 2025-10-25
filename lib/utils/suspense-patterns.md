# Suspense and Streaming Patterns

This document outlines best practices for using React Suspense with Next.js 15 Server Components to optimize page loading performance.

## Overview

Suspense allows you to stream content to the client as it becomes available, rather than waiting for all data to load before rendering the page. This improves perceived performance and Time to First Byte (TTFB).

## When to Use Suspense

### ✅ Good Use Cases

1. **Non-Critical Content**
   - Blog posts below the fold
   - Testimonials
   - Related content
   - Sidebar widgets

2. **Slow Data Sources**
   - External API calls
   - Complex database queries
   - Large data aggregations

3. **Optional Features**
   - Recommendations
   - Social feeds
   - Comments sections

4. **Progressive Enhancement**
   - Features that enhance but aren't required
   - Analytics widgets
   - Third-party integrations

### ❌ Avoid Suspense For

1. **Critical Above-the-Fold Content**
   - Hero sections
   - Main navigation
   - Primary call-to-action

2. **SEO-Critical Content**
   - Main page content
   - Product descriptions
   - Article body text

3. **Fast Data Sources**
   - Cached data
   - Static content
   - Local data

## Implementation Patterns

### Pattern 1: Basic Suspense Boundary

```tsx
import { Suspense } from 'react';
import { BlogList } from '@/components/blog-list';
import { BlogListSkeleton } from '@/components/ui/loading-skeletons';

export default function Page() {
  return (
    <main>
      <HeroSection /> {/* Renders immediately */}
      
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList /> {/* Streams in when ready */}
      </Suspense>
    </main>
  );
}
```

### Pattern 2: Multiple Suspense Boundaries

```tsx
export default function Page() {
  return (
    <main>
      <HeroSection />
      
      {/* Each section streams independently */}
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<FeaturesSkeleton />}>
        <FeaturesSection />
      </Suspense>
      
      <Suspense fallback={<BlogsSkeleton />}>
        <BlogsSection />
      </Suspense>
    </main>
  );
}
```

### Pattern 3: Nested Suspense

```tsx
export default function Page() {
  return (
    <main>
      <Suspense fallback={<PageSkeleton />}>
        <PageContent>
          {/* Critical content loads first */}
          <MainContent />
          
          {/* Sidebar streams in separately */}
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar />
          </Suspense>
        </PageContent>
      </Suspense>
    </main>
  );
}
```

### Pattern 4: Conditional Suspense

```tsx
export default function Page({ showRecommendations }: Props) {
  return (
    <main>
      <MainContent />
      
      {showRecommendations && (
        <Suspense fallback={<RecommendationsSkeleton />}>
          <Recommendations />
        </Suspense>
      )}
    </main>
  );
}
```

### Pattern 5: Parallel Loading with Suspense

```tsx
export default async function Page() {
  // Fetch critical data first
  const criticalData = await getCriticalData();
  
  return (
    <main>
      <HeroSection data={criticalData} />
      
      {/* These load in parallel and stream independently */}
      <Suspense fallback={<Skeleton1 />}>
        <Section1 />
      </Suspense>
      
      <Suspense fallback={<Skeleton2 />}>
        <Section2 />
      </Suspense>
      
      <Suspense fallback={<Skeleton3 />}>
        <Section3 />
      </Suspense>
    </main>
  );
}
```

## Loading Skeleton Best Practices

### 1. Match Content Structure

```tsx
// ❌ Bad: Generic skeleton
<Skeleton className="h-64 w-full" />

// ✅ Good: Matches actual content structure
<Card>
  <CardHeader>
    <Skeleton className="h-8 w-48 mb-2" />
    <Skeleton className="h-4 w-32" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-3/4" />
  </CardContent>
</Card>
```

### 2. Use Consistent Styling

```tsx
// Keep skeleton colors and animations consistent
<Skeleton className="h-6 w-full animate-pulse bg-gray-200" />
```

### 3. Show Appropriate Count

```tsx
// Show expected number of items
<div className="grid grid-cols-3 gap-4">
  {Array.from({ length: 6 }).map((_, i) => (
    <BlogCardSkeleton key={i} />
  ))}
</div>
```

## Performance Optimization

### 1. Granular Boundaries

```tsx
// ❌ Bad: One large boundary
<Suspense fallback={<PageSkeleton />}>
  <EntirePage />
</Suspense>

// ✅ Good: Multiple smaller boundaries
<>
  <CriticalSection />
  <Suspense fallback={<Section1Skeleton />}>
    <Section1 />
  </Suspense>
  <Suspense fallback={<Section2Skeleton />}>
    <Section2 />
  </Suspense>
</>
```

### 2. Priority Loading

```tsx
export default async function Page() {
  // Load high-priority data first
  const heroData = await getHeroData();
  
  return (
    <>
      {/* High priority - render immediately */}
      <Hero data={heroData} />
      
      {/* Medium priority - stream next */}
      <Suspense fallback={<ContentSkeleton />}>
        <MainContent />
      </Suspense>
      
      {/* Low priority - stream last */}
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </>
  );
}
```

### 3. Combine with Parallel Fetching

```tsx
// Async component that fetches data
async function BlogsSection() {
  // Multiple fetches in parallel
  const [featured, recent] = await Promise.all([
    getFeaturedBlogs(3),
    getRecentBlogs(6),
  ]);
  
  return (
    <section>
      <FeaturedBlogs blogs={featured} />
      <RecentBlogs blogs={recent} />
    </section>
  );
}

// Wrap in Suspense at page level
export default function Page() {
  return (
    <Suspense fallback={<BlogsSkeleton />}>
      <BlogsSection />
    </Suspense>
  );
}
```

## Error Handling with Suspense

### Using Error Boundaries

```tsx
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button onClick={reset} className="btn-primary">
        Try again
      </button>
    </div>
  );
}
```

### Graceful Degradation

```tsx
async function BlogsSection() {
  try {
    const blogs = await getBlogs();
    return <BlogList blogs={blogs} />;
  } catch (error) {
    // Return fallback UI instead of throwing
    return (
      <div className="p-8 text-center text-gray-600">
        <p>Unable to load blogs at this time.</p>
      </div>
    );
  }
}
```

## Testing Suspense Boundaries

### Simulate Slow Loading

```tsx
// Add artificial delay for testing
async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  const data = await getData();
  return <Component data={data} />;
}
```

### Test Loading States

```tsx
import { render, screen } from '@testing-library/react';

test('shows loading skeleton', () => {
  render(
    <Suspense fallback={<div>Loading...</div>}>
      <AsyncComponent />
    </Suspense>
  );
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
```

## Common Pitfalls

### ❌ Pitfall 1: Too Many Boundaries

```tsx
// Creates too many waterfalls
<Suspense fallback={<Skeleton />}>
  <Component1 />
</Suspense>
<Suspense fallback={<Skeleton />}>
  <Component2 />
</Suspense>
<Suspense fallback={<Skeleton />}>
  <Component3 />
</Suspense>
```

### ✅ Solution: Group Related Content

```tsx
<Suspense fallback={<SectionSkeleton />}>
  <Section>
    <Component1 />
    <Component2 />
    <Component3 />
  </Section>
</Suspense>
```

### ❌ Pitfall 2: Suspense for Static Content

```tsx
// Unnecessary for static content
<Suspense fallback={<Skeleton />}>
  <StaticHero />
</Suspense>
```

### ✅ Solution: Only Wrap Dynamic Content

```tsx
<StaticHero />
<Suspense fallback={<Skeleton />}>
  <DynamicContent />
</Suspense>
```

### ❌ Pitfall 3: Missing Loading States

```tsx
// No fallback provided
<Suspense>
  <AsyncComponent />
</Suspense>
```

### ✅ Solution: Always Provide Fallback

```tsx
<Suspense fallback={<ComponentSkeleton />}>
  <AsyncComponent />
</Suspense>
```

## Performance Metrics

### Measuring Impact

```tsx
// Use Next.js Speed Insights
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Key Metrics to Track

1. **Time to First Byte (TTFB)**: Should improve with streaming
2. **First Contentful Paint (FCP)**: Critical content renders faster
3. **Largest Contentful Paint (LCP)**: Main content appears sooner
4. **Cumulative Layout Shift (CLS)**: Skeletons prevent layout shifts

## Resources

- [Next.js Streaming Documentation](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [React Suspense Documentation](https://react.dev/reference/react/Suspense)
- [Web.dev: Streaming SSR](https://web.dev/streaming-ssr/)
