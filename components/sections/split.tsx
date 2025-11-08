import Image from "next/image";
import React from "react";
import { BellIcon, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function DemoButton() {
  return (
    <Button
      size="lg"
      className="bg-[#1d44c3] text-white hover:bg-blue-800 hover:shadow-lg transition-shadow rounded-full h-[60px] px-8 py-6 font-semibold text-[20px]"
      data-name="Link"
    >
      Get a Demo
      <ArrowRight className="ml-2 size-5" />
    </Button>
  );
}

export default function SplitSection() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full">
        {/* Mobile Layout - Text centered, Image on bottom */}
        <div className="sm:hidden flex flex-col">
          {/* Text Content and Button - Mobile (Centered) */}
          <div className="w-full flex flex-col items-center text-center">
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
            
            {/* Button - Below text content */}
            <div className="scale-[0.8] origin-left mb-8">
              <DemoButton />
            </div>
          </div>
          
          {/* Circular Image with Notification - Mobile */}
          <div className="flex flex-col items-center px-4 py-8 gap-6">
            <div className="relative w-full max-w-[350px] aspect-square">
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                <Image
                  fill
                  alt="Corporate workers brainstorming together"
                  className="object-cover"
                  style={{ objectPosition: "center" }}
                  src="/assets/hero-image.jpg"
                />
                <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
                
                {/* Play Icon Button - Centered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px]">
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
          </div>
        </div>
        
        {/* Desktop Layout - Image on left, Text on right */}
        <div className="hidden sm:flex flex-col items-center justify-between sm:items-start w-full sm:flex-row md:flex-row lg:flex-row">
          {/* Image Section - Only show rectangular image on desktop */}
          <div className="w-full max-w-[45%] sm:w-max-[45%] lg:w-max-[45%] md:w-max-[45%]">
            <div className="relative">
              {/* Play Icon - Visible on all screens except mobile */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]">
                <Image
                  fill
                  alt="Play Video"
                  className="object-contain cursor-pointer"
                  src="/assets/play-icon.png"
                  sizes="100px"
                />
              </div>
              
              {/* Rectangular Image - Visible on sm and up */}
              <Image
                src="/assets/hero-image-full.png"
                alt="Frame 119"
                width={560}
                height={420}
                className="w-full h-auto top-0"
              />

              {/* Notification card - Only for desktop image */}
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
          </div>
          
          {/* Text Content and Button - Desktop */}
          <div className="lg:w-max-[40%] max-w-full md:w-max-[40%] lg:max-w-none sm:w-max-[40%]">
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
          
          {/* Pink arcs - only visible on larger screens */}
          <div className="hidden sm:block max-w-[10%] justify-between">
            <div className="h-[50%]">
              <img
                src="/assets/pink-arc.png"
                alt=""
                className="object-contain h-[50%] invisible"
                sizes="227px"
              />
            </div>
            <img
              src="/assets/pink-arc.png"
              alt=""
              className="object-contain h-[50%]"
              sizes="227px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}