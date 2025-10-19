"use client";

import { ImagePaths } from "@/lib/assets";
import Image from "next/image";

interface CardData {
  icon: string;
  bgColor: string;
  title: string;
  points: string[];
}

const cards: CardData[] = [
  {
    icon: ImagePaths.CHECK_3D,
    bgColor: "bg-blue-100",
    title: "Effortless and Safe for Your Business",
    points: [
      "Maintain your existing payroll processes—FinWage manages everything compliantly.",
      "Connects effortlessly with HCM, payroll, banking, and benefits apps.",
    ],
  },
  {
    icon: ImagePaths.LOCK_3D,
    bgColor: "bg-green-100",
    title: "Empowering Your Workforce",
    points: [
      "Employees gain greater financial control, with access to up to 100% of their FinWage balance to navigate unexpected financial challenges.",
      "Start instantly, no prior bank account needed.",
    ],
  },
];

function LetsTalkButton() {
  return (
    <div
      className="bg-[#1d44c3] box-border flex gap-2 items-center justify-center px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 w-full md:w-auto min-w-fit"
      data-name="Link"
    >
      <div className="font-semibold text-sm md:text-base text-white whitespace-nowrap">
        <p>{`Let's Talk`}</p>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:gap-12 items-center justify-between w-full">
      <div className="flex-1 text-center lg:text-left">
        <h2 className="font-normal text-2xl md:text-3xl lg:text-4xl text-[#1d44c3] leading-tight">
          Discover Why FinWage is Powering Top Employers
        </h2>
      </div>
      <div className="flex-shrink-0 w-full md:w-auto">
        <LetsTalkButton />
      </div>
    </div>
  );
}

function Card({ icon, bgColor, title, points }: CardData) {
  return (
    <div
      className="bg-white rounded-2xl md:rounded-3xl border border-[#d9d8d8] shadow-sm hover:shadow-md transition-shadow duration-200 p-6 md:p-8 h-full"
      data-name="Background+Border+Shadow"
    >
      <div className="flex flex-col h-full">
        {/* Icon + Title row */}
        <div className="mb-4 md:mb-6">
          <div className="flex items-center gap-4 md:gap-6">
            <div
              className={`size-12 md:size-14 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              <Image
                alt={`${title} icon`}
                className="w-full h-full object-cover rounded-lg"
                width={45}
                height={45}
                src={icon}
              />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-lg md:text-xl text-[#1d44c3] leading-tight">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3 md:space-y-4">
          {points.map((point, index) => (
            <p
              key={index}
              className="text-sm md:text-base text-gray-700 leading-relaxed"
            >
              {point}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturesGrid() {
  return (
    <div className="w-full">
      {/* Mobile: Single column (flex-col), MD+: Two column grid */}
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-8 lg:gap-10">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

function ContentContainer() {
  return (
    <div
      className="bg-white rounded-2xl md:rounded-3xl border border-[#ecebeb] shadow-xl mx-4 md:mx-8 lg:mx-16 xl:mx-32 my-8 md:my-16"
      data-name="Frame"
    >
      <div className="p-6 md:p-8 lg:p-12 xl:p-16 space-y-8 md:space-y-12 lg:space-y-16">
        <HeroSection />
        <FeaturesGrid />
      </div>
    </div>
  );
}

export default function Cta() {
  return (
    <div
      className="bg-white w-full py-8 md:py-16 lg:py-24 flex items-center justify-center"
      data-name="CTA"
    >
      <div className="w-full max-w-7xl">
        <ContentContainer />
      </div>
    </div>
  );
}
