# PocketBase Database Schema

Complete schema documentation for all collections in the FinWage PocketBase database.

---

## Table of Contents
- [Existing Collections (7)](#existing-collections)
- [New Collections (13)](#new-collections)

---

## Existing Collections

### 1. **blogs**
Blog posts with full content management

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `title` | text | ✓ | | Blog post title |
| `slug` | text | ✓ | Unique | URL-friendly identifier |
| `content` | editor | ✓ | | Full blog post content (rich text) |
| `excerpt` | text | | | Short description/summary |
| `author` | relation | | → authors | Author reference |
| `category` | relation | | → categories | Category reference |
| `featured_image` | file | | Max: 1 | Featured image |
| `tags` | json | | | Array of tags |
| `featured` | bool | | Default: false | Featured post flag |
| `published` | bool | | Default: false | Publication status |
| `published_date` | date | | | Publication date |
| `views` | number | | Default: 0 | View count |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

**Rules:**
- `listRule`: `published = true || @request.auth.id != ""`
- `viewRule`: `published = true || @request.auth.id != ""`

---

### 2. **authors**
Blog author profiles

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `name` | text | ✓ | | Author full name |
| `slug` | text | ✓ | Unique | URL-friendly identifier |
| `email` | email | ✓ | Unique | Contact email |
| `bio` | text | | | Author biography |
| `avatar` | file | | Max: 1 | Profile picture |
| `role` | text | | | Job title/position |
| `social_links` | json | | | Social media profiles |
| `active` | bool | | Default: true | Active status |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

---

### 3. **testimonials**
Customer testimonials

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `name` | text | ✓ | | Customer name |
| `company` | text | | | Company name |
| `position` | text | | | Job position |
| `quote` | text | ✓ | | Testimonial content |
| `rating` | number | | Min: 1, Max: 5 | Rating (1-5 stars) |
| `image` | file | | Max: 1 | Customer photo |
| `verified` | bool | | Default: false | Verification status |
| `featured` | bool | | Default: false | Featured testimonial |
| `order` | number | | | Display order |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

**Rules:**
- `listRule`: `verified = true`

---

### 4. **pricing_plans**
Pricing tier information

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `name` | text | ✓ | | Plan name |
| `slug` | text | ✓ | Unique | URL-friendly identifier |
| `description` | text | | | Plan description |
| `price` | number | ✓ | | Monthly price |
| `annual_price` | number | | | Annual price (if applicable) |
| `currency` | text | | Default: "USD" | Currency code |
| `features` | json | ✓ | | Array of features |
| `limitations` | json | | | Array of limitations |
| `is_popular` | bool | | Default: false | Popular plan badge |
| `is_enterprise` | bool | | Default: false | Enterprise plan flag |
| `order` | number | | | Display order |
| `active` | bool | | Default: true | Active status |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

**Rules:**
- `listRule`: `active = true`

---

### 5. **partners**
Company partners/integrations

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `name` | text | ✓ | | Partner name |
| `slug` | text | ✓ | Unique | URL-friendly identifier |
| `logo` | file | ✓ | Max: 1 | Partner logo |
| `website` | url | | | Partner website |
| `description` | text | | | Partnership description |
| `category` | text | | | Partner category |
| `featured` | bool | | Default: false | Featured partner |
| `order` | number | | | Display order |
| `active` | bool | | Default: true | Active status |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

**Rules:**
- `listRule`: `active = true`

---

### 6. **features**
Product features

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `title` | text | ✓ | | Feature title |
| `slug` | text | ✓ | Unique | URL-friendly identifier |
| `description` | text | ✓ | | Feature description |
| `icon` | text | | | Icon identifier/name |
| `image` | file | | Max: 1 | Feature illustration |
| `category` | text | | | Feature category |
| `order` | number | | | Display order |
| `featured` | bool | | Default: false | Featured feature |
| `active` | bool | | Default: true | Active status |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

**Rules:**
- `listRule`: `active = true`

---

### 7. **integrations**
Platform integrations

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `name` | text | ✓ | | Integration name |
| `slug` | text | ✓ | Unique | URL-friendly identifier |
| `logo` | file | ✓ | Max: 1 | Integration logo |
| `description` | text | | | Integration description |
| `category` | text | | | Integration category |
| `documentation_url` | url | | | Docs link |
| `featured` | bool | | Default: false | Featured integration |
| `order` | number | | | Display order |
| `active` | bool | | Default: true | Active status |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

**Rules:**
- `listRule`: `active = true`

---

## New Collections

### 8. **leadership**
Leadership team members

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `name` | text | ✓ | | Full name |
| `role` | text | ✓ | | Job title/position |
| `bio` | text | | | Biography |
| `image` | file | | Max: 1 | Profile photo |
| `email` | email | | | Contact email |
| `order` | number | | | Display order |
| `featured` | bool | | Default: false | Featured member |
| `social_links` | json | | | Social media links (LinkedIn, Twitter, etc.) |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

---

### 9. **company_values**
Company values and principles

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `title` | text | ✓ | | Value title |
| `description` | text | ✓ | | Value description |
| `icon` | text | | | Icon identifier |
| `order` | number | | | Display order |
| `featured` | bool | | Default: false | Featured value |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

---

### 10. **milestones**
Company milestones and timeline

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `year` | number | ✓ | | Milestone year |
| `event` | text | ✓ | | Event title |
| `description` | text | | | Detailed description |
| `order` | number | | | Display order |
| `featured` | bool | | Default: false | Featured milestone |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

---

### 11. **job_positions**
Job openings and career positions

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `title` | text | ✓ | | Job title |
| `department` | text | | | Department/team |
| `location` | text | | | Job location |
| `type` | text | | | Employment type (Full-time, Part-time, etc.) |
| `description` | text | ✓ | | Job description |
| `requirements` | text | | | Job requirements (markdown/HTML) |
| `salary_range` | text | | | Salary range |
| `featured` | bool | | Default: false | Featured position |
| `status` | text | | Default: "open" | Status (open, closed, filled) |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

**Rules:**
- `listRule`: `status = 'open'`
- `viewRule`: `status = 'open'`

---

### 12. **benefits**
Employee benefits

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `title` | text | ✓ | | Benefit title |
| `description` | text | ✓ | | Benefit description |
| `icon` | text | | | Icon identifier |
| `category` | text | | | Benefit category |
| `order` | number | | | Display order |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

---

### 13. **company_stats**
Company statistics and metrics

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `metric` | text | ✓ | | Metric name |
| `value` | text | ✓ | | Metric value (e.g., "10,000+", "$5M") |
| `label` | text | | | Display label |
| `description` | text | | | Metric description |
| `order` | number | | | Display order |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

---

### 14. **contact_options**
Contact methods and options

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `title` | text | ✓ | | Contact option title |
| `description` | text | | | Description |
| `icon` | text | | | Icon identifier |
| `type` | text | | | Contact type (email, phone, chat, etc.) |
| `action_url` | url | | | Action URL/link |
| `featured` | bool | | Default: false | Featured option |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

---

### 15. **support_resources**
Support and help resources

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `title` | text | ✓ | | Resource title |
| `description` | text | | | Resource description |
| `url` | url | ✓ | | Resource URL |
| `category` | text | | | Resource category |
| `order` | number | | | Display order |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

---

### 16. **office_locations**
Office and branch locations

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `name` | text | ✓ | | Location name |
| `address` | text | ✓ | | Street address |
| `city` | text | | | City |
| `state` | text | | | State/province |
| `zip` | text | | | ZIP/postal code |
| `country` | text | | | Country |
| `phone` | text | | | Contact phone |
| `email` | email | | | Contact email |
| `coordinates` | json | | | GPS coordinates {lat, lon} |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

---

### 17. **faq_categories**
FAQ category organization

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `name` | text | ✓ | | Category name |
| `description` | text | | | Category description |
| `order` | number | | | Display order |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

---

### 18. **faq_items**
Frequently asked questions

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `question` | text | ✓ | | Question text |
| `answer` | text | ✓ | | Answer text |
| `category` | relation | | → faq_categories | Category reference |
| `order` | number | | | Display order |
| `featured` | bool | | Default: false | Featured FAQ |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

---

### 19. **categories**
Content categories (for blogs, resources, etc.)

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `name` | text | ✓ | | Category name |
| `slug` | text | ✓ | Unique | URL-friendly identifier |
| `description` | text | | | Category description |
| `color` | text | | | Color code (hex) |
| `icon` | text | | | Icon identifier |
| `count` | number | | Default: 0 | Number of items in category |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

---

### 20. **press_releases**
Press releases and media announcements

| Field Name | Type | Required | Options | Description |
|------------|------|----------|---------|-------------|
| `id` | text | ✓ | Auto-generated | Unique identifier |
| `title` | text | ✓ | | Press release title |
| `content` | text | ✓ | | Full content |
| `published_date` | date | ✓ | | Publication date |
| `source` | text | | | Media source |
| `url` | url | | | External URL |
| `featured` | bool | | Default: false | Featured press release |
| `published` | bool | | Default: false | Publication status |
| `created` | autodate | ✓ | | Created timestamp |
| `updated` | autodate | ✓ | | Updated timestamp |

**Rules:**
- `listRule`: `featured = true || published = true`
- `viewRule`: `featured = true || published = true`

---

## Field Type Legend

| Type | Description | Example |
|------|-------------|---------|
| `text` | Short text field | "Hello World" |
| `editor` | Rich text editor (HTML/Markdown) | `<p>Content</p>` |
| `email` | Email validation | user@example.com |
| `url` | URL validation | https://example.com |
| `number` | Numeric value | 42, 3.14 |
| `bool` | Boolean (true/false) | true, false |
| `date` | Date/datetime | 2024-01-01 12:00:00 |
| `autodate` | Auto-managed timestamp | Auto-generated |
| `file` | File upload | image.jpg |
| `json` | JSON data structure | `{"key": "value"}` |
| `relation` | Reference to another collection | Collection ID |

---

## Collection Relationships

```
blogs
  ├─→ authors (author field)
  └─→ categories (category field)

faq_items
  └─→ faq_categories (category field)
```

---

## Access Rules Summary

### Public Collections (No Auth Required)
- `blogs` (published only)
- `testimonials` (verified only)
- `pricing_plans` (active only)
- `partners` (active only)
- `features` (active only)
- `integrations` (active only)
- `press_releases` (published only)

### Protected Collections (Auth Required)
- All other collections require authentication for listing/viewing

### Managed Collections
- `job_positions` - Only open positions visible
- `faq_items` - All items visible (no restriction)

---

## Notes

1. **Auto-generated fields**: All collections automatically include `id`, `created`, and `updated` fields
2. **Soft delete**: PocketBase supports soft deletion - records can be marked inactive rather than deleted
3. **File uploads**: All file fields support image optimization and thumbnail generation
4. **Relations**: Relation fields support cascade delete options
5. **JSON fields**: Store complex data structures (arrays, objects)
6. **Access rules**: Can be customized using PocketBase's filter syntax

---

## Migration Information

- **Migration file**: `1735002001_create_extended_schema.js`
- **Created**: December 24, 2024
- **Collections added**: 13 new collections
- **Total collections**: 20

---

## API Endpoints

All collections are accessible via PocketBase REST API:

```
GET    /api/collections/{collection}/records
GET    /api/collections/{collection}/records/{id}
POST   /api/collections/{collection}/records
PATCH  /api/collections/{collection}/records/{id}
DELETE /api/collections/{collection}/records/{id}
```

For detailed API documentation, visit: `http://localhost:8090/_/`
