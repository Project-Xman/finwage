# Requirements Document

## Introduction

This feature transforms multiple static marketing pages into dynamic, CMS-backed pages using PocketBase. Several pages (compliance, for-employees, for-employers, how-it-works) and components (CTA section) currently have hardcoded data arrays that are commented out, causing TypeScript errors across the application. This feature will create PocketBase collections for all required content types, implement service layer functions to fetch this data, and update all affected pages and components to render dynamic content following the established patterns used in other pages (blog, careers, about).

## Glossary

- **Marketing_Pages**: The Next.js page components that display marketing content (compliance, for-employees, for-employers, how-it-works)
- **PocketBase**: The backend CMS system used to store and manage content
- **Service_Layer**: TypeScript functions in `lib/services/` that fetch data from PocketBase API
- **API_Layer**: Low-level PocketBase API functions in `lib/api.ts`
- **ISR**: Incremental Static Regeneration, Next.js feature for revalidating static pages
- **CTA_Component**: The call-to-action section component at `components/sections/cta.tsx`
- **Employee_Benefit**: A data structure representing benefits for employees (e.g., Instant Access, Zero Fees)
- **Employer_Benefit**: A data structure representing benefits for employers (e.g., Reduce Turnover, Save on Recruiting)
- **FAQ_Item**: A data structure representing frequently asked questions with answers
- **Testimonial**: A data structure representing customer testimonials with ratings
- **Process_Step**: A data structure representing steps in a workflow or process

## Requirements

### Requirement 1: PocketBase Collections Setup

**User Story:** As a content manager, I want to manage all marketing page content through PocketBase, so that I can update website information without code changes

#### Acceptance Criteria

1. WHEN the PocketBase schema is created, THE System SHALL include a `compliance_items` collection with fields for icon, title, description, details array, and order
2. WHEN the PocketBase schema is created, THE System SHALL include a `security_features` collection with fields for description and order
3. WHEN the PocketBase schema is created, THE System SHALL include an `employee_benefits` collection with fields for id, icon, title, description, and order
4. WHEN the PocketBase schema is created, THE System SHALL include an `employer_benefits` collection with fields for icon, title, description, and order
5. WHEN the PocketBase schema is created, THE System SHALL include a `faqs` collection with fields for id, question, answer, category, and order
6. WHEN the PocketBase schema is created, THE System SHALL include a `process_steps` collection with fields for step number, title, description, icon, category, and order
7. WHEN the PocketBase schema is created, THE System SHALL include an `employer_stats` collection with fields for value, label, and order
8. WHEN the PocketBase schema is created, THE System SHALL include a `cta_cards` collection with fields for icon, bgColor, title, points array, and order
9. WHEN collections are created, THE System SHALL support proper TypeScript type definitions in `types/pocketbase.ts`
10. WHEN collections are created, THE System SHALL allow ordering of items via an `order` field for display sequence control
11. WHEN collections support categories, THE System SHALL allow filtering by category field (e.g., employee vs employer FAQs)

### Requirement 2: API Layer Implementation

**User Story:** As a developer, I want low-level API functions to fetch all marketing content from PocketBase, so that the service layer can use them consistently

#### Acceptance Criteria

1. WHEN API functions are implemented, THE System SHALL provide a `getComplianceItems` function in `lib/api.ts` that fetches compliance items with pagination and sorting
2. WHEN API functions are implemented, THE System SHALL provide a `getSecurityFeatures` function in `lib/api.ts` that fetches security features with pagination and sorting
3. WHEN API functions are implemented, THE System SHALL provide a `getEmployeeBenefits` function in `lib/api.ts` that fetches employee benefits with pagination and sorting
4. WHEN API functions are implemented, THE System SHALL provide a `getEmployerBenefits` function in `lib/api.ts` that fetches employer benefits with pagination and sorting
5. WHEN API functions are implemented, THE System SHALL provide a `getFAQs` function in `lib/api.ts` that fetches FAQs with optional category filtering
6. WHEN API functions are implemented, THE System SHALL provide a `getProcessSteps` function in `lib/api.ts` that fetches process steps with optional category filtering
7. WHEN API functions are implemented, THE System SHALL provide a `getEmployerStats` function in `lib/api.ts` that fetches employer statistics with pagination and sorting
8. WHEN API functions are implemented, THE System SHALL provide a `getCTACards` function in `lib/api.ts` that fetches CTA cards with pagination and sorting
9. WHEN API calls are made, THE System SHALL handle errors gracefully and return properly typed responses
10. WHEN API functions are called, THE System SHALL support standard list options including page, perPage, sort, and filter parameters

### Requirement 3: Service Layer Implementation

