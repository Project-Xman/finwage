import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCTACards } from "@/lib/services/cta";
import { renderIcon } from "@/lib/utils/icon-mapper";
import type { CtaCardsResponse } from "@/types/pocketbase";

// Type for CTA cards with properly typed points array
export type CtaCard = CtaCardsResponse<string[]>;



function LetsTalkButton() {
  return (
    <Button
      size="lg"
      className="bg-[#1d44c3] text-white hover:bg-blue-800 hover:shadow-xl transition-shadow rounded-full font-semibold w-full md:w-auto"
      data-name="Link"
    >
      Let's Talk
    </Button>
  );
}

function HeroSection() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:gap-12 items-center justify-between w-full">
      <div className="flex-1 text-center lg:text-left">
        <h2 className="font-normal text-2xl md:text-3xl lg:text-4xl text-[#1d44c3] leading-tight">
          Discover Why FinWage is Powering Top Employers
        </h2>
      </div>
      <div className="flex-shrink-0 w-full md:w-auto">
        <LetsTalkButton />
      </div>
    </div>
  );
}

function CtaCardComponent({ icon, bg_color, title, points }: CtaCard) {
  // Check if icon is an image path (starts with / or http)
  const isImageIcon = icon.startsWith("/") || icon.startsWith("http");

  return (
    <Card className="bg-white rounded-xl border-2 border-[#e5e7eb] shadow-md hover:shadow-xl hover:border-[#1d44c3] transition-all duration-300 h-full">
      <CardContent className="p-4 flex flex-col h-full">
        {/* Icon + Title row */}
        <div className="mb-3">
          <div className="flex items-start gap-3">
            <div
              className={`size-11 ${bg_color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}
            >
              {isImageIcon ? (
                <Image
                  alt={`${title} icon`}
                  className="w-full h-full object-cover rounded-lg"
                  width={40}
                  height={40}
                  src={icon}
                />
              ) : (
                <div className="text-[#1d44c3]">
                  {renderIcon(icon, "w-6 h-6")}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-base text-[#1d44c3] leading-snug">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          {points &&
            points.map((point: string, index: number) => (
              <p
                key={index}
                className="text-sm text-gray-600 leading-relaxed"
              >
                {point}
              </p>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function FeaturesGrid({ cards }: { cards: CtaCard[] }) {
  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Single column list */}
      <div className="flex flex-col gap-4">
        {cards.map((card) => (
          <CtaCardComponent key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}

export function ContentContainer({ cards }: { cards: CtaCard[] }) {
  return (
    <Card className="bg-white rounded-xl border border-[#ecebeb] shadow-xl mx-4 md:mx-8 lg:mx-12 xl:mx-24 my-4 md:my-8">
      <CardContent className="p-4 md:p-5 lg:p-6 xl:p-8 space-y-4 md:space-y-6 lg:space-y-8">
        <HeroSection />
        <FeaturesGrid cards={cards} />
      </CardContent>
    </Card>
  );
}

export default async function Cta() {
  const cards = (await getCTACards({ perPage: 10 })) as CtaCard[];

  return (
    <div
      className="lg:hidden bg-white w-full py-8 md:py-16 lg:py-24 flex items-center justify-center"
      data-name="CTA"
    >
      <div className="w-full max-w-7xl">
        <ContentContainer cards={cards} />
      </div>
    </div>
  );
}
