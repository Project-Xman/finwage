import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { FAQSection } from "@/components/sections/faq";
import { PressReleaseSection } from "@/components/sections/press";
import { SupportResourcesSection } from "@/components/sections/support-resources";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Resources - FinWage",
  description:
    "Access guides, case studies, webinars, and tools to help you get the most out of FinWage and achieve financial wellness.",
  keywords: [
    "resources",
    "guides",
    "case studies",
    "webinars",
    "financial wellness tools",
  ],
  openGraph: {
    title: "Resources - FinWage",
    description:
      "Access guides, case studies, and tools for financial wellness.",
    type: "website",
  },
};

export default function ResourcesPage() {
  const featuredArticles = [
    {
      category: "Financial Wellness",
      title: "The Real Cost of Living Paycheck to Paycheck",
      excerpt:
        "How earned wage access is helping millions of workers break free from the payday cycle and build long-term financial security.",
      image: "/assets/analytic-image.png",
      date: "Jan 15, 2025",
      readTime: "5 min read",
    },
    {
      category: "Employer Benefits",
      title: "Why Top Companies Are Offering Wage Access",
      excerpt:
        "The ROI of financial wellness benefits and how they're transforming employee retention strategies.",
      image: "/assets/office-meeting.png",
      date: "Jan 10, 2025",
      readTime: "7 min read",
    },
    {
      category: "Industry Trends",
      title: "The Future of Payroll: On-Demand Wages",
      excerpt:
        "Exploring how technology is revolutionizing when and how employees get paid.",
      image: "/assets/laptop-office.png",
      date: "Jan 5, 2025",
      readTime: "6 min read",
    },
  ];

  const categories = [
    {
      name: "Financial Wellness",
      count: 24,
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      name: "Employee Retention",
      count: 18,
      icon: <Users className="w-6 h-6" />,
    },
    {
      name: "Payroll Trends",
      count: 15,
      icon: <Calendar className="w-6 h-6" />,
    },
    { name: "Case Studies", count: 12, icon: <Award className="w-6 h-6" /> },
    {
      name: "Industry News",
      count: 32,
      icon: <BookOpen className="w-6 h-6" />,
    },
  ];

  const recentArticles = [
    {
      title: "5 Ways Financial Stress Impacts Employee Productivity",
      category: "Financial Wellness",
      date: "Jan 12, 2025",
    },
    {
      title: "How to Choose the Right Wage Access Provider",
      category: "Employer Guide",
      date: "Jan 8, 2025",
    },
    {
      title: "Understanding the Earned Wage Access Regulation Landscape",
      category: "Compliance",
      date: "Jan 3, 2025",
    },
    {
      title: "Case Study: Reducing Turnover by 30% with FinWage",
      category: "Case Studies",
      date: "Dec 28, 2024",
    },
    {
      title: "The Psychology of Payday: Why Timing Matters",
      category: "Research",
      date: "Dec 22, 2024",
    },
    {
      title: "Building a Financial Wellness Program That Works",
      category: "Employer Guide",
      date: "Dec 18, 2024",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Resources & Insights
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Expert perspectives on financial wellness, employee benefits, and
              the future of payroll
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all group cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-[#1d44c3] mb-3 group-hover:bg-[#1d44c3] group-hover:text-white transition-all">
                    {category.icon}
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {category.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {category.count} articles
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-12">
            Featured Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <Card
                key={index}
                className="overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#1d44c3] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1d44c3] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <Button
                    variant="link"
                    className="text-[#1d44c3] font-semibold flex items-center gap-2 hover:gap-3 p-0"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Latest Articles
              </h2>
              <div className="space-y-6">
                {recentArticles.map((article, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="inline-block bg-blue-100 text-[#1d44c3] px-3 py-1 rounded-full text-sm font-semibold mb-3">
                          {article.category}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-[#1d44c3] transition-colors cursor-pointer">
                          {article.title}
                        </h3>
                        <div className="text-sm text-gray-500">
                          {article.date}
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Newsletter
                </h3>
                <p className="text-gray-600 mb-4">
                  Get the latest insights on financial wellness and employee
                  benefits delivered to your inbox.
                </p>
                <Input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-3"
                />
                <Button className="w-full bg-[#1d44c3] text-white py-3 rounded-lg font-semibold hover:bg-[#0d2463] transition-all">
                  Subscribe
                </Button>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Download Our Guide
                </h3>
                <p className="text-gray-600 mb-4">
                  "The Complete Guide to Implementing Earned Wage Access"
                </p>
                <Button className="w-full bg-[#1d44c3] text-white py-3 rounded-lg font-semibold hover:bg-[#0d2463] transition-all">
                  Download Free
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press & Awards - Dynamic from PocketBase */}
      <Suspense fallback={<PressReleasesSkeleton />}>
        <PressReleaseSection
          title="Press & Awards"
          limit={3}
          showFeaturedOnly={true}
        />
      </Suspense>

      {/* Support Resources - Dynamic from PocketBase */}
      <Suspense fallback={<SupportResourcesSkeleton />}>
        <SupportResourcesSection
          title="Help & Documentation"
          description="Access guides, tutorials, and documentation"
          grouped={true}
        />
      </Suspense>

      {/* FAQ Section - Dynamic from PocketBase */}
      <Suspense fallback={<FAQSkeleton />}>
        <FAQSection
          title="Common Questions"
          description="Quick answers to frequently asked questions"
          showFeaturedOnly={true}
          limit={6}
        />
      </Suspense>
    </main>
  );
}

// Loading skeletons
function SupportResourcesSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <div className="p-6">
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </section>
  );
}

function PressReleasesSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
        </div>
        <div className="space-y-6 max-w-3xl mx-auto">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="bg-gradient-to-br from-blue-50 to-purple-50 border-0"
            >
              <div className="p-6">
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
