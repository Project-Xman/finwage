"use client";

import Image from "next/image";
import type React from "react";
import { forwardRef, useRef, useState, useEffect } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/utils/pocketbase";
import type { IntegrationsResponse } from "@/types/pocketbase";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

interface IntegrationDemoProps {
  integrations: IntegrationsResponse[];
}

export default function IntegrationDemo({
  integrations,
}: IntegrationDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  // Create refs for each integration
  const integrationRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Limit to 6 integrations for the demo (excluding center)
  const displayIntegrations = integrations.slice(0, 6);
  const centerIntegration = integrations[6] || integrations[0]; // Use 7th or fallback to first

  const [_, forceUpdate] = useState(0);
  useEffect(() => {
    forceUpdate((prev) => prev + 1);
  }, []);

  return (
    <div
      className="relative flex h-[500px] md:h-[600px] lg:h-[700px] w-full items-center justify-center overflow-hidden p-10 md:p-16 lg:p-20"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[400px] md:max-h-[500px] lg:max-h-[600px] max-w-2xl md:max-w-4xl lg:max-w-5xl flex-col items-stretch justify-between gap-12 md:gap-16 lg:gap-20">
        {/* Top row */}
        <div className="flex flex-row items-center justify-between">
          {displayIntegrations.slice(0, 2).map((integration, idx) => (
            <Circle
              key={integration.id}
              ref={(el) => {
                integrationRefs.current[idx] = el;
              }}
              className="size-16 md:size-20 lg:size-24"
            >
              {integration.logo ? (
                <Image
                  src={getImageUrl(integration, integration.logo)}
                  alt={integration.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              ) : (
                <span className="text-xs font-medium">
                  {integration.name.slice(0, 2)}
                </span>
              )}
            </Circle>
          ))}
        </div>

        {/* Middle row with center */}
        <div className="flex flex-row items-center justify-between">
          {displayIntegrations.slice(2, 3).map((integration, idx) => (
            <Circle
              key={integration.id}
              ref={(el) => {
                integrationRefs.current[idx + 2] = el;
              }}
              className="size-16 md:size-20 lg:size-24"
            >
              {integration.logo ? (
                <Image
                  src={getImageUrl(integration, integration.logo)}
                  alt={integration.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              ) : (
                <span className="text-xs font-medium">
                  {integration.name.slice(0, 2)}
                </span>
              )}
            </Circle>
          ))}

          {/* Center integration */}
          <Circle ref={centerRef} className="size-24 md:size-32 lg:size-40">
            {centerIntegration?.logo ? (
              <Image
                src={getImageUrl(centerIntegration, centerIntegration.logo)}
                alt={centerIntegration.name}
                width={120}
                height={120}
                className="object-contain"
              />
            ) : (
              <span className="text-sm font-medium">
                {centerIntegration?.name.slice(0, 2) || "FW"}
              </span>
            )}
          </Circle>

          {displayIntegrations.slice(3, 4).map((integration, idx) => (
            <Circle
              key={integration.id}
              ref={(el) => {
                integrationRefs.current[idx + 3] = el;
              }}
              className="size-16 md:size-20 lg:size-24"
            >
              {integration.logo ? (
                <Image
                  src={getImageUrl(integration, integration.logo)}
                  alt={integration.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              ) : (
                <span className="text-xs font-medium">
                  {integration.name.slice(0, 2)}
                </span>
              )}
            </Circle>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-row items-center justify-between">
          {displayIntegrations.slice(4, 6).map((integration, idx) => (
            <Circle
              key={integration.id}
              ref={(el) => {
                integrationRefs.current[idx + 4] = el;
              }}
              className="size-16 md:size-20 lg:size-24"
            >
              {integration.logo ? (
                <Image
                  src={getImageUrl(integration, integration.logo)}
                  alt={integration.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              ) : (
                <span className="text-xs font-medium">
                  {integration.name.slice(0, 2)}
                </span>
              )}
            </Circle>
          ))}
        </div>
      </div>

      {/* Animated beams connecting integrations to center */}
      {displayIntegrations.map((_, idx) => {
        const isTopRow = idx < 2;
        const isBottomRow = idx >= 4;
        const isLeftSide = idx === 2;
        const isRightSide = idx === 3;

        return (
          <AnimatedBeam
            key={idx}
            containerRef={containerRef}
            fromRef={{ current: integrationRefs.current[idx] ?? null }}
            toRef={centerRef}
            curvature={isTopRow || isBottomRow ? (idx % 2 === 0 ? -75 : 75) : 0}
            endYOffset={isTopRow ? -10 : isBottomRow ? 10 : 0}
            reverse={isRightSide || idx === 1}
            pathWidth={3}
          />
        );
      })}
    </div>
  );
}
