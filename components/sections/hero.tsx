"use client";

import { ArrowRight, BellIcon } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import { EnquiryButton } from "@/components/shared/enquiry-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CustomVideoPlayer from "@/components/ui/custom-video-player";

function HeroImageContainer({
  className,
  hideWhiteArc = false,
  onPlayClick,
}: {
  className?: string;
  hideWhiteArc?: boolean;
  onPlayClick?: () => void;
}) {
  return (
    <div
      className={`${className} relative overflow-visible`}
      data-name="Hero Image Container"
    >
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
        onClick={onPlayClick}
        role="button"
        tabIndex={0}
        aria-label="Play Video"
      >
        <Image
          fill
          alt="Play Video"
          className="object-contain"
          src="/assets/play-icon.png"
          sizes="160px"
        />
      </div>

      {/* Toast Notification Stack - All positioned at same location with z-axis stacking */}
      <style>{`
        @keyframes stackedToast {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
            z-index: 30;
          }
          10% {
            opacity: 1;
            transform: translateY(0) scale(1);
            z-index: 30;
          }
          30% {
            opacity: 1;
            transform: translateY(0) scale(1);
            z-index: 30;
          }
          35% {
            opacity: 0;
            transform: translateY(-15px) scale(0.95);
            z-index: 30;
          }
          100% {
            opacity: 0;
            transform: translateY(-15px) scale(0.95);
            z-index: 10;
          }
        }
        .stacked-toast-1 {
          animation: stackedToast 6s ease-in-out infinite;
          animation-delay: 0s;
        }
        .stacked-toast-2 {
          animation: stackedToast 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        .stacked-toast-3 {
          animation: stackedToast 6s ease-in-out infinite;
          animation-delay: 4s;
        }
      `}</style>

      {/* Stacked Notification Container */}
      <div 
        className="absolute"
        style={{
          bottom: "60px",
          right: "10px",
          width: "300px",
          height: "80px",
        }}
      >
        {/* Toast 1 - Real-time Tracking (Blue) */}
        <Card
          className="stacked-toast-1 absolute inset-0 bg-white/95 backdrop-blur-sm rounded-[20px] p-4 shadow-xl border border-blue-100 flex items-start gap-3"
        >
          <CardContent className="flex items-start gap-3 p-0">
            <div className="bg-[#1d44c3] rounded-md p-2">
              <svg className="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[#1d44c3] text-[11px] font-semibold uppercase">
                Real-time Tracking
              </span>
              <span className="text-gray-700 text-[13px]">
                Real-time visibility into your earnings
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Toast 2 - Access Ready (Green) */}
        <Card
          className="stacked-toast-2 absolute inset-0 bg-white/95 backdrop-blur-sm rounded-[20px] p-4 shadow-xl border border-green-100 flex items-start gap-3"
        >
          <CardContent className="flex items-start gap-3 p-0">
            <div className="bg-green-500 rounded-md p-2">
              <svg className="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[#1d44c3] text-[11px] font-semibold uppercase">
                Access Ready
              </span>
              <span className="text-gray-700 text-[13px]">
                Access what you've earned—when you need it
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Toast 3 - FinWage Balance (Red Bell) */}
        <Card
          className="stacked-toast-3 absolute inset-0 bg-white rounded-[20px] p-4 shadow-xl border border-gray-200 flex items-start gap-3"
        >
          <CardContent className="flex items-start gap-3 p-0">
            <div className="bg-red-500 rounded-md p-2">
              <BellIcon className="size-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[#1d44c3] text-[11px] font-semibold uppercase">
                FINWAGE
              </span>
              <span className="text-gray-800 text-[13px]">
                Your FinWage balance just went up!
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DemoButton() {
  return (
    <EnquiryButton
      type="demo"
      size="lg"
      className="bg-[#1d44c3] text-white hover:bg-blue-800 hover:shadow-lg transition-shadow rounded-full h-[50px] sm:h-[60px] px-6 sm:px-8 font-semibold text-base sm:text-[20px]"
      icon={<ArrowRight className="ml-2 size-4 sm:size-5" />}
    >
      Get a Demo
    </EnquiryButton>
  );
}

