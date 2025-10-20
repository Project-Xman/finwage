import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const imgManTalking = "https://picsum.photos/600/400";
const imgImagePhotoroom21 = "https://picsum.photos/150/300";
const imgImagePhotoroom31 = "https://picsum.photos/130/300";

export default function StandOut() {
  return (
    <section className="bg-white relative w-full py-12 md:py-24 lg:py-32 pb-40 md:pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8 md:gap-10">
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#1d44c3] leading-tight">
                Attract, Retain, and Inspire Your Workforce
              </h1>
              <p className="text-base md:text-lg text-gray-800 leading-7">
                FinWage empowers employers to lead their industry by redefining
                how employees access and manage their pay.
              </p>
            </div>

            <Button
              variant="ghost"
              className="text-[#f64162] hover:text-[#f64162] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all text-base w-fit p-0 h-auto"
            >
              See how we stand out
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Right Video Card */}
          <div className="relative w-full h-[300px] md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden group">
            {/* Background Image */}
            <img
              src={imgManTalking}
              alt="Team collaboration"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Border */}
            <div className="absolute inset-0 border-4 border-white rounded-3xl pointer-events-none shadow-2xl" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/50 backdrop-blur-md shadow-2xl flex items-center justify-center hover:bg-white/60 transition-all group-hover:scale-110"
              >
                <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Characters - Hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 -bottom-1/5 translate-x-[-200px]">
          <div className="relative">
            <img
              src={imgImagePhotoroom21}
              alt=""
              className="w-[150px] h-auto object-contain"
            />
          </div>
        </div>

        <div className="hidden md:block absolute left-1/2 -bottom-1/5  translate-x-[50px]">
          <div className="relative">
            <img
              src={imgImagePhotoroom31}
              alt=""
              className="w-[130px] h-auto object-contain"
            />
          </div>
        </div>

        {/* Mobile Decorative Characters - At bottom, below grid */}
        <div className="md:hidden absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-8 items-end z-10">
          <div className="relative">
            <img
              src={imgImagePhotoroom21}
              alt=""
              className="w-[300px] h-auto object-contain"
            />
          </div>
          <div className="w-1/6"></div>
          <div className="relative">
            <img
              src={imgImagePhotoroom31}
              alt=""
              className="w-[285px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
