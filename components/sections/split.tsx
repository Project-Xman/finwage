import Image from "next/image";
import React from "react";
import { BellIcon, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlatformImages } from "./platform";
import { Safari } from "../ui/safari";
import { Iphone } from "../ui/iphone";

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
      <SectionOne />
      <SectionTwo />
    </section>
  );
}

function SectionOne() {
  return (
    <div className="mx-auto w-full min-h-screen md:min-h-[80vh]">
      {/* Mobile Layout - Text centered, Image on bottom */}
      <div className="sm:hidden flex flex-col">
        {/* Text Content and Button - Mobile (Centered) */}
        <div className="w-full flex flex-col items-center text-center ">
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
      <div className="hidden sm:flex flex-col items-center justify-between sm:items-start w-full sm:flex-row md:flex-row lg:flex-row gap-4 md:gap-6 lg:gap-8">
        {/* Image Section - Only show rectangular image on desktop */}
        <div className="w-full sm:w-[50%] md:w-[55%] lg:w-[55%] xl:w-[60%] relative">
          <div className="relative">
            {/* Play Icon - Visible on all screens except mobile */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] z-10">
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
              width={960}
              height={820}
              className="w-full h-auto rounded-lg"
            />

            {/* Notification card - Only for desktop image */}
            <Card
              className="absolute bg-white rounded-[16px] md:rounded-[20px] lg:rounded-[24px] p-2 md:p-3 lg:p-4 shadow-lg border border-gray-200 max-w-[200px] sm:max-w-[250px] md:max-w-[280px] lg:max-w-[300px] flex items-start gap-2 md:gap-3 bottom-8 md:bottom-12 lg:bottom-16 right-2 md:right-4 lg:right-6"
            >
              <CardContent className="flex items-start gap-2 md:gap-3 p-0">
                {/* Bell Icon in Red Square */}
                <div className="bg-red-500 rounded-md p-1.5 md:p-2">
                  <BellIcon className="size-4 md:size-5 text-white" />
                </div>
                {/* Text Content */}
                <div className="flex flex-col">
                  <span className="text-[#1d44c3] text-[9px] sm:text-[10px] md:text-[11px] lg:text-[11.8px] font-semibold uppercase">
                    FINWAGE
                  </span>
                  <span className="text-gray-800 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13.7px]">
                    Your FinWage balance went up!
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Text Content and Button - Desktop */}
        <div className="w-full sm:w-[45%] md:w-[40%] lg:w-[35%] xl:w-[35%] pt-4 sm:pt-8 md:pt-12 lg:pt-16 flex flex-col items-center text-center">
          {/* Text Content */}
          <div className="flex flex-col font-bold leading-[1.1] text-[#1d44c3] text-[32px] sm:text-[40px] md:text-[52px] lg:text-[72px] xl:text-[90px] 2xl:text-[105px] tracking-tight mb-4 md:mb-6 lg:mb-8">
            <p className="mb-0">Your Money,</p>
            <p className="mb-0">Your Control.</p>
          </div>
          <div className="flex flex-col font-normal leading-[1.5] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-gray-800 mb-6 md:mb-8 lg:mb-10">
            <p className="mb-0">
              Work Today, Get Paid Today! A financial wellness
            </p>
            <p className="mb-0">
              benefit that helps employees access their earned
            </p>
            <p>wages while saving employers time and money</p>
          </div>

          {/* Button - Below text content */}
          <div className="transform scale-75 sm:scale-80 md:scale-85 lg:scale-90 xl:scale-95 2xl:scale-100">
            <DemoButton />
          </div>
        </div>

        {/* Pink arcs - only visible on larger screens */}
        <div className="hidden xl:block w-[8%] 2xl:w-[10%] justify-between pt-12 md:pt-16 lg:pt-20">
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
            className="object-contain h-[50%] w-full"
            sizes="227px"
          />
        </div>
      </div>
    </div>
  );
}

