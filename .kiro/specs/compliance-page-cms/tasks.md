# Implementation Plan

- [x] 1. Set up PocketBase collections and type definitions
  - Create all 8 new PocketBase collections with proper field definitions
  - Generate TypeScript types for new collections in `types/pocketbase.ts`
  - Update Collections enum with new collection names
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11_

- [x] 2. Implement API layer functions
  - [x] 2.1 Add compliance and security API functions to `lib/api.ts`
    - Implement `getComplianceItems()` with pagination and sorting
    - Implement `getSecurityFeatures()` with pagination and sorting
    - Add proper caching configuration with tags
    - _Requirements: 2.1, 2.2, 2.9, 2.10_

  - [x] 2.2 Add benefits API functions to `lib/api.ts`
    - Implement `getEmployeeBenefits()` with pagination and sorting
    - Implement `getEmployerBenefits()` with pagination and sorting
    - Add proper caching configuration with tags
    - _Requirements: 2.3, 2.4, 2.9, 2.10_

  - [x] 2.3 Add FAQ and process steps API functions to `lib/api.ts`
    - Implement `getFAQs()` with category filtering support
    - Implement `getProcessSteps()` with category filtering support
    - Add proper caching configuration with tags
    - _Requirements: 2.5, 2.6, 2.9, 2.10_

  - [x] 2.4 Add stats and CTA API functions to `lib/api.ts`
    - Implement `getEmployerStats()` with pagination and sorting
    - Implement `getCTACards()` with pagination and sorting
    - Add proper caching configuration with tags
    - _Requirements: 2.7, 2.8, 2.9, 2.10_

- [x] 3. Implement service layer functions
  - [x] 3.1 Create compliance service at `lib/services/compliance.ts`
    - Implement `getComplianceItems()` with error handling
    - Implement `getSecurityFeatures()` with error handling
    - Add proper TypeScript types and interfaces
    - _Requirements: 3.1, 3.2, 3.9, 3.10, 3.11_

  - [x] 3.2 Create benefits service at `lib/services/benefits.ts`
    - Implement `getEmployeeBenefits()` with error handling
    - Implement `getEmployerBenefits()` with error handling
    - Add proper TypeScript types and interfaces
    - _Requirements: 3.3, 3.4, 3.9, 3.10, 3.11_

  - [x] 3.3 Create FAQ service at `lib/services/faqs.ts`
    - Implement `getFAQs()` with category filtering and error handling
    - Add proper TypeScript types and interfaces
    - _Requirements: 3.5, 3.9, 3.10, 3.11_

  - [x] 3.4 Create process steps service at `lib/services/process.ts`
    - Implement `getProcessSteps()` with category filtering and error handling
    - Add proper TypeScript types and interfaces
    - _Requirements: 3.6, 3.9, 3.10, 3.11_

  - [x] 3.5 Create stats service at `lib/services/stats.ts`
    - Implement `getEmployerStats()` with error handling
    - Add proper TypeScript types and interfaces
    - _Requirements: 3.7, 3.9, 3.10, 3.11_

  - [x] 3.6 Create CTA service at `lib/services/cta.ts`
    - Implement `getCTACards()` with error handling
    - Add proper TypeScript types and interfaces
    - _Requirements: 3.8, 3.9, 3.10, 3.11_

- [x] 4. Create icon mapping utility
  - Create `lib/utils/icon-mapper.tsx` with icon component mapping
  - Implement `getIconComponent()` function with fallback support
  - Implement `renderIcon()` helper function
  - Support all required Lucide icons (Shield, Lock, FileText, Globe, Award, Zap, Heart, TrendingUp, Clock, DollarSign, Users, Check, Building2, ArrowRight)
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 5. Update compliance page
  - [x] 5.1 Update `app/compliance/page.tsx` to fetch data from PocketBase
    - Import service functions for compliance items and security features
    - Fetch data using Promise.all for parallel requests
    - Add ISR revalidation configuration (3600 seconds)
    - _Requirements: 4.1, 4.4_

  - [x] 5.2 Update compliance page rendering logic
    - Render compliance items using fetched data with icon mapping
    - Render security features using fetched data
    - Handle empty data states gracefully
    - Remove commented code blocks
    - _Requirements: 4.2, 4.3, 4.5, 4.6, 4.7_

