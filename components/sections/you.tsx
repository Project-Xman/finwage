import type { NextPage } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePaths } from "@/lib/assets";

// Define your images here (replace with actual paths)
const imgWork = "https://picsum.photos/300/300";
const imgEarn = "https://picsum.photos/301/300";
const imgAccessPay = "https://picsum.photos/302/300";
const imgPeaceOfMind = "https://picsum.photos/303/300";

const You: NextPage = () => {
  return (
    <div className="bg-white py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-visible relative">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center gap-8 sm:gap-10 max-w-xl mx-auto">
        <div className="relative w-[200px] sm:w-[250px] h-[200px] sm:h-[250px]">
          <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-[#1d44c3] px-4 text-center">
              FinWage Cycle
            </h2>
          </div>
        </div>
        <div className="space-y-5 sm:space-y-6 w-full">
          <YouCard
            title="Work"
            description="Put in the hours and do what you do best. Your earnings accumulate with every shift."
            image={imgWork}
          />
          <YouCard
            title="Earn"
            description="Your available earnings update in the FinWage app after each workday. No more waiting."
            image={imgEarn}
          />
          <YouCard
            title="Access Pay"
            description="Instantly transfer your earned pay to any bank account, debit card, or prepaid card, 24/7."
            image={imgAccessPay}
          />
          <YouCard
            title="Peace of Mind"
            description="Take control of your finances, pay bills on time, and reduce financial stress."
            image={imgPeaceOfMind}
          />
        </div>
      </div>

      {/* Desktop Layout - Modern Cycle */}
      <div className="hidden md:flex flex-col items-center justify-center relative">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1d44c3] mb-12 md:mb-16 text-center">
          The FinWage Cycle
        </h2>
        
        <div className="relative w-full max-w-4xl h-[600px] md:h-[700px] lg:h-[800px]">
          {/* Modern Circular Cycle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
            {/* Gradient Ring */}
            <div className="absolute inset-0 rounded-full border-[20px] md:border-[25px] lg:border-[30px] border-gradient-br from-[#1d44c3] via-[#f74b6b] to-[#1d44c3] opacity-90"></div>
            
            {/* Inner Circle with Logo */}
            <div className="absolute inset-[60px] md:inset-[70px] lg:inset-[80px] bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-100">
              <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px]">
                <Image
                  src={ImagePaths.APP_ICON}
                  alt="Finwage Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          
          {/* Cycle Steps - Positioned around the circle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CycleStep 
              title="Work" 
              description="Put in the hours and do what you do best. Your earnings accumulate with every shift."
              image={imgWork}
              position="top"
            />
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
            <CycleStep 
              title="Earn" 
              description="Your available earnings update in the FinWage app after each workday. No more waiting."
              image={imgEarn}
              position="right"
            />
          </div>
          
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <CycleStep 
              title="Access Pay" 
              description="Instantly transfer your earned pay to any bank account, debit card, or prepaid card, 24/7."
              image={imgAccessPay}
              position="bottom"
            />
          </div>
          
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
            <CycleStep 
              title="Peace of Mind" 
              description="Take control of your finances, pay bills on time, and reduce financial stress."
              image={imgPeaceOfMind}
              position="left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Modern Cycle Step Component
const CycleStep = ({
  title,
  description,
  image,
  position
}: {
  title: string;
  description: string;
  image: string;
  position: "top" | "right" | "bottom" | "left";
}) => {
  // Position classes for arrow connectors
  const positionClasses = {
    top: "flex-col-reverse items-center",
    right: "flex-row items-center",
    bottom: "flex-col items-center",
    left: "flex-row-reverse items-center"
  };
  
  const arrowClasses = {
    top: "w-16 h-16 mb-6",
    right: "w-16 h-16 ml-6",
    bottom: "w-16 h-16 mt-6",
    left: "w-16 h-16 mr-6"
  };
  
  return (
    <div className={`flex ${positionClasses[position]}`}>
      {/* Modern Arrow Connector */}
      <div className={`${arrowClasses[position]} relative`}>
        <div className="absolute inset-0 bg-[#1d44c3] rounded-lg transform rotate-45"></div>
        <div className="absolute inset-2 bg-[#f74b6b] rounded transform rotate-45"></div>
        <div className="absolute inset-4 flex items-center justify-center">
          {position === "top" && (
            <svg className="w-6 h-6 text-white rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          )}
          {position === "right" && (
            <svg className="w-6 h-6 text-white -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          )}
          {position === "bottom" && (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          )}
          {position === "left" && (
            <svg className="w-6 h-6 text-white rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          )}
        </div>
      </div>
      
      {/* Modern Content Card */}
      <Card className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 w-[280px] md:w-[300px] lg:w-[320px] backdrop-blur-sm hover:-translate-y-1">
        <CardContent className="flex flex-col items-center gap-4 p-0">
          <div className="flex justify-center">
            <div className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] rounded-2xl bg-gradient-to-br from-[#1d44c3]/10 to-[#f74b6b]/10 flex items-center justify-center p-3">
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
            <h3 className="text-xl md:text-2xl font-bold text-[#1d44c3] mb-2">
              {title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {description}
            </p>
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
    <Card className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 w-full backdrop-blur-sm">
      <CardContent className="flex flex-col items-center gap-4 p-0">
        <div className="flex justify-center">
          <div className="w-[90px] h-[90px] rounded-2xl bg-gradient-to-br from-[#1d44c3]/10 to-[#f74b6b]/10 flex items-center justify-center p-3">
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
          <h3 className="text-xl font-bold text-[#1d44c3] mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default You;