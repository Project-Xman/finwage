"use client";

import { Globe } from "@/components/ui/globe";
import type { COBEOptions } from "cobe";

const stats = [
  {
    value: "500M+",
    description: "API requests per day, peaking at 13,000 requests a second.",
  },
  {
    value: "99.999%",
    description: "historical uptime for Stripe services.",
  },
  {
    value: "47+",
    description: "countries with local acquiring.",
  },
  {
    value: "135+",
    description: "currencies and payment methods supported.",
  },
];

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [247 / 255, 75 / 255, 107 / 255], // Pink accent #f74b6b
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

function StatCard({ value, description }: { value: string; description: string }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative">
        <div className="absolute bg-white h-6 left-0 top-1 w-px" />
        <div className="text-2xl text-white tracking-tight pl-4">
          <p className="leading-8">{value}</p>
        </div>
      </div>
      <div className="text-sm md:text-base text-white tracking-wide pl-4 leading-6">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Global() {
  return (
    <section className="bg-[#f74b6b] relative w-full overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Globe - First on mobile, Second on desktop */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[800px] w-full flex items-center justify-center lg:justify-end overflow-visible order-1 lg:order-2">
            <div className="absolute right-0 lg:translate-x-[50%] w-[800px] h-[800px] lg:w-[1400px] lg:h-[1400px]" style={{ transform: 'rotateX(15deg) rotateY(-10deg) rotateZ(5deg)' }}>
              <Globe className="opacity-80 !max-w-none" config={GLOBE_CONFIG} />
            </div>
          </div>

          {/* Content - Second on mobile, First on desktop */}
          <div className="flex flex-col gap-12 md:gap-16 lg:gap-20 order-2 lg:order-1">
            {/* Header Section */}
            <div className="flex flex-col gap-6 md:gap-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight max-w-xl">
                Global Recognition for Financial Innovation
              </h1>
              <p className="text-base md:text-lg text-white leading-7 max-w-md tracking-wide">
                FinWage makes moving money as easy and programmable as moving data. Our teams are 
                based in offices around the world and we process hundreds of billions of dollars each 
                year for ambitious businesses of all sizes.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              {stats.map((stat, index) => (
                <StatCard key={index} value={stat.value} description={stat.description} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
