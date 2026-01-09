import { Heart, Shield, TrendingUp } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getCompanyValues,
  getLeadershipTeam,
  getMilestones,
} from "@/lib/services/company";
import { getImageUrl } from "@/lib/utils/pocketbase";
import { SvgIcon } from "@/lib/utils/svg-icon-renderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - FinWage",
  description:
    "Learn about FinWage's mission to transform financial wellness for millions of workers. Meet our leadership team and discover our journey.",
  keywords: [
    "about FinWage",
    "company mission",
    "financial wellness",
    "earned wage access",
    "leadership team",
  ],
  openGraph: {
    title: "About Us - FinWage",
    description:
      "Learn about FinWage's mission to transform financial wellness for millions of workers.",
    type: "website",
  },
};

export default async function AboutPage() {
  // Fetch data from PocketBase in parallel
  const [leadershipData, valuesData, milestonesData] = await Promise.all([
    getLeadershipTeam({ perPage: 100 }),
    getCompanyValues({ perPage: 100 }),
    getMilestones({ perPage: 100 }),
  ]);

  const leadership = leadershipData.items;
  const values = valuesData.items;
  console.log(values);
  const milestones = milestonesData.items;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden bg-linear-to-br from-[#1d44c3] via-[#2a4db8] to-[#f74b6b]">
        {/* Background elements for 'modern' feel */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
              Transforming Payday for the <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-pink-200">Modern Workforce</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed font-light">
              FinWage is a Canadian Earned Wage Access (EWA) platform that gives 
              employees instant access to their pay helping reduce financial stress 
              while supporting a more focused and productive workforce.
            </p>
        </div>
      </section>

      {/* Purpose & Story - Modern Layout */}
      <section className="py-20 md:py-28 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1 relative">
                <div className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-700">
                  <Image
                    src="/assets/office-meeting.png"
                    alt="FinWage Team"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-10 -right-10 bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-xl max-w-xs hidden md:block border border-gray-100 dark:border-zinc-700">
                    <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">"Financial Freedom"</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Giving power back to the people who earn it.</p>
                </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full font-semibold text-sm mb-6">Our Purpose</div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                Empowering Financial <span className="text-blue-600">Wellbeing</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-medium">
                FinWage isn't about borrowing money. It's about accessing what you've already earned.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Our purpose is to improve financial wellbeing in the workplace by giving employees timely access to pay while helping employers build stronger, more resilient teams. We believe in a future where financial stress is a thing of the past.
              </p>
            </div>
          </div>

          {/* Values - 4 in a row */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-600 to-pink-500 mx-auto rounded-full"></div>
          </div>
          <div
            className={
              values.length < 4
                ? "flex justify-center items-center gap-6 mb-20 flex-wrap"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            }
          >
            {values.map((value, index) => (
              <Card
                key={value.id}
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-zinc-800 overflow-hidden relative min-w-[260px] max-w-xs flex-1"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${index % 2 === 0 ? 'from-[#1d44c3] to-blue-400' : 'from-[#f74b6b] to-pink-400'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <div className={`mb-6 p-4 rounded-full ${index % 2 === 0 ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400'} group-hover:scale-110 transition-transform duration-300`}>
                    <SvgIcon svgString={value.icon_svg} className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team - 5 in a row */}
      <section className="py-20 md:py-28 bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Experienced leaders dedicated to transforming financial wellness. Our team brings together expertise from finance, technology, and HR sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {leadership.map((leader) => (
              <Card
                key={leader.id}
                className="group relative overflow-hidden h-[450px] border-none shadow-md hover:shadow-2xl rounded-2xl transition-all duration-300 bg-white"
              >
                <Image
                  src={getImageUrl(leader, leader.image, {
                    fallback: "/assets/person-1.png",
                  })}
                  alt={leader.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10 flex flex-col justify-end">
                  <h3 className="text-xl font-bold mb-1">
                    {leader.name}
                  </h3>
                  
                  {/* Fixed height container for Role to ensure Name alignment */}
                  <div className="min-h-[40px] flex items-start">
                     <div className="text-[#f74b6b] text-sm font-bold uppercase tracking-wider">
                       {leader.role}
                     </div>
                  </div>

                  {/* Bio Reveal with Max-Height Transition */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                     <div className="overflow-hidden">
                        <p className="text-gray-100 text-sm bg-black/40 p-3 rounded-lg backdrop-blur-md leading-relaxed border border-white/10 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {leader.bio}
                        </p>
                     </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Journey */}
      <section className="py-20 md:py-32 bg-white dark:bg-zinc-900 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Journey
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-pink-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-xl text-[#5B7BA3]">
              Growing rapidly while staying true to our mission
            </p>
          </div>

          {/* Journey Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Card 1: Built for real moments */}
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-700 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#f74b6b]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Built for Real Moments</h3>
              </div>
              <p className="text-[#5B7BA3] leading-relaxed">
                Every feature we develop comes from understanding real financial challenges that people face every day.
              </p>
            </div>

            {/* Card 2: Driven by purpose */}
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-700 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#1d44c3]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Driven by Purpose</h3>
              </div>
              <p className="text-[#5B7BA3] leading-relaxed">
                Our mission is clear: reduce financial stress and empower people to take control of their earnings.
              </p>
            </div>

            {/* Card 3: From a simple idea to meaningful impact */}
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-700 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">From Idea to Impact</h3>
              </div>
              <p className="text-[#5B7BA3] leading-relaxed">
                What started as a simple idea has grown into a platform making meaningful impact in people's financial lives.
              </p>
            </div>

            {/* Card 4: Our journey is powered by people */}
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-700 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Powered by People</h3>
              </div>
              <p className="text-[#5B7BA3] leading-relaxed">
                Every step of our journey is powered by the employees, employers, and partners who believe in financial wellness.
              </p>
            </div>
          </div>

          {/* Additional Supportive Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src="/assets/office-meeting-2.png"
                alt="Team collaboration and work moments"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-lg">Work-Life Balance</p>
                <p className="text-sm text-white/80">Supporting employees in their daily journey</p>
              </div>
            </div>
            <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src="/assets/laptop-office.png"
                alt="People using FinWage platform"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-lg">Real Moments</p>
                <p className="text-sm text-white/80">Making financial access simple and instant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Compliance - Modern Glassmorphism */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a1930]">
             <div className="absolute inset-0 bg-linear-to-br from-[#1d44c3]/90 to-[#0d2463]/90"></div>
             {/* Decorative circles */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full filter blur-[100px] pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/20 rounded-full filter blur-[100px] pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur text-white rounded-full font-semibold text-sm mb-6 border border-white/20">Future Vision</div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                Building a Future of Financial <span className="text-[#f74b6b]">Stability</span>
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed mb-8 font-light">
                We envision a future where earned wage access supports financial stability, productivity, and dignity for workers across industries. Just as streaming revolutionized entertainment, we are revolutionizing the paycheck.
              </p>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                     <div className="bg-[#f74b6b] p-3 rounded-lg"><TrendingUp className="text-white w-6 h-6" /></div>
                     <div>
                         <h4 className="text-white font-bold text-lg">Growth Oriented</h4>
                         <p className="text-blue-200 text-sm">Scaling sustainable financial solutions globally.</p>
                     </div>
                </div>
                 <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                     <div className="bg-[#1d44c3] p-3 rounded-lg"><Heart className="text-white w-6 h-6" /></div>
                     <div>
                         <h4 className="text-white font-bold text-lg">People First</h4>
                         <p className="text-blue-200 text-sm">Creating technology that serves human needs.</p>
                     </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-2xl">
              <h3 className="text-3xl font-bold mb-8 text-white"><span className="text-[#f74b6b]">Trust</span>, Compliance & Responsibility</h3>
              <p className="text-blue-100 mb-10 text-lg leading-relaxed border-b border-white/10 pb-8">
                FinWage is built with compliance, transparency, and responsible financial access at its core ensuring protection for both employees and employers.
              </p>
              <div className="space-y-6">
                {[
                    { title: "AML & KYC Compliant", desc: "Full Anti-Money Laundering and Know Your Customer protocols", icon: Shield },
                    { title: "Data Privacy & Protection", desc: "Bank-level encryption and data privacy standards", icon: Shield },
                    { title: "Regulatory Governance", desc: "Adherence to applicable regulations in Canada", icon: Shield },
                    { title: "Secure System Design", desc: "Enterprise-grade security across all platforms", icon: Shield },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500/40 transition-colors">
                         <item.icon className="w-6 h-6 shrink-0 text-blue-300" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg mb-1 group-hover:text-blue-300 transition-colors">{item.title}</div>
                        <div className="text-blue-200 text-sm">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal & Strong */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Join Us on Our Mission
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Whether you're an employer looking to modernize your benefits or an employee seeking financial freedom.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-[#1d44c3] hover:bg-[#0d2463] text-white shadow-lg hover:shadow-blue-900/30 transition-all duration-300 w-full sm:w-auto">
              For Employers
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg rounded-full border-2 border-[#1d44c3] text-[#1d44c3] hover:bg-blue-50 dark:hover:bg-blue-900/20 w-full sm:w-auto"
            >
              For Employees
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
