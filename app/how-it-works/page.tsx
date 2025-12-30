import { ArrowRight, Building2, Check, Users, Zap, Briefcase, RefreshCw, Wallet } from "lucide-react";
import { EnquiryButton } from "@/components/shared/enquiry-button";

import { Card, CardContent } from "@/components/ui/card";
import { getEmployeeBenefits } from "@/lib/services/benefits";
import { getProcessSteps } from "@/lib/services/process";
import { SvgIcon } from "@/lib/utils/svg-icon-renderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works - FinWage",
  description:
    "Learn how FinWage works for both employees and employers. Simple setup, instant access to earned wages, and seamless integration.",
  keywords: [
    "how it works",
    "earned wage access process",
    "payroll integration",
    "fintech platform",
  ],
  openGraph: {
    title: "How It Works - FinWage",
    description:
      "Learn how FinWage provides instant access to earned wages for employees.",
    type: "website",
  },
};

// Revalidate how-it-works page every month (2,678,400 seconds)
export const revalidate = 2678400;

export default async function HowItWorksPage() {
  // Fetch data from PocketBase in parallel
  const [employeeSteps, employerBenefits] = await Promise.all([
    getProcessSteps({ perPage: 10, category: "employee" }),
    getEmployeeBenefits({ perPage: 20 }),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden bg-white dark:bg-zinc-950">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
            <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full font-semibold text-sm mb-8 animate-fade-in-up">
              Simple. Transparent. Secure.
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight leading-tight">
              Payday, on Your <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-pink-500">Terms</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-12">
              See how FinWage transforms the traditional pay cycle into a flexible, 
              on-demand experience that benefits everyone.
            </p>
        </div>
      </section>

      {/* Employee Journey - Glass Cards & Steps */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gray-50 dark:bg-zinc-900/50 skew-y-3 transform origin-top-left -z-10 h-full w-full"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 shadow-sm px-5 py-2.5 rounded-full mb-6">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-900 dark:text-white">For Employees</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Three Simple Steps to Freedom
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Accessing your earned pay shouldn't be complicated. We've made it as easy as checking your email.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[100px] left-0 w-full h-0.5 bg-linear-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent z-0"></div>

            {employeeSteps.length > 0 ? (
              employeeSteps.map((item) => (
                <div key={item.id} className="relative z-10 group">
                  <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-zinc-700 h-full flex flex-col items-center text-center transform hover:-translate-y-2">
                    <div className="w-20 h-20 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 rounded-2xl flex items-center justify-center mb-8 shadow-inner relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                         <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                         <SvgIcon
                           svgString={item.icon_svg}
                           className="w-10 h-10 text-blue-600 dark:text-blue-400"
                         />
                    </div>
                    
                    <div className="absolute -top-4 bg-gray-900 dark:bg-white text-white dark:text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      Step {item.step}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">No process steps available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Connect The Flows Layout */}
      <section className="py-20 md:py-32 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">The Complete Flow</h2>
             <p className="text-lg text-gray-600 dark:text-gray-400">See how the money moves securely and instantly.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
             {/* Flow Cards */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: "You Work", desc: "Hours logged as usual", icon: Briefcase, color: "from-blue-500 to-blue-600" },
                  { title: "We Sync", desc: "Earnings updated daily", icon: RefreshCw, color: "from-indigo-500 to-indigo-600" },
                  { title: "You Withdraw", desc: "Instant transfer to bank", icon: Wallet, color: "from-purple-500 to-purple-600" },
                  { title: "Auto Repay", desc: "Settled on payday", icon: Check, color: "from-pink-500 to-pink-600" },
                ].map((step, idx) => (
                    <div key={idx} className="relative group">
                        <div className={`h-full rounded-2xl p-6 bg-linear-to-br ${step.color} text-white shadow-lg relative overflow-hidden transition-transform duration-300 hover:-translate-y-1`}>
                             <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                             <div className="relative z-10">
                                <step.icon className="w-8 h-8 mb-4 text-white/90" />
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-white/80 text-sm">{step.desc}</p>
                             </div>
                             <div className="absolute bottom-4 right-4 text-6xl font-black text-black/5 select-none">{idx + 1}</div>
                        </div>
                        {idx < 3 && (
                            <div className="hidden lg:flex absolute top-1/2 -right-8 transform -translate-y-1/2 translate-x-1/2 z-20 w-8 h-8 items-center justify-center bg-white dark:bg-zinc-800 rounded-full shadow-md border border-gray-100 dark:border-zinc-700">
                                <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            </div>
                        )}
                         {idx < 3 && (
                            <div className="flex lg:hidden absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 z-20 w-8 h-8 items-center justify-center bg-white dark:bg-zinc-800 rounded-full shadow-md border border-gray-100 dark:border-zinc-700">
                                <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 rotate-90" />
                            </div>
                        )}
                    </div>
                ))}
             </div>
          </div>
        </div>
      </section>


      {/* Employer Side - Modern Split Feature */}
      <section className="py-20 md:py-32 bg-gray-50 dark:bg-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full mb-8">
                <Building2 className="w-5 h-5" />
                <span className="font-semibold">For Employers</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Seamless Integration, <br />
                <span className="text-blue-600">Zero Hassle</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                FinWage integrates directly with your existing HR and payroll systems. We do the heavy lifting so you can focus on your people.
              </p>

              <div className="space-y-6 mb-10">
                {employerBenefits.length > 0 ? (
                  employerBenefits.map((benefit) => (
                    <div key={benefit.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-zinc-700">
                      <div className="shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{benefit.title}</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Everything handled automatically from day one.</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No employer benefits available.</p>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                  <EnquiryButton
                    type="demo"
                    size="lg"
                    className="bg-[#1d44c3] hover:bg-[#0d2463] h-14 px-8 rounded-full shadow-lg hover:shadow-blue-900/20 text-lg"
                    icon={<ArrowRight className="w-5 h-5 ml-2" />}
                    modalTitle="Schedule Integration Demo"
                    modalDescription="We'll show you how easy it is to integrate FinWage with your payroll system."
                  >
                    Schedule Integration Demo
                  </EnquiryButton>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
               <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
              <div className="grid gap-6 relative z-10 w-full max-w-md mx-auto lg:mr-0">
                  <Card className="shadow-2xl border border-gray-100/50 dark:border-white/10 backdrop-blur-sm bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-900 transition-colors">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 shrink-0">
                             <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-bold text-lg text-gray-900 dark:text-white">Quick Setup</div>
                            <div className="text-gray-500">Live in days, not months</div>
                        </div>
                    </CardContent>
                  </Card>
                   <Card className="shadow-2xl border border-gray-100/50 dark:border-white/10 backdrop-blur-sm bg-white/90 dark:bg-zinc-900/90 hover:bg-white dark:hover:bg-zinc-900 transition-colors">
                    <CardContent className="p-8 flex items-center gap-6">
                        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 shrink-0">
                             <Check className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="font-bold text-xl text-gray-900 dark:text-white">Automated Sync</div>
                            <div className="text-gray-500">Real-time payroll updates</div>
                        </div>
                    </CardContent>
                  </Card>
                   <Card className="shadow-2xl border border-gray-100/50 dark:border-white/10 backdrop-blur-sm bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-900 transition-colors">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-pink-600 shrink-0">
                             <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-bold text-lg text-gray-900 dark:text-white">Full Support</div>
                            <div className="text-gray-500">Dedicated account manager</div>
                        </div>
                    </CardContent>
                  </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-white dark:bg-zinc-950">
         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-gray-50 to-transparent dark:from-zinc-900 dark:to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your Workplace?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of companies offering financial wellness to their
            employees. It's time to build a more resilient workforce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnquiryButton
              type="demo"
              size="lg"
              className="bg-[#1d44c3] hover:bg-[#0d2463] h-14 px-10 rounded-full text-lg shadow-xl"
            >
              Get Started Now
            </EnquiryButton>
            <EnquiryButton
              type="demo"
              size="lg"
              variant="outline"
              className="h-14 px-10 rounded-full text-lg border-2 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white"
              modalTitle="Watch Demo"
              modalDescription="Schedule a demo to see FinWage in action and learn how it can benefit your organization."
            >
              Watch Demo
            </EnquiryButton>
          </div>
        </div>
      </section>
    </main>
  );
}