- [x] 6. Update for-employees page
  - [x] 6.1 Update `app/for-employees/page.tsx` to fetch data from PocketBase
    - Import service functions for employee benefits, testimonials, and FAQs
    - Fetch data using Promise.all for parallel requests
    - Add ISR revalidation configuration (3600 seconds)
    - Filter FAQs by employee category
    - _Requirements: 5.1, 5.4, 5.5, 11.1_

  - [x] 6.2 Update for-employees page rendering logic
    - Render employee benefits with icon mapping
    - Render testimonials with images using getImageUrl utility
    - Render FAQs in accordion component
    - Handle empty data states gracefully
    - Remove commented code blocks
    - _Requirements: 5.2, 5.3, 5.6, 5.7, 5.8, 11.2_

- [x] 7. Update for-employers page
  - [x] 7.1 Update `app/for-employers/page.tsx` to fetch data from PocketBase
    - Import service functions for employer benefits, stats, and integrations
    - Fetch data using Promise.all for parallel requests
    - Add ISR revalidation configuration (3600 seconds)
    - _Requirements: 6.1, 6.4, 6.5_

  - [x] 7.2 Update for-employers page rendering logic
    - Render employer benefits with icon mapping
    - Render employer stats in hero section
    - Render integrations in grid layout
    - Handle empty data states gracefully
    - Remove commented code blocks
    - _Requirements: 6.2, 6.3, 6.6, 6.7, 6.8_

- [x] 8. Update how-it-works page
  - [x] 8.1 Update `app/how-it-works/page.tsx` to fetch data from PocketBase
    - Import service functions for process steps and employer benefits
    - Fetch data using Promise.all for parallel requests
    - Add ISR revalidation configuration (3600 seconds)
    - Filter process steps by employee category
    - _Requirements: 7.1, 7.4_

  - [x] 8.2 Update how-it-works page rendering logic
    - Render employee process steps in sequential flow with step numbers
    - Render employer benefits as checklist
    - Handle empty data states gracefully
    - Remove commented code blocks
    - _Requirements: 7.2, 7.3, 7.5, 7.6_

- [x] 9. Update CTA component
  - [x] 9.1 Update `components/sections/cta.tsx` to fetch data from PocketBase
    - Convert to async server component or use client-side fetching
    - Import CTA service function
    - Fetch CTA cards data
    - _Requirements: 8.1_

  - [x] 9.2 Update CTA component rendering logic
    - Render CTA cards with icons and background colors
    - Support image icons from assets library
    - Handle empty data states gracefully
    - Remove commented code blocks
    - _Requirements: 8.2, 8.3, 8.4, 8.5_

- [x] 10. Update cache configuration
  - Add new cache tags to `lib/utils/cache-config.ts` for all new collections
  - Ensure proper cache duration settings for marketing content
  - _Requirements: 2.9, 2.10_

- [-] 11. Create data migration script
  - [x] 11.1 Create migration script at `scripts/migrate-marketing-data.ts`
    - Extract data from commented code blocks in all pages
    - Transform data to match PocketBase collection schemas
    - Map React icon components to icon name strings
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 10.11_

  - [ ] 11.2 Execute migration script
    - Run script to populate PocketBase collections
    - Verify data is correctly inserted with proper ordering
    - Verify icon names are correctly mapped
    - _Requirements: 10.10_

- [ ] 12. Verify and test implementation
  - [ ] 12.1 Verify TypeScript errors are resolved
    - Run TypeScript compiler to check for errors
    - Verify all pages compile without errors
    - Verify all components compile without errors
    - _Requirements: 4.7, 5.8, 6.8, 7.6, 8.5_

  - [ ] 12.2 Test page rendering
    - Verify compliance page renders correctly with PocketBase data
    - Verify for-employees page renders correctly with PocketBase data
    - Verify for-employers page renders correctly with PocketBase data
    - Verify how-it-works page renders correctly with PocketBase data
    - Verify CTA component renders correctly with PocketBase data
    - _Requirements: 4.1, 4.2, 4.3, 5.1, 5.2, 5.3, 6.1, 6.2, 6.3, 7.1, 7.2, 8.1, 8.2_

  - [ ] 12.3 Test error handling and graceful degradation
    - Test pages with empty PocketBase collections
    - Test pages with PocketBase connection errors
    - Verify empty states display correctly
    - _Requirements: 4.5, 5.6, 6.6, 7.5, 8.4_

  - [ ] 12.4 Test icon mapping
    - Verify all icon names map to correct Lucide components
    - Verify fallback icon displays for invalid icon names
    - Verify emoji icons render correctly for process steps
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ] 12.5 Test ISR and caching
    - Verify pages use correct revalidation time (3600 seconds)
    - Verify cache tags are properly set
    - Test content updates reflect after revalidation period
    - _Requirements: 4.4, 5.5, 6.5, 7.4_
