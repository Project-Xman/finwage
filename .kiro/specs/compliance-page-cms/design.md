# Design Document

## Overview

This design document outlines the technical approach for transforming multiple static marketing pages into dynamic, CMS-backed pages using PocketBase. The solution follows the established architecture patterns used in the blog, careers, and about pages, ensuring consistency across the codebase.

The implementation will create new PocketBase collections for various content types (compliance items, security features, employee/employer benefits, FAQs, process steps, statistics, and CTA cards), implement API and service layer functions following existing patterns, and update all affected pages and components to fetch and render dynamic content.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Pages/Components                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Compliance  │  │ For-Employees│  │ For-Employers│      │
│  │     Page     │  │     Page     │  │     Page     │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │               │
│  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐      │
│  │ How-It-Works │  │ CTA Component│  │              │      │
│  │     Page     │  │              │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘      │
└─────────┼──────────────────┼──────────────────────────────┘
          │                  │
          ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  compliance  │  │   benefits   │  │     faqs     │      │
│  │   .ts        │  │     .ts      │  │     .ts      │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │               │
│  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐      │
│  │   process    │  │    stats     │  │     cta      │      │
│  │     .ts      │  │     .ts      │  │     .ts      │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼──────────────────┼──────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                        API Layer                             │
│                       lib/api.ts                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Generic fetch functions with caching & error        │   │
│  │  handling for all PocketBase collections             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      PocketBase CMS                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ compliance_  │  │  security_   │  │  employee_   │      │
│  │   items      │  │  features    │  │  benefits    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  employer_   │  │     faqs     │  │   process_   │      │
│  │  benefits    │  │              │  │    steps     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │  employer_   │  │  cta_cards   │                         │
│  │    stats     │  │              │                         │
│  └──────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Page/Component Request**: User navigates to a marketing page or component renders
2. **Service Layer Call**: Page calls appropriate service function (e.g., `getComplianceItems()`)
3. **API Layer Fetch**: Service function calls API layer function with caching configuration
4. **PocketBase Query**: API layer fetches data from PocketBase with proper query parameters
5. **Response Processing**: Data is typed, validated, and returned through the layers
6. **Error Handling**: Errors are caught at service layer, returning empty arrays for graceful degradation
7. **Rendering**: Page/component renders data with proper TypeScript types

### Caching Strategy

Following the existing pattern:
- **Revalidation Time**: 3600 seconds (1 hour) for all marketing content
- **Cache Tags**: Specific tags for each collection type for targeted revalidation
- **ISR (Incremental Static Regeneration)**: Pages use `export const revalidate = 3600`
- **Error Fallback**: Empty arrays returned on error to prevent page breaks

## Components and Interfaces

### PocketBase Collections Schema

#### 1. compliance_items Collection
```typescript
{
  id: string;
  icon: string;              // Icon name (e.g., "Shield", "Lock", "FileText")
  title: string;
  description: string;
  details: string[];         // Array of detail strings
  order: number;
  created: IsoDateString;
  updated: IsoDateString;
}
```

#### 2. security_features Collection
```typescript
{
  id: string;
  description: string;
  order: number;
  created: IsoDateString;
  updated: IsoDateString;
}
```

#### 3. employee_benefits Collection
```typescript
{
  id: string;
  icon: string;              // Icon name (e.g., "Zap", "Shield", "Heart")
  title: string;
  description: string;
  order: number;
  created: IsoDateString;
  updated: IsoDateString;
}
```

#### 4. employer_benefits Collection
```typescript
{
  id: string;
  icon: string;              // Icon name (e.g., "TrendingUp", "DollarSign")
  title: string;
  description: string;
  order: number;
  created: IsoDateString;
  updated: IsoDateString;
}
```

#### 5. faqs Collection
```typescript
{
  id: string;
  question: string;
  answer: string;
  category: string;          // "employee" | "employer" | "general"
  order: number;
  created: IsoDateString;
  updated: IsoDateString;
}
```

#### 6. process_steps Collection
```typescript
{
  id: string;
  step: string;              // Step number (e.g., "01", "02", "03")
  title: string;
  description: string;
  icon: string;              // Emoji or icon name
  category: string;          // "employee" | "employer"
  order: number;
  created: IsoDateString;
  updated: IsoDateString;
}
```

#### 7. employer_stats Collection
```typescript
{
  id: string;
  value: string;             // Display value (e.g., "27%", "$15K+")
  label: string;             // Description label
  order: number;
  created: IsoDateString;
  updated: IsoDateString;
}
```

