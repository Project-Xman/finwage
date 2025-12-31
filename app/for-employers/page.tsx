import { ArrowRight, Shield, Users, Zap } from "lucide-react";
import Image from "next/image";
import ROICalculator from "@/components/roi-calculator";
import { EnquiryButton } from "@/components/shared/enquiry-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEmployeeBenefits } from "@/lib/services/benefits";
import { getIntegrations } from "@/lib/services/integrations";
import { getEmployerStats } from "@/lib/services/stats";
import { SvgIcon } from "@/lib/utils/svg-icon-renderer";
import { Metadata } from "next";

export const metadata: Metadata = {
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
  console.log("Integrations fetched:", integrations);

  console.log("Employer Stats fetched:", stats);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#1d44c3] via-[#2a4db8] to-[#f74b6b] text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Attract, Retain, and Empower Your Workforce
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Earned Wage Access is a proven financial wellness benefit that helps 
                reduce financial stress, improve engagement, and strengthen retention. 
                FinWage enables employers to offer this benefit without increasing 
                payroll costs or disrupting payroll operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <EnquiryButton
                  type="demo"
                  size="lg"
                  className="bg-white text-[#1d44c3] hover:bg-gray-100"
                  icon={<ArrowRight className="w-5 h-5 ml-2" />}
                >
                  Schedule Demo
                </EnquiryButton>
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
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Slide 1: Left Content, Right Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                A Smarter Employee Benefit
              </h2>
              <p className="text-lg text-[#5B7BA3] leading-relaxed">
                Offer earned wage access as a financial wellness benefit.
              </p>
              <p className="text-base text-[#5B7BA3] leading-relaxed">
                No need to increase salaries or take on payroll risk.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/employer1.png"
                alt="Total Rewards and Employee Benefits"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Slide 2: Right Content, Left Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 lg:grid-flow-col-dense">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl lg:col-start-1">
              <Image
                src="/employer2.jpeg"
                alt="No Payroll Disruption"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:col-start-2 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                No Payroll Disruption
              </h2>
              <p className="text-lg text-[#5B7BA3] leading-relaxed">
                FinWage connects directly with payroll or time & attendance systems.
              </p>
              <p className="text-base text-[#5B7BA3] leading-relaxed">
                Employees access pay any day—without changing payroll cycles.
              </p>
            </div>
          </div>

          {/* Slide 3: Left Content, Right Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Easy Integration, Real Impact
              </h2>
              <p className="text-lg text-[#5B7BA3] leading-relaxed">
                Fast setup, minimal effort, and a fully secured platform.
              </p>
              <p className="text-base text-[#5B7BA3] leading-relaxed">
                Built with strong data privacy and compliance-first architecture.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/employer3.jpeg"
                alt="Easy Integration and HR Management"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Seamless Integrations
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                FinWage integrates directly with existing payroll, time and attendance, 
                and HR systems—ensuring accurate calculations, instant access, and a 
                smooth experience for both employees and administrators.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
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
                  <div className="shrink-0 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
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
                  <div className="shrink-0 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
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
                          className="bg-gray-50 rounded-lg p-4 text-center font-semibold text-gray-700 hover:bg-pink-50 hover:text-[#f74b6b] transition-colors"
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
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-linear-to-br from-[#1d44c3] via-[#2a4db8] to-[#f74b6b] rounded-3xl p-8 md:p-16 text-white">
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a demo with our team and see how FinWage can transform your
            workplace in just 30 minutes.
          </p>
          <EnquiryButton
            type="demo"
            size="lg"
            className="bg-[#1d44c3] hover:bg-[#0d2463]"
            icon={<ArrowRight className="w-5 h-5 ml-2" />}
          >
            Schedule Your Demo
          </EnquiryButton>
        </div>
      </section>
    </main>
  );
}
