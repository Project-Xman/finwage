import { Suspense } from "react";
import Hero from "@/components/sections/hero";
import Cta from "@/components/sections/cta";
import Blogs from "@/components/sections/blog";
import Implementation from "@/components/sections/implementation";
import Globe from "@/components/sections/globe";
import StandOut from "@/components/sections/standout";
import Features from "@/components/sections/features";
import Integrations from "@/components/sections/integrations";
import Pricing from "@/components/sections/pricing";
import Testimonials from "@/components/sections/testimonials";
import Employees from "@/components/sections/employees";
import Partners from "@/components/sections/partners";
import PlatformSection from "@/components/sections/platform";
import You from "@/components/sections/you";
import CycleSection from "@/components/sections/cycle";
import { getAllCompanyStats } from "@/lib/services/company";
import {
  BlogListSkeleton,
  TestimonialsSkeleton,
  FeaturesSkeleton,
  PartnersSkeleton,
  SectionSkeleton,
} from "@/components/ui/loading-skeletons";

export const metadata = {
  title: "FinWage - Earned Wage Access for Financial Wellness",
  description: "Work Today, Get Paid Today! FinWage provides earned wage access to help employees access their wages instantly while saving employers time and money.",
  keywords: ["earned wage access", "financial wellness", "payroll", "employee benefits", "instant pay", "wage advance", "fintech"],
  openGraph: {
    title: "FinWage - Earned Wage Access for Financial Wellness",
    description: "Work Today, Get Paid Today! Access your earned wages instantly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinWage - Earned Wage Access for Financial Wellness",
    description: "Work Today, Get Paid Today! Access your earned wages instantly.",
  },
};

export default async function Home() {
  // Fetch critical data for above-the-fold content
  const stats = await getAllCompanyStats();

  return (
    <main className="min-h-screen">
      {/* Critical above-the-fold content - render immediately */}
      <Hero />
      <PlatformSection />
      <You />
      <CycleSection />
      
      {/* Partners section - stream in */}
      <Suspense fallback={<PartnersSkeleton />}>
        <Partners />
      </Suspense>
      
      {/* Static content - render immediately */}
      <Employees />
      <StandOut />
      
      {/* Integrations section - stream in */}
      <Suspense fallback={<SectionSkeleton />}>
        <Integrations />
      </Suspense>
      
      {/* Pricing section - stream in */}
      <Suspense fallback={<SectionSkeleton />}>
        <Pricing />
      </Suspense>
      
      {/* Testimonials section - stream in */}
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>
      
      {/* Features section - stream in */}
      <Suspense fallback={<FeaturesSkeleton />}>
        <Features />
      </Suspense>
      
      {/* Globe with stats - render with fetched data */}
      <Globe stats={stats} />
      
      {/* Static content - render immediately */}
      <Implementation />
      
      {/* Blog section - stream in */}
      <Suspense fallback={<BlogListSkeleton />}>
        <Blogs />
      </Suspense>
      
      {/* Static CTA - render immediately */}
      <Cta />
    </main>
  );
}