#### 8. cta_cards Collection
```typescript
{
  id: string;
  icon: string;              // Asset path or icon name
  bgColor: string;           // Tailwind class (e.g., "bg-blue-100")
  title: string;
  points: string[];          // Array of bullet points
  order: number;
  created: IsoDateString;
  updated: IsoDateString;
}
```

### TypeScript Type Definitions

Update `types/pocketbase.ts` to include new collection types:

```typescript
export enum Collections {
  // ... existing collections
  ComplianceItems = "compliance_items",
  SecurityFeatures = "security_features",
  EmployeeBenefits = "employee_benefits",
  EmployerBenefits = "employer_benefits",
  Faqs = "faqs",
  ProcessSteps = "process_steps",
  EmployerStats = "employer_stats",
  CtaCards = "cta_cards",
}

export type ComplianceItemsRecord = {
  id: string;
  icon: string;
  title: string;
  description: string;
  details: string[];
  order: number;
  created?: IsoDateString;
  updated?: IsoDateString;
}

export type ComplianceItemsResponse<Texpand = unknown> = Required<ComplianceItemsRecord> & BaseSystemFields<Texpand>

// Similar type definitions for all other collections...
```

### API Layer Functions

Add to `lib/api.ts`:

```typescript
// Compliance Items
export async function getComplianceItems(
  options: ListOptions = {}
): Promise<PocketBaseListResponse<ComplianceItemsResponse>> {
  const params = buildQueryParams({
    page: options.page || 1,
    perPage: options.perPage || 20,
    sort: options.sort || 'order',
    filter: options.filter,
  });

  return fetchWithCache<PocketBaseListResponse<ComplianceItemsResponse>>(
    `${POCKETBASE_URL}/api/collections/compliance_items/records?${params}`,
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.COMPLIANCE],
    }
  );
}

// Security Features
export async function getSecurityFeatures(
  options: ListOptions = {}
): Promise<PocketBaseListResponse<SecurityFeaturesResponse>> {
  // Similar implementation
}

// Employee Benefits
export async function getEmployeeBenefits(
  options: ListOptions = {}
): Promise<PocketBaseListResponse<EmployeeBenefitsResponse>> {
  // Similar implementation
}

// Employer Benefits
export async function getEmployerBenefits(
  options: ListOptions = {}
): Promise<PocketBaseListResponse<EmployerBenefitsResponse>> {
  // Similar implementation
}

// FAQs with category filtering
export async function getFAQs(
  options: ListOptions & { category?: string } = {}
): Promise<PocketBaseListResponse<FaqsResponse>> {
  const filter = options.category 
    ? `category="${options.category}"` 
    : options.filter;
  
  const params = buildQueryParams({
    page: options.page || 1,
    perPage: options.perPage || 50,
    sort: options.sort || 'order',
    filter,
  });

  return fetchWithCache<PocketBaseListResponse<FaqsResponse>>(
    `${POCKETBASE_URL}/api/collections/faqs/records?${params}`,
    {
      revalidate: CACHE_DURATION.LONG,
      tags: [CACHE_TAGS.FAQS],
    }
  );
}

// Process Steps with category filtering
export async function getProcessSteps(
  options: ListOptions & { category?: string } = {}
): Promise<PocketBaseListResponse<ProcessStepsResponse>> {
  // Similar implementation with category filter
}

// Employer Stats
export async function getEmployerStats(
  options: ListOptions = {}
): Promise<PocketBaseListResponse<EmployerStatsResponse>> {
  // Similar implementation
}

// CTA Cards
export async function getCTACards(
  options: ListOptions = {}
): Promise<PocketBaseListResponse<CtaCardsResponse>> {
  // Similar implementation
}
```

### Service Layer Functions

#### lib/services/compliance.ts
```typescript
import type {
  ComplianceItemsResponse,
  SecurityFeaturesResponse,
} from '@/types/pocketbase';
import {
  getComplianceItems as apiFetchComplianceItems,
  getSecurityFeatures as apiFetchSecurityFeatures,
} from '@/lib/api';

export interface ComplianceListOptions {
  page?: number;
  perPage?: number;
  sort?: string;
}

export interface ComplianceListResult {
  items: ComplianceItemsResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

export async function getComplianceItems(
  options: ComplianceListOptions = {}
): Promise<ComplianceListResult> {
  try {
    const {
      page = 1,
      perPage = 20,
      sort = 'order',
    } = options;

    const response = await apiFetchComplianceItems({
      page,
      perPage,
      sort,
    });

    return {
      items: response.items,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
      page: response.page,
      perPage: response.perPage,
    };
  } catch (error) {
    console.error('Failed to fetch compliance items:', error);
    return {
      items: [],
      totalPages: 0,
      totalItems: 0,
      page: options.page || 1,
      perPage: options.perPage || 20,
    };
  }
}

export async function getSecurityFeatures(
  options: ComplianceListOptions = {}
): Promise<SecurityFeaturesResponse[]> {
  try {
    const {
      page = 1,
      perPage = 50,
      sort = 'order',
    } = options;

    const response = await apiFetchSecurityFeatures({
      page,
      perPage,
      sort,
    });

    return response.items;
  } catch (error) {
    console.error('Failed to fetch security features:', error);
    return [];
  }
}
```

#### lib/services/benefits.ts
```typescript
// Similar structure for employee and employer benefits
export async function getEmployeeBenefits(
  options: BenefitsListOptions = {}
): Promise<EmployeeBenefitsResponse[]> {
  // Implementation following same pattern
}

export async function getEmployerBenefits(
  options: BenefitsListOptions = {}
): Promise<EmployerBenefitsResponse[]> {
  // Implementation following same pattern
}
```

#### lib/services/faqs.ts
```typescript
export async function getFAQs(
  options: FAQListOptions & { category?: string } = {}
): Promise<FaqsResponse[]> {
  try {
    const response = await apiFetchFAQs({
      page: options.page || 1,
      perPage: options.perPage || 50,
      sort: options.sort || 'order',
      category: options.category,
    });

    return response.items;
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    return [];
  }
}
```

#### lib/services/process.ts
```typescript
export async function getProcessSteps(
  options: ProcessListOptions & { category?: string } = {}
): Promise<ProcessStepsResponse[]> {
  // Implementation with category filtering
}
```

#### lib/services/stats.ts
```typescript
export async function getEmployerStats(
  options: StatsListOptions = {}
): Promise<EmployerStatsResponse[]> {
  // Implementation following same pattern
}
```

#### lib/services/cta.ts
```typescript
export async function getCTACards(
  options: CTAListOptions = {}
): Promise<CtaCardsResponse[]> {
  // Implementation following same pattern
}
```

### Icon Mapping Utility

Create `lib/utils/icon-mapper.tsx`:

```typescript
import {
  Shield,
  Lock,
  FileText,
  Globe,
  Award,
  Zap,
  Heart,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Check,
  Building2,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Shield,
  Lock,
  FileText,
  Globe,
  Award,
  Zap,
  Heart,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Check,
  Building2,
  ArrowRight,
};

export function getIconComponent(
  iconName: string,
  defaultIcon: React.ComponentType<any> = Heart
): React.ComponentType<any> {
  return iconMap[iconName] || defaultIcon;
}

export function renderIcon(
  iconName: string,
  className: string = "w-8 h-8"
): React.ReactNode {
  const IconComponent = getIconComponent(iconName);
  return <IconComponent className={className} />;
}
```

### Page Component Updates

#### app/compliance/page.tsx
```typescript
import { getComplianceItems, getSecurityFeatures } from '@/lib/services/compliance';
import { renderIcon } from '@/lib/utils/icon-mapper';

export const revalidate = 3600;

export default async function CompliancePage() {
  const [complianceResult, securityFeatures] = await Promise.all([
    getComplianceItems({ perPage: 20 }),
    getSecurityFeatures({ perPage: 50 }),
  ]);

  const complianceItems = complianceResult.items;

  return (
    <main className="min-h-screen">
      {/* ... existing JSX ... */}
      <div className="grid md:grid-cols-2 gap-8">
        {complianceItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1d44c3] rounded-full text-white mb-6">
                {renderIcon(item.icon)}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-6">{item.description}</p>
              <ul className="space-y-3">
                {item.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* ... security features section ... */}
    </main>
  );
}
```

#### app/for-employees/page.tsx
```typescript
import { getEmployeeBenefits } from '@/lib/services/benefits';
import { getTestimonials } from '@/lib/services/testimonials';
import { getFAQs } from '@/lib/services/faqs';
import { renderIcon } from '@/lib/utils/icon-mapper';

export const revalidate = 3600;

export default async function ForEmployeesPage() {
  const [benefits, testimonials, faqs] = await Promise.all([
    getEmployeeBenefits({ perPage: 20 }),
    getTestimonials({ perPage: 10, category: 'employee' }),
    getFAQs({ perPage: 50, category: 'employee' }),
  ]);

  return (
    <main className="min-h-screen">
      {/* Benefits section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit) => (
          <Card key={benefit.id}>
            <CardContent className="p-8">
              <div className="text-[#1d44c3] mb-4">
                {renderIcon(benefit.icon)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Testimonials and FAQs sections */}
    </main>
  );
}
```

