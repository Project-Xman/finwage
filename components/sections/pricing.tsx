import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

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
            <Card
              key={index}
              className={`relative w-full max-w-sm mx-auto rounded-[20px] ${
                plan.isPopular ? "lg:scale-105 border-2 border-[#f64162]" : "border-2 border-gray-100"
              } hover:border-[#1d44c3] transition-all shadow-lg`}
            >
              {/* Popular Label */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-[#f64162] to-[#ff6b88] text-white px-6 py-2 rounded-full font-bold uppercase tracking-wider">
                    Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl font-bold text-black">
                  {plan.title}
                </CardTitle>
                <CardDescription className="text-base text-gray-700 min-h-12">
                  {plan.subtitle}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Price */}
                <div className="flex justify-center items-start gap-1">
                  <span className="text-5xl font-semibold text-black">{plan.price}</span>
                  <div className="flex flex-col items-start ml-2">
                    <span className="text-2xl font-bold">$</span>
                    <span className="text-sm text-gray-600">{plan.period}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button className="w-full bg-[#1d44c3] text-white hover:bg-[#153399] transition-colors h-12 font-semibold">
                  {plan.buttonText}
                </Button>

                {/* Features */}
                <div className="space-y-4 pt-4 border-t">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-start gap-3"
                    >
                      {/* Icon */}
                      <CheckCircle2
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          feature.enabled ? "text-green-500" : "text-gray-300"
                        }`}
                      />
                      {/* Description */}
                      <p className={`text-sm font-medium ${
                        feature.enabled ? "text-black" : "text-gray-400"
                      }`}>
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
