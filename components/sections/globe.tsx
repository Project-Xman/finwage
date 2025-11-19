"use client";
import type { COBEOptions } from "cobe";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { StatusResponse } from "@/types/pocketbase";
import { Collections } from "@/types/pocketbase";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.Globe),
  {
    ssr: false,
  },
);

function StatCard({ stat }: { stat: StatusResponse }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative">
        <div className="absolute bg-white h-8 left-0 top-1 w-px" />
        <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight pl-4">
          <p className="leading-8 md:leading-9">{stat.value}</p>
        </div>
      </div>
      <div className="text-sm md:text-base lg:text-lg text-white tracking-wide pl-4 leading-6 md:leading-7">
        <p>{stat.description || stat.metric}</p>
      </div>
    </div>
  );
}

export default function Global({ stats }: { stats: StatusResponse[] }) {
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
    width: 950,
    height: 950,
    onRender: () => {},
    devicePixelRatio: 0.59  ,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 18000,
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
    <section className="bg-[#f74b6b] relative w-full overflow-hidden py-8 md:py-12 lg:py-20 xl:py-24">
      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Globe - First on mobile, Second on desktop */}
          <div className="relative h-[310px] sm:h-[410px] md:h-[510px] lg:h-[620px] xl:h-[820px] w-full flex items-center justify-center lg:justify-end overflow-visible order-1 lg:order-2">
            <div
              className="absolute right-0 w-[620px] h-[620px] sm:w-[720px] sm:h-[720px] md:w-[820px] md:h-[820px] lg:w-[1020px] lg:h-[1020px] xl:w-[1220px] xl:h-[1220px] lg:translate-x-[25%] xl:translate-x-[35%]"
              style={{
                willChange: "transform",
              }}
            >
              <World
                className="opacity-80 !max-w-none w-full h-full"
                config={GLOBE_CONFIG}
              />
            </div>
          </div>

          {/* Content - Second on mobile, First on desktop */}
          <div className="flex flex-col gap-8 md:gap-10 lg:gap-12 xl:gap-16 order-2 lg:order-1">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
              <h1 className="text-3xl pt-15 md:pt-0 sm:text-4xl md:text-5xl lg:text-6xl font-bold md:font-normal text-white leading-tight max-w-2xl">
                Global Recognition for Financial Innovation
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white leading-7 md:leading-8 max-w-lg tracking-wide">
                FinWage makes moving money as easy and programmable as moving
                data. Our teams are based in offices around the world and we
                process hundreds of billions of dollars each year for ambitious
                businesses of all sizes.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              {stats.length > 0 ? (
                stats.map((stat) => <StatCard key={stat.id} stat={stat} />)
              ) : (
                // Fallback stats if none are available
                <>
                  <StatCard
                    stat={{
                      id: "1",
                      value: "500M+",
                      description: "API requests per day",
                      metric: "API requests",
                      order: 1,
                      label: "API Requests",
                      collectionId: "",
                      collectionName: Collections.Status,
                      created: "",
                      updated: "",
                    }}
                  />
                  <StatCard
                    stat={{
                      id: "2",
                      value: "99.999%",
                      description: "historical uptime",
                      metric: "Uptime",
                      order: 2,
                      label: "Uptime",
                      collectionId: "",
                      collectionName: Collections.Status,
                      created: "",
                      updated: "",
                    }}
                  />
                  <StatCard
                    stat={{
                      id: "3",
                      value: "47+",
                      description: "countries with local acquiring",
                      metric: "Countries",
                      order: 3,
                      label: "Countries",
                      collectionId: "",
                      collectionName: Collections.Status,
                      created: "",
                      updated: "",
                    }}
                  />
                  <StatCard
                    stat={{
                      id: "4",
                      value: "135+",
                      description: "currencies and payment methods supported",
                      metric: "Currencies",
                      order: 4,
                      label: "Currencies",
                      collectionId: "",
                      collectionName: Collections.Status,
                      created: "",
                      updated: "",
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
