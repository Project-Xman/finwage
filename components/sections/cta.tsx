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
    <Card className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-600/20 transition-all duration-300">
      <CardContent className="p-6 flex flex-col sm:flex-row gap-5 items-start">
        <div
          className={`size-12 ${bg_color || "bg-blue-50"} rounded-xl flex items-center justify-center shrink-0 shadow-sm`}
        >
          {isImageIcon ? (
            <Image
              alt={`${title} icon`}
              className="w-full h-full object-cover rounded-xl"
              width={48}
              height={48}
              src={icon_svg}
            />
          ) : (
            <div className="text-[#1d44c3]">
              <SvgIcon svgString={icon_svg} className="w-6 h-6" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="font-bold text-lg text-[#1d44c3] leading-tight">
            {title}
          </h3>
          <div className="space-y-1.5">
            {points &&
              points.map((point: string, index: number) => (
                <p key={index} className="text-sm text-gray-600 leading-relaxed">
                  {point}
                </p>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
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
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1d44c3] leading-tight max-w-lg">
                Discover Why FinWage is Powering Top Employers
              </h2>
              
              <EnquiryButton
                type="contact"
                size="lg"
                className="bg-[#1d44c3] text-white hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5 transition-all rounded-full px-8 h-14 text-lg font-semibold shadow-blue-900/20 shadow-md"
                modalTitle="Let's Talk"
                modalDescription="Tell us about your organization and how we can help you provide financial wellness benefits to your employees."
              >
                Let's Talk
              </EnquiryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
