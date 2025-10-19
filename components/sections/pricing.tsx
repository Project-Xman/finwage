const pricingPlans = [
  {
    title: "Free",
    subtitle: "Organize across all apps by hand",
    price: "0",
    period: "per month",
    buttonText: "Try for Free",
    features: [
      { text: "Unlimited product updates", enabled: true },
      { text: "1GB Cloud storage", enabled: true },
      { text: "Email and community support", enabled: true },
      { text: "Unlimited product updates", enabled: false },
      { text: "Unlimited product updates", enabled: false },
    ],
    isPopular: false,
  },
  {
    title: "Standard",
    subtitle: "Organize across all apps by hand",
    price: "9",
    period: "per month",
    buttonText: "Try for Free",
    features: [
      { text: "Unlimited product updates", enabled: true },
      { text: "1GB Cloud storage", enabled: true },
      { text: "Email and community support", enabled: true },
      { text: "Unlimited product updates", enabled: false },
      { text: "Unlimited product updates", enabled: false },
    ],
    isPopular: true,
  },
  {
    title: "Premium",
    subtitle: "Organize across all apps by hand",
    price: "19",
    period: "per month",
    buttonText: "Try for Free",
    features: [
      { text: "Unlimited product updates", enabled: true },
      { text: "1GB Cloud storage", enabled: true },
      { text: "Email and community support", enabled: true },
      { text: "Unlimited product updates", enabled: true },
      { text: "Unlimited product updates", enabled: true },
    ],
    isPopular: false,
  },
];

export default function Pricing() {
  return (
    <section className="bg-white w-full py-12 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-12 md:mb-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#1d44c3] leading-tight">
            Pricing Plans
          </h2>
          <p className="text-base md:text-lg text-gray-800 leading-7 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative w-full max-w-sm mx-auto rounded-[20px] bg-white px-10 ${plan.isPopular ? "py-16 pt-14" : "py-12"} shadow-lg border-2 ${plan.isPopular ? "border-[#f64162] scale-105" : "border-gray-100"} hover:border-[#1d44c3] transition-all`}
            >
              {/* Popular Label */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-[#f64162] to-[#ff6b88] px-6 py-2 rounded-full shadow-lg">
                      <span className="text-white text-sm font-bold uppercase tracking-wider">
                        Popular
                      </span>
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#f64162]"></div>
                  </div>
                </div>
              )}

              {/* Card Container */}
              <div className="flex w-full flex-col items-center justify-center gap-4 tracking-[0.2px]">
                {/* Title */}
                <h3 className="text-2xl font-bold leading-8 text-black">
                  {plan.title}
                </h3>

                {/* Subtitle */}
                <p className="text-center text-base text-gray-700 min-h-12">
                  {plan.subtitle}
                </p>

                {/* Price */}
                <div className="my-0 flex justify-center items-start font-semibold text-black">
                  <div className="text-[64px] leading-none">{plan.price}</div>
                  <div className="ml-3 flex flex-col">
                    <div className="mt-3 text-2xl font-bold">$</div>
                    <div className="text-xl">{plan.period}</div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="mb-1 w-full rounded-md bg-[#1d44c3] px-10 py-4 text-base font-semibold text-white hover:bg-[#153399] transition-colors">
                  {plan.buttonText}
                </button>

                {/* Features */}
                <div className="flex w-full flex-col items-start justify-center gap-4 pt-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex w-full items-center justify-start gap-2"
                    >
                      {/* Icon */}
                      <div className="h-8 w-8 flex-shrink-0">
                        <img
                          src="/assets/tick-3d.png"
                          alt="Feature tick"
                          className={`w-8 h-8 ${!feature.enabled ? "grayscale opacity-40" : ""}`}
                        />
                      </div>

                      {/* Description */}
                      <p className="text-sm font-medium text-black">
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
