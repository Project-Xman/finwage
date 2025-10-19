import { Check, X } from "lucide-react";

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
        "Automatic repayment"
      ],
      notIncluded: [
        "Dedicated account manager",
        "Custom reporting",
        "API access"
      ],
      recommended: false
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
        "Multi-location support"
      ],
      notIncluded: [
        "API access",
        "White-label options"
      ],
      recommended: true
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
        "Advanced security features"
      ],
      notIncluded: [],
      recommended: false
    }
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
          <div className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold">
            <Check className="w-5 h-5" />
            100% Free for Employees
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-8 ${plan.recommended ? 'ring-4 ring-[#1d44c3] relative' : 'shadow-lg'}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#1d44c3] text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-[#1d44c3] mb-2">{plan.price}</div>
                  <p className="text-gray-600 mb-2">{plan.description}</p>
                  <p className="text-sm font-semibold text-gray-700">{plan.employees}</p>
                </div>

                <button className={`w-full py-4 rounded-full font-semibold mb-8 transition-all ${
                  plan.recommended 
                    ? 'bg-[#1d44c3] text-white hover:bg-[#0d2463]' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  Get Started
                </button>

                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 opacity-50">
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Need a custom solution? We can build a plan that fits your exact needs.
            </p>
            <button className="text-[#1d44c3] font-semibold hover:underline">
              Contact Sales for Custom Pricing →
            </button>
          </div>
        </div>
      </section>

      {/* Employee Benefit */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 md:p-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Always Free for Employees
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Your employees never pay a penny. No fees, no interest, no hidden charges. 
              FinWage is a benefit you provide, paid for by your organization.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">$0</div>
                <div className="text-gray-600">Employee Fees</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">0%</div>
                <div className="text-gray-600">Interest Charged</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">$0</div>
                <div className="text-gray-600">Hidden Charges</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Pricing FAQ
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "How is pricing calculated?",
                a: "Pricing is based on your number of active employees and the features you need. Contact us for a custom quote tailored to your organization."
              },
              {
                q: "Is there a setup fee?",
                a: "No setup fees. We include full onboarding and integration support in all our plans."
              },
              {
                q: "Can I change plans later?",
                a: "Yes! You can upgrade or adjust your plan at any time as your needs change."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, ACH transfers, and can set up invoicing for enterprise customers."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
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
          <button className="bg-white text-[#1d44c3] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">
            Schedule Your Demo
          </button>
        </div>
      </section>
    </main>
  );
}
