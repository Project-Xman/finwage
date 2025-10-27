# Blog SEO Configuration

This document describes the SEO metadata configuration for blog pages in the FinWage Next.js application using Next.js 15's Metadata API.

## Overview

Blog posts support comprehensive SEO metadata that is stored in PocketBase and used to generate static pages with optimized meta tags for search engines and social media platforms.

## SEO Fields in PocketBase

The `blogs` collection in PocketBase includes the following SEO-specific fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `seo_title` | string | No | Custom SEO title for search engines (overrides default title) |
| `seo_description` | string | No | Custom meta description for search results (overrides excerpt) |
| `seo_keywords` | string | No | Comma-separated keywords for meta keywords tag |
| `og_image` | string | No | Custom Open Graph image (overrides featured_image) |
| `canonical_url` | string | No | Canonical URL for the blog post (useful for cross-posting) |

All SEO fields are **optional** and have sensible fallbacks to maintain backward compatibility.

## Implementation

### PocketBase Schema Updates

When setting up your PocketBase instance, add these fields to the `blogs` collection:

```javascript
// PocketBase collection schema
{
  "name": "blogs",
  "fields": [
    // ... existing fields ...
    {
      "name": "seo_title",
      "type": "text",
      "required": false,
      "options": {
        "max": 160 // Recommended max length for title tags
      }
    },
    {
      "name": "seo_description",
      "type": "text",
      "required": false,
      "options": {
        "max": 320 // Recommended max length for meta descriptions
      }
    },
    {
      "name": "seo_keywords",
      "type": "text",
      "required": false,
      "options": {
        "max": 500
      }
    },
    {
      "name": "og_image",
      "type": "text",
      "required": false
    },
    {
      "name": "canonical_url",
      "type": "url",
      "required": false
    }
  ]
}
```

### TypeScript Types

The SEO fields are defined in `types/pocketbase.ts`:

```typescript
export type BlogsRecord<Ttags = unknown> = {
  // ... existing fields ...
  
  // SEO metadata fields for Next.js 15 static generation
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
  og_image?: string
  canonical_url?: string
}
```

### Metadata Generation

The SEO metadata is automatically generated in `app/blog/[slug]/page.tsx` using Next.js 15's `generateMetadata` function:

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found - FinWage",
    };
  }

  // Use SEO fields if available, otherwise fallback to default fields
  const seoTitle = post.seo_title || `${post.title} - FinWage Blog`;
  const seoDescription = post.seo_description || post.excerpt;
  const ogImageUrl = post.og_image 
    ? getImageUrl(post, post.og_image, { fallback: '/placeholder.jpg' })
    : getImageUrl(post, post.featured_image?.[0], { fallback: '/placeholder.jpg' });

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: post.seo_keywords,
    alternates: post.canonical_url ? {
      canonical: post.canonical_url,
    } : undefined,
    openGraph: {
      title: post.seo_title || post.title,
      description: seoDescription,
      images: [ogImageUrl],
      type: 'article',
      publishedTime: post.published_date,
      authors: [(post.expand?.author as AuthorsResponse)?.name],
      tags: Array.isArray(post.tags) ? post.tags : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo_title || post.title,
      description: seoDescription,
      images: [ogImageUrl],
    },
  };
}
```

## Generated Meta Tags

When a blog post with SEO fields is rendered, the following meta tags are automatically generated:

### Basic Meta Tags
```html
<title>Custom SEO Title</title>
<meta name="description" content="Custom SEO Description" />
<meta name="keywords" content="keyword1, keyword2, keyword3" />
<link rel="canonical" href="https://example.com/blog/post-slug" />
```

### Open Graph (Facebook, LinkedIn)
```html
<meta property="og:title" content="Custom SEO Title" />
<meta property="og:description" content="Custom SEO Description" />
<meta property="og:image" content="https://example.com/custom-og-image.jpg" />
<meta property="og:type" content="article" />
<meta property="article:published_time" content="2024-01-01T00:00:00Z" />
<meta property="article:author" content="Author Name" />
<meta property="article:tag" content="tag1" />
<meta property="article:tag" content="tag2" />
```

### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Custom SEO Title" />
<meta name="twitter:description" content="Custom SEO Description" />
<meta name="twitter:image" content="https://example.com/custom-og-image.jpg" />
```

## Fallback Behavior

Each SEO field has a sensible fallback to ensure pages are always properly optimized:

| SEO Field | Fallback | Notes |
|-----------|----------|-------|
| `seo_title` | `{post.title} - FinWage Blog` | Default format includes site branding |
| `seo_description` | `post.excerpt` | Uses the blog post excerpt |
| `seo_keywords` | `undefined` | No keywords tag if not specified |
| `og_image` | `post.featured_image` | Falls back to the main featured image |
| `canonical_url` | `undefined` | No canonical tag if not specified |

## Best Practices

### SEO Title
- **Length**: 50-60 characters for optimal display in search results
- **Format**: Include keywords but keep it natural and readable
- **Branding**: The fallback automatically adds " - FinWage Blog"
- **Example**: "10 Ways to Improve Financial Wellness at Work"

