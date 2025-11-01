/**
 * Loading Skeleton Components
 *
 * Reusable skeleton components for loading states across the application.
 * These provide visual feedback while content is being fetched.
 */

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================================
// BLOG SKELETONS
// ============================================================

export function BlogCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <CardContent className="p-6">
        <Skeleton className="h-4 w-20 mb-3" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export function BlogListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function FeaturedBlogSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <Skeleton className="h-64 md:h-full min-h-[400px]" />
        <CardContent className="p-8 md:p-12 flex flex-col justify-center">
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-6" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// ============================================================
// TESTIMONIAL SKELETONS
// ============================================================

export function TestimonialCardSkeleton() {
  return (
    <Card className="min-w-[280px] w-[280px] md:min-w-[300px] md:w-[300px]">
      <CardContent className="p-6">
        <div className="flex gap-2 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded" />
          ))}
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSkeleton() {
  return (
    <section className="bg-[#f6f8ff] py-12 md:py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <Skeleton className="h-4 w-32 mx-auto mb-4" />
          <Skeleton className="h-12 w-96 mx-auto" />
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <TestimonialCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// PRICING SKELETONS
// ============================================================

export function PricingCardSkeleton() {
  return (
    <Card>
      <CardHeader className="text-center">
        <Skeleton className="h-8 w-32 mx-auto mb-4" />
        <Skeleton className="h-12 w-24 mx-auto mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </CardHeader>
      <CardContent className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-5 w-5 rounded flex-shrink-0" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PricingCardsSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <PricingCardSkeleton key={i} />
      ))}
    </>
  );
}

// ============================================================
// FEATURE SKELETONS
// ============================================================

export function FeatureCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-8">
        <Skeleton className="h-12 w-12 rounded-full mb-6" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}

export function FeaturesSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: count }).map((_, i) => (
            <FeatureCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PARTNER SKELETONS
// ============================================================

export function PartnerLogoSkeleton() {
  return <Skeleton className="h-16 w-32" />;
}

export function PartnersSkeleton({ count = 8 }: { count?: number }) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex justify-center">
              <PartnerLogoSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// JOB SKELETONS
// ============================================================

export function JobCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-3" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export function JobListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ============================================================
// FAQ SKELETONS
// ============================================================

export function FAQItemSkeleton() {
  return <Skeleton className="h-16 w-full rounded-lg" />;
}

export function FAQSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {Array.from({ length: count }).map((_, i) => (
            <FAQItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SUPPORT RESOURCE SKELETONS
// ============================================================

export function SupportResourceCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-12 w-12 rounded-full mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  );
}

export function SupportResourcesSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <SupportResourceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PRESS RELEASE SKELETONS
// ============================================================

export function PressReleaseCardSkeleton() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
      <CardContent className="p-6">
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-4 w-48" />
      </CardContent>
    </Card>
  );
}

export function PressReleasesSkeleton({ count = 3 }: { count?: number }) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
        </div>
        <div className="space-y-6 max-w-3xl mx-auto">
          {Array.from({ length: count }).map((_, i) => (
            <PressReleaseCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// STATS SKELETONS
// ============================================================

export function StatCardSkeleton() {
  return (
    <div className="text-center">
      <Skeleton className="h-16 w-32 mx-auto mb-4" />
      <Skeleton className="h-4 w-24 mx-auto" />
    </div>
  );
}

export function StatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ============================================================
// GENERIC SKELETONS
// ============================================================

export function SectionSkeleton() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-8">
                <Skeleton className="h-12 w-12 rounded-full mb-6" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PageSkeleton() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <Skeleton className="h-16 w-96 mb-6 bg-white/20" />
          <Skeleton className="h-8 w-full max-w-2xl bg-white/20" />
        </div>
      </section>
      <SectionSkeleton />
      <SectionSkeleton />
    </main>
  );
}
