import { ImagePaths } from "@/lib/assets";
import type { NextPage } from "next";
import Image from "next/image";

// Define your images here (replace with actual paths)
// const imgWork = "/assets/work.png"; // or import from figma:asset if needed
// const imgEarn = "/assets/earn.png";
// const imgAccessPay = "/assets/access-pay.png";
// const imgPeaceOfMind = "/assets/peace-of-mind.png";
const imgWork = "https://placehold.co/300x300"; // or import from figma:asset if needed
const imgEarn = "https://placehold.co/300x300";
const imgAccessPay = "https://placehold.co/300x300";
const imgPeaceOfMind = "https://placehold.co/300x300";

const You: NextPage = () => {
  return (
    <div className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-visible relative min-h-[800px]">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center gap-8">
        <div className="relative w-[300px] h-[300px]">
          <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-100">
            <h2 className="text-2xl font-bold text-[#1d44c3]">FinWage Cycle</h2>
          </div>
        </div>
        <div className="space-y-6 w-full max-w-md">
          <Card
            title="Work"
            description="Put in the hours and do what you do best. Your earnings accumulate with every shift."
            image={imgWork}
          />
          <Card
            title="Earn"
            description="Your available earnings update in the FinWage app after each workday. No more waiting."
            image={imgEarn}
          />
          <Card
            title="Access Pay"
            description="Instantly transfer your earned pay to any bank account, debit card, or prepaid card, 24/7."
            image={imgAccessPay}
          />
          <Card
            title="Peace of Mind"
            description="Take control of your finances, pay bills on time, and reduce financial stress."
            image={imgPeaceOfMind}
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex justify-center items-center relative min-h-[800px]">
        <div className="relative w-[1400px] h-[700px]">
          {/* Central Circle with SVG Arcs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px]">
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

          {/* Cards positioned around circle */}
          <div className="absolute top-0 left-[80px]">
            <Card
              title="Work"
              description="Put in the hours and do what you do best. Your earnings accumulate with every shift."
              image={imgWork}
            />
          </div>
          <div className="absolute top-0 right-[80px]">
            <Card
              title="Earn"
              description="Your available earnings update in the FinWage app after each workday. No more waiting."
              image={imgEarn}
            />
          </div>
          <div className="absolute bottom-0 right-[80px]">
            <Card
              title="Access Pay"
              description="Instantly transfer your earned pay to any bank account, debit card, or prepaid card, 24/7."
              image={imgAccessPay}
            />
          </div>
          <div className="absolute bottom-0 left-[80px]">
            <Card
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
const Card = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 max-w-[320px] backdrop-blur-sm">
      <div className="flex justify-center mb-4">
        <div className="w-[120px] h-[120px] relative">
          <Image src={image} alt={title} fill className="object-contain" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-[#1d44c3] mb-3 text-center">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed text-center">
        {description}
      </p>
    </div>
  );
};

export default You;
