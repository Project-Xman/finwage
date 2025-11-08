"use client";

import { ArrowRight, BellIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function HeroImageContainer({
  className,
  hideWhiteArc = false,
}: {
  className?: string;
  hideWhiteArc?: boolean;
}) {
  return (
    <div className={`${className} relative overflow-visible`} data-name="Hero Image Container">
      {/* Circular Container for the Hero Image */}
      <div
        className="absolute rounded-full overflow-visible"
        style={{
          width: "1000px",
          height: "1000px",
          left: "6px",
          top: "2px",
        }}
      >
        {/* Inner container for image clipping */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Image fills the circular container using object-cover */}
          <Image
            fill
            alt="Corporate workers brainstorming together"
            className="object-cover pointer-events-none"
            style={{ objectPosition: "center" }}
            src="/assets/hero-image.jpg"
          />
          {/* Blue Overlay - Covers the circular image area */}
          <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
        </div>
      </div>

      {/* White Arc Overlay */}
      {!hideWhiteArc && (
        <div
          className="absolute"
          style={{
            left: "100px",
            top: "-126px",
            width: "900px",
            height: "900px",
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
      )}

      {/* Play Icon Button */}
      <div
        className="absolute cursor-pointer flex items-center justify-center"
        style={{
          left: "400px",
          top: "450px",
          width: "160px",
          height: "160px",
        }}
      >
        <Image
          fill
          alt="Play Video"
          className="object-contain"
          src="/assets/play-icon.png"
          sizes="160px"
        />
      </div>

      {/* FinWage Notification Card */}
      <Card
        className="absolute bg-white rounded-[24px] p-4 shadow-lg border border-gray-200 max-w-[300px] flex items-start gap-3"
        style={{
          bottom: "63.19px",
          right: "10px",
        }}
      >
        <CardContent className="flex items-start gap-3 p-0">
          {/* Bell Icon in Red Square */}
          <div className="bg-red-500 rounded-md p-2">
            <BellIcon className="size-5 text-white" />
          </div>
          {/* Text Content */}
          <div className="flex flex-col">
            <span className="text-[#1d44c3] text-[11.8px] font-semibold uppercase">
              FINWAGE
            </span>
            <span className="text-gray-800 text-[13.7px]">
              Your FinWage balance went up!
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Function for the "Get a Demo" Link/Button
function DemoButton() {
  return (
    <Button
      size="lg"
      className="bg-[#1d44c3] text-white hover:bg-blue-800 hover:shadow-lg transition-shadow rounded-full h-[60px] px-8 font-semibold text-[20px]"
      data-name="Link"
    >
      Get a Demo
      <ArrowRight className="ml-2 size-5" />
    </Button>
  );
}

// Main Hero Component
export default function Hero() {
  return (
    <div
      className="bg-white relative overflow-hidden"
      data-name="Hero Section"
    >
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center px-4 py-8 sm:py-12 gap-6 sm:gap-8">
        {/* Text Content */}
        <div className="flex flex-col gap-4 sm:gap-6 items-center text-center max-w-[340px] sm:max-w-[400px]">
          <div className="flex flex-col font-bold leading-[40px] text-[#1d44c3] text-[38px] tracking-[-1.5px] mb-[16px]">
            <p className="mb-0">Your Money,</p>
            <p className="mb-0">Your Control.</p>
          </div>
          <div className="flex flex-col font-normal leading-[19px] text-[12.5px] text-gray-800 mb-[20px]">
            <p className="mb-0">
              Work Today, Get Paid Today! A financial wellness
            </p>
            <p className="mb-0">
              benefit that helps employees access their earned
            </p>
            <p>wages while saving employers time and money</p>
          </div>
          <DemoButton />
        </div>

        {/* Circular Image Container - Full Circle */}
        <div className="relative w-full max-w-[350px] sm:max-w-[450px] aspect-square mb-24">
          {/* Full circle with centered image - no white arc */}
          <div className="relative w-full h-full rounded-full overflow-visible shadow-2xl">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Image
                fill
                alt="Corporate workers brainstorming together"
                className="object-cover"
                style={{ objectPosition: "center" }}
                src="/assets/hero-image.jpg"
              />
              {/* Blue Overlay */}
              <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
            </div>

            {/* Play Icon Button - Centered */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]">
              <Image
                fill
                alt="Play Video"
                className="object-contain cursor-pointer"
                src="/assets/play-icon.png"
                sizes="100px"
              />
            </div>

            {/* FinWage Notification Card */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-4 shadow-lg border border-gray-200 max-w-[320px] w-[90%] flex items-start gap-3">
              <div className="bg-red-500 rounded-md p-2">
                <BellIcon className="size-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#1d44c3] text-[11px] font-semibold uppercase">
                  FINWAGE
                </span>
                <span className="text-gray-800 text-[14px]">
                  Your FinWage balance went up!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block relative h-[500px] lg:h-[850px]">
        {/* Main Image Container */}
        <HeroImageContainer className="absolute bg-white h-[1021.191px] left-[-180px] md:left-[-160px] lg:left-[-131px] overflow-clip top-[-100px] md:top-[-140px] lg:top-[-177px] w-[1046.915px] scale-[0.45] md:scale-[0.55] lg:scale-100 origin-top-left" />

        {/* Text Content and Button */}
        <div className="absolute left-[300px] md:left-[420px] lg:left-[912px] top-[40px] md:top-[60px] lg:top-[97px] right-[40px] md:right-[60px] lg:right-auto lg:w-[583px] max-w-[420px] md:max-w-[340px] lg:max-w-none">
          {/* Text Content */}
          <div className="flex flex-col font-bold leading-[40px] md:leading-[52px] lg:leading-[96px] text-[#1d44c3] text-[42px] md:text-[52px] lg:text-[93px] tracking-[-1.5px] md:tracking-[-2px] lg:tracking-[-2.4px] mb-[12px] md:mb-[16px] lg:mb-[43px]">
            <p className="mb-0">Your Money,</p>
            <p className="mb-0">Your Control.</p>
          </div>
          <div className="flex flex-col font-normal leading-[20px] md:leading-[24px] lg:leading-[29.25px] text-[13px] md:text-[10.5px] lg:text-[17.4px] text-gray-800 mb-[16px] md:mb-[20px] lg:mb-[43px]">
            <p className="mb-0">
              Work Today, Get Paid Today! A financial wellness
            </p>
            <p className="mb-0">
              benefit that helps employees access their earned
            </p>
            <p>wages while saving employers time and money</p>
          </div>

          {/* Button - Below text content */}
          <div className="scale-[0.85] md:scale-[0.9] lg:scale-100 origin-left">
            <DemoButton />
          </div>
        </div>

        {/* Pink Arc Overlay (Right side) */}
        <div className="absolute right-0 bottom-[100px] md:bottom-[20px] lg:bottom-[120px] w-[110px] md:w-[150px] lg:w-[170px] h-[180px] md:h-[240px] lg:h-[300px]">
          <Image
            fill
            src="/assets/pink-arc.png"
            alt=""
            className="object-contain"
            sizes="170px"
          />
        </div>
      </div>
    </div>
  );
}
