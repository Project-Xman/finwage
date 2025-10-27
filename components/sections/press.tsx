/**
 * Press Releases Section Component
 *
 * Displays press releases and media coverage with proper caching
 */

import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import {
  getFeaturedPressReleases,
  getPressReleases,
} from "@/lib/services/press";

interface PressReleaseSectionProps {
  title?: string;
  description?: string;
  limit?: number;
  showFeaturedOnly?: boolean;
  className?: string;
}

export async function PressReleaseSection({
  title = "Press & Awards",
  description,
  limit = 3,
  showFeaturedOnly = true,
  className = "",
}: PressReleaseSectionProps) {
  // Fetch press releases from PocketBase
  const pressReleasesData = showFeaturedOnly
    ? await getFeaturedPressReleases(limit)
    : (await getPressReleases({ perPage: limit })).items;

  // Format press releases for display
  const pressReleases = pressReleasesData.map((press) => ({
    id: press.id,
    title: press.title,
    date: new Date(press.published_date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
    source: press.source || "FinWage",
    url: press.url,
    content: press.content,
  }));

  return (
    <section className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-xl text-gray-600">{description}</p>
          )}
        </div>

        {pressReleases.length > 0 ? (
          <div className="space-y-6 max-w-3xl mx-auto">
            {pressReleases.map((press) => (
              <NextLink
                key={press.id}
                href={press.url || "#"}
                target={press.url ? "_blank" : undefined}
                rel={press.url ? "noopener noreferrer" : undefined}
                className="block bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {press.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>{press.date}</span>
                      <span>•</span>
                      <span className="text-[#1d44c3] font-semibold">
                        {press.source}
                      </span>
                    </div>
                  </div>
                  {press.url && (
                    <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  )}
                </div>
              </NextLink>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 max-w-3xl mx-auto">
            <p>No press releases available at this time.</p>
          </div>
        )}
      </div>
    </section>
  );
}
