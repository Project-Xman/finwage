# Blog Post SEO Example

This file provides an example of how to create a blog post with SEO metadata in PocketBase.

## Example Blog Post with SEO Fields

When creating a blog post in PocketBase, you can fill in the following fields:

### Standard Fields (Required/Recommended)
```json
{
  "title": "10 Ways to Improve Financial Wellness at Work",
  "slug": "10-ways-improve-financial-wellness-work",
  "excerpt": "Discover proven strategies to help your employees achieve financial wellness and reduce workplace stress.",
  "content": "<p>Full article content here...</p>",
  "published": true,
  "published_date": "2024-01-15T10:00:00Z",
  "featured": false,
  "author": "author_id_here",
  "category": "category_id_here",
  "tags": ["financial wellness", "employee benefits", "workplace"],
  "featured_image": "financial-wellness.jpg"
}
```

### SEO Fields (Optional - for Enhanced SEO)
```json
{
  "seo_title": "10 Proven Ways to Boost Employee Financial Wellness | FinWage",
  "seo_description": "Learn how to implement effective financial wellness programs that reduce employee stress, increase productivity, and improve retention. Expert insights from FinWage's workplace wellness specialists.",
  "seo_keywords": "financial wellness, employee benefits, earned wage access, workplace stress, financial education, employee retention, payroll benefits",
  "og_image": "financial-wellness-og.jpg",
  "canonical_url": null
}
```

## How It Appears in Search Results

### Google Search Result
```
10 Proven Ways to Boost Employee Financial Wellness | FinWage
https://finwage.com/blog/10-ways-improve-financial-wellness-work
Learn how to implement effective financial wellness programs that reduce 
employee stress, increase productivity, and improve retention. Expert 
insights from FinWage's...
```

### Social Media Share (Facebook/LinkedIn)
- **Title**: 10 Proven Ways to Boost Employee Financial Wellness | FinWage
- **Description**: Learn how to implement effective financial wellness programs that reduce employee stress, increase productivity, and improve retention. Expert insights from FinWage's workplace wellness specialists.
- **Image**: Custom Open Graph image (1200x630px)

### Twitter Share
- **Card**: Large image summary card
- **Title**: 10 Proven Ways to Boost Employee Financial Wellness | FinWage
- **Description**: Learn how to implement effective financial wellness programs that reduce employee stress...
- **Image**: Custom Open Graph image

## Example: Syndicated/Cross-Posted Content

If you're republishing content from another source:

```json
{
  "title": "The Future of Earned Wage Access",
  "slug": "future-earned-wage-access",
  "excerpt": "Industry experts predict major changes in EWA adoption.",
  "content": "<p>Article content...</p>",
  "canonical_url": "https://originalsource.com/articles/future-ewa"
}
```

This tells search engines that the original content is at the canonical URL, preventing duplicate content penalties.

## SEO Field Guidelines

### seo_title
- **Max length**: 60 characters (optimal for search results)
- **Include**: Primary keyword, brand name
- **Format**: "Primary Keyword | Secondary Keyword | Brand"
- **Example**: "Earned Wage Access Benefits | Employee Guide | FinWage"

### seo_description
- **Max length**: 160 characters (optimal for search results)
- **Include**: Call to action, value proposition, keywords
- **Format**: Clear, compelling summary
- **Example**: "Discover how earned wage access can improve employee financial wellness. Get instant pay access, reduce stress, and build better money habits. Learn more."

### seo_keywords
- **Format**: Comma-separated list
- **Count**: 5-10 keywords
- **Include**: Primary keyword, variations, related terms
- **Example**: "earned wage access, on-demand pay, instant pay, payroll, financial wellness, employee benefits, wage advance"

### og_image
- **Dimensions**: 1200x630px (Facebook/LinkedIn optimal)
- **Format**: JPG or PNG
- **Size**: < 1MB
- **Content**: Include branding, title text, relevant imagery
- **Example**: "financial-wellness-social.jpg"

### canonical_url
- **When to use**: Cross-posted or syndicated content only
- **Format**: Full absolute URL with protocol
- **Example**: "https://example.com/original-article"
- **Leave empty**: For original content

## Testing Your SEO

After creating a blog post with SEO fields:

1. **Build and Deploy**: `npm run build` then deploy
2. **View Page Source**: Right-click → View Page Source
3. **Check Meta Tags**: Look for `<meta>` tags in `<head>`
4. **Test Sharing**: Use social media debugger tools

### Expected Meta Tags
```html
<!-- Title and Description -->
<title>10 Proven Ways to Boost Employee Financial Wellness | FinWage</title>
<meta name="description" content="Learn how to implement effective financial wellness programs..." />
<meta name="keywords" content="financial wellness, employee benefits, earned wage access..." />

<!-- Open Graph -->
<meta property="og:title" content="10 Proven Ways to Boost Employee Financial Wellness | FinWage" />
<meta property="og:description" content="Learn how to implement effective financial wellness programs..." />
<meta property="og:image" content="https://finwage.com/_next/image?url=..." />
<meta property="og:type" content="article" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="10 Proven Ways to Boost Employee Financial Wellness | FinWage" />
<meta name="twitter:description" content="Learn how to implement effective financial wellness programs..." />
<meta name="twitter:image" content="https://finwage.com/_next/image?url=..." />
```

## Without SEO Fields (Default Behavior)

If you don't fill in the SEO fields, the system automatically uses sensible defaults:

```typescript
// Fallback logic
seo_title → "{post.title} - FinWage Blog"
seo_description → post.excerpt
seo_keywords → undefined (no keywords tag)
og_image → post.featured_image
canonical_url → undefined (no canonical tag)
```

This ensures all blog posts have proper SEO even without custom fields.
