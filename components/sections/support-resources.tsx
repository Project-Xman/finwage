/**
 * Support Resources Section Component
 *
 * Displays support resources organized by category with links.
 * Can be used on contact, resources, or help pages.
 */

import {
  ArrowRight,
  BookOpen,
  FileText,
  HelpCircle,
  Video,
} from "lucide-react";
import NextLink from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getSupportResources,
  getSupportResourcesGroupedByCategory,
} from "@/lib/services/support";
import type { CategoryResponse, SupportResponse } from "@/types/pocketbase";

interface SupportResourcesSectionProps {
  title?: string;
  description?: string;
  categoryFilter?: string;
  limit?: number;
  grouped?: boolean;
}

export async function SupportResourcesSection({
  title = "Support Resources",
  description = "Find helpful guides and documentation",
  categoryFilter,
  limit,
  grouped = true,
}: SupportResourcesSectionProps) {
  // Type for support resources with expanded category
  type SupportWithCategory = SupportResponse & {
    expand?: { category?: CategoryResponse };
  };

  let resources: SupportWithCategory[] | undefined;
  let groupedResources: Record<string, SupportWithCategory[]> | undefined;

  if (categoryFilter) {
    // Fetch resources for specific category
    resources = await getSupportResources({ category: categoryFilter, limit }) as SupportWithCategory[];
  } else if (grouped) {
    // Fetch all resources grouped by category
    groupedResources = await getSupportResourcesGroupedByCategory() as Record<string, SupportWithCategory[]>;
  } else {
    // Fetch all resources as flat list
    resources = await getSupportResources({ limit }) as SupportWithCategory[];
  }

  // Helper function to get icon based on category
  const getCategoryIcon = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes("guide") || lowerCategory.includes("getting")) {
      return <BookOpen className="w-6 h-6" />;
    }
    if (lowerCategory.includes("video") || lowerCategory.includes("tutorial")) {
      return <Video className="w-6 h-6" />;
    }
    if (
      lowerCategory.includes("documentation") ||
      lowerCategory.includes("api")
    ) {
      return <FileText className="w-6 h-6" />;
    }
    return <HelpCircle className="w-6 h-6" />;
  };

  // Render flat list of resources
  if (resources) {
    if (resources.length === 0) {
      return (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                {title}
              </h2>
              {description && (
                <p className="text-lg text-gray-600 mt-4">{description}</p>
              )}
            </div>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-600">
                No support resources available at the moment. Please contact our
                support team for assistance.
              </p>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-gray-600 mt-4">{description}</p>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card
                key={resource.id}
                className="hover:shadow-xl transition-all group"
              >
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-[#1d44c3] mb-4 group-hover:bg-[#1d44c3] group-hover:text-white transition-all">
                    {getCategoryIcon(resource.category || "")}
                  </div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  {resource.description && (
                    <CardDescription>{resource.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <Button
                    variant="link"
                    className="text-[#1d44c3] font-semibold flex items-center gap-2 hover:gap-3 p-0 transition-all"
                    asChild
                  >
                    <NextLink
                      href={resource.field}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resource
                      <ArrowRight className="w-4 h-4" />
                    </NextLink>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Render grouped resources by category
  if (!groupedResources || Object.keys(groupedResources).length === 0) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-gray-600 mt-4">{description}</p>
            )}
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600">
              No support resources available at the moment. Please contact our
              support team for assistance.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 mt-4">{description}</p>
          )}
        </div>

        <div className="space-y-12">
          {Object.entries(groupedResources).map(
            ([category, categoryResources]) => (
              <div key={category}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
                  {categoryResources[0]?.expand?.category?.name || category}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryResources.map((resource) => (
                    <Card
                      key={resource.id}
                      className="hover:shadow-xl transition-all group"
                    >
                      <CardHeader>
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-[#1d44c3] mb-4 group-hover:bg-[#1d44c3] group-hover:text-white transition-all">
                          {getCategoryIcon(category)}
                        </div>
                        <CardTitle className="text-xl">
                          {resource.title}
                        </CardTitle>
                        {resource.description && (
                          <CardDescription>
                            {resource.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="link"
                          className="text-[#1d44c3] font-semibold flex items-center gap-2 hover:gap-3 p-0 transition-all"
                          asChild
                        >
                          <NextLink
                            href={resource.field}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Resource
                            <ArrowRight className="w-4 h-4" />
                          </NextLink>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
