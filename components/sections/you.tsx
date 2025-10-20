import { ImagePaths } from "@/lib/assets";
import type { NextPage } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

// Define your images here (replace with actual paths)
// const imgWork = "/assets/work.png"; // or import from figma:asset if needed
// const imgEarn = "/assets/earn.png";
// const imgAccessPay = "/assets/access-pay.png";
// const imgPeaceOfMind = "/assets/peace-of-mind.png";
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

      {/* Desktop Layout */}
      <div className="hidden md:flex justify-center items-center relative min-h-[700px] md:min-h-[750px] lg:min-h-[800px]">
        <div className="relative w-full max-w-[900px] md:max-w-[1100px] lg:max-w-[1400px] h-[600px] md:h-[650px] lg:h-[700px] px-4">
          {/* Central Circle with SVG Arcs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[380px] lg:w-[450px] h-[320px] md:h-[380px] lg:h-[450px]">
            {/* SVG for curved arcs */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 450 450"
            >
              {/* Blue arc - top right */}
              <path
                d="M 225 25 A 200 200 0 0 1 425 225"
                fill="none"
                stroke="#1d44c3"
                strokeWidth="40"
                strokeLinecap="round"
              />
              {/* Pink arc - bottom right */}
              <path
                d="M 425 225 A 200 200 0 0 1 225 425"
                fill="none"
                stroke="#f74b6b"
                strokeWidth="40"
                strokeLinecap="round"
              />
              {/* Blue arc - bottom left */}
              <path
                d="M 225 425 A 200 200 0 0 1 25 225"
                fill="none"
                stroke="#1d44c3"
                strokeWidth="40"
                strokeLinecap="round"
              />
              {/* Pink arc - top left */}
              <path
                d="M 25 225 A 200 200 0 0 1 225 25"
                fill="none"
                stroke="#f74b6b"
                strokeWidth="40"
                strokeLinecap="round"
              />
            </svg>

            {/* Center circle text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={ImagePaths.APP_ICON}
                alt="Finwage Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Cards positioned around circle - Responsive positioning */}
          <div className="absolute top-0 left-[20px] md:left-[40px] lg:left-[80px]">
            <YouCard
              title="Work"
              description="Put in the hours and do what you do best. Your earnings accumulate with every shift."
              image={imgWork}
            />
          </div>
          <div className="absolute top-0 right-[20px] md:right-[40px] lg:right-[80px]">
            <YouCard
              title="Earn"
              description="Your available earnings update in the FinWage app after each workday. No more waiting."
              image={imgEarn}
            />
          </div>
          <div className="absolute bottom-0 right-[20px] md:right-[40px] lg:right-[80px]">
            <YouCard
              title="Access Pay"
              description="Instantly transfer your earned pay to any bank account, debit card, or prepaid card, 24/7."
              image={imgAccessPay}
            />
          </div>
          <div className="absolute bottom-0 left-[20px] md:left-[40px] lg:left-[80px]">
            <YouCard
              title="Peace of Mind"
              description="Take control of your finances, pay bills on time, and reduce financial stress."
              image={imgPeaceOfMind}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
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
    <Card className="bg-white rounded-2xl p-5 sm:p-6 md:p-5 lg:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 w-full md:max-w-[280px] lg:max-w-[320px] backdrop-blur-sm">
      <CardContent className="flex flex-col items-center gap-4 p-0">
        <div className="flex justify-center">
          <div className="w-[100px] sm:w-[110px] md:w-[100px] lg:w-[120px] h-[100px] sm:h-[110px] md:h-[100px] lg:h-[120px] relative">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl md:text-xl font-bold text-[#1d44c3] text-center">
          {title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base md:text-sm leading-relaxed text-center">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default You;