### SEO Description
- **Length**: 150-160 characters for optimal display
- **Content**: Compelling summary that encourages clicks
- **Keywords**: Include target keywords naturally
- **Example**: "Discover proven strategies to help your employees achieve financial wellness and reduce workplace stress. Expert insights from FinWage."

### SEO Keywords
- **Format**: Comma-separated list
- **Count**: 5-10 relevant keywords
- **Relevance**: Focus on terms users actually search for
- **Example**: "financial wellness, employee benefits, earned wage access, payroll, financial stress"

### Open Graph Image
- **Dimensions**: 1200x630px (recommended)
- **Format**: JPG or PNG
- **File size**: < 1MB for fast loading
- **Content**: Include text overlay for context when shared

### Canonical URL
- **When to use**: 
  - Content is republished from another source
  - Same content appears at multiple URLs
  - Syndicated content
- **Format**: Full absolute URL including protocol
- **Example**: "https://finwage.com/blog/original-post-slug"

## Managing SEO in PocketBase

### Creating a New Blog Post with SEO

When creating a blog post in PocketBase:

1. Fill in the standard fields (title, excerpt, content, etc.)
2. Optionally add custom SEO fields:
   - `seo_title`: If you want a different title for search engines
   - `seo_description`: If you want a custom meta description
   - `seo_keywords`: Add relevant keywords
   - `og_image`: Upload a custom social media image
   - `canonical_url`: Add if this is republished content

### Updating SEO for Existing Posts

To update SEO for existing blog posts:

1. Access the PocketBase admin panel
2. Navigate to the `blogs` collection
3. Edit the blog post
4. Update the SEO fields as needed
5. Save changes

The page will be automatically revalidated according to the ISR configuration (default: 1 hour).

## Static Generation with SEO

### Build-Time Generation

During the build process:

1. `generateStaticParams` fetches all published blog posts
2. For each post, a static HTML page is generated
3. `generateMetadata` is called to generate SEO meta tags
4. Meta tags are embedded in the static HTML
5. Pages are deployed with full SEO optimization

### Incremental Static Regeneration (ISR)

After build:

1. Pages are served from static cache (instant loading)
2. After 1 hour (revalidation period), pages are regenerated in the background
3. Updated SEO metadata is automatically included
4. New static pages replace old ones

### Benefits

- **SEO-Friendly**: Full HTML with meta tags at request time
- **Performance**: Static pages load instantly
- **Fresh Content**: Automatic updates via ISR
- **Social Sharing**: Optimized Open Graph and Twitter Card data
- **Search Rankings**: Proper meta tags improve discoverability

## Testing SEO Implementation

### Local Development

1. Start the development server: `npm run dev`
2. Navigate to a blog post: `http://localhost:3000/blog/post-slug`
3. View page source (right-click → View Page Source)
4. Verify meta tags are present in the `<head>` section

### Production Testing

#### Testing Meta Tags

Use these tools to verify SEO implementation:

1. **Google's Rich Results Test**: https://search.google.com/test/rich-results
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

#### Testing with cURL

```bash
# Fetch the HTML and verify meta tags
curl -s https://finwage.com/blog/post-slug | grep -i 'meta name="description"'
curl -s https://finwage.com/blog/post-slug | grep -i 'meta property="og:title"'
curl -s https://finwage.com/blog/post-slug | grep -i 'meta name="twitter:card"'
```

## Troubleshooting

### Meta Tags Not Appearing

**Issue**: SEO meta tags are not in the page source

**Solutions**:
1. Verify the blog post has the SEO fields populated in PocketBase
2. Clear Next.js cache: `rm -rf .next`
3. Rebuild: `npm run build`
4. Check browser view-source (not DevTools) to see server-rendered HTML

### Social Media Preview Not Working

**Issue**: Social media platforms not showing proper preview

**Solutions**:
1. Verify Open Graph image URL is absolute (includes domain)
2. Check image dimensions (1200x630px recommended)
3. Clear social media cache using their debugging tools
4. Ensure image is publicly accessible (not behind authentication)

### Canonical URL Issues

**Issue**: Duplicate content warnings in Google Search Console

**Solutions**:
1. Set proper canonical URL in PocketBase
2. Ensure canonical URL points to the primary version
3. Use absolute URLs with protocol (https://)
4. Verify canonical tag in page source

## Additional Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Google SEO Guidelines](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Article](https://schema.org/Article)

## Migration Guide

### Upgrading Existing Blog Posts

To add SEO fields to existing blog posts:

1. **Add Fields to PocketBase Schema**:
   - Access PocketBase admin panel
   - Navigate to Collections → blogs
   - Add new fields as described above

2. **Update TypeScript Types**:
   - Types are already updated in `types/pocketbase.ts`
   - No additional changes needed

3. **Generate New Static Pages**:
   ```bash
   npm run build
   ```

4. **Verify in Production**:
   - Deploy updated application
   - Test meta tags on live site
   - Validate with SEO tools

### Backward Compatibility

The implementation is fully backward compatible:

- Existing blog posts without SEO fields will use fallbacks
- No breaking changes to existing functionality
- SEO fields can be added incrementally over time
- All fields are optional
