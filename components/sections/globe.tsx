"use client";
import { COBEOptions } from "cobe";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.Globe),
  {
    ssr: false,
  }
);


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

function StatCard({
  value,
  description,
}: {
  value: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative">
        <div className="absolute bg-white h-6 left-0 top-1 w-px" />
        <div className="text-xl md:text-2xl text-white tracking-tight pl-4">
          <p className="leading-6 md:leading-8">{value}</p>
        </div>
      </div>
      <div className="text-xs md:text-sm lg:text-base text-white tracking-wide pl-4 leading-5 md:leading-6">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Global() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const GLOBE_CONFIG: COBEOptions = {
    width: 800,
    height: 800,
    onRender: () => {},
    devicePixelRatio: 0.5,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 10000,
    mapBrightness: 1.2,
    baseColor: [255 / 255, 179 / 255, 193 / 255], // Light pink #ffb3c1
    markerColor: [255 / 255, 230 / 255, 235 / 255], // Very light pink #ffe6eb
    glowColor: [255 / 255, 240 / 255, 245 / 255], // Lightest pink glow
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

  return (
    <section className="bg-[#f74b6b] relative w-full overflow-hidden py-12 md:py-16 lg:py-24 xl:py-32">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Globe - First on mobile, Second on desktop */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[800px] w-full flex items-center justify-center lg:justify-end overflow-visible order-1 lg:order-2">
            <div
              className="absolute right-0 w-[600px] h-[600px] sm:w-[700px] sm:h-[700px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] xl:w-[1200px] xl:h-[1200px] lg:translate-x-[25%] xl:translate-x-[35%]"
              style={{
                willChange: "transform",
              }}
            >
              <World className="opacity-80 !max-w-none w-full h-full" config={GLOBE_CONFIG} />
            </div>
          </div>

          {/* Content - Second on mobile, First on desktop */}
          <div className="flex flex-col gap-8 md:gap-10 lg:gap-12 xl:gap-16 order-2 lg:order-1">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight max-w-xl">
                Global Recognition for Financial Innovation
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white leading-6 md:leading-7 max-w-md tracking-wide">
                FinWage makes moving money as easy and programmable as moving
                data. Our teams are based in offices around the world and we
                process hundreds of billions of dollars each year for ambitious
                businesses of all sizes.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  value={stat.value}
                  description={stat.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
