import { Suspense } from "react";
import Blogs from "@/components/sections/blog";
import Cta from "@/components/sections/cta";
import Employees from "@/components/sections/employees";
import Features from "@/components/sections/features";
import Globe from "@/components/sections/globe";
import Hero from "@/components/sections/hero";
import Implementation from "@/components/sections/implementation";
import Integrations from "@/components/sections/integrations";
import Partners from "@/components/sections/partners";
import PlatformSection from "@/components/sections/platform";
import Pricing from "@/components/sections/pricing";
import StandOut from "@/components/sections/standout";
import Testimonials from "@/components/sections/testimonials";
import You from "@/components/sections/you";
import {
  BlogListSkeleton,
  FeaturesSkeleton,
  PartnersSkeleton,
  SectionSkeleton,
  TestimonialsSkeleton,
} from "@/components/ui/loading-skeletons";
import { getAllCompanyStats } from "@/lib/services/company";
import SplitSection from "@/components/sections/split";
import CycleSection from "@/components/sections/cycle";

export const metadata = {
  title: "FinWage - Earned Wage Access for Financial Wellness",
  description:
    "Work Today, Get Paid Today! FinWage provides earned wage access to help employees access their wages instantly while saving employers time and money.",
  keywords: [
    "earned wage access",
    "financial wellness",
    "payroll",
    "employee benefits",
    "instant pay",
    "wage advance",
    "fintech",
  ],
  openGraph: {
    title: "FinWage - Earned Wage Access for Financial Wellness",
    description:
      "Work Today, Get Paid Today! Access your earned wages instantly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinWage - Earned Wage Access for Financial Wellness",
    description:
      "Work Today, Get Paid Today! Access your earned wages instantly.",
  },
};

export default async function Home() {
  // Fetch critical data for above-the-fold content
  const stats = await getAllCompanyStats();

  return (
    <main className="min-h-screen">
      {/* Critical above-the-fold content - render immediately */}
      <Hero />
      {/* <SplitSection /> */}
      <PlatformSection />
      <You />
      {/* <CycleSection /> */}

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
