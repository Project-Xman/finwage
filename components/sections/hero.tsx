"use client";

import { BellIcon, ForwardIcon, PlayIcon } from "lucide-react";
import Image from "next/image";


function HeroImageContainer({ className }: { className?: string }) {
  return (
    <div className={`${className} relative`} data-name="Hero Image Container">
      {/* Circular Container for the Hero Image */}
      {/* This div defines the size and shape (circle) */}
      <div 
        className="absolute rounded-full overflow-hidden left-[6px] top-[2px] w-[3px] h-[1000px]"
        style={{ width: '1000px', height: '1000px' }} // Explicit styles for clarity, Tailwind should handle this
      >
        {/* Image fills the circular container using object-cover */}
        {/* Ensure /assets/hero-image.jpg is ideally a square image for best results */}
        <Image
          fill
          alt="Corporate workers brainstorming together"
          className="absolute inset-0 object-cover pointer-events-none left-[120px]" // object-cover ensures it fills the circle
          src="/assets/hero-image.jpg" // Placeholder: Replace with your actual square asset
        />
        {/* Blue Overlay - Covers the circular image area */}
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
      </div>

      {/* White Arc Overlay */}
      <div className="absolute left-[100px] top-[-126px] size-[900px]">
        <Image
          fill
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none"
          src="/assets/white-arc.png" // Placeholder: Replace with your actual asset
          sizes="900px"
        />
      </div>

      {/* Play Icon Button */}
      <div className="absolute left-[400px] top-[450px] cursor-pointer w-[160px] h-[160px] flex items-center justify-center">
        <Image
          fill
          alt="Play Video"
          className="object-contain" // Fits the icon nicely within its button container
          src="/assets/play-icon.png" // Placeholder: Replace with your actual asset
          sizes="160px"
        />
      </div>

      {/* FinWage Notification Card */}
      <div className="absolute bottom-[63.19px] right-[10px] bg-white rounded-[24px] p-4 shadow-lg border border-gray-200 max-w-[300px] flex items-start gap-3">
        {/* Bell Icon in Red Square */}
        <div className="bg-red-500 rounded-md p-2">
          <BellIcon className="size-5 text-white" />
        </div>
        {/* Text Content */}
        <div className="flex flex-col">
          <span className="text-[#1d44c3] text-[11.8px] font-semibold uppercase">FINWAGE</span>
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
        {/* Circular Image Container - Scaled Down */}
        <div className="relative w-full max-w-[400px] sm:max-w-[500px] aspect-square">
          {/* Scale down the ImageContainer for mobile */}
          <div className="scale-[0.35] sm:scale-[0.5] origin-center absolute inset-0 flex items-center justify-center">
            <HeroImageContainer className="relative bg-white h-[945.191px] overflow-clip w-[1019.915px]" />
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
      <div className="hidden md:block relative h-[800px] lg:h-[945px]">
        {/* Main Image Container */}
        <HeroImageContainer className="absolute bg-white h-[1021.191px] left-[-131px] lg:left-[-131px] overflow-clip top-[-177px] w-[1046.915px] scale-75 lg:scale-100 origin-top-left" />

        {/* Text Content and Button */}
        <div className="absolute left-[600px] lg:left-[912px] top-[97px] w-[400px] lg:w-[583px]">
          <div className="flex flex-col font-bold leading-[64px] lg:leading-[96px] text-[#1d44c3] text-[62px] lg:text-[93px] tracking-[-2.4px] mb-[30px] lg:mb-[43px]">
            <p className="mb-0">Your Money,</p>
            <p className="mb-0">Your Control.</p>
          </div>
          <div className="flex flex-col font-normal leading-[24px] lg:leading-[29.25px] text-[14px] lg:text-[17.4px] text-gray-800 mb-[30px] lg:mb-[43px]">
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

        {/* Pink Arc Overlay (Right side) */}
        <div className="absolute right-0 bottom-[100px] w-[120px] lg:w-[170px] h-[200px] lg:h-[300px]">
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
