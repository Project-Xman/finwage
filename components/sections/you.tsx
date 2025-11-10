import type { NextPage } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePaths } from "@/lib/assets";

// Define your images here (replace with actual paths)
const imgWork = "https://picsum.photos/300/300";
const imgEarn = "https://picsum.photos/301/300";
const imgAccessPay = "https://picsum.photos/302/300";
const imgPeaceOfMind = "https://picsum.photos/303/300";

// Helper function to create arc path
const createArcPath = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  thickness: number
) => {
  const innerRadius = radius - thickness;
  
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  
  const x1 = centerX + radius * Math.cos(startRad);
  const y1 = centerY + radius * Math.sin(startRad);
  const x2 = centerX + radius * Math.cos(endRad);
  const y2 = centerY + radius * Math.sin(endRad);
  const x3 = centerX + innerRadius * Math.cos(endRad);
  const y3 = centerY + innerRadius * Math.sin(endRad);
  const x4 = centerX + innerRadius * Math.cos(startRad);
  const y4 = centerY + innerRadius * Math.sin(startRad);
  
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  
  return `
    M ${x1} ${y1}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
    L ${x3} ${y3}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
    Z
  `;
};

const You: NextPage = () => {
  return (
    <div className="bg-white py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-visible relative">
      {/* Mobile Layout - Timeline Style */}
      <div className="md:hidden flex flex-col items-center gap-8 sm:gap-10 max-w-xl mx-auto">
        <div className="relative w-[200px] sm:w-[250px] h-[200px] sm:h-[250px] mb-8">
          <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-gray-100">
            <div className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px]">
              <Image
                src={ImagePaths.APP_ICON}
                alt="FinWage Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Timeline Container */}
        <div className="relative w-full">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#60A5FA] via-[#22D3EE] via-[#3B82F6] to-[#1E40AF] transform -translate-x-px"></div>
          
          <div className="space-y-8 sm:space-y-10 w-full">
            <TimelineCard
              title="Work"
              description="Put in the hours and do what you do best. Your earnings accumulate with every shift."
              image={imgWork}
              step="STEP 1"
              color="#60A5FA"
              isFirst={true}
            />
            <TimelineCard
              title="Earn"
              description="Your available earnings update in the FinWage app after each workday. No more waiting."
              image={imgEarn}
              step="STEP 2"
              color="#22D3EE"
            />
            <TimelineCard
              title="Access Pay"
              description="Instantly transfer your earned pay to any bank account, debit card, or prepaid card, 24/7."
              image={imgAccessPay}
              step="STEP 3"
              color="#3B82F6"
            />
            <TimelineCard
              title="Peace of Mind"
              description="Take control of your finances, pay bills on time, and reduce financial stress."
              image={imgPeaceOfMind}
              step="STEP 4"
              color="#1E40AF"
              isLast={true}
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout - Semi-Circular Gauge */}
      <div className="hidden md:flex flex-col items-center justify-center relative">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1d44c3] mb-12 md:mb-16 text-center">
          The FinWage Cycle
        </h2>

        <CircularInfographic />
      </div>
    </div>
  );
};

