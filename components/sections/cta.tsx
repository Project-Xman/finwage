import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCTACards } from "@/lib/services/cta";
import { renderIcon } from "@/lib/utils/icon-mapper";
import type { CtaCardsResponse } from "@/types/pocketbase";

// Type for CTA cards with properly typed points array
type CtaCard = CtaCardsResponse<string[]>;

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
    <Card className="bg-white rounded-2xl md:rounded-3xl border border-[#d9d8d8] shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
      <CardContent className="p-6 md:p-8 flex flex-col h-full">
        {/* Icon + Title row */}
        <div className="mb-4 md:mb-6">
          <div className="flex items-center gap-4 md:gap-6">
            <div
              className={`size-12 md:size-14 ${bg_color} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              {isImageIcon ? (
                <Image
                  alt={`${title} icon`}
                  className="w-full h-full object-cover rounded-lg"
                  width={45}
                  height={45}
                  src={icon}
                />
              ) : (
                <div className="text-[#1d44c3]">
                  {renderIcon(icon, "w-6 h-6 md:w-7 md:h-7")}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-lg md:text-xl text-[#1d44c3] leading-tight">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3 md:space-y-4">
          {points &&
            points.map((point: string, index: number) => (
              <p
                key={index}
                className="text-sm md:text-base text-gray-700 leading-relaxed"
              >
                {point}
              </p>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

function FeaturesGrid({ cards }: { cards: CtaCard[] }) {
  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Mobile: Single column (flex-col), MD+: Two column grid */}
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-8 lg:gap-10">
        {cards.map((card) => (
          <CtaCardComponent key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}

function ContentContainer({ cards }: { cards: CtaCard[] }) {
  return (
    <Card className="bg-white rounded-2xl md:rounded-3xl border border-[#ecebeb] shadow-xl mx-4 md:mx-8 lg:mx-16 xl:mx-32 my-8 md:my-16">
      <CardContent className="p-6 md:p-8 lg:p-12 xl:p-16 space-y-8 md:space-y-12 lg:space-y-16">
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
      className="bg-white w-full py-8 md:py-16 lg:py-24 flex items-center justify-center"
      data-name="CTA"
    >
      <div className="w-full max-w-7xl">
        <ContentContainer cards={cards} />
      </div>
    </div>
  );
}
