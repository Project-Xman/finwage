import { Check, Layers, Zap } from "lucide-react";

export default function Implementation() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1d44c3] text-xs font-bold tracking-wider uppercase">
                <Layers className="w-3 h-3" />
                Seamless Integration
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d44c3] leading-[1.1] tracking-tight">
                Simple to launch.
                <span className="block text-gray-400">Easy to integrate.</span>
              </h2>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                FinWage connects with <span className="text-[#f74b6b] font-semibold">your existing payroll or workforce systems</span> with minimal setup. Our onboarding and support teams ensure a 
                smooth rollout and responsible employee adoption.
              </p>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-blue-50/50 hover:border-blue-100">
                <div className="p-2.5 bg-white rounded-xl shadow-sm shrink-0 text-[#f64162]">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1d44c3] mb-1 text-lg">Modern Solution</h3>
                  <p className="text-gray-600 leading-relaxed">
                    A modern earned wage access solution without changing payroll 
                    schedules or cash flow.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative lg:pl-10">
               {/* Abstract visual representation of integration */}
               <div className="relative z-10 bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 p-8 md:p-10">
                  <div className="space-y-8">
                    <div className="flex items-center justify-between pb-8 border-b border-gray-100">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-14 h-14 rounded-2xl bg-[#1d44c3] flex items-center justify-center shadow-lg shadow-blue-900/20">
                                <span className="font-bold text-white text-xl">FW</span>
                            </div>
                            <div className="font-bold text-gray-900 text-sm">FinWage</div>
                        </div>
                        
                        <div className="flex-1 px-4 flex flex-col items-center gap-2">
                            {/* Animated connection line with ping effect */}
                            <div className="w-full h-[3px] bg-gray-200 relative rounded-full overflow-hidden">
                                {/* Base green line */}
                                <div className="absolute inset-0 bg-green-400/30" />
                                {/* Animated ping pulse traveling across the line */}
                                <div 
                                    className="absolute top-0 h-full w-8 bg-linear-to-r from-transparent via-green-500 to-transparent animate-[ping-line_2s_ease-in-out_infinite]"
                                    style={{
                                        boxShadow: '0 0 10px 2px rgba(34, 197, 94, 0.6)',
                                    }}
                                />
                                {/* Secondary ping for continuous effect */}
                                <div 
                                    className="absolute top-0 h-full w-6 bg-linear-to-r from-transparent via-green-400 to-transparent animate-[ping-line_2s_ease-in-out_infinite_1s]"
                                    style={{
                                        boxShadow: '0 0 8px 1px rgba(34, 197, 94, 0.4)',
                                    }}
                                />
                            </div>
                            {/* Connected status badge */}
                            <div className="px-3 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-600 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2">
                                <div className="relative">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping" />
                                </div>
                                Connected
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center border border-gray-200">
                                <Layers className="w-7 h-7 text-gray-500" />
                            </div>
                            <div className="font-bold text-sm px-3 py-1 rounded-lg bg-[#f74b6b] text-white">Your System</div>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            "Secure API Connection Established",
                            "Employee Data Synced",
                            "Payroll Schedule Mapped",
                            "Real-time Access Enabled"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                    <Check className="w-3.5 h-3.5 text-green-600" />
                                </div>
                                {item}
                            </div>
                        ))}
                    </div>
                  </div>
               </div>
               
               {/* Decorative elements */}
               <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#f64162]/5 rounded-full blur-3xl -z-10" />
               <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#1d44c3]/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
