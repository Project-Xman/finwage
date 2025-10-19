import type { NextPage } from 'next';
import Image from "next/image";

const CycleSection: NextPage = () => {
  return (
    <div className="hidden lg:block relative w-full h-[734px] bg-white flex-shrink-0 text-left text-2xl text-white font-afacad">
      {/* Main Container */}
      <div className="absolute top-[-184px] left-[-162px] w-[1815px] flex items-center gap-16">
        
        {/* Left Image Section */}
        <div className="h-[907px] flex-1 relative bg-white">
          {/* Main Background Image Placeholder */}
          <div className="absolute top-[95px] left-[49px] w-[1151.4px] h-[767px] bg-gray-200 rounded-lg">
            <Image
              src="https://picsum.photos/1152/768"
              alt="FinWage Cycle"
              width={1151.4}
              height={767}
              className="w-full h-full object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          </div>
          
          {/* Decorative Circles */}
          <div className="absolute top-[-46px] left-[95px] rounded-full bg-[rgba(247,75,107,0.38)] w-[950.6px] h-[950.6px]"></div>
          <div className="absolute top-[-152px] left-[28px] rounded-full bg-white w-[849px] h-[849px]"></div>
          
          {/* Heading */}
          <div className="absolute top-[233px] left-[217px] tracking-[-2.4px] leading-[96px] flex items-center w-[583px] h-[220px] font-bold text-4xl text-black">
            FinWage Cycle
          </div>
          
          {/* Peace of Mind Card */}
          <div className="absolute right-[-23.6%] bottom-[21px] w-[34.68%] h-[139px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[12px] rounded-lg bg-[rgba(255,255,255,0.95)] border border-gray-200 overflow-hidden">
            <div className="absolute top-[calc(50%_-_23.7px)] left-[20.8px] rounded-[12px] w-[48px] h-[48px] overflow-hidden flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
            </div>
            <div className="absolute top-[27px] left-[85px] leading-[28px] uppercase flex items-center w-[168px] h-[15px] text-[17.3px] text-[#1d44c3] font-bold">
              Peace of Mind
            </div>
            <div className="absolute top-[53px] left-[85px] text-[13.3px] leading-[22.75px] text-[#374151] flex items-center w-[277px] h-[59px] font-inter">
              <p className="m-0">Take control of your finances, pay bills on time, and reduce financial stress.</p>
            </div>
          </div>
        </div>
        
        {/* Right Content Section */}
        <div className="h-[619px] w-[748px] relative text-base text-[#1d44c3]">
          
          {/* Work and Earn Cards */}
          <div className="absolute top-[55px] left-[93px] w-[534px] h-[304px]">
            
            {/* Work Card */}
            <div className="absolute right-[29.03%] bottom-[152px] w-[70.97%] h-[139px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[12px] rounded-lg bg-[rgba(255,255,255,0.95)] border border-gray-200 overflow-hidden">
              <div className="absolute top-[calc(50%_-_23.7px)] left-[20.8px] rounded-[12px] w-[48px] h-[48px] overflow-hidden flex items-center justify-center">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <Image
                    src="/icon-placeholder.svg" // Replace with your icon path
                    alt=""
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="absolute top-[27px] left-[85px] tracking-[0.3px] leading-[16px] uppercase flex items-center w-[89px] h-[15px] text-[#1d44c3] font-bold">
                Work
              </div>
              <div className="absolute top-[53px] left-[85px] text-[13.3px] leading-[22.75px] text-[#374151] flex items-center w-[277px] h-[59px] font-inter">
                <p className="m-0">Put in the hours and do what you do best. Your earnings accumulate with every shift.</p>
              </div>
            </div>
            
            {/* Earn Card */}
            <div className="absolute right-[23.22%] bottom-[-34px] left-[5.81%] w-[70.97%] h-[139px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[12px] rounded-lg bg-[rgba(255,255,255,0.95)] border border-gray-200 overflow-hidden">
              <div className="absolute top-[calc(50%_-_23.7px)] left-[20.8px] rounded-[12px] w-[48px] h-[48px] overflow-hidden flex items-center justify-center">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <Image
                    src="/icon-placeholder.svg" // Replace with your icon path
                    alt=""
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="absolute top-[27px] left-[85px] leading-[28px] uppercase flex items-center w-[89px] h-[15px] text-[17.2px] text-[#1d44c3] font-bold">
                Earn
              </div>
              <div className="absolute top-[53px] left-[85px] text-[13.5px] leading-[22.75px] text-[#374151] flex items-center w-[277px] h-[59px] font-inter">
                <p className="m-0">Your available earnings update in the FinWage app after each workday. No more waiting.</p>
              </div>
            </div>
          </div>
          
          {/* Access Pay Card and Decorative Element */}
          <div className="absolute top-[359px] left-[13px] w-[748px] h-[315px]">
            
            {/* Access Pay Card */}
            <div className="absolute right-[46.72%] bottom-[88px] left-[2.61%] w-[50.67%] h-[139px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[12px] rounded-lg bg-[rgba(255,255,255,0.95)] border border-gray-200 overflow-hidden">
              <div className="absolute top-[calc(50%_-_23.7px)] left-[20.8px] rounded-[12px] w-[48px] h-[48px] overflow-hidden flex items-center justify-center">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <Image
                    src="/icon-placeholder.svg" // Replace with your icon path
                    alt=""
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="absolute top-[27px] left-[85px] leading-[28px] uppercase flex items-center w-[176px] h-[15px] text-[#1d44c3] font-bold">
                Access Pay
              </div>
              <div className="absolute top-[53px] left-[85px] text-[13.5px] leading-[22.75px] text-[#374151] flex items-center w-[277px] h-[59px] font-inter">
                <p className="m-0">Instantly transfer your earned pay to any bank account, debit card, or prepaid card, 24/7.</p>
              </div>
            </div>
            
            {/* Decorative Circle */}
            <div className="absolute top-0 left-[742px] rounded-full bg-[#f74b6b] w-[315px] h-[315px] rotate-180 origin-top-left"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleSection;