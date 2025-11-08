import { BellIcon } from "lucide-react";
import type { NextPage } from "next";
import Image from "next/image";
import { getCTACards } from "@/lib/services/cta";
import { renderIcon } from "@/lib/utils/icon-mapper";
import type { CtaCardsResponse } from "@/types/pocketbase";
import { FeaturesGrid, type CtaCard } from "./cta";
import { Button } from "@/components/ui/button";

function HeroImageContainer({ className }: { className?: string; }) {
  return (
    <div className={`${className} relative`} data-name="Hero Image Container">
      {/* Circular Container for the Hero Image */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: "800px",
          height: "800px",
          left: "6px",
          top: "2px",
        }}
      >
        {/* Image fills the circular container using object-cover */}
        <Image
          fill
          alt="Corporate workers brainstorming together"
          className="object-cover pointer-events-none"
          style={{ objectPosition: "center" }}
          src="/assets/hero-image.jpg"
        />
        {/* Blue Overlay - Covers the circular image area */}
        <div className="absolute inset-0 bg-pink-900 opacity-50"></div>
      </div>

      {/* White Arc Overlay */}
      <div
        className="absolute"
        style={{
          left: "100px",
          top: "26px",
          width: "600px",
          height: "600px",
        }}
      >
        <Image
          fill
          alt=""
          className="object-contain pointer-events-none"
          src="/assets/white-arc.png"
          sizes="900px"
        />
      </div>

      {/* Play Icon Button */}
      <div
        className="absolute cursor-pointer flex items-center justify-center"
        style={{
          left: "300px",
          top: "350px",
          width: "260px",
          height: "160px",
        }}
      >
        <Image
          fill
          alt="Play Video"
          className="object-contain"
          src="/assets/app-icon.png"
          sizes="160px"
        />
      </div>

    </div>
  );
}

const CycleSection: NextPage = async () => {
  let cards: CtaCard[] = [];
  try {
    cards = (await getCTACards({ perPage: 10 })) as CtaCard[];
  } catch (error) {
    console.error("Failed to fetch CTA cards:", error);
  }
  return (
    <div className="hidden lg:block relative w-full h-[580px] md:h-[650px] lg:h-[734px] bg-white flex-shrink-0 text-left text-2xl text-white font-afacad overflow-hidden">
      {/* Main Container */}
      <div className="absolute top-[-140px] md:top-[-160px] lg:top-[-184px] left-[-280px] md:left-[-320px] lg:left-[-162px] w-[1815px] flex items-center gap-8 md:gap-12 lg:gap-16 overflow-clip scale-[0.65] md:scale-[0.7] lg:scale-100 origin-left">
        <HeroImageContainer className="w-[1000px] h-[930px]" />

        {/* Right Content Section */}
       <div className="w-[400px] flex flex-col gap-6">
         <FeaturesGrid cards={cards} />
         
         {/* Bottom CTA Section */}
         <div className="flex flex-col gap-4">
           <h2 className="font-normal text-2xl text-[#1d44c3] leading-tight">
             Discover Why FinWage is Powering Top Employers
           </h2>
           <Button
             size="lg"
             className="bg-[#1d44c3] text-white hover:bg-blue-800 hover:shadow-xl transition-shadow rounded-full font-semibold w-fit"
           >
             Let's Talk
           </Button>
         </div>
       </div>
      </div>
    </div>
  );
};

export default CycleSection;
