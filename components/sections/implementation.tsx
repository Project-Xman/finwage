import { Card, CardContent } from "@/components/ui/card";

function ImplementationCard() {
  return (
    <Card className="relative rounded-3xl w-full border border-gray-100 shadow-2xl">
      <CardContent className="flex flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-16 items-start p-6 md:p-12 lg:p-16 w-full">
        <div className="flex flex-col gap-2 items-start w-full lg:w-auto lg:shrink-0">
          <div className="font-bold text-[#f64162] text-xs tracking-wider uppercase">
            <p className="leading-4">SEAMLESS INTEGRATION</p>
          </div>
          <div className="font-normal text-[#1d44c3] text-3xl md:text-4xl lg:text-5xl leading-tight">
            <p className="mb-0">Simple to launch.</p>
            <p>Easy to integrate.</p>
          </div>
        </div>

        <div className="text-gray-800 text-sm md:text-base leading-6 w-full lg:flex-1">
          <p className="mb-4">
            FinWage connects with your existing payroll or workforce systems 
            with minimal setup. Our onboarding and support teams ensure a 
            smooth rollout and responsible employee adoption.
          </p>
          <p className="font-semibold text-[#1d44c3]">
            A modern earned wage access solution—without changing payroll 
            schedules or cash flow.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Container() {
  return (
    <div
      className="flex flex-col gap-8 md:gap-12 items-center px-4 md:px-24 lg:px-28 py-8 md:py-16 w-full"
      data-name="Container"
    >
      <div className="font-bold text-[#1d44c3] text-3xl md:text-4xl lg:text-5xl text-center">
        <p className="leading-tight">Implementation / Integration</p>
      </div>
      <ImplementationCard />
    </div>
  );
}

export default function Implementation() {
  return (
    <section className="bg-white w-full" data-name="Implementation">
      <Container />
    </section>
  );
}