**User Story:** As a developer, I want service layer functions that provide a clean interface for fetching all marketing content, so that page components can easily access the data

#### Acceptance Criteria

1. WHEN service functions are created, THE System SHALL provide a `getComplianceItems` function in `lib/services/compliance.ts` that returns paginated compliance items
2. WHEN service functions are created, THE System SHALL provide a `getSecurityFeatures` function in `lib/services/compliance.ts` that returns paginated security features
3. WHEN service functions are created, THE System SHALL provide a `getEmployeeBenefits` function in `lib/services/benefits.ts` that returns paginated employee benefits
4. WHEN service functions are created, THE System SHALL provide a `getEmployerBenefits` function in `lib/services/benefits.ts` that returns paginated employer benefits
5. WHEN service functions are created, THE System SHALL provide a `getFAQs` function in `lib/services/faqs.ts` that returns paginated FAQs with optional category filtering
6. WHEN service functions are created, THE System SHALL provide a `getProcessSteps` function in `lib/services/process.ts` that returns paginated process steps with optional category filtering
7. WHEN service functions are created, THE System SHALL provide a `getEmployerStats` function in `lib/services/stats.ts` that returns paginated employer statistics
8. WHEN service functions are created, THE System SHALL provide a `getCTACards` function in `lib/services/cta.ts` that returns paginated CTA cards
9. WHEN service functions encounter errors, THE System SHALL return empty arrays to allow graceful degradation
10. WHEN service functions are implemented, THE System SHALL follow the same pattern as existing services (blogs, careers, company)
11. WHEN service functions are called, THE System SHALL include proper TypeScript types for all return values

### Requirement 4: Compliance Page Component Update

**User Story:** As a user, I want to see compliance and security information on the compliance page, so that I can understand FinWage's security measures

#### Acceptance Criteria

1. WHEN the compliance page loads, THE Compliance_Page SHALL fetch compliance items and security features from PocketBase using service layer functions
2. WHEN data is fetched, THE Compliance_Page SHALL render compliance items in a grid layout matching the existing design
3. WHEN data is fetched, THE Compliance_Page SHALL render security features in a list matching the existing design
4. WHEN the page is built, THE Compliance_Page SHALL use ISR with appropriate revalidation time (3600 seconds)
5. WHEN data fetching fails, THE Compliance_Page SHALL display gracefully without breaking the page layout
6. WHEN the page renders, THE Compliance_Page SHALL map icon names to Lucide React icon components
7. WHEN the page is accessed, THE Compliance_Page SHALL remove all TypeScript errors related to undefined variables

### Requirement 5: For Employees Page Component Update

**User Story:** As an employee, I want to see benefits, testimonials, and FAQs on the for-employees page, so that I can understand how FinWage helps me

#### Acceptance Criteria

1. WHEN the for-employees page loads, THE For_Employees_Page SHALL fetch employee benefits, testimonials, and FAQs from PocketBase using service layer functions
2. WHEN benefits are fetched, THE For_Employees_Page SHALL render them in a grid layout with icons, titles, and descriptions
3. WHEN testimonials are fetched, THE For_Employees_Page SHALL render them with user images, names, roles, ratings, and quotes
4. WHEN FAQs are fetched, THE For_Employees_Page SHALL filter for employee-category FAQs and render them in an accordion component
5. WHEN the page is built, THE For_Employees_Page SHALL use ISR with appropriate revalidation time (3600 seconds)
6. WHEN data fetching fails, THE For_Employees_Page SHALL display gracefully without breaking the page layout
7. WHEN the page renders, THE For_Employees_Page SHALL map icon names to Lucide React icon components
8. WHEN the page is accessed, THE For_Employees_Page SHALL remove all TypeScript errors related to undefined variables

### Requirement 6: For Employers Page Component Update

**User Story:** As an employer, I want to see benefits, statistics, and integrations on the for-employers page, so that I can understand the business value of FinWage

#### Acceptance Criteria

1. WHEN the for-employers page loads, THE For_Employers_Page SHALL fetch employer benefits, employer stats, and integration names from PocketBase using service layer functions
2. WHEN benefits are fetched, THE For_Employers_Page SHALL render them in a grid layout with icons, titles, and descriptions
3. WHEN stats are fetched, THE For_Employers_Page SHALL render them in the hero section with values and labels
4. WHEN integrations are fetched, THE For_Employers_Page SHALL render them in a grid showing supported platforms
5. WHEN the page is built, THE For_Employers_Page SHALL use ISR with appropriate revalidation time (3600 seconds)
6. WHEN data fetching fails, THE For_Employers_Page SHALL display gracefully without breaking the page layout
7. WHEN the page renders, THE For_Employers_Page SHALL map icon names to Lucide React icon components
8. WHEN the page is accessed, THE For_Employers_Page SHALL remove all TypeScript errors related to undefined variables

