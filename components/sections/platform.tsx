import React from "react";
import Image from "next/image";
import { Safari } from "../ui/safari";
import { Iphone } from "../ui/iphone";

const imgBackgroundImage = "/assets/platform-image.png";
const imgScreenshot20251015At114207Pm1 = "/assets/web-dashboard.png";
const imgImageContainer = "/assets/mobile-app.png";

function PlatformHeader() {
  return (
    <div className="flex flex-col items-start text-white w-full gap-6">
      <h2 className="font-bold text-5xl md:text-6xl leading-tight">Our Platform</h2>
      <p className="font-normal text-lg md:text-xl leading-relaxed max-w-2xl">
        FinWage is revolutionizing the way people get paid by creating a platform that empowers both employers and employees. For employers, it provides smarter tools to attract, retain, and engage talent.
      </p>
    </div>
  );
}

function ExploreButton() {
  return (
    <button className="h-[60px] px-8 rounded-full border-2 border-white text-white text-lg font-medium hover:bg-white hover:text-[#f74b6b] transition-colors duration-200 shadow-lg">
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

function PlatformImages() {
  return (
    <div className="relative w-full max-w-6xl ">
    
        <Safari 
          imageSrc={imgScreenshot20251015At114207Pm1}
          url="dashboard.finwage.com"
        />
      
      
      {/* Mobile App using iPhone component */}
      <div className="absolute bottom-0 right-0 w-[52%] lg:w-[40%] z-30">
        <Iphone 
          src={imgImageContainer}
        />
      </div>
    </div>
  );
}

export default function PlatformSection() {
  return (
    <div className="bg-[#f74b6b] relative min-h-screen w-full overflow-hidden py-20 px-8 md:px-16 lg:px-24" data-name="Platform Section">
      <div 
              className="absolute rounded-full overflow-hidden right-[-260px] top-[-200px] w-[3px] h-[1000px]"
              style={{ width: '1000px', height: '1000px' }} // Explicit styles for clarity, Tailwind should handle this
            >
              {/* Image fills the circular container using object-cover */}
              {/* Ensure /assets/hero-image.jpg is ideally a square image for best results */}
              <Image
                fill
                alt="Corporate workers brainstorming together"
                className="absolute inset-0 object-cover pointer-events-none left-[120px]" // object-cover ensures it fills the circle
                src="/assets/platform-image.png" // Placeholder: Replace with your actual square asset
              />
              {/* Blue Overlay - Covers the circular image area */}
              <div className="absolute inset-0 bg-pink-900 opacity-50"></div>
            </div>      
      {/* Big Pink Arc */}
      <div className="absolute right-[-2%] top-0 w-[50%] h-[50%] z-0">
        <Image fill alt="Pink Arc" className="object-contain" src="/assets/pink-arc-big.png" />
      </div>

      
      {/* Blue Arc */}
      <div className="absolute bottom-20 left-0">
        <Image alt="Blue Arc" width={150} height={100} className="object-contain " src="/assets/blue-arc.png" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
        {/* Text Content Section */}
        <div className="mb-12 lg:mb-16">
          <PlatformContent />
        </div>
        
        {/* Images Container - Positioned at bottom */}
        <div className="flex justify-center items-end mt-auto h-[523px] w-[735px] ml-[703px]">
          <PlatformImages />
        </div>
      </div>
    </div>
  );
}
