# Design Document

## Overview

This design document outlines the architecture and implementation approach for adding minimal, performant animations to the FinWage website using Framer Motion (v12). The animation system will be built with reusability, performance, and accessibility as core principles.

The design follows a layered approach:
1. **Animation Utilities Layer** - Reusable animation variants and configuration
2. **Component Wrapper Layer** - HOCs and wrapper components for common animation patterns
3. **Page Integration Layer** - Specific animation implementations for each page

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Page Components                       │
│  (home, blog, careers, contact, etc.)                   │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│              Animation Wrapper Components                │
│  (AnimatedSection, AnimatedCard, AnimatedList)          │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│              Animation Utilities & Variants              │
│  (fadeIn, slideUp, stagger, viewport config)            │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│                   Framer Motion                          │
│              (motion components, hooks)                  │
└─────────────────────────────────────────────────────────┘
```

### Directory Structure

```
lib/
  animations/
    variants.ts          # Reusable animation variants
    config.ts            # Animation configuration constants
    hooks.ts             # Custom animation hooks
    utils.ts             # Animation utility functions

components/
  animated/
    animated-section.tsx # Wrapper for section-level animations
    animated-card.tsx    # Wrapper for card animations
    animated-list.tsx    # Wrapper for list/stagger animations
    animated-text.tsx    # Wrapper for text animations
    index.ts             # Barrel export

  sections/
    hero.tsx             # Updated with animations
    features.tsx         # Updated with animations
    [other sections]     # Updated with animations
```

## Components and Interfaces

### 1. Animation Variants (`lib/animations/variants.ts`)

This module exports pre-configured animation variants for common patterns.

```typescript
import type { Variants } from "motion/react";

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Slide up animation
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Scale in animation
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Stagger item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};
```

### 2. Animation Configuration (`lib/animations/config.ts`)

Central configuration for animation settings.

```typescript
export const ANIMATION_CONFIG = {
  // Duration presets
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.8
  },
  
  // Easing presets
  easing: {
    easeOut: [0.16, 1, 0.3, 1],
    easeInOut: [0.43, 0.13, 0.23, 0.96],
    spring: { type: "spring", stiffness: 100, damping: 15 }
  },
  
  // Viewport configuration for scroll-triggered animations
  viewport: {
    once: true,        // Animate only once
    amount: 0.3,       // Trigger when 30% visible
    margin: "0px 0px -100px 0px" // Trigger slightly before entering viewport
  },
  
  // Stagger delays
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15
  }
} as const;

// Check if user prefers reduced motion
export const shouldReduceMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
```

### 3. Animation Hooks (`lib/animations/hooks.ts`)

Custom hooks for animation logic.

```typescript
import { useEffect, useState } from "react";
import { useInView } from "motion/react";
import { shouldReduceMotion } from "./config";

/**
 * Hook to determine if animations should be enabled
 */
export function useAnimationsEnabled(): boolean {
  const [enabled, setEnabled] = useState(true);
  
  useEffect(() => {
    setEnabled(!shouldReduceMotion());
  }, []);
  
  return enabled;
}

/**
 * Hook for viewport-triggered animations with reduced motion support
 */
export function useViewportAnimation(ref: React.RefObject<HTMLElement>) {
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const animationsEnabled = useAnimationsEnabled();
  
  return animationsEnabled ? isInView : true;
}
```

### 4. Animated Section Component (`components/animated/animated-section.tsx`)

Wrapper component for section-level animations.

```typescript
"use client";

import { motion, type Variants } from "motion/react";
import { useRef } from "react";
import { ANIMATION_CONFIG } from "@/lib/animations/config";
import { useAnimationsEnabled } from "@/lib/animations/hooks";
import { fadeIn } from "@/lib/animations/variants";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  delay?: number;
}

export function AnimatedSection({ 
  children, 
  className, 
  variant = fadeIn,
  delay = 0 
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();
  
  if (!animationsEnabled) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={ANIMATION_CONFIG.viewport}
      variants={variant}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
```

### 5. Animated Card Component (`components/animated/animated-card.tsx`)

Wrapper for card components with hover effects.

```typescript
"use client";

import { motion } from "motion/react";
import { useAnimationsEnabled } from "@/lib/animations/hooks";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
}

export function AnimatedCard({ 
  children, 
  className,
  enableHover = true 
}: AnimatedCardProps) {
  const animationsEnabled = useAnimationsEnabled();
  
  if (!animationsEnabled) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      className={className}
      whileHover={enableHover ? { 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      } : undefined}
    >
      {children}
    </motion.div>
  );
}
```

### 6. Animated List Component (`components/animated/animated-list.tsx`)

Wrapper for staggered list animations.

```typescript
"use client";

import { motion, type Variants } from "motion/react";
import { useRef } from "react";
import { ANIMATION_CONFIG } from "@/lib/animations/config";
import { useAnimationsEnabled } from "@/lib/animations/hooks";
import { staggerContainer, staggerItem } from "@/lib/animations/variants";

interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function AnimatedList({ 
  children, 
  className,
  staggerDelay = ANIMATION_CONFIG.stagger.normal 
}: AnimatedListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();
  
  if (!animationsEnabled) {
    return <div className={className}>{children}</div>;
  }
  
  const containerVariant: Variants = {
    ...staggerContainer,
    visible: {
      ...staggerContainer.visible,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={ANIMATION_CONFIG.viewport}
      variants={containerVariant}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedListItem({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  const animationsEnabled = useAnimationsEnabled();
  
  if (!animationsEnabled) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
```

## Data Models

### Animation Variant Type

```typescript
import type { Variants } from "motion/react";

export interface AnimationVariant {
  hidden: {
    opacity?: number;
    x?: number;
    y?: number;
    scale?: number;
  };
  visible: {
    opacity?: number;
    x?: number;
    y?: number;
    scale?: number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string | number[];
      staggerChildren?: number;
      delayChildren?: number;
    };
  };
}
```

### Component Props Interfaces

```typescript
// Base animation props that can be extended
export interface BaseAnimationProps {
  className?: string;
  delay?: number;
  duration?: number;
  disabled?: boolean;
}

// Section animation props
export interface SectionAnimationProps extends BaseAnimationProps {
  variant?: "fadeIn" | "slideUp" | "slideInLeft" | "slideInRight" | "scaleIn";
}

// List animation props
export interface ListAnimationProps extends BaseAnimationProps {
  staggerDelay?: number;
  itemVariant?: Variants;
}

// Card animation props
export interface CardAnimationProps extends BaseAnimationProps {
  enableHover?: boolean;
  hoverScale?: number;
  hoverY?: number;
}
```

## Error Handling

### 1. Graceful Degradation

All animation components will gracefully degrade when:
- JavaScript is disabled
- Framer Motion fails to load
- User has `prefers-reduced-motion` enabled

```typescript
// Example error boundary for animation components
export function AnimationErrorBoundary({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <ErrorBoundary
      fallback={<div>{children}</div>}
      onError={(error) => {
        console.warn("Animation error:", error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

### 2. Performance Monitoring

```typescript
// Utility to measure animation performance
export function measureAnimationPerformance(
  name: string, 
  callback: () => void
) {
  if (typeof window === "undefined") return callback();
  
  const start = performance.now();
  callback();
  const end = performance.now();
  
  if (end - start > 16) { // More than one frame
    console.warn(`Animation "${name}" took ${end - start}ms`);
  }
}
```

## Testing Strategy

### 1. Unit Tests

Test animation utilities and configuration:

```typescript
// lib/animations/__tests__/variants.test.ts
describe("Animation Variants", () => {
  it("should have correct fadeIn variant structure", () => {
    expect(fadeIn).toHaveProperty("hidden");
    expect(fadeIn).toHaveProperty("visible");
    expect(fadeIn.hidden.opacity).toBe(0);
    expect(fadeIn.visible.opacity).toBe(1);
  });
  
  it("should respect reduced motion preference", () => {
    // Mock prefers-reduced-motion
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
    
    expect(shouldReduceMotion()).toBe(true);
  });
});
```

### 2. Component Tests

Test animated wrapper components:

```typescript
// components/animated/__tests__/animated-section.test.tsx
describe("AnimatedSection", () => {
  it("should render children", () => {
    render(
      <AnimatedSection>
        <div>Test Content</div>
      </AnimatedSection>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
  
  it("should not animate when reduced motion is preferred", () => {
    // Mock reduced motion
    const { container } = render(
      <AnimatedSection>
        <div>Test Content</div>
      </AnimatedSection>
    );
    
    // Should render as plain div, not motion.div
    expect(container.firstChild).not.toHaveAttribute("data-framer-motion");
  });
});
```

### 3. Integration Tests

Test animations on actual pages:

```typescript
// app/__tests__/home.test.tsx
describe("Home Page Animations", () => {
  it("should animate hero section on load", async () => {
    render(<HomePage />);
    
    const heroTitle = screen.getByText(/Your Money, Your Control/i);
    
    // Check initial state
    expect(heroTitle).toHaveStyle({ opacity: 0 });
    
    // Wait for animation
    await waitFor(() => {
      expect(heroTitle).toHaveStyle({ opacity: 1 });
    }, { timeout: 1000 });
  });
});
```

### 4. Performance Tests

Ensure animations don't impact performance:

```typescript
describe("Animation Performance", () => {
  it("should complete animations within 60fps budget", () => {
    const start = performance.now();
    
    render(
      <AnimatedList>
        {Array.from({ length: 20 }).map((_, i) => (
          <AnimatedListItem key={i}>Item {i}</AnimatedListItem>
        ))}
      </AnimatedList>
    );
    
    const end = performance.now();
    const duration = end - start;
    
    // Should render in less than 16ms (one frame at 60fps)
    expect(duration).toBeLessThan(16);
  });
});
```

### 5. Accessibility Tests

Ensure animations respect accessibility preferences:

```typescript
describe("Animation Accessibility", () => {
  it("should disable animations when prefers-reduced-motion is set", () => {
    // Mock reduced motion preference
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
      })),
    });
    
    const { container } = render(
      <AnimatedSection>
        <div>Content</div>
      </AnimatedSection>
    );
    
    // Should render without motion attributes
    expect(container.querySelector("[data-framer-motion]")).toBeNull();
  });
});
```

## Page-Specific Animation Implementations

### Home Page

**Hero Section:**
- Title: `slideUp` with 0ms delay
- Description: `fadeIn` with 200ms delay
- CTA Button: `fadeIn` with 400ms delay
- Hero Image: `slideInRight` with 300ms delay

**Features Section:**
- Section heading: `fadeIn` on viewport entry
- Feature cards: `staggerContainer` with 100ms stagger delay

**Testimonials Section:**
- Section heading: `fadeIn` on viewport entry
- Testimonial cards: `staggerContainer` with 120ms stagger delay
- Each card: `slideUp` variant

### Blog Page

**Hero Section:**
- Title and description: `fadeIn` with 0ms delay

**Category Buttons:**
- Container: `staggerContainer` with 50ms stagger delay

**Featured Post:**
- Card: `scaleIn` on viewport entry

**Blog Grid:**
- Container: `staggerContainer` with 80ms stagger delay
- Each card: `slideUp` variant with hover effect

### Careers Page

**Job Listings:**
- Container: `staggerContainer` with 100ms stagger delay
- Each job card: `slideUp` variant
- Hover effect: lift with shadow enhancement

**Benefits Section:**
- Container: `staggerContainer` with 100ms stagger delay
- Each benefit card: `slideUp` variant

**Stats Section:**
- Each stat: Count-up animation using custom hook

### Contact Page

**Contact Options:**
- Container: `staggerContainer` with 120ms stagger delay
- Each option card: `slideUp` variant

**Contact Form:**
- Form container: `slideInRight` on viewport entry
- Form fields: Sequential fade-in with 80ms stagger

### Pricing Page

**Pricing Cards:**
- Container: `staggerContainer` with 120ms stagger delay
- Each card: `slideUp` variant
- Recommended badge: Subtle bounce animation

**Feature Lists:**
- Container: `staggerContainer` with 60ms stagger delay
- Each feature: `fadeIn` variant

## Performance Optimization

### 1. GPU Acceleration

All animations use GPU-accelerated properties:
- `transform` (translate, scale, rotate)
- `opacity`

Avoid animating:
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

### 2. Lazy Loading

Animation utilities are code-split and lazy-loaded:

```typescript
// Dynamic import for animation components
const AnimatedSection = dynamic(
  () => import("@/components/animated/animated-section"),
  { ssr: true }
);
```

### 3. Viewport Optimization

Use `viewport` prop to only animate elements when visible:

```typescript
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
>
  {children}
</motion.div>
```

### 4. Reduced Motion Support

Always check and respect user preferences:

```typescript
const shouldAnimate = !window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

## Implementation Phases

### Phase 1: Foundation (Core Utilities)
1. Create animation variants library
2. Create animation configuration
3. Create animation hooks
4. Set up testing infrastructure

### Phase 2: Wrapper Components
1. Create `AnimatedSection` component
2. Create `AnimatedCard` component
3. Create `AnimatedList` component
4. Create `AnimatedText` component

### Phase 3: Page Integration
1. Update Home page
2. Update Blog page
3. Update Careers page
4. Update Contact page
5. Update For Employees page
6. Update For Employers page
7. Update How It Works page
8. Update Pricing page
9. Update Resources page
10. Update Compliance page
11. Update About page

### Phase 4: Polish & Optimization
1. Performance testing and optimization
2. Accessibility testing
3. Cross-browser testing
4. Mobile responsiveness testing
5. Documentation

## Design Decisions and Rationales

### 1. Why Framer Motion?

- Already installed in the project
- Excellent TypeScript support
- Built-in viewport detection
- Automatic GPU acceleration
- Reduced motion support out of the box
- Small bundle size with tree-shaking

### 2. Why Wrapper Components?

- Encapsulates animation logic
- Promotes reusability
- Easier to maintain
- Consistent animation patterns
- Easy to disable globally if needed

### 3. Why Viewport Triggering?

- Better performance (only animate visible elements)
- More engaging user experience
- Reduces initial page load animations
- Natural scroll-based storytelling

### 4. Why Minimal Animations?

- Faster page load times
- Better accessibility
- Professional appearance
- Doesn't distract from content
- Works well on slower devices

### 5. Why Stagger Animations?

- Creates visual hierarchy
- Guides user attention
- More engaging than simultaneous animations
- Feels more natural and polished