### Requirement 7: How It Works Page Component Update

**User Story:** As a visitor, I want to see process steps and employer benefits on the how-it-works page, so that I can understand how FinWage operates

#### Acceptance Criteria

1. WHEN the how-it-works page loads, THE How_It_Works_Page SHALL fetch employee process steps and employer benefits from PocketBase using service layer functions
2. WHEN employee steps are fetched, THE How_It_Works_Page SHALL filter for employee-category steps and render them in a sequential flow with step numbers, icons, titles, and descriptions
3. WHEN employer benefits are fetched, THE How_It_Works_Page SHALL render them as a checklist with checkmarks
4. WHEN the page is built, THE How_It_Works_Page SHALL use ISR with appropriate revalidation time (3600 seconds)
5. WHEN data fetching fails, THE How_It_Works_Page SHALL display gracefully without breaking the page layout
6. WHEN the page is accessed, THE How_It_Works_Page SHALL remove all TypeScript errors related to undefined variables

### Requirement 8: CTA Component Update

**User Story:** As a visitor, I want to see compelling CTA cards on various pages, so that I am encouraged to take action

#### Acceptance Criteria

1. WHEN the CTA component loads, THE CTA_Component SHALL fetch CTA cards from PocketBase using service layer functions
2. WHEN cards are fetched, THE CTA_Component SHALL render them with icons, background colors, titles, and bullet points
3. WHEN the component renders, THE CTA_Component SHALL support image icons from the assets library
4. WHEN data fetching fails, THE CTA_Component SHALL display gracefully without breaking the layout
5. WHEN the component is accessed, THE CTA_Component SHALL remove all TypeScript errors related to undefined variables

### Requirement 9: Icon Mapping Implementation

**User Story:** As a content manager, I want to specify icon names in PocketBase, so that the correct icons display for each content item

#### Acceptance Criteria

1. WHEN icon mapping is implemented, THE System SHALL support mapping string icon names to Lucide React components
2. WHEN an icon name is provided, THE System SHALL render the corresponding icon component from the Lucide library (Shield, Lock, FileText, Globe, Award, Zap, Heart, TrendingUp, Clock, DollarSign, Users, Check, Building2, ArrowRight)
3. WHEN an invalid icon name is provided, THE System SHALL render a default fallback icon
4. WHEN icons are rendered, THE System SHALL maintain consistent sizing and styling across all content items
5. WHEN emoji icons are used (for process steps), THE System SHALL render them as text without icon component mapping

### Requirement 10: Data Migration and Seeding

**User Story:** As a developer, I want to migrate existing hardcoded data to PocketBase, so that all pages display the same content initially

#### Acceptance Criteria

1. WHEN data migration occurs, THE System SHALL transfer all existing compliance items from commented code to PocketBase compliance_items collection
2. WHEN data migration occurs, THE System SHALL transfer all existing security features from commented code to PocketBase security_features collection
3. WHEN data migration occurs, THE System SHALL transfer all existing employee benefits from commented code to PocketBase employee_benefits collection
4. WHEN data migration occurs, THE System SHALL transfer all existing employer benefits from commented code to PocketBase employer_benefits collection
5. WHEN data migration occurs, THE System SHALL transfer all existing FAQs from commented code to PocketBase faqs collection with appropriate categories
6. WHEN data migration occurs, THE System SHALL transfer all existing process steps from commented code to PocketBase process_steps collection with appropriate categories
7. WHEN data migration occurs, THE System SHALL transfer all existing employer stats from commented code to PocketBase employer_stats collection
8. WHEN data migration occurs, THE System SHALL transfer all existing CTA cards from commented code to PocketBase cta_cards collection
9. WHEN data migration occurs, THE System SHALL transfer all existing testimonials from commented code to the existing testimonials collection
10. WHEN data is seeded, THE System SHALL maintain the original order and content of items
11. WHEN data is seeded, THE System SHALL properly map icon components to icon name strings

### Requirement 11: Testimonials Integration

**User Story:** As a content manager, I want to reuse the existing testimonials collection for the for-employees page, so that testimonial data is centralized

#### Acceptance Criteria

1. WHEN the for-employees page fetches testimonials, THE System SHALL use the existing testimonials service and collection
2. WHEN testimonials are rendered, THE System SHALL display user images using the getImageUrl utility for PocketBase file fields
3. WHEN testimonials are filtered, THE System SHALL support filtering by category or featured status if needed
4. WHEN the existing testimonials collection lacks required fields, THE System SHALL document the schema requirements for testimonials