function SectionTwo() {
  const imgScreenshot20251015At114207Pm1 = "/assets/web-dashboard.png";
  const imgImageContainer = "/assets/mobile-app.png";
  return (
    <div className="bg-[#f74b6b] relative overflow-hidden">
      <div className="mx-auto w-full">
        {/* Mobile Layout - Text centered, Image on bottom */}
        <div className="sm:hidden flex flex-col">
          {/* Text Content and Button - Mobile (Centered) */}
          <div className="w-full flex flex-col items-center text-center">
            <div className="flex flex-col font-bold leading-[40px] text-white text-[38px] tracking-[-1.5px] mb-[16px]">
              <p className="mb-0">Our Platform</p>
            </div>
            <div className="flex flex-col font-normal leading-[19px] text-[12.5px] text-white mb-[20px]">
              <p className="mb-0">
                FinWage is revolutionizing the way people get paid by creating
              </p>
              <p className="mb-0">
                a platform that empowers both employers and employees. For
              </p>
              <p>
                employers, it provides smarter tools to attract, retain, and
                engage talent.
              </p>
            </div>

            {/* Button - Below text content */}
            <div className="scale-[0.8] origin-left mb-8">
              <Button
                size="lg"
                className="bg-white text-[#f74b6b] hover:bg-gray-100 hover:shadow-lg transition-shadow rounded-full h-[60px] px-8 py-6 font-semibold text-[20px]"
                data-name="Link"
              >
                Explore Platform
                <ArrowRight className="ml-2 size-5" />
              </Button>
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
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Text on left, Image on right */}
        <div className="flex flex-col relative w-full h-full">
          <div className="hidden sm:flex flex-col items-center justify-between sm:items-start w-full sm:flex-row md:flex-row lg:flex-row gap-4 md:gap-6 lg:gap-8">
            {/* Pink arcs - only visible on larger screens */}
            <div className="hidden xl:block w-[8%] 2xl:w-[10%] justify-between">
              <div className="h-[50%]">
                <img
                  src="/assets/pink-arc.png"
                  alt=""
                  className="object-contain h-[50%] invisible"
                  sizes="227px"
                />
              </div>
              <img
                src="/assets/blue-arc.png"
                alt=""
                className="object-contain h-[50%] w-full"
                sizes="227px"
              />
            </div>

            {/* Text Content and Button - Desktop */}
            <div className="w-full sm:w-[45%] md:w-[40%] lg:w-[35%] xl:w-[35%] pt-4 sm:pt-8 md:pt-12 lg:pt-16 flex flex-col items-center text-center">
              {/* Text Content */}
              <div className="flex flex-col font-bold leading-[1.1] text-white text-[32px] sm:text-[40px] md:text-[52px] lg:text-[72px] xl:text-[90px] 2xl:text-[105px] tracking-tight mb-4 md:mb-6 lg:mb-8">
                <p className="mb-0">Our Platform</p>
              </div>
              <div className="flex flex-col font-normal leading-[1.5] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px] text-white mb-6 md:mb-8 lg:mb-10">
                <p className="mb-0">
                  FinWage is revolutionizing the way people get paid by creating
                </p>
                <p className="mb-0">
                  a platform that empowers both employers and employees. For
                </p>
                <p>
                  employers, it provides smarter tools to attract, retain, and
                  engage talent.
                </p>
              </div>

              {/* Button - Below text content */}
              <div className="transform scale-75 sm:scale-80 md:scale-85 lg:scale-90 xl:scale-95 2xl:scale-100">
                <Button
                  size="lg"
                  className="bg-white text-[#f74b6b] hover:bg-gray-100 hover:shadow-lg transition-shadow rounded-full h-[60px] px-8 py-6 font-semibold text-[20px]"
                  data-name="Link"
                >
                  Explore Platform
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </div>
            </div>

            {/* Image Section - Only show rectangular image on desktop */}
            <div className="w-full sm:w-[50%] md:w-[55%] lg:w-[55%] xl:w-[60%] relative">
              <div className="relative">
                {/* Play Icon - Visible on all screens except mobile */}

                {/* Rectangular Image - Visible on sm and up */}
                <Image
                  src="/assets/platform-image-full.png"
                  alt="Frame 119"
                  width={960}
                  height={820}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full pb-20 md:pb-32 lg:pb-40 xl:pb-48 mt-8 md:mt-12">
        <div className="w-full max-w-[90%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[45%] absolute bottom-8 md:bottom-16 lg:bottom-20 right-4 md:right-8 lg:right-12 xl:right-16">
          <Safari
            imageSrc={imgScreenshot20251015At114207Pm1}
            url="dashboard.finwage.com"
          />
        </div>
        <div className="z-10 w-[20%] sm:w-[16%] md:w-[14%] lg:w-[12%] xl:w-[11.5%] absolute bottom-2 md:bottom-4 lg:bottom-6 right-0 md:right-2">
          <Iphone src={imgImageContainer} />
        </div>
      </div>
    </div>
  );
}
