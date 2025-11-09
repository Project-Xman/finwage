import Image from "next/image";
import React from "react";
import { Iphone } from "../ui/iphone";
import { Safari } from "../ui/safari";

const imgBackgroundImage = "/assets/platform-image.png";
const imgScreenshot20251015At114207Pm1 = "/assets/web-dashboard.png";
const imgImageContainer = "/assets/mobile-app.png";

function PlatformHeader() {
  return (
    <div className="flex flex-col items-start text-white w-full gap-4 md:gap-6">
      <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
        Our Platform
      </h2>
      <p className="font-normal text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
        FinWage is revolutionizing the way people get paid by creating a
        platform that empowers both employers and employees. For employers, it
        provides smarter tools to attract, retain, and engage talent.
      </p>
    </div>
  );
}

function ExploreButton() {
  return (
    <button
      type="button"
      className="h-[50px] md:h-[60px] px-6 md:px-8 rounded-full border-2 border-white text-white text-base md:text-lg font-medium hover:bg-white hover:text-[#f74b6b] transition-colors duration-200 shadow-lg"
    >
      Explore Platform
    </button>
  );
}

function PlatformContent() {
  return (
    <div className="flex flex-col gap-8 items-start max-w-xl">
      <PlatformHeader />
      <ExploreButton />
    </div>
  );
}

export function PlatformImages() {
  return (
    <div className="relative w-full max-w-6xl lg:max-w-4xl">
      {/* Desktop Safari Browser */}
      <div className="hidden md:block drop-shadow-2xl">
        <Safari
          imageSrc={imgScreenshot20251015At114207Pm1}
          url="dashboard.finwage.com"
        />
      </div>

      {/* Mobile: Show only iPhone */}
      <div className="md:hidden flex justify-center drop-shadow-2xl">
        <div className="w-[252px] sm:w-[288px]">
          <Iphone src={imgImageContainer} />
        </div>
      </div>

      {/* Desktop: iPhone positioned over Safari */}
      <div className="hidden md:block absolute bottom-0 -right-20 w-[36%] lg:w-[21.5%] z-30 drop-shadow-2xl">
        <div className="w-[252px] sm:w-[288px]">
          <Iphone src={imgImageContainer} />
        </div>
      </div>
    </div>
  );
}

export default function PlatformSection() {
  return (
    <div
      className="bg-[#f74b6b] relative min-h-screen w-full overflow-hidden px-4 sm:px-6 md:px-16 lg:px-24 py-7"
      data-name="Platform Section"
    >
      {/* Background Circle - Hidden on mobile */}
      <div className="hidden lg:block absolute rounded-full overflow-hidden right-[-260px] top-[-200px] w-[1000px] h-[1000px]">
        <Image
          fill
          alt="Corporate workers brainstorming together"
          className="absolute inset-0 object-cover pointer-events-none left-[120px]"
          src="/assets/platform-image.png"
        />
        <div className="absolute inset-0 bg-pink-900 opacity-50"></div>
      </div>

      {/* Big Pink Arc */}
      <div className="absolute right-[-2%] -top-10 w-[40%] md:w-[50%] h-[40%] md:h-[50%] z-0 opacity-30 md:opacity-100">
        <Image
          fill
          alt="Pink Arc"
          className="object-contain"
          src="/assets/pink-arc-big.png"
        />
      </div>

      {/* Blue Arc - Fixed positioning */}
      <div className="absolute -left-10 bottom-[100px] md:bottom-[20px] lg:bottom-[120px] w-[110px] md:w-[150px] lg:w-[170px] h-[180px] md:h-[240px] lg:h-[300px]">
        <Image
          fill
          src="/assets/blue-arc.png"
          alt=""
          className="object-contain"
          sizes="170px"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
        {/* Text Content Section */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <PlatformContent />
        </div>

        {/* Images Container */}
        <div className="flex justify-center lg:justify-end items-end mt-auto w-full lg:w-auto">
          <PlatformImages />
        </div>
      </div>
    </div>
  );
}
