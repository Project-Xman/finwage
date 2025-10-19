import { ArrowRight, TrendingUp, Shield, Zap, Users, DollarSign, Clock, Award } from "lucide-react";

export default function ForEmployersPage() {
  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "27% Reduction in Turnover",
      description: "Companies using FinWage see significant improvement in employee retention"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Save on Recruiting",
      description: "Reduce hiring costs by $15K+ per position with better retention"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Attract Top Talent",
      description: "Stand out as an employer offering modern financial wellness benefits"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Zero Admin Time",
      description: "Fully automated integration with your existing payroll system"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Compliance Built-In",
      description: "We handle all regulatory requirements and data security"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Boost Productivity",
      description: "Financially secure employees are 21% more productive"
    }
  ];

  const integrations = [
    "ADP",
    "Workday",
    "Paychex",
    "Gusto",
    "BambooHR",
    "Rippling",
    "Namely",
    "Zenefits"
  ];

  const stats = [
    { value: "27%", label: "Turnover Reduction" },
    { value: "$15K+", label: "Savings Per Hire" },
    { value: "2-3 Days", label: "Implementation Time" },
    { value: "0 Hours", label: "Admin Work" }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Attract, Retain & Motivate Your Best Employees
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Offer FinWage as a zero-cost benefit that pays for itself through improved retention and productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-[#1d44c3] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2">
                  Schedule Demo
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all">
                  Calculate ROI
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                      <div className="text-blue-100">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              The Business Case for FinWage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every dollar you invest in employee financial wellness returns multiplied through retention, productivity, and recruiting savings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 hover:shadow-xl transition-all">
                <div className="text-[#1d44c3] mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Seamless HR/Payroll Integration
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                FinWage integrates directly with your existing systems. No new processes, no extra work for your HR team.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">Quick Setup</h3>
                    <p className="text-gray-600">Integration completed in 2-3 business days with our dedicated team</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">Bank-Level Security</h3>
                    <p className="text-gray-600">256-bit encryption and full compliance with all data protection regulations</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">Dedicated Support</h3>
                    <p className="text-gray-600">Your own account manager and 24/7 technical support</p>
                  </div>
                </div>
              </div>

              <button className="bg-[#1d44c3] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#0d2463] transition-all shadow-lg flex items-center gap-2">
                View Integration Details
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Works With Your Systems
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 text-center font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#1d44c3] transition-colors">
                    {integration}
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-500 mt-6 text-sm">
                + Many more platforms supported
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-[#1d44c3] to-[#0d2463] rounded-3xl p-8 md:p-16 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Calculate Your ROI
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                See exactly how much FinWage can save your company in reduced turnover and recruiting costs.
              </p>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-8">
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Number of Employees</label>
                    <input type="number" placeholder="100" className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Current Turnover Rate</label>
                    <input type="text" placeholder="15%" className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Avg. Cost Per Hire</label>
                    <input type="text" placeholder="$4,000" className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50" />
                  </div>
                </div>
              </div>

              <button className="bg-white text-[#1d44c3] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">
                Calculate My Savings
              </button>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-blue-100">
                  Most companies see positive ROI within the first 3 months
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a demo with our team and see how FinWage can transform your workplace in just 30 minutes.
          </p>
          <button className="bg-[#1d44c3] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#0d2463] transition-all shadow-lg inline-flex items-center gap-2">
            Schedule Your Demo
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </main>
  );
}
