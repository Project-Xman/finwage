import { BellIcon } from "lucide-react";
import type { NextPage } from "next";
import Image from "next/image";

function HeroImageContainer({ className }: { className?: string }) {
  return (
    <div className={`${className} relative`} data-name="Hero Image Container">
      {/* Circular Container for the Hero Image */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: "800px",
          height: "800px",
          left: "6px",
          top: "2px",
        }}
      >
        {/* Image fills the circular container using object-cover */}
        <Image
          fill
          alt="Corporate workers brainstorming together"
          className="object-cover pointer-events-none"
          style={{ objectPosition: "center" }}
          src="/assets/hero-image.jpg"
        />
        {/* Blue Overlay - Covers the circular image area */}
        <div className="absolute inset-0 bg-pink-900 opacity-50"></div>
      </div>

      {/* White Arc Overlay */}
      <div
        className="absolute"
        style={{
          left: "100px",
          top: "26px",
          width: "600px",
          height: "600px",
        }}
      >
        <Image
          fill
          alt=""
          className="object-contain pointer-events-none"
          src="/assets/white-arc.png"
          sizes="900px"
        />
      </div>

      {/* Play Icon Button */}
      <div
        className="absolute cursor-pointer flex items-center justify-center"
        style={{
          left: "300px",
          top: "350px",
          width: "260px",
          height: "160px",
        }}
      >
        <Image
          fill
          alt="Play Video"
          className="object-contain"
          src="/assets/app-icon.png"
          sizes="160px"
        />
      </div>

      {/* Peace of Mind Card */}
      <div className="absolute right-[-23.6%] bottom-[21px] w-[34.68%] h-[139px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[12px] rounded-lg bg-[rgba(255,255,255,0.95)] border border-gray-200 overflow-hidden">
        <div className="absolute top-[calc(50%_-_23.7px)] left-[20.8px] rounded-[12px] w-[48px] h-[48px] overflow-hidden flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        </div>
        <div className="absolute top-[27px] left-[85px] leading-[28px] uppercase flex items-center w-[168px] h-[15px] text-[17.3px] text-[#1d44c3] font-bold">
          Peace of Mind
        </div>
        <div className="absolute top-[53px] left-[85px] text-[13.3px] leading-[22.75px] text-[#374151] flex items-center w-[277px] h-[59px] font-inter">
          <p className="m-0">
            Take control of your finances, pay bills on time, and reduce
            financial stress.
          </p>
        </div>
      </div>
    </div>
  );
}

const CycleSection: NextPage = () => {
  return (
    <div className="hidden md:block relative w-full h-[580px] md:h-[650px] lg:h-[734px] bg-white flex-shrink-0 text-left text-2xl text-white font-afacad overflow-hidden">
      {/* Main Container */}
      <div className="absolute top-[-140px] md:top-[-160px] lg:top-[-184px] left-[-280px] md:left-[-220px] lg:left-[-162px] w-[1815px] flex items-center gap-8 md:gap-12 lg:gap-16 overflow-clip scale-[0.65] md:scale-[0.8] lg:scale-100 origin-left">
        <HeroImageContainer className="w-[1000px] h-[930px]" />

        {/* Right Content Section */}
        <div className="h-[619px] w-[748px] relative text-base text-[#1d44c3]">
          {/* Work and Earn Cards */}
          <div className="absolute top-[55px] left-[93px] w-[534px] h-[304px]">
            {/* Work Card */}
            <div className="absolute right-[29.03%] bottom-[152px] w-[70.97%] h-[139px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[12px] rounded-lg bg-[rgba(255,255,255,0.95)] border border-gray-200 overflow-hidden">
              <div className="absolute top-[calc(50%_-_23.7px)] left-[20.8px] rounded-[12px] w-[48px] h-[48px] overflow-hidden flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-600"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M8 7v7M12 7v7M16 7v7" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-[27px] left-[85px] tracking-[0.3px] leading-[16px] uppercase flex items-center w-[89px] h-[15px] text-[#1d44c3] font-bold">
                Work
              </div>
              <div className="absolute top-[53px] left-[85px] text-[13.3px] leading-[22.75px] text-[#374151] flex items-center w-[277px] h-[59px] font-inter">
                <p className="m-0">
                  Put in the hours and do what you do best. Your earnings
                  accumulate with every shift.
                </p>
              </div>
            </div>

            {/* Earn Card */}
            <div className="absolute right-[23.22%] bottom-[-34px] left-[5.81%] w-[70.97%] h-[139px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[12px] rounded-lg bg-[rgba(255,255,255,0.95)] border border-gray-200 overflow-hidden">
              <div className="absolute top-[calc(50%_-_23.7px)] left-[20.8px] rounded-[12px] w-[48px] h-[48px] overflow-hidden flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <line x1="12" x2="12" y1="2" y2="22" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-[27px] left-[85px] leading-[28px] uppercase flex items-center w-[89px] h-[15px] text-[17.2px] text-[#1d44c3] font-bold">
                Earn
              </div>
              <div className="absolute top-[53px] left-[85px] text-[13.5px] leading-[22.75px] text-[#374151] flex items-center w-[277px] h-[59px] font-inter">
                <p className="m-0">
                  Your available earnings update in the FinWage app after each
                  workday. No more waiting.
                </p>
              </div>
            </div>
          </div>

          {/* Access Pay Card and Decorative Element */}
          <div className="absolute top-[359px] left-[13px] w-[748px] h-[315px]">
            {/* Access Pay Card */}
            <div className="absolute right-[46.72%] bottom-[88px] left-[2.61%] w-[50.67%] h-[139px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[12px] rounded-lg bg-[rgba(255,255,255,0.95)] border border-gray-200 overflow-hidden">
              <div className="absolute top-[calc(50%_-_23.7px)] left-[20.8px] rounded-[12px] w-[48px] h-[48px] overflow-hidden flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-pink-600"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-[27px] left-[85px] leading-[28px] uppercase flex items-center w-[176px] h-[15px] text-[#1d44c3] font-bold">
                Access Pay
              </div>
              <div className="absolute top-[53px] left-[85px] text-[13.5px] leading-[22.75px] text-[#374151] flex items-center w-[277px] h-[59px] font-inter">
                <p className="m-0">
                  Instantly transfer your earned pay to any bank account, debit
                  card, or prepaid card, 24/7.
                </p>
              </div>
            </div>

            {/* Pink Arc Overlay (Right side) */}
            <div className="absolute right-0 bottom-[100px] w-[120px] lg:w-[170px] h-[200px] lg:h-[300px]">
              <Image
                fill
                src="/assets/pink-arc.png"
                alt=""
                className="object-contain"
                sizes="170px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleSection;