"use client";

import { BellIcon, ForwardIcon } from "lucide-react";
import Image from "next/image";

function HeroImageContainer({ className, hideWhiteArc = false }: { className?: string; hideWhiteArc?: boolean }) {
  return (
    <div className={`${className} relative`} data-name="Hero Image Container">
      {/* Circular Container for the Hero Image */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: "1000px",
          height: "1000px",
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
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
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
      <div
        className="absolute bg-white rounded-[24px] p-4 shadow-lg border border-gray-200 max-w-[300px] flex items-start gap-3"
        style={{
          bottom: "63.19px",
          right: "10px",
        }}
      >
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
      </div>
    </div>
  );
}

// Function for the Arrow Icon inside the button
function ArrowIcon() {
  return (
    <div
      className="absolute left-[150.41px] size-[20px] top-1/2 translate-y-[-50%]"
      data-name="SVG"
    >
      <ForwardIcon className="block size-full" stroke="white" />
    </div>
  );
}

// Function for the "Get a Demo" Link/Button
function DemoButton() {
  return (
    <div
      className="bg-[#1d44c3] h-[60px] overflow-clip relative rounded-[9999px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] shrink-0 w-[210.41px]"
      data-name="Link"
    >
      {/* Gradient Overlay (likely for visual effect) */}
      <div
        className="absolute bg-gradient-to-r from-[#3c65d6] inset-0 opacity-0 to-[#1d44c3]"
        data-name="Gradient"
      />
      {/* Button Text */}
      <div className="absolute flex flex-col font-semibold h-[28px] justify-center leading-[0] left-[39px] text-[20px] text-white top-[30px] translate-y-[-50%] w-[131px]">
        <p className="leading-[28px]">Get a Demo</p>
      </div>
      {/* Arrow Icon */}
      <ArrowIcon />
    </div>
  );
}

// Main Hero Component
export default function Hero() {
  return (
    <div
      className="bg-white relative w-full min-h-[600px] md:min-h-[1045px] overflow-hidden"
      data-name="Hero Section"
    >
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center px-4 py-8 sm:py-12 gap-6 sm:gap-8">
        {/* Circular Image Container - Full Circle */}
        <div className="relative w-full max-w-[350px] sm:max-w-[450px] aspect-square">
          {/* Full circle with centered image - no white arc */}
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
            <Image
              fill
              alt="Corporate workers brainstorming together"
              className="object-cover"
              style={{ objectPosition: "center" }}
              src="/assets/hero-image.jpg"
            />
            {/* Blue Overlay */}
            <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
            
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
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-3 shadow-lg border border-gray-200 max-w-[280px] flex items-start gap-2">
              <div className="bg-red-500 rounded-md p-1.5">
                <BellIcon className="size-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#1d44c3] text-[10px] font-semibold uppercase">
                  FINWAGE
                </span>
                <span className="text-gray-800 text-[12px]">
                  Your FinWage balance went up!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-4 sm:gap-6 items-center text-center max-w-[340px] sm:max-w-[400px]">
          <h1 className="text-[#1d44c3] text-[36px] sm:text-[48px] leading-[1.15] tracking-[-1.8px] sm:tracking-[-2.4px]">
            Your Money,
            <br />
            Your Control.
          </h1>
          <p className="text-gray-800 text-[14px] sm:text-[16px] leading-[1.68]">
            Work Today, Get Paid Today! A financial wellness benefit that helps
            employees access their earned wages while saving employers time and
            money
          </p>
          <DemoButton />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block relative h-[700px] md:h-[800px] lg:h-[945px]">
        {/* Main Image Container */}
        <HeroImageContainer className="absolute bg-white h-[1021.191px] left-[-240px] md:left-[-220px] lg:left-[-131px] overflow-clip top-[-177px] w-[1046.915px] scale-[0.5] md:scale-[0.6] lg:scale-100 origin-top-left" />

        {/* Text Content and Button */}
        <div className="absolute left-[280px] md:left-[400px] lg:left-[912px] top-[380px] md:top-[420px] lg:top-[97px] right-[40px] md:right-[80px] lg:right-auto lg:w-[583px] max-w-[600px] md:max-w-[700px] lg:max-w-none">
          {/* Text Content */}
          <div className="flex flex-col font-bold leading-[40px] md:leading-[48px] lg:leading-[96px] text-[#1d44c3] text-[38px] md:text-[46px] lg:text-[93px] tracking-[-1.5px] md:tracking-[-2px] lg:tracking-[-2.4px] mb-[16px] md:mb-[20px] lg:mb-[43px]">
            <p className="mb-0">Your Money,</p>
            <p className="mb-0">Your Control.</p>
          </div>
          <div className="flex flex-col font-normal leading-[19px] md:leading-[21px] lg:leading-[29.25px] text-[12.5px] md:text-[13px] lg:text-[17.4px] text-gray-800 mb-[20px] md:mb-[24px] lg:mb-[43px]">
            <p className="mb-0">
              Work Today, Get Paid Today! A financial wellness
            </p>
            <p className="mb-0">
              benefit that helps employees access their earned
            </p>
            <p>wages while saving employers time and money</p>
          </div>
          
          {/* Button - Below text content */}
          <div className="scale-[0.8] md:scale-[0.85] lg:scale-100 origin-left">
            <DemoButton />
          </div>
        </div>

        {/* Pink Arc Overlay (Right side) */}
        <div className="absolute right-0 bottom-[80px] md:bottom-[100px] w-[100px] md:w-[140px] lg:w-[170px] h-[160px] md:h-[220px] lg:h-[300px]">
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
