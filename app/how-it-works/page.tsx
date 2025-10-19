import { ArrowRight, Check, Users, Building2, Zap } from "lucide-react";

export default function HowItWorksPage() {
  const employeeSteps = [
    {
      step: "01",
      title: "Request",
      description: "Access your earned wages instantly through the FinWage app. Simple, secure, and stress-free.",
      icon: "💳"
    },
    {
      step: "02",
      title: "Advance",
      description: "Get your money deposited directly to your account within minutes. No waiting for payday.",
      icon: "⚡"
    },
    {
      step: "03",
      title: "Repay",
      description: "Automatic repayment on your next payday. No hidden fees, no debt cycles.",
      icon: "✓"
    }
  ];

  const employerBenefits = [
    "Seamless HR/Payroll Integration",
    "Zero Administrative Burden",
    "Boost Employee Satisfaction",
    "Reduce Turnover by 27%",
    "Attract Top Talent",
    "Compliance Built-In"
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How FinWage Works
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Simple, secure, and straightforward. See how FinWage transforms payday for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Employee Journey */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1d44c3] px-4 py-2 rounded-full mb-4">
              <Users className="w-5 h-5" />
              <span className="font-semibold">For Employees</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Three Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access your earned wages whenever you need them
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {employeeSteps.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 h-full">
                  <div className="text-6xl mb-6">{item.icon}</div>
                  <div className="text-sm font-bold text-[#1d44c3] mb-2">STEP {item.step}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                {index < employeeSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <ArrowRight className="w-12 h-12 text-blue-200" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer Side */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white text-[#1d44c3] px-4 py-2 rounded-full mb-6 shadow-sm">
                <Building2 className="w-5 h-5" />
                <span className="font-semibold">For Employers</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Seamless Integration, Zero Hassle
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                FinWage integrates directly with your existing HR and payroll systems. 
                No extra work for your team, just happy employees.
              </p>
              
              <div className="space-y-4 mb-8">
                {employerBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <button className="bg-[#1d44c3] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#0d2463] transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                Schedule Integration Demo
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                    <Zap className="w-8 h-8 text-[#1d44c3]" />
                    <div>
                      <div className="font-semibold text-gray-900">Quick Setup</div>
                      <div className="text-sm text-gray-600">Integration in 2-3 days</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                    <Check className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Automated Sync</div>
                      <div className="text-sm text-gray-600">Real-time payroll updates</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                    <Users className="w-8 h-8 text-purple-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Full Support</div>
                      <div className="text-sm text-gray-600">Dedicated account manager</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Diagram */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            The Complete Flow
          </h2>
          
          <div className="relative">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "Employee Works", desc: "Earns wages daily" },
                { title: "FinWage Syncs", desc: "Real-time tracking" },
                { title: "Instant Access", desc: "Employee requests advance" },
                { title: "Auto Repayment", desc: "On next payday" }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold mb-2">{index + 1}</div>
                    <div className="font-semibold mb-1">{item.title}</div>
                    <div className="text-sm opacity-90">{item.desc}</div>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-blue-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Workplace?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies offering financial wellness to their employees
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#1d44c3] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">
              Get Started Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
