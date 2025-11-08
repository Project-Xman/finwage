# Contact and Demo Button Standardization

## Overview
This document describes the standardized approach for contact, demo, and enquiry buttons across the FinWage application.

## Architecture

### EnquiryButton Component
**Location:** `/components/shared/enquiry-button.tsx`

The `EnquiryButton` is a reusable client component that provides a consistent interface for all enquiry-related actions.

#### Features
- Opens a modal with appropriate contact form
- Creates enquiries in PocketBase database
- Type-safe enquiry categorization
- Customizable styling and content
- Supports all button variants and sizes

#### Usage Examples

```tsx
// Basic demo button
<EnquiryButton type="demo">
  Schedule a Demo
</EnquiryButton>

// Custom styled pricing button with icon
<EnquiryButton
  type="pricing"
  size="lg"
  className="bg-white text-blue-600"
  icon={<ArrowRight className="ml-2" />}
>
  Get Custom Pricing
</EnquiryButton>

// Contact button with custom modal content
<EnquiryButton
  type="contact"
  variant="outline"
  modalTitle="Let's Talk"
  modalDescription="Tell us about your needs and we'll get back to you."
>
  Contact Sales
</EnquiryButton>
```

### Enquiry Types

| Type | Use Case | Example Buttons |
|------|----------|-----------------|
| `demo` | Demo scheduling requests | "Schedule a Demo", "Get a Demo", "Watch Demo" |
| `pricing` | Pricing inquiries | "Get Started", "Contact Sales", "Get Pricing" |
| `contact` | General contact | "Contact Us", "Let's Talk", "Get in Touch" |
| `other` | Other inquiries | Custom use cases |

## Implementation Locations

### Pages Using EnquiryButton

#### For Employers (`/app/for-employers/page.tsx`)
- Hero section: "Schedule Demo" (type: demo)
- CTA section: "Schedule Your Demo" (type: demo)

#### For Employees (`/app/for-employees/page.tsx`)
- Hero section: "Get Started" (type: contact)
- CTA section: "Get Started Today" (type: contact)

#### How It Works (`/app/how-it-works/page.tsx`)
- Integration section: "Schedule Integration Demo" (type: demo)
- CTA section: "Get Started Now" (type: demo)
- CTA section: "Watch Demo" (type: demo)

#### Blog Posts (`/app/blog/[slug]/page.tsx`)
- CTA section: "Schedule a Demo" (type: demo)
- CTA section: "Contact Us" (type: contact)

### Components Using EnquiryButton

#### Hero Section (`/components/sections/hero.tsx`)
- Main hero: "Get a Demo" (type: demo)

#### CTA Section (`/components/sections/cta.tsx`)
- "Let's Talk" buttons (type: contact)

#### Pricing Section (`/components/sections/pricing.tsx`)
- Uses `PricingActionButton` wrapper
- All pricing plan buttons (type: pricing)

### Existing Working Implementations

These already use the correct pattern and were not modified:

#### Pricing Page (`/app/pricing/page.tsx`)
- Uses `InteractivePricingElements` component
- Demo and contact buttons already integrated

#### Pricing Card (`/components/pricing/pricing-card.tsx`)
- Uses `ContactModal` directly
- "Get Started" buttons for individual plans

#### Interactive Pricing Elements (`/components/pricing/interactive-elements.tsx`)
- Provides demo and contact modals
- Used in pricing page

## Database Integration

### PocketBase Schema
All enquiries are stored in the `enquiries` collection with the following schema:

```typescript
{
  name: string;           // Required
  email: string;          // Required
  company?: string;       // Optional
  phone?: number;         // Optional
  message?: string;       // Optional
  interest: EnquiriesInterestOptions; // Required enum
  status: EnquiriesStatusOptions;     // Auto-set to "new"
}
```

### Enquiry Interest Options
```typescript
enum EnquiriesInterestOptions {
  demo = "demo",
  pricing = "pricing",
  contact = "contact",
  other = "other",
}
```

