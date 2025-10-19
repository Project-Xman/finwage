function ImplementationCard() {
  return (
    <div className="relative rounded-3xl w-full" data-name="Frame">
      <div className="flex flex-col items-start overflow-hidden rounded-inherit w-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-16 items-start p-6 md:p-12 lg:p-16 w-full">
          <div className="flex flex-col gap-2 items-start w-full lg:w-auto lg:flex-shrink-0">
            <div className="font-bold text-[#f64162] text-xs tracking-wider uppercase">
              <p className="leading-4">SUCCESSFUL IMPLEMENTATION</p>
            </div>
            <div className="font-normal text-[#1d44c3] text-3xl md:text-4xl lg:text-5xl leading-tight">
              <p className="mb-0">Enabling Confident</p>
              <p>Employee Adoption</p>
            </div>
          </div>

          <div className="text-gray-800 text-sm md:text-base leading-6 w-full lg:flex-1">
            <p>
              The FinWage Solution seamlessly and securely integrates with your
              existing payroll, time management, and banking systems. Our
              dedicated implementation team ensures minimal impact on payroll
              operations while delivering a smooth setup process. From there,
              our collaborative experts guide you through every step—technical
              integration, customized launch planning, employee activation,
              onboarding, training, marketing, and ongoing support—to ensure
              confident and widespread employee adoption.
            </p>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-gray-100 inset-0 pointer-events-none rounded-3xl shadow-2xl"
      />
    </div>
  );
}

function Container() {
  return (
    <div
      className="flex flex-col gap-8 md:gap-12 items-center px-4 md:px-24 lg:px-28 py-8 md:py-16 w-full"
      data-name="Container"
    >
      <div className="font-bold text-[#1d44c3] text-3xl md:text-4xl lg:text-5xl text-center">
        <p className="leading-tight">Implementation</p>
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
