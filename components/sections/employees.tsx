import Image from "next/image";
import NextLink from "next/link";

function Person() {
  return (
    <div
      className="absolute h-[335.41px] right-[214px] rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-[125px] w-[224px]"
      data-name="Person"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
        <Image
          alt="Employee using financial wellness features"
          className="object-cover"
          src="/assets/worker-1.png"
          fill
        />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div
      className="absolute bg-gray-200 h-[8px] left-[16.8px] overflow-clip right-[16.8px] rounded-[9999px] top-[64.8px]"
      data-name="Background"
    >
      <div
        className="absolute bg-gradient-to-r from-[#3b82f6] h-[8px] left-0 right-[35.01%] rounded-[9999px] to-[#4f46e5] top-0"
        data-name="Gradient"
      />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div
      className="absolute h-[109.6px] left-[25.6px] right-[25.6px] rounded-[12px] top-[97.6px]"
      data-name="Background+Border"
    >
      <div
        aria-hidden="true"
        className="absolute border border-blue-100 border-solid inset-0 pointer-events-none rounded-[12px]"
      />
      <div className="absolute flex flex-col font-semibold h-[16px] justify-center leading-[0] left-[16.8px] not-italic text-[11.6px] text-gray-800 top-[24.8px] translate-y-[-50%] w-[71.69px]">
        <p className="leading-[16px]">Rainy day jar</p>
      </div>
      <div className="absolute flex flex-col font-normal h-[16px] justify-center leading-[0] left-[16.8px] not-italic text-[11.4px] text-gray-700 top-[48.8px] translate-y-[-50%] w-[119.49px]">
        <p className="leading-[16px]">Account ending: 1890</p>
      </div>
      <div className="absolute flex flex-col font-bold h-[16px] justify-center leading-[0] left-[163.63px] not-italic text-[10.7px] text-gray-900 top-[48.8px] translate-y-[-50%] w-[56.58px]">
        <p className="leading-[16px]">$2,500.00</p>
      </div>
      <Background />
      <div className="absolute flex flex-col font-normal h-[16px] justify-center leading-[0] not-italic right-[16.6px] text-[11.3px] text-gray-500 text-right top-[84.8px] translate-y-[-50%] w-[85.89px]">
        <p className="leading-[16px]">Goal: $2,500.00</p>
      </div>
    </div>
  );
}

function BackgroundBorderShadowOverlayBlur() {
  return (
    <div
      className="absolute backdrop-blur-[6px] backdrop-filter bg-[rgba(255,255,255,0.95)] h-[232.8px] right-0 rounded-[16px] top-[267.2px] w-[288px]"
      data-name="Background+Border+Shadow+OverlayBlur"
    >
      <div className="h-[232.8px] overflow-clip relative rounded-[inherit] w-[288px]">
        <div className="absolute flex flex-col font-bold h-[20px] justify-center leading-[0] left-[25.6px] not-italic text-[#1d44c3] text-[13.3px] top-[35.6px] translate-y-[-50%] w-[160px]">
          <p className="leading-[20px]">Set a savings goal</p>
        </div>
        <div className="absolute flex flex-col font-normal h-[31.2px] justify-center leading-[16px] left-[25.6px] not-italic text-[11.4px] text-gray-600 top-[65.2px] translate-y-[-50%] w-[211.95px]">
          <p className="mb-0">Tap to start building your savings habit</p>
          <p>with a goal to work towards.</p>
        </div>
        <BackgroundBorder />
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
      />
    </div>
  );
}

function Person1() {
  return (
    <div
      className="absolute h-[321.49px] right-[392px] rounded-[24px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-0 w-[192px]"
      data-name="Person"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
        <Image
          alt="Employee managing savings goals"
          className="object-cover"
          src="/assets/worker-2.png"
          fill
        />
      </div>
    </div>
  );
}

function ParagraphBackgroundBorderShadowOverlayBlur() {
  return (
    <div
      className="absolute backdrop-blur-[6px] backdrop-filter bg-[rgba(255,255,255,0.95)] h-[163.2px] right-[40px] rounded-[16px] top-[80px] w-[256px]"
      data-name="Paragraph+Background+Border+Shadow+OverlayBlur"
    >
      <div className="h-[163.2px] leading-[0] not-italic overflow-clip relative rounded-[inherit] w-[256px]">
        <div className="absolute flex flex-col font-medium h-[20px] justify-center left-[21.6px] text-[13.6px] text-gray-600 top-[31.6px] translate-y-[-50%] w-[59.14px]">
          <p className="leading-[20px]">You have</p>
        </div>
        <div className="absolute flex flex-col font-bold h-[75.2px] justify-center leading-[36px] left-[21.6px] text-[29.3px] text-green-600 top-[81.6px] translate-y-[-50%] w-[116.34px]">
          <p className="mb-0">$85.00</p>
          <p>planned</p>
        </div>
        <div className="absolute flex flex-col font-medium h-[20px] justify-center left-[21.6px] text-[13.9px] text-gray-600 top-[131.6px] translate-y-[-50%] w-[70.34px]">
          <p className="leading-[20px]">for payday</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
      />
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative w-full md:w-[584px] min-h-[400px] md:h-[500px] flex-shrink-0">
      {/* Mobile: Stack images vertically */}
      <div className="md:hidden flex flex-col gap-4 items-center">
        <div className="w-48 h-64 rounded-2xl shadow-lg overflow-hidden relative">
          <Image
            alt="Employee using financial wellness features"
            className="object-cover"
            src="/assets/worker-1.png"
            fill
          />
        </div>
        <div className="w-48 h-64 rounded-2xl shadow-lg overflow-hidden relative">
          <Image
            alt="Employee managing savings goals"
            className="object-cover"
            src="/assets/worker-2.png"
            fill
          />
        </div>
      </div>

      {/* Desktop: Positioned layout */}
      <div className="hidden md:block relative w-full h-[500px]">
        <Person />
        <BackgroundBorderShadowOverlayBlur />
        <Person1 />
        <ParagraphBackgroundBorderShadowOverlayBlur />
      </div>
    </div>
  );
}

function LinkComponent() {
  return (
    <div
      className="font-semibold relative shrink-0 text-[#f64162] w-full md:w-auto"
      data-name="Link"
    >
      <NextLink
        href="/for-employees"
        className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <span className="text-[15.6px] leading-[24px]">
          See how it works for employees
        </span>
        <span className="text-[16px] leading-[24px]">{`>`}</span>
      </NextLink>
    </div>
  );
}

function Frame10() {
  return (
    <div className="flex flex-col gap-6 md:gap-[24.8px] w-full md:flex-1">
      <h2 className="text-[#1d44c3] text-[32px] md:text-[47.1px] leading-[40px] md:leading-[60px]">
        Supporting Every Employee's Journey Toward Financial Growth
      </h2>
      <p className="text-[15.6px] leading-[24px] text-gray-800">
        FinWage enables employees to confidently manage and optimize their
        earnings, fostering financial wellness.
      </p>
      <LinkComponent />
    </div>
  );
}

export default function Employees() {
  return (
    <section className="relative w-full bg-[#fff9fa] py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-12 items-center min-[900px]:flex-row min-[900px]:gap-[112px]">
          <Frame9 />
          <Frame10 />
        </div>
      </div>
    </section>
  );
}