#### app/for-employers/page.tsx
```typescript
import { getEmployerBenefits } from '@/lib/services/benefits';
import { getEmployerStats } from '@/lib/services/stats';
import { getIntegrations } from '@/lib/services/integrations';

export const revalidate = 3600;

export default async function ForEmployersPage() {
  const [benefits, stats, integrations] = await Promise.all([
    getEmployerBenefits({ perPage: 20 }),
    getEmployerStats({ perPage: 10 }),
    getIntegrations({ perPage: 50 }),
  ]);

  // Render with fetched data
}
```

#### app/how-it-works/page.tsx
```typescript
import { getProcessSteps } from '@/lib/services/process';
import { getEmployerBenefits } from '@/lib/services/benefits';

export const revalidate = 3600;

export default async function HowItWorksPage() {
  const [employeeSteps, employerBenefits] = await Promise.all([
    getProcessSteps({ perPage: 10, category: 'employee' }),
    getEmployerBenefits({ perPage: 20 }),
  ]);

  // Render with fetched data
}
```

#### components/sections/cta.tsx
```typescript
"use client";

import { useEffect, useState } from 'react';
import { getCTACards } from '@/lib/services/cta';
import type { CtaCardsResponse } from '@/types/pocketbase';

export default function Cta() {
  const [cards, setCards] = useState<CtaCardsResponse[]>([]);

  useEffect(() => {
    async function loadCards() {
      const data = await getCTACards({ perPage: 10 });
      setCards(data);
    }
    loadCards();
  }, []);

  // Render with fetched cards
}
```

## Data Models

### Cache Configuration

Add to `lib/utils/cache-config.ts`:

```typescript
export const CACHE_TAGS = {
  // ... existing tags
  COMPLIANCE: 'compliance',
  SECURITY: 'security',
  EMPLOYEE_BENEFITS: 'employee-benefits',
  EMPLOYER_BENEFITS: 'employer-benefits',
  FAQS: 'faqs',
  PROCESS_STEPS: 'process-steps',
  EMPLOYER_STATS: 'employer-stats',
  CTA_CARDS: 'cta-cards',
};
```

### Migration Data Structure

The migration script will extract data from commented code blocks and transform it into PocketBase records:

```typescript
// Example: Compliance Items Migration
const complianceItemsData = [
  {
    icon: "Shield",
    title: "AML Compliance",
    description: "Full Anti-Money Laundering protocols and Know Your Customer (KYC) verification processes",
    details: [
      "Transaction monitoring and reporting",
      "Identity verification for all users",
      "Suspicious activity detection",
      "Regular compliance audits",
    ],
    order: 1,
  },
  // ... more items
];
```

## Error Handling

### Service Layer Error Handling

All service functions follow this pattern:

```typescript
try {
  const response = await apiFunction(options);
  return response.items;
} catch (error) {
  console.error('Failed to fetch data:', error);
  return []; // Return empty array for graceful degradation
}
```

### Page-Level Error Handling

Pages handle empty data gracefully:

```typescript
{items.length > 0 ? (
  items.map(item => <Component key={item.id} {...item} />)
) : (
  <p>No items available at this time.</p>
)}
```

### TypeScript Error Resolution

All TypeScript errors will be resolved by:
1. Defining proper types in `types/pocketbase.ts`
2. Fetching data from PocketBase instead of using undefined variables
3. Properly typing all function parameters and return values
4. Removing unused imports after data is fetched dynamically

## Testing Strategy

### Unit Tests
- Test service layer functions with mocked API responses
- Test icon mapper utility with various icon names
- Test error handling with failed API calls

### Integration Tests
- Test data fetching from PocketBase collections
- Test page rendering with real data
- Test ISR revalidation behavior

### Manual Testing
- Verify all pages render correctly with PocketBase data
- Verify icon mapping works for all icon names
- Verify graceful degradation when data is unavailable
- Verify TypeScript errors are resolved
- Test content updates in PocketBase reflect on pages after revalidation

### Performance Testing
- Verify caching is working correctly
- Verify page load times are acceptable
- Verify ISR revalidation occurs at expected intervals

## Implementation Notes

1. **Incremental Approach**: Implement one page at a time, starting with compliance page
2. **Type Safety**: Ensure all PocketBase types are properly generated and imported
3. **Reusability**: Create shared utilities (icon mapper) for use across pages
4. **Consistency**: Follow existing patterns from blog, careers, and about pages
5. **Testing**: Test each page after implementation before moving to the next
6. **Migration**: Create seed data script to populate PocketBase with existing content
7. **Documentation**: Update README with new collections and their purposes