// Main Hero Component
export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoPlayerRef = useRef<{ play: () => void; pause: () => void; reset: () => void }>(null);
  return (
    <div className="bg-white relative overflow-hidden" data-name="Hero Section">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center px-4 py-8 sm:py-12 gap-6 sm:gap-8 w-full">
        {/* Text Content */}
        <div className="flex flex-col gap-4 sm:gap-6 items-center text-center w-full max-w-[95vw] sm:max-w-[400px]">
          <div className="flex flex-col font-bold leading-[1.1] text-[#1d44c3] text-[32px] sm:text-[38px] tracking-[-1.5px] mb-2 sm:mb-4">
            <p className="mb-0">Your Money.</p>
            <p className="mb-0">In Your Control.</p>
          </div>
          <div className="flex flex-col font-normal text-gray-800 mb-4 space-y-3 w-full px-2">
            <p className="mb-0 font-semibold text-[#f74b6b] text-sm sm:text-base">
              FinWage — It's Your Wage!
            </p>
            <p className="mb-0 text-sm sm:text-base leading-relaxed">
              You earn your pay every day. Access to it shouldn't depend on a fixed payday.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-gray-500">
              FinWage is a Canadian Earned Wage Access (EWA) platform that gives employees instant access to their pay—helping reduce financial stress while supporting a more focused and productive workforce.
            </p>
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
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] cursor-pointer flex items-center justify-center"
              onClick={() => setIsVideoOpen(true)}
              role="button"
              tabIndex={0}
              aria-label="Play Video"
            >
              <Image
                fill
                alt="Play Video"
                className="object-contain"
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
        <HeroImageContainer
          className="absolute bg-white h-[919.072px] left-[-162px] md:left-[-144px] lg:left-[-117.9px] overflow-clip top-[-90px] md:top-[-126px] lg:top-[-159.3px] w-[942.224px] scale-[0.405] md:scale-[0.495] lg:scale-90 origin-top-left"
          onPlayClick={() => setIsVideoOpen(true)}
        />

        {/* Text Content and Button */}
        <div className="absolute left-[280px] md:left-[350px] lg:left-[820px] top-[40px] md:top-[60px] lg:top-[97px] right-[40px] md:right-[60px] lg:right-auto lg:w-[583px] max-w-[420px] md:max-w-[340px] lg:max-w-none">
          {/* Text Content */}
          <div className="flex flex-col font-bold leading-[40px] md:leading-[52px] lg:leading-[96px] text-[#1d44c3] text-[42px] md:text-[52px] lg:text-[93px] tracking-[-1.5px] md:tracking-[-2px] lg:tracking-[-2.4px] mb-[12px] md:mb-[16px] lg:mb-[43px]">
            <p className="mb-0">Your Money.</p>
            <p className="mb-0 whitespace-nowrap">In Your Control.</p>
          </div>
          <div className="flex flex-col font-normal leading-[20px] md:leading-[24px] lg:leading-[29.25px] text-[13px] md:text-[10.5px] lg:text-[17.4px] text-gray-800 mb-[16px] md:mb-[20px] lg:mb-[43px]">
            <p className="mb-0 font-semibold text-[#f74b6b]">
              FinWage — It's Your Wage!
            </p>
            <p className="mb-0 mt-2">
              You earn your pay every day. Access to it shouldn't depend on a fixed payday.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              FinWage is a Canadian Earned Wage Access (EWA) platform that gives employees instant access to their pay—helping reduce financial stress while supporting a more focused and productive workforce.
            </p>
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

      {/* Video Modal */}
      <Dialog
        open={isVideoOpen}
        onOpenChange={(open) => {
          setIsVideoOpen(open);
          if (videoPlayerRef.current) {
            if (open) videoPlayerRef.current.play();
            else {
              videoPlayerRef.current.pause();
              videoPlayerRef.current.reset();
            }
          }
        }}
      >
        <DialogContent 
          className="p-0 sm:p-2 bg-transparent shadow-none border-none flex items-center justify-center max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-5xl w-full" 
          showCloseButton={true}
        >
          <DialogTitle className="sr-only">FinWage Overview Video</DialogTitle>
          <CustomVideoPlayer
            ref={videoPlayerRef}
            src="/video.mp4"
            poster="/assets/video-thumbnail.webp"
            autoPlay={isVideoOpen}
            className="w-full max-w-full"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
