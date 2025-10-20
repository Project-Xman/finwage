import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata = {
  title: "Pricing - FinWage",
  description: "Transparent pricing for every business size. Choose the plan that fits your organization. Free for employees.",
  keywords: ["pricing", "plans", "enterprise", "fintech pricing", "payroll pricing"],
  openGraph: {
    title: "Pricing - FinWage",
    description: "Transparent pricing for every business size. Free for employees.",
    type: "website",
  },
};

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Contact Us",
      description: "Perfect for small businesses getting started",
      employees: "Up to 50 employees",
      features: [
        "Instant wage access",
        "Basic analytics dashboard",
        "Email support",
        "Payroll integration",
        "Employee mobile app",
        "Automatic repayment",
      ],
      notIncluded: [
        "Dedicated account manager",
        "Custom reporting",
        "API access",
      ],
      recommended: false,
    },
    {
      name: "Professional",
      price: "Contact Us",
      description: "Ideal for growing companies",
      employees: "50-500 employees",
      features: [
        "Everything in Starter",
        "Advanced analytics",
        "Priority support",
        "Dedicated account manager",
        "Custom reporting",
        "Savings goal features",
        "Financial wellness tools",
        "Multi-location support",
      ],
      notIncluded: ["API access", "White-label options"],
      recommended: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with complex needs",
      employees: "500+ employees",
      features: [
        "Everything in Professional",
        "Full API access",
        "White-label options",
        "Custom integrations",
        "24/7 phone support",
        "SLA guarantees",
        "Custom onboarding",
        "Quarterly business reviews",
        "Advanced security features",
      ],
      notIncluded: [],
      recommended: false,
    },
  ];

  const faqs = [
    {
      q: "How is pricing calculated?",
      a: "Pricing is based on your number of active employees and the features you need. Contact us for a custom quote tailored to your organization.",
    },
    {
      q: "Is there a setup fee?",
      a: "No setup fees. We include full onboarding and integration support in all our plans.",
    },
    {
      q: "Can I change plans later?",
      a: "Yes! You can upgrade or adjust your plan at any time as your needs change.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, ACH transfers, and can set up invoicing for enterprise customers.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transparent Pricing for Every Business
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-4">
            Choose the plan that fits your organization
          </p>
          <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white text-base px-6 py-2">
            <Check className="w-5 h-5 mr-2 inline" />
            100% Free for Employees
          </Badge>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`${plan.recommended ? "ring-4 ring-[#1d44c3] relative md:scale-105" : ""}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#1d44c3] text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-[#1d44c3] my-4">
                    {plan.price}
                  </div>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  <p className="text-sm font-semibold text-foreground mt-2">
                    {plan.employees}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button
                    className={`w-full ${
                      plan.recommended
                        ? "bg-[#1d44c3] hover:bg-[#0d2463]"
                        : "variant-outline"
                    }`}
                  >
                    Get Started
                  </Button>

                  <div className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 opacity-50"
                      >
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Need a custom solution? We can build a plan that fits your exact needs.
            </p>
            <Button variant="link" className="text-[#1d44c3]">
              Contact Sales for Custom Pricing →
            </Button>
          </div>
        </div>
      </section>

      {/* Employee Benefit */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-0">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 mx-auto">
                <Check className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl md:text-5xl">
                Always Free for Employees
              </CardTitle>
              <CardDescription className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
                Your employees never pay a penny. No fees, no interest, no hidden charges. FinWage is a benefit you provide, paid for by your organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <Card>
                  <CardHeader className="text-center">
                    <div className="text-3xl font-bold text-green-600">$0</div>
                    <CardDescription>Employee Fees</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <div className="text-3xl font-bold text-green-600">0%</div>
                    <CardDescription>Interest Charged</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <div className="text-3xl font-bold text-green-600">$0</div>
                    <CardDescription>Hidden Charges</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Pricing FAQ
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule a demo to see FinWage in action and get a custom quote for your organization
          </p>
          <Button size="lg" className="bg-white text-[#1d44c3] hover:bg-gray-100">
            Schedule Your Demo
          </Button>
        </div>
      </section>
    </main>
  );
}
