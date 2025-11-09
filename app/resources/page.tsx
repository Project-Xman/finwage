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
import {
  getFeaturedResourceArticles,
  getFeaturedResourceDownloads,
  getResourceArticles,
  getResourceCategories,
} from "@/lib/services/resources";

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

export default async function ResourcesPage() {
  // Fetch data from PocketBase
  const [categories, featuredArticles, recentArticles, featuredDownload] =
    await Promise.all([
      getResourceCategories({ limit: 5 }),
      getFeaturedResourceArticles(3),
      getResourceArticles({ featured: false, limit: 6 }),
      getFeaturedResourceDownloads(1),
    ]);

  // Helper function to get icon component by name
  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      TrendingUp,
      Users,
      Calendar,
      Award,
      BookOpen,
    };
    return icons[iconName] || BookOpen;
  };

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
            {categories.map((category, index) => {
              const IconComponent = getIconComponent(category.icon || "");
              return (
                <Card
                  key={category.id}
                  className="hover:shadow-xl transition-all group cursor-pointer"
                >
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-[#1d44c3] mb-3 group-hover:bg-[#1d44c3] group-hover:text-white transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="font-semibold text-gray-900 mb-1">
                      {category.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {category.article_count} articles
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
            {featuredArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                {article.image && (
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    {article.expand?.category && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#1d44c3] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {article.expand.category.name}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>
                      {new Date(article.published_date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </span>
                    <span>•</span>
                    <span>{article.read_time}</span>
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
                {recentArticles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {article.expand?.category && (
                          <div className="inline-block bg-blue-100 text-[#1d44c3] px-3 py-1 rounded-full text-sm font-semibold mb-3">
                            {article.expand.category.name}
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-[#1d44c3] transition-colors cursor-pointer">
                          {article.title}
                        </h3>
                        <div className="text-sm text-gray-500">
                          {new Date(article.published_date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
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

              {featuredDownload.length > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Download Our Guide
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {featuredDownload[0].description ||
                      featuredDownload[0].title}
                  </p>
                  <Button className="w-full bg-[#1d44c3] text-white py-3 rounded-lg font-semibold hover:bg-[#0d2463] transition-all">
                    Download Free
                  </Button>
                </div>
              )}
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
