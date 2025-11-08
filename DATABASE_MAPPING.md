# Database Collections & Website Mapping

This document provides a comprehensive mapping of PocketBase database collections to their corresponding sections and pages across the FinWage website.

## Table of Contents
- [Collections Overview](#collections-overview)
- [Page-by-Page Mapping](#page-by-page-mapping)
- [Component-Level Mapping](#component-level-mapping)
- [Collection Details](#collection-details)

---

## Collections Overview

### Content Collections
| Collection | Description | Primary Use |
|------------|-------------|-------------|
| `blogs` | Blog posts and articles | Blog listing, featured content |
| `authors` | Blog post authors | Author information, bylines |
| `category` | Content categories | Blog filtering, organization |
| `press` | Press releases and media | Press section, news updates |

### Company Information
| Collection | Description | Primary Use |
|------------|-------------|-------------|
| `leadership` | Leadership team members | About page, team section |
| `values` | Company values | About page, careers page |
| `company_milestones` | Company history/timeline | About page journey section |
| `status` | Company statistics | Homepage stats, about page |
| `employer_stats` | Employer-specific metrics | For Employers page |

### Product & Features
| Collection | Description | Primary Use |
|------------|-------------|-------------|
| `features` | Product features | Features section, marketing pages |
| `integrations` | Integration partners | Integrations section |
| `partners` | Business partners | Partners section, homepage |
| `pricing_plans` | Pricing tiers | Pricing page |

### Support & Help
| Collection | Description | Primary Use |
|------------|-------------|-------------|
| `faqs` | FAQ items | FAQ sections across pages |
| `faq_topics` | FAQ categories | FAQ organization |
| `support` | Support resources | Resources page, contact page |
| `contact_options` | Contact methods | Contact page |

### HR & Careers
| Collection | Description | Primary Use |
|------------|-------------|-------------|
| `jobs` | Job openings | Careers page |
| `employee_benefits` | Employee benefit items | For Employees, For Employers pages |

### Compliance & Security
| Collection | Description | Primary Use |
|------------|-------------|-------------|
| `compliance_items` | Compliance frameworks | Compliance page |
| `security_features` | Security measures | Compliance page |

### Process & Workflows
| Collection | Description | Primary Use |
|------------|-------------|-------------|
| `process_steps` | Workflow steps | How It Works page |
| `cta_cards` | Call-to-action cards | Homepage CTA section |

### User Engagement
| Collection | Description | Primary Use |
|------------|-------------|-------------|
| `testimonials` | Customer testimonials | Multiple pages, homepage |
| `enquiries` | Contact form submissions | Contact form (write-only) |
| `locations` | Office locations | Contact page |

---

## Page-by-Page Mapping

### 🏠 Homepage (`/`)
**File:** `app/page.tsx`

| Section | Collections Used | Service Function |
|---------|-----------------|------------------|
| Hero | - | Static content |
| Platform | - | Static content |
| Cycle | - | Static content |
| Partners | `partners` | `getFeaturedPartners(8)` |
| Employees | - | Static content |
| StandOut | - | Static content |
| Pricing | `pricing_plans` | `getPricingPlans()` |
| Testimonials | `testimonials` | `getFeaturedTestimonials(6)` |
| Globe Stats | `status` | `getAllCompanyStats()` |
| Implementation | - | Static content |
| Blog | `blogs`, `authors`, `category` | `getFeaturedBlogs(3)` |
| CTA | `cta_cards` | `getCTACards()` |

---

### 📖 About Page (`/about`)
**File:** `app/about/page.tsx`

| Section | Collections Used | Service Function |
|---------|-----------------|------------------|
| Hero | - | Static content |
| Mission & Story | - | Static content |
| Values | `values` | `getCompanyValues()` |
| Leadership | `leadership` | `getLeadershipTeam()` |
| Timeline | `company_milestones` | `getMilestones()` |
| Vision & Compliance | - | Static content |
| CTA | - | Static content |

**Data Fetch (Parallel):**
```typescript
const [leadershipData, valuesData, milestonesData] = await Promise.all([
  getLeadershipTeam({ perPage: 100 }),
  getCompanyValues({ perPage: 100 }),
  getMilestones({ perPage: 100 }),
]);
```

---

### 📝 Blog Page (`/blog`)
**File:** `app/blog/page.tsx`

| Section | Collections Used | Service Function |
|---------|-----------------|------------------|
| Hero | - | Static content |
| Categories | `category` | `getCategories()` |
| Featured Post | `blogs`, `authors`, `category` | `getFeaturedBlogs(1)` |
| Recent Posts | `blogs`, `authors`, `category` | `getBlogs({ perPage: 20 })` |
| Newsletter | - | Static content |

**Data Fetch (Parallel):**
```typescript
const [blogsResult, featuredBlogsData, categoriesResult] = await Promise.all([
  getBlogs({ perPage: 20 }),
  getFeaturedBlogs(1),
  getCategories({ perPage: 50 }),
]);
```

**Blog Detail Page:** `/blog/[slug]`
- Uses: `blogs`, `authors`, `category`
- Function: `getBlogBySlug(slug)`

---

### 💼 Careers Page (`/careers`)
**File:** `app/careers/page.tsx`

| Section | Collections Used | Service Function |
|---------|-----------------|------------------|
| Hero | - | Static content |
| Why FinWage | `values` | `getCompanyValues()` |
| Benefits | `employee_benefits` | `getBenefitsGroupedByCategory()` |
| Featured Jobs | `jobs` | `getFeaturedJobs(3)` |
| Open Positions | `jobs` | `getJobPositions({ status: "open" })` |
| Culture | - | Static content |
| CTA | - | Static content |

**Data Fetch (Parallel):**
```typescript
const [jobsResult, featuredJobs, benefitsGrouped, values] = await Promise.all([
  getJobPositions({ status: "open", perPage: 50 }),
  getFeaturedJobs(3),
  getBenefitsGroupedByCategory(),
  getCompanyValues({ perPage: 10 }),
]);
```

---

### 🔒 Compliance Page (`/compliance`)
**File:** `app/compliance/page.tsx`

| Section | Collections Used | Service Function |
|---------|-----------------|------------------|
| Hero | - | Static content |
| Compliance Framework | `compliance_items` | `getComplianceItems()` |
| Security Features | `security_features` | `getSecurityFeatures()` |
| Reassurance | - | Static content |
| Regulatory Notes | - | Static content |
| CTA | - | Static content |

**Data Fetch (Parallel):**
```typescript
const [complianceResult, securityFeatures] = await Promise.all([
  getComplianceItems({ perPage: 20 }),
  getSecurityFeatures({ perPage: 50 }),
]);
```

---

### 📞 Contact Page (`/contact`)
**File:** `app/contact/page.tsx`

| Section | Collections Used | Service Function |
|---------|-----------------|------------------|
| Hero | - | Static content |
| Contact Options | `contact_options` | `getContactOptions()` |
| Demo Request Form | `enquiries` (write) | `createEnquiry()` |
| Support Resources | `support` | `getSupportResourcesGroupedByCategory()` |
| FAQ | `faqs`, `faq_topics` | `getFeaturedFaqItems()` |
| Office Info | `locations` | Static/`getOfficeLocations()` |

**Data Fetch:**
```typescript
const contactOptions = await getContactOptions();
```

---

### 👤 For Employees Page (`/for-employees`)
**File:** `app/for-employees/page.tsx`

| Section | Collections Used | Service Function |
|---------|-----------------|------------------|
| Hero | - | Static content |
| Why Use FinWage | `employee_benefits` | `getEmployeeBenefits()` |
| Testimonials | `testimonials` | `getTestimonials()` |
| FAQ | `faqs` | `getFAQs({ category: "employee" })` |
| CTA | - | Static content |

**Data Fetch (Parallel):**
```typescript
const [benefits, testimonialsResult, faqs] = await Promise.all([
  getEmployeeBenefits({ perPage: 20 }),
  getTestimonials({ perPage: 10 }),
  getFAQs({ perPage: 50, category: "employee" }),
]);
```

---

### 🏢 For Employers Page (`/for-employers`)
**File:** `app/for-employers/page.tsx`

| Section | Collections Used | Service Function |
|---------|-----------------|------------------|
| Hero | `employer_stats` | `getEmployerStats()` |
| Benefits Grid | `employee_benefits` | `getEmployeeBenefits()` |
| Integration | `integrations` | `getIntegrations()` |
| ROI Calculator | - | Client component |
| CTA | - | Static content |

**Data Fetch (Parallel):**
```typescript
const [benefits, stats, integrationsResult] = await Promise.all([
  getEmployeeBenefits({ perPage: 20 }),
  getEmployerStats({ perPage: 10 }),
  getIntegrations({ perPage: 50 }),
]);
```

---

### ⚙️ How It Works Page (`/how-it-works`)
**File:** `app/how-it-works/page.tsx`

| Section | Collections Used | Service Function |
|---------|-----------------|------------------|
| Hero | - | Static content |
| Employee Journey | `process_steps` | `getProcessSteps({ category: "employee" })` |
| Employer Side | `employee_benefits` | `getEmployeeBenefits()` |
| Process Diagram | - | Static content |
| CTA | - | Static content |

**Data Fetch (Parallel):**
```typescript
const [employeeSteps, employerBenefits] = await Promise.all([
  getProcessSteps({ perPage: 10, category: "employee" }),
  getEmployeeBenefits({ perPage: 20 }),
]);
```

---

### 💰 Pricing Page (`/pricing`)
**File:** `app/pricing/page.tsx`

| Section | Collections Used | Service Function |
|---------|-----------------|------------------|
| Hero | - | Static content |
| Pricing Cards | `pricing_plans` | `getPricingPlans({ activeOnly: true })` |
| Employee Benefit | - | Static content |
| FAQ | `faqs`, `faq_topics` | `getFaqItemsByCategory()` |
| CTA | - | Static content |

**Data Fetch (Cached):**
```typescript
const getCachedPricingPlans = unstable_cache(
  async () => {
    const result = await getPricingPlans({ activeOnly: true });
    return result.items;
  },
  ["pricing-plans"],
  { revalidate: 3600, tags: ["pricing"] }
);
```

---

### 📚 Resources Page (`/resources`)
**File:** `app/resources/page.tsx`

| Section | Collections Used | Service Function |
|---------|-----------------|------------------|
| Hero | - | Static content |
| Categories | - | Static content |
| Featured Articles | - | Static/future `blogs` |
| Recent Articles | - | Static/future `blogs` |
| Press & Awards | `press` | `getFeaturedPressReleases()` |
| Support Resources | `support` | `getSupportResourcesGroupedByCategory()` |
| FAQ | `faqs`, `faq_topics` | `getFeaturedFaqItems()` |

---

## Component-Level Mapping

### 🧩 Reusable Section Components
Location: `components/sections/`

#### Partners Section
**File:** `components/sections/partners.tsx`
- **Collection:** `partners`
- **Function:** `getFeaturedPartners(8)`
- **Fields Used:** `id`, `name`, `logo`
- **Used On:** Homepage

#### Testimonials Section
**File:** `components/sections/testimonials.tsx`
- **Collection:** `testimonials`
- **Function:** `getFeaturedTestimonials(6)`
- **Fields Used:** `id`, `quote`, `name`, `position`, `company`, `image`, `rating`
- **Used On:** Homepage, For Employees

#### Pricing Section
**File:** `components/sections/pricing.tsx`
- **Collection:** `pricing_plans`
- **Function:** `getPricingPlans({ activeOnly: true })`
- **Fields Used:** `id`, `name`, `description`, `price`, `features`, `limitations`, `is_popular`, `is_enterprise`
- **Used On:** Homepage

#### FAQ Section
**File:** `components/sections/faq.tsx`
- **Collections:** `faqs`, `faq_topics`
- **Functions:** 
  - `getFeaturedFaqItems(limit)`
  - `getFaqItemsGroupedByTopic()`
- **Fields Used:** `id`, `question`, `answer`, `featured`
- **Used On:** Multiple pages (Contact, Resources, Pricing)

#### Blog Section
**File:** `components/sections/blog.tsx`
- **Collections:** `blogs`, `authors`, `category`
- **Function:** `getFeaturedBlogs(3)`
- **Fields Used:** `id`, `title`, `slug`, `excerpt`, `featured_image`, `published_date`
- **Used On:** Homepage

#### Press Section
**File:** `components/sections/press.tsx`
- **Collection:** `press`
- **Function:** `getFeaturedPressReleases()`
- **Fields Used:** `id`, `title`, `published_date`, `source`, `url`
- **Used On:** Resources page

#### Support Resources Section
**File:** `components/sections/support-resources.tsx`
- **Collection:** `support`
- **Function:** `getSupportResourcesGroupedByCategory()`
- **Fields Used:** `id`, `title`, `description`, `field`, `category`
- **Used On:** Contact, Resources

---

## Collection Details

### 📝 blogs
**Purpose:** Store blog posts and articles

**Key Fields:**
- `title` - Blog post title
- `slug` - URL-friendly identifier
- `excerpt` - Short description
- `content` - Full HTML content
- `featured_image` - Hero image
- `published_date` - Publication date
- `featured` - Featured flag
- `published` - Published status
- `author` - Relation to `authors`
- `category` - Relation to `category`
- `tags` - JSON array of tags
- `views` - View count
- `seo_title`, `seo_description`, `seo_keywords` - SEO fields
- `og_image`, `canonical_url` - Social/SEO metadata

**Used On:**
- `/blog` - Main listing
- `/blog/[slug]` - Individual posts
- `/` - Featured posts section
- `/resources` - Featured articles

---

### 👤 authors
**Purpose:** Blog post author information

**Key Fields:**
- `name` - Author full name
- `slug` - URL identifier
- `email` - Contact email
- `bio` - Author biography
- `avatar` - Profile image
- `role` - Job title
- `social_link` - JSON social media links
- `active` - Active status

**Used On:**
- `/blog` - Author bylines
- `/blog/[slug]` - Author info box

---

### 🏷️ category
**Purpose:** Content categorization

**Key Fields:**
- `name` - Category name
- `slug` - URL identifier
- `description` - Category description
- `icon` - Icon identifier
- `color` - Display color
- `count` - Number of items

**Used On:**
- `/blog` - Category filters
- Various pages for content organization

---

### 👔 leadership
**Purpose:** Company leadership team

**Key Fields:**
- `name` - Leader name
- `role` - Position title
- `bio` - Biography
- `image` - Profile photo
- `email` - Contact email
- `social_links` - JSON social profiles
- `order` - Display order
- `featured` - Featured flag

**Used On:**
- `/about` - Leadership section

---

### 💎 values
**Purpose:** Company core values

**Key Fields:**
- `title` - Value name
- `description` - Value description
- `icon` - Icon identifier
- `order` - Display order
- `featured` - Featured flag

**Used On:**
- `/about` - Values section
- `/careers` - Company culture

---

### 📅 company_milestones
**Purpose:** Company history timeline

**Key Fields:**
- `year` - Year of milestone
- `event` - Milestone title
- `description` - Detailed description
- `order` - Display order
- `featured` - Featured flag

**Used On:**
- `/about` - Timeline section

---

### 💼 jobs
**Purpose:** Job openings

**Key Fields:**
- `title` - Job title
- `department` - Department name
- `location` - Office location
- `type` - Employment type (Full-time, Part-time, etc.)
- `description` - Job description
- `requirements` - Requirements list
- `salary_range` - Salary information
- `status` - Job status (open, closed, draft)
- `featured` - Featured flag

**Used On:**
- `/careers` - Job listings

---

### ✅ employee_benefits
**Purpose:** Employee benefit features

**Key Fields:**
- `title` - Benefit name
- `description` - Benefit description
- `icon` - Icon identifier
- `category` - Benefit category
- `order` - Display order

**Used On:**
- `/for-employees` - Benefits grid
- `/for-employers` - Benefits overview
- `/how-it-works` - Feature list
- `/careers` - Benefits section

---

### 📊 employer_stats
**Purpose:** Employer-focused statistics

**Key Fields:**
- `label` - Stat description
- `value` - Stat value (e.g., "27%", "100+")
- `order` - Display order

**Used On:**
- `/for-employers` - Hero stats

---

### 💲 pricing_plans
**Purpose:** Pricing tiers

**Key Fields:**
- `name` - Plan name
- `slug` - URL identifier
- `description` - Plan description
- `price` - Monthly price
- `currency` - Currency code
- `features` - JSON array of features
- `limitations` - JSON array of limitations
- `is_popular` - Popular badge
- `is_enterprise` - Enterprise flag
- `active` - Active status
- `order` - Display order

**Used On:**
- `/pricing` - Pricing cards
- `/` - Pricing section

---

### ❓ faqs
**Purpose:** FAQ items

**Key Fields:**
- `question` - FAQ question
- `answer` - FAQ answer (HTML)
- `category` - Relation to `faq_topics`
- `category_text` - Category text override
- `order` - Display order
- `featured` - Featured flag

**Used On:**
- Multiple pages - FAQ sections
- `/contact` - Support FAQs
- `/pricing` - Pricing FAQs
- `/for-employees` - Employee FAQs

---

### 📋 faq_topics
**Purpose:** FAQ categories

**Key Fields:**
- `name` - Topic name
- `description` - Topic description
- `order` - Display order

**Used On:**
- FAQ sections for grouping

---

### 🤝 partners
**Purpose:** Business partners

**Key Fields:**
- `name` - Partner name
- `slug` - URL identifier
- `logo` - Partner logo
- `description` - Partner description
- `website` - Partner website URL
- `category` - Partner category
- `featured` - Featured flag
- `active` - Active status
- `order` - Display order

**Used On:**
- `/` - Partners section

---

### 💬 testimonials
**Purpose:** Customer testimonials

**Key Fields:**
- `quote` - Testimonial text
- `name` - Customer name
- `position` - Job title
- `company` - Company name
- `image` - Profile photo
- `rating` - Star rating (1-5)
- `verified` - Verified badge
- `featured` - Featured flag
- `order` - Display order

**Used On:**
- `/` - Testimonials section
- `/for-employees` - Customer stories

---

### 🔧 integrations
**Purpose:** Platform integrations

**Key Fields:**
- `name` - Integration name
- `slug` - URL identifier
- `logo` - Integration logo
- `description` - Integration description
- `documentation_url` - Docs link
- `category` - Integration category
- `featured` - Featured flag
- `active` - Active status
- `order` - Display order

**Used On:**
- `/for-employers` - Integration showcase
- `/` - Integrations section (if enabled)

---

### 🏛️ compliance_items
**Purpose:** Compliance frameworks

**Key Fields:**
- `title` - Compliance title
- `description` - Description
- `icon` - Icon identifier
- `details` - JSON array of detail points
- `order` - Display order

**Used On:**
- `/compliance` - Compliance grid

---

### 🔐 security_features
**Purpose:** Security measures

**Key Fields:**
- `description` - Feature description
- `order` - Display order

**Used On:**
- `/compliance` - Security features list

---

### 📰 press
**Purpose:** Press releases

**Key Fields:**
- `title` - Press release title
- `content` - Full content
- `published_date` - Publication date
- `source` - Media source
- `url` - External link
- `featured` - Featured flag
- `published` - Published status

**Used On:**
- `/resources` - Press section

---

### 🛠️ support
**Purpose:** Support resources

**Key Fields:**
- `title` - Resource title
- `description` - Resource description
- `field` - Resource type/field
- `category` - Category relation
- `order` - Display order

**Used On:**
- `/contact` - Support resources
- `/resources` - Help documentation

---

### 📞 contact_options
**Purpose:** Contact methods

**Key Fields:**
- `title` - Contact method title
- `description` - Description
- `icon` - Icon identifier
- `type` - Contact type (email, phone, chat)
- `action_url` - Action link
- `is_featured` - Featured flag

**Used On:**
- `/contact` - Contact options grid

---

### 📝 enquiries
**Purpose:** Contact form submissions

**Key Fields:**
- `name` - Contact name
- `email` - Contact email
- `phone` - Phone number
- `company` - Company name
- `message` - Message text
- `interest` - Interest type (demo, support, sales, partnership)
- `status` - Enquiry status (new, contacted, resolved, closed)

**Used On:**
- `/contact` - Form submission (write-only)

---

### 📍 locations
**Purpose:** Office locations

**Key Fields:**
- `name` - Office name
- `address` - Street address
- `city`, `state`, `zip`, `country` - Location details
- `phone` - Office phone
- `email` - Office email
- `coordinates` - JSON lat/lng

**Used On:**
- `/contact` - Office information

---

### 🎯 cta_cards
**Purpose:** Call-to-action cards

**Key Fields:**
- `title` - CTA title
- `icon` - Icon identifier
- `bg_color` - Background color
- `points` - JSON array of points
- `order` - Display order

**Used On:**
- `/` - CTA section

---

### 🔄 process_steps
**Purpose:** Process workflow steps

**Key Fields:**
- `step` - Step number
- `title` - Step title
- `description` - Step description
- `icon` - Icon/emoji
- `category` - Step category (employee, employer)
- `order` - Display order

**Used On:**
- `/how-it-works` - Employee/Employer journey

---

### 📈 status
**Purpose:** Company statistics

**Key Fields:**
- `metric` - Metric name
- `value` - Metric value
- `label` - Display label
- `description` - Description
- `order` - Display order

**Used On:**
- `/` - Globe stats section
- `/about` - Company stats

---

## Service Layer

All database queries are abstracted through service functions in `lib/services/`:

- `lib/services/blogs.ts` - Blog operations
- `lib/services/authors.ts` - Author operations
- `lib/services/categories.ts` - Category operations
- `lib/services/testimonials.ts` - Testimonial operations
- `lib/services/pricing.ts` - Pricing operations
- `lib/services/partners.ts` - Partner operations
- `lib/services/features.ts` - Feature operations
- `lib/services/integrations.ts` - Integration operations
- `lib/services/company.ts` - Company info (leadership, values, milestones)
- `lib/services/careers.ts` - Job operations
- `lib/services/benefits.ts` - Employee benefits
- `lib/services/faqs.ts` - FAQ operations
- `lib/services/support.ts` - Support resources
- `lib/services/compliance.ts` - Compliance operations
- `lib/services/contact.ts` - Contact operations
- `lib/services/press.ts` - Press operations
- `lib/services/process.ts` - Process steps
- `lib/services/stats.ts` - Statistics
- `lib/services/cta.ts` - CTA cards
- `lib/services/locations.ts` - Office locations
- `lib/services/values.ts` - Company values

All services use the core API utilities from `lib/api.ts` which handles caching and error handling.

---

## Caching Strategy

### Cache Tags
Defined in `lib/config/cache.ts`:
- `blogs` - Blog content
- `authors` - Author data
- `testimonials` - Testimonials
- `pricing` - Pricing plans
- `partners` - Partner information
- `features` - Feature listings
- `integrations` - Integration data
- `company` - Company information
- `jobs` - Job postings
- `faqs` - FAQ data
- `support` - Support resources

### Revalidation Periods
- **Short (5 min):** Dynamic content (enquiries)
- **Medium (1 hour):** Regular updates (blogs, jobs)
- **Long (1 day):** Stable content (pricing, company info)
- **ISR (1 month):** Static pages (2,678,400 seconds)

---

## Database Admin

PocketBase admin panel: `http://127.0.0.1:8090/_/`

To seed the database:
```bash
cd data
npm run seed
```

---

*Last Updated: January 2025*
