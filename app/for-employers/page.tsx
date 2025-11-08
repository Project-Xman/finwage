import { ArrowRight, Shield, Users, Zap } from "lucide-react";
import ROICalculator from "@/components/roi-calculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEmployeeBenefits } from "@/lib/services/benefits";
import { getIntegrations } from "@/lib/services/integrations";
import { getEmployerStats } from "@/lib/services/stats";
import { SvgIcon } from "@/lib/utils/svg-icon-renderer";

export const metadata = {
  title: "For Employers - FinWage",
  description:
    "Reduce turnover by 27% and attract top talent. FinWage helps employers offer earned wage access benefits that improve retention and productivity.",
  keywords: [
    "employer benefits",
    "payroll solutions",
    "employee retention",
    "earned wage access",
    "HR solutions",
  ],
  openGraph: {
    title: "For Employers - FinWage",
    description:
      "Reduce turnover by 27% and attract top talent with earned wage access.",
    type: "website",
  },
};

// Revalidate for-employers page every month (2,678,400 seconds)
// This enables Incremental Static Regeneration (ISR)
export const revalidate = 2678400;

export default async function ForEmployersPage() {
  // Fetch data from PocketBase in parallel
  const [benefits, stats, integrationsResult] = await Promise.all([
    getEmployeeBenefits({ perPage: 20 }),
    getEmployerStats({ perPage: 10 }),
    getIntegrations({ perPage: 50 }),
  ]);

  const integrations = integrationsResult.items;

  console.log("Employer Stats fetched:", stats);

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
                Offer FinWage as a zero-cost benefit that pays for itself
                through improved retention and productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#1d44c3] hover:bg-gray-100"
                >
                  Schedule Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="border-2 border-white text-white hover:bg-white/10"
                >
                  Calculate ROI
                </Button>
              </div>
            </div>
            <div className="relative">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-8">
                  {stats.length > 0 ? (
                    <div className="grid grid-cols-2 gap-6">
                      {stats.map((stat) => (
                        <div key={stat.id} className="text-center">
                          <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                            {stat.value}
                          </div>
                          <div className="text-blue-100">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-blue-100">
                      <p>Statistics coming soon</p>
                    </div>
                  )}
                </CardContent>
              </Card>
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
              Every dollar you invest in employee financial wellness returns
              multiplied through retention, productivity, and recruiting
              savings.
            </p>
          </div>

          {benefits.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <Card
                  key={benefit.id}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 hover:shadow-xl transition-all"
                >
                  <CardContent className="p-8">
                    <div className="text-[#1d44c3] mb-4">
                      <SvgIcon svgString={benefit.icon_svg} className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>Benefits information coming soon</p>
            </div>
          )}
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
                FinWage integrates directly with your existing systems. No new
                processes, no extra work for your HR team.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      Quick Setup
                    </h3>
                    <p className="text-gray-600">
                      Integration completed in 2-3 business days with our
                      dedicated team
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      Bank-Level Security
                    </h3>
                    <p className="text-gray-600">
                      256-bit encryption and full compliance with all data
                      protection regulations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      Dedicated Support
                    </h3>
                    <p className="text-gray-600">
                      Your own account manager and 24/7 technical support
                    </p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-[#1d44c3] hover:bg-[#0d2463]">
                View Integration Details
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle className="text-center">
                  Works With Your Systems
                </CardTitle>
              </CardHeader>
              <CardContent>
                {integrations.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {integrations.map((integration) => (
                        <div
                          key={integration.id}
                          className="bg-gray-50 rounded-lg p-4 text-center font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#1d44c3] transition-colors"
                        >
                          {integration.name}
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-gray-500 text-sm">
                      + Many more platforms supported
                    </p>
                  </>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <p>Integration information coming soon</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-[#1d44c3] to-[#0d2463] rounded-3xl p-8 md:p-16 text-white">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Calculate Your ROI
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                See exactly how much FinWage can save your company in reduced
                turnover and recruiting costs.
              </p>
            </div>

            <ROICalculator />
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
            Schedule a demo with our team and see how FinWage can transform your
            workplace in just 30 minutes.
          </p>
          <Button size="lg" className="bg-[#1d44c3] hover:bg-[#0d2463]">
            Schedule Your Demo
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </main>
  );
}