// Semi-Circular Gauge Component
const CircularInfographic = () => {
  const viewBoxSize = 900;
  const centerX = viewBoxSize / 2;
  const centerY = 450; // Positioned for semi-circle
  const radius = 320;
  const thickness = 90;
  
  // Colors for segments (blue palette as described)
  const colors = {
    lightBlue: "#60A5FA",
    blueGreen: "#22D3EE",
    mediumBlue: "#3B82F6",
    darkBlue: "#1E40AF",
    green: "#10B981",
  };
  
  // Define segments (4 arcs for semi-circle)
  const segments = [
    {
      id: "work",
      color: colors.lightBlue,
      startAngle: 180,
      endAngle: 225,
      title: "Work",
      tag: "STEP 1",
      description: "Put in the hours and do what you do best. Your earnings accumulate with every shift.",
      iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", // User icon
      image: imgWork,
    },
    {
      id: "earn",
      color: colors.blueGreen,
      startAngle: 225,
      endAngle: 270,
      title: "Earn",
      tag: "STEP 2",
      description: "Your available earnings update in the FinWage app after each workday. No more waiting.",
      iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Dollar icon
      image: imgEarn,
    },
    {
      id: "access",
      color: colors.mediumBlue,
      startAngle: 270,
      endAngle: 315,
      title: "Access Pay",
      tag: "STEP 3",
      description: "Instantly transfer your earned pay to any bank account, debit card, or prepaid card, 24/7.",
      iconPath: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", // Credit card icon
      image: imgAccessPay,
    },
    {
      id: "peace",
      color: colors.darkBlue,
      startAngle: 315,
      endAngle: 360,
      title: "Peace of Mind",
      tag: "STEP 4",
      description: "Take control of your finances, pay bills on time, and reduce financial stress.",
      iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", // Check circle icon
      image: imgPeaceOfMind,
    },
  ];
  
  // Center trapezoid segment
  const trapezoidPoints = `
    ${centerX - 60},${centerY}
    ${centerX + 60},${centerY}
    ${centerX + 40},${centerY + 80}
    ${centerX - 40},${centerY + 80}
  `;
  
  return (
    <div className="relative w-full max-w-8xl mx-auto">
      <svg
        viewBox={`0 0 ${viewBoxSize} 500`}
        className="w-full h-auto"
        style={{ maxHeight: "600px" }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Draw arc segments */}
        {segments.map((segment) => {
          const arcPath = createArcPath(
            centerX,
            centerY,
            radius,
            segment.startAngle,
            segment.endAngle,
            thickness
          );
          
          // Calculate icon position (middle of arc)
          const midAngle = ((segment.startAngle + segment.endAngle) / 2 * Math.PI) / 180;
          const iconRadius = radius - thickness / 2;
          const iconX = centerX + iconRadius * Math.cos(midAngle);
          const iconY = centerY + iconRadius * Math.sin(midAngle);
          
          return (
            <g key={segment.id}>
              <path d={arcPath} fill={segment.color} className="transition-all hover:opacity-80" />
              
              {/* Icon */}
              <g transform={`translate(${iconX - 15}, ${iconY - 15})`}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={segment.iconPath} />
                </svg>
              </g>
            </g>
          );
        })}
        
        {/* Center trapezoid segment */}
      
        
        {/* Icon in trapezoid */}
        <g transform={`translate(${centerX - 15}, ${centerY + 25})`}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </g>
        {/* Central white semi-circle cutout */}
        <path
          d={createArcPath(centerX, centerY, radius - thickness - 40, 180, 360, 3)}
          fill="white"
          stroke="#E5E7EB"
          strokeWidth="3"
        />
        
        {/* Logo and title in center */}
        <foreignObject x="200" y="280" width="500" height="240">
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="relative w-64 h-64">
              <Image
                src={ImagePaths.APP_ICON}
                alt="FinWage Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </foreignObject>
        
        {/* Animated connecting lines */}
        {segments.map((segment, index) => {
          const midAngle = ((segment.startAngle + segment.endAngle) / 2.01 * Math.PI) / 180;
          const startX = centerX + (radius + 5) * Math.cos(midAngle);
          const startY = centerY + (radius + 5) * Math.sin(midAngle);

          // Position labels around the gauge - smooth elegant curves
          let labelX: number,
            labelY: number,
            endX: number,
            endY: number,
            controlX1: number,
            controlY1: number,
            controlX2: number,
            controlY2: number;

          if (index === 0) {
            // Work - left side
            labelX = -120;
            labelY = 200;
            endX = labelX + 130;
            endY = labelY + 140;
            controlX1 = startX - 150;
            controlY1 = startY + 50;
            controlX2 = endX - 80;
            controlY2 = endY - 60;
          } else if (index === 1) {
            // Earn - top left
            labelX = 20;
            labelY = 5;
            endX = labelX + 130;
            endY = labelY + 140;
            controlX1 = startX - 120;
            controlY1 = startY - 100;
            controlX2 = endX - 60;
            controlY2 = endY - 80;
          } else if (index === 2) {
            // Access - top right
            labelX = 650;
            labelY = 5;
            endX = labelX + 130;
            endY = labelY + 140;
            controlX1 = startX + 120;
            controlY1 = startY - 100;
            controlX2 = endX + 60;
            controlY2 = endY - 80;
          } else {
            // Peace - right side
            labelX = 800;
            labelY = 200;
            endX = labelX + 130;
            endY = labelY + 140;
            controlX1 = startX + 150;
            controlY1 = startY + 50;
            controlX2 = endX + 80;
            controlY2 = endY - 60;
          }

          const pathD = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
          
          return (
            <g key={`callout-${segment.id}`} className="group">
              {/* Animated curved line */}
              <path
                d={pathD}
                stroke="#fff"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                opacity="0.6"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="10"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
              
              <foreignObject x={labelX} y={labelY} width="260" height="160">
                <div className="relative text-left border-2 border-dotted border-pink-500 rounded-lg bg-white shadow-lg p-1 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30"
                    style={{
                      backgroundImage: `url(${segment.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="relative z-10">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-md" style={{ backgroundColor: segment.color, color: "white" }}>
                  {segment.tag}
                  </span>
                  <h3 className="text-xl font-bold text-[#1d44c3] mt-3 mb-2">
                  {segment.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                  {segment.description}
                  </p>
                  </div>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// Timeline Card Component (for mobile)
const TimelineCard = ({
  title,
  description,
  image,
  step,
  color,
  isFirst = false,
  isLast = false,
}: {
  title: string;
  description: string;
  image: string;
  step: string;
  color: string;
  isFirst?: boolean;
  isLast?: boolean;
}) => {
  return (
    <div className="relative flex items-start gap-4 pl-16">
      {/* Timeline Dot */}
      <div 
        className="absolute left-8 w-4 h-4 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2"
        style={{ backgroundColor: color }}
      ></div>
      
      {/* Card Content */}
      <Card className="bg-linear-to-br from-white to-gray-50 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 w-full backdrop-blur-sm">
        <CardContent className="flex items-center gap-4 p-0">
          <div className="flex-shrink-0">
            <div 
              className="w-[70px] h-[70px] rounded-2xl flex items-center justify-center p-3"
              style={{ backgroundColor: `${color}20` }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-2">
              <span 
                className="inline-block px-2 py-1 text-xs font-semibold rounded text-white"
                style={{ backgroundColor: color }}
              >
                {step}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#1d44c3] mb-1">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Reusable Card Component (for mobile)
const YouCard = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <Card className="bg-linear-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 w-full backdrop-blur-sm">
      <CardContent className="flex flex-col items-center gap-4 p-0">
        <div className="flex justify-center">
          <div className="w-[90px] h-[90px] rounded-2xl bg-linear-to-br from-[#1d44c3]/10 to-[#f74b6b]/10 flex items-center justify-center p-3">
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-[#1d44c3] mb-2">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default You;
