import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { EnquiryButton } from "@/components/shared/enquiry-button";
import { Card, CardContent } from "@/components/ui/card";
import { getCTACards } from "@/lib/services/cta";
import { SvgIcon } from "@/lib/utils/svg-icon-renderer";
import type { CtaCardsResponse } from "@/types/pocketbase";

// Type for CTA cards with properly typed points array
export type CtaCard = CtaCardsResponse<string[]>;

function CtaCardComponent({ icon_svg, bg_color, title, points }: CtaCard) {
  // Check if icon is an image path (starts with / or http)
  const isImageIcon = icon_svg?.startsWith("/") || icon_svg?.startsWith("http");

  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:border-blue-100 transition-all duration-300">
      <div className="flex gap-5 items-start">
        <div className="shrink-0 relative">
          <div
            className={`size-14 ${bg_color || "bg-blue-50"} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
          >
            {isImageIcon ? (
              <Image
                alt={`${title} icon`}
                className="w-full h-full object-cover rounded-2xl"
                width={56}
                height={56}
                src={icon_svg}
              />
            ) : (
              <SvgIcon svgString={icon_svg} className="w-7 h-7 text-[#1d44c3]" />
            )}
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <h3 className="font-bold text-xl text-[#1d44c3] leading-tight group-hover:text-blue-700 transition-colors">
            {title}
          </h3>
          <div className="space-y-2.5">
            {points &&
              points.map((point: string, index: number) => (
                <div key={index} className="flex items-start gap-3 group/item">
                  <div className="mt-1 shrink-0 w-4 h-4 rounded-full bg-green-50 flex items-center justify-center group-hover/item:bg-green-100 transition-colors">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium group-hover/item:text-gray-900 transition-colors">
                    {point}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Cta() {
  let cards: CtaCard[] = [];
  try {
    cards = (await getCTACards({ perPage: 10 })) as CtaCard[];
  } catch (error) {
    console.error("Failed to fetch CTA cards:", error);
  }

  return (
    <section className="w-full py-12 lg:py-24 bg-white overflow-hidden" data-name="CTA">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Image Composition */}
          <div className="relative w-full max-w-[600px] mx-auto lg:mx-0 aspect-square lg:aspect-[4/5] order-2 lg:order-1">
            {/* Decorative Background Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full -z-10" />
            
            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <Image
                fill
                alt="Corporate workers brainstorming together"
                className="object-cover"
                src="/assets/hero-image.jpg"
                priority
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1d44c3]/60 to-transparent mix-blend-multiply" />
              
              {/* Floating Badge/Icon */}
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-[240px]">
                <Image
                  width={160}
                  height={60}
                  alt="FinWage Logo"
                  className="object-contain h-12 w-auto"
                  src="/assets/app-icon.png"
                />
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#1d44c3] rounded-full opacity-5 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-pink-500 rounded-full opacity-5 blur-3xl" />
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col gap-10 order-1 lg:order-2">
            <div className="space-y-6">
              {cards.map((card) => (
                <CtaCardComponent key={card.id} {...card} />
              ))}
            </div>

            <div className="space-y-6 pt-6 border-t border-gray-100">
              
              <EnquiryButton
                type="contact"
                size="lg"
                className="bg-[#1d44c3] text-white hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5 transition-all rounded-full px-8 h-14 text-lg font-semibold shadow-blue-900/20 shadow-md"
                modalTitle="Let's Talk"
                modalDescription="Tell us about your organization and how we can help you provide financial wellness benefits to your employees."
              >
                Explore Resource
              </EnquiryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
