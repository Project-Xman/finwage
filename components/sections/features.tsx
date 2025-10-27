import * as LucideIcons from "lucide-react";
import Image from "next/image";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { getFeaturedFeatures } from "@/lib/services/features";
import { getImageUrl } from "@/lib/utils/pocketbase";

export default async function Features() {
  const features = await getFeaturedFeatures(4);

  return (
    <section className="bg-white w-full py-12 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col gap-4 mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#1d44c3] leading-tight">
            Everything you need to empower your workforce
          </h2>
          <p className="text-base md:text-lg text-gray-800 leading-7 max-w-2xl">
            Discover how FinWage provides comprehensive solutions for modern
            payroll management.
          </p>
        </div>

        <BentoGrid>
          {features.map((feature, index) => {
            // Get the icon component from lucide-react if icon name is provided
            const IconComponent = feature.icon
              ? (LucideIcons as any)[feature.icon]
              : null;

            // Determine grid layout based on index
            const className =
              index % 3 === 0
                ? "col-span-3 lg:col-span-1"
                : "col-span-3 lg:col-span-2";

            return (
              <BentoCard
                key={feature.id}
                Icon={IconComponent || LucideIcons.Star}
                name={feature.title}
                description={feature.description}
                href={`/features/${feature.slug}`}
                cta="Learn more"
                className={className}
                background={
                  feature.image ? (
                    <div className="absolute inset-0 flex items-center justify-center [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
                      <Image
                        src={getImageUrl(feature, feature.image, {
                          fallback: "/placeholder.jpg",
                        })}
                        alt={feature.title}
                        fill
                        className="object-cover opacity-20"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />
                  )
                }
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
