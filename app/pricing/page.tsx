// app/pricing/page.tsx

import { Check } from "lucide-react";
import { unstable_cache } from "next/cache";
import { Suspense } from "react";
import { InteractivePricingElements } from "@/components/pricing/interactive-elements";
import { PricingCard } from "@/components/pricing/pricing-card";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPricingPlans } from "@/lib/services/pricing";
import type { PricingPlansResponse } from "@/types/pocketbase";
import { FAQSection } from "./components/faq-section";
import {
  FAQSkeleton,
  PricingCardsSkeleton,
} from "./components/pricing-skeleton";
import { Metadata } from "next";

// Metadata generation
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pricing - FinWage",
    description:
      "Transparent pricing for every business size. Choose the plan that fits your organization. Free for employees.",
    keywords: [
      "pricing",
      "plans",
      "enterprise",
      "fintech pricing",
      "payroll pricing",
    ],
    openGraph: {
      title: "Pricing - FinWage",
      description:
        "Transparent pricing for every business size. Free for employees.",
      type: "website",
      images: ["/og-pricing.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Pricing - FinWage",
      description:
        "Transparent pricing for every business size. Free for employees.",
    },
  };
}

// Cached data fetching functions for better performance
const getCachedPricingPlans = unstable_cache(
  async () => {
    const result = await getPricingPlans({ activeOnly: true });
    return result.items;
  },
  ["pricing-plans"],
  {
    revalidate: 3600, // Revalidate every hour
    tags: ["pricing"],
  },
);

// Utility function to get employee range
function getEmployeeRange(plan: PricingPlansResponse): string {
  const name = plan.name?.toLowerCase() || "";
  if (name.includes("starter")) return "Up to 50 employees";
  if (name.includes("professional")) return "50–500 employees";
  if (name.includes("enterprise")) return "500+ employees";
  return "";
}

// Transform pricing plan for display
interface TransformedPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  employees: string;
  features: string[];
  notIncluded: string[];
  recommended: boolean;
}

function transformPricingPlan(plan: PricingPlansResponse): TransformedPlan {
  return {
    id: plan.id,
    name: plan.name || "",
    price: plan.price !== undefined ? `$${plan.price}` : "Custom",
    description: plan.description || "",
    employees: getEmployeeRange(plan),
    features: Array.isArray(plan.features)
      ? plan.features.map((f: string | { text?: string }) =>
          typeof f === "string" ? f : f.text || String(f),
        )
      : [],
    notIncluded: Array.isArray(plan.limitations)
      ? plan.limitations.map((l: string | { text?: string }) =>
          typeof l === "string" ? l : l.text || String(l),
        )
      : [],
    recommended: plan.is_popular || false,
  };
}

// Async component for pricing cards (streamable)
async function PricingCards() {
  const plans = await getCachedPricingPlans();
  const transformedPlans = plans.map(transformPricingPlan);

  if (transformedPlans.length === 0) {
    return (
      <div className="col-span-3 text-center py-12">
        <p className="text-gray-600 mb-4">
          No pricing plans available at the moment.
        </p>
        <InteractivePricingElements type="contact" />
      </div>
    );
  }

  return (
    <>
      {transformedPlans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} />
      ))}
    </>
  );
}

// Static Hero Section
function HeroSection() {
  return (
    <section className="relative bg-linear-to-br from-[#1d44c3] to-[#0d2463] text-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Transparent Pricing for Every Business
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-4">
          Choose the plan that fits your organization
        </p>
        <Badge
          variant="default"
          className="bg-pink-500 hover:bg-pink-600 text-white text-base px-6 py-2"
        >
          <Check className="w-5 h-5 mr-2 inline" />
          100% Free for Employees
        </Badge>
      </div>
    </section>
  );
}

// Employee Benefit Section
function EmployeeBenefitSection() {
  const benefits = [
    { value: "$0", label: "Employee Fees" },
    { value: "0%", label: "Interest Charged" },
    { value: "$0", label: "Hidden Charges" },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <Card className="bg-linear-to-br from-green-50 to-blue-50 border-0">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 mx-auto">
              <Check className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl md:text-5xl">
              Always Free for Employees
            </CardTitle>
            <CardDescription className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
              Your employees never pay a penny. No fees, no interest, no hidden
              charges. FinWage is a benefit you provide, paid for by your
              organization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {benefits.map((item, i) => (
                <Card key={i}>
                  <CardHeader className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {item.value}
                    </div>
                    <CardDescription>{item.label}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-[#1d44c3] to-[#0d2463] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Schedule a demo to see FinWage in action and get a custom quote for
          your organization
        </p>
        <InteractivePricingElements type="demo" />
      </div>
    </section>
  );
}

// Main page component with streaming
export default function PricingPage() {
  return (
    <main className="min-h-screen">
      {/* Static Hero - renders immediately */}
      <HeroSection />

      {/* Dynamic Pricing Cards - streams in */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Suspense fallback={<PricingCardsSkeleton />}>
              <PricingCards />
            </Suspense>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Need a custom solution? We can build a plan that fits your exact
              needs.
            </p>
            <InteractivePricingElements type="contact" />
          </div>
        </div>
      </section>

      {/* Static Employee Benefit - renders immediately */}
      <EmployeeBenefitSection />

      {/* Dynamic FAQ Section - streams in from PocketBase */}
      <Suspense fallback={<FAQSkeleton />}>
        <FAQSection />
      </Suspense>

      {/* Static CTA - renders immediately */}
      <CTASection />
    </main>
  );
}