### Enquiry Status Options
```typescript
enum EnquiriesStatusOptions {
  new = "new",
  contacted = "contacted",
  converted = "converted",
  closed = "closed",
}
```

## Adding New Enquiry Buttons

### For Client Components

```tsx
import { EnquiryButton } from "@/components/shared/enquiry-button";

export default function MyComponent() {
  return (
    <EnquiryButton
      type="demo"
      size="lg"
      className="custom-classes"
    >
      Button Text
    </EnquiryButton>
  );
}
```

### For Server Components

```tsx
// In your server component
import { PricingActionButton } from "@/components/pricing/pricing-action-button";

export default async function MyServerComponent() {
  return (
    <PricingActionButton
      isEnterprise={false}
      planName="Professional"
    />
  );
}
```

Or convert your component to client-side:

```tsx
"use client";

import { EnquiryButton } from "@/components/shared/enquiry-button";

export default function MyComponent() {
  // ... rest of component
}
```

## Best Practices

### When to Use EnquiryButton
✅ Use for:
- Demo scheduling requests
- Pricing inquiries
- Contact sales requests
- Any action that should create an enquiry

❌ Don't use for:
- Navigation to contact page (use Link)
- Form submit buttons (use regular Button)
- Non-enquiry actions

### Choosing the Right Type
- **demo**: For users wanting to see the product
- **pricing**: For users interested in plans/costs
- **contact**: For general inquiries
- **other**: For edge cases not covered above

### Customization
All props from the base `Button` component are supported:
- `size`: "sm" | "default" | "lg" | "icon"
- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
- `className`: Any Tailwind classes
- `icon`: React node to display (usually after text)

### Modal Content
Customize modal titles and descriptions for better UX:

```tsx
<EnquiryButton
  type="demo"
  modalTitle="See FinWage in Action"
  modalDescription="Schedule a personalized demo with our team to learn how FinWage can help your organization."
>
  Schedule Demo
</EnquiryButton>
```

## Maintenance

### Updating Button Text
Button text should be descriptive and action-oriented:
- ✅ "Schedule a Demo", "Get Started", "Contact Sales"
- ❌ "Click Here", "Learn More", "Submit"

### Updating Enquiry Types
If adding new enquiry types:
1. Update `EnquiriesInterestOptions` enum in `/types/pocketbase.ts`
2. Update PocketBase schema
3. Update `EnquiryButton` component defaults
4. Update this documentation

### Monitoring Enquiries
Enquiries can be monitored in PocketBase admin panel:
1. Navigate to PocketBase admin
2. Select "enquiries" collection
3. Filter by `interest` field to see categories
4. Update `status` as enquiries are processed

## Troubleshooting

### Modal Not Opening
- Ensure component is client-side (has "use client" directive)
- Check browser console for errors
- Verify `ContactModal` is properly imported

### Enquiry Not Created
- Check network tab for API errors
- Verify PocketBase is running
- Check environment variables for `NEXT_PUBLIC_POCKETBASE_URL`
- Ensure all required fields are provided

### TypeScript Errors
- Ensure `EnquiriesInterestOptions` is imported from `/types/pocketbase`
- Check that enquiry type is one of: "demo" | "pricing" | "contact" | "other"

## Related Files

### Core Components
- `/components/shared/enquiry-button.tsx` - Main button component
- `/components/shared/contact-modal.tsx` - Modal dialog
- `/components/pricing/pricing-action-button.tsx` - Server-compatible wrapper

### API & Services
- `/lib/api.ts` - `createEnquiry` function
- `/lib/actions/contact.ts` - Server actions

### Types
- `/types/pocketbase.ts` - TypeScript types and enums

### Contact Form
- `/components/contact/contact-form.tsx` - Standalone contact form
- `/app/contact/page.tsx` - Full contact page
