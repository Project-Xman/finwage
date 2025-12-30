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
import { Metadata } from "next";

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
  const milestones = milestonesData.items;

  console.log("Leadership Data:", leadership);
  console.log("Values Data:", values);
  console.log("Milestones Data:", milestones);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#1d44c3] via-[#2a4db8] to-[#f74b6b] text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transforming Payday for the Modern Workforce
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              FinWage is a Canadian Earned Wage Access (EWA) platform that gives 
              employees instant access to their pay—helping reduce financial stress 
              while supporting a more focused and productive workforce.
            </p>
          </div>
        </div>
      </section>

      {/* Purpose & Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Purpose
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6 font-semibold">
                FinWage isn't about borrowing money. It's about accessing what you've already earned.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Our purpose is to improve financial wellbeing in the workplace by giving employees timely access to pay while helping employers build stronger, more resilient teams.
              </p>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/office-meeting.png"
                alt="FinWage Team"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {values.map((value, index) => (
              <Card
                key={value.id}
                className="bg-linear-to-br from-blue-50 to-pink-50 border-0 text-center"
              >
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${index % 2 === 0 ? 'bg-[#1d44c3]' : 'bg-[#f74b6b]'} rounded-full text-white mb-6`}>
                    <SvgIcon svgString={value.icon_svg} className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-600">
              Experienced leaders dedicated to transforming financial wellness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader) => (
              <Card
                key={leader.id}
                className="group relative overflow-hidden h-[400px] border-0 shadow-lg rounded-xl"
              >
                <Image
                  src={getImageUrl(leader, leader.image, {
                    fallback: "/assets/person-1.png",
                  })}
                  alt={leader.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 text-left">
                  <h3 className="text-2xl font-bold text-white mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {leader.name}
                  </h3>
                  <div className="text-[#f74b6b] font-semibold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {leader.role}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                    {leader.bio}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Growing rapidly while staying true to our mission
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.length > 0 ? (
              <div className="space-y-8">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex gap-6 items-center">
                    <div className="shrink-0">
                      <div className="w-20 h-20 bg-linear-to-br from-[#1d44c3] to-[#f74b6b] rounded-full flex items-center justify-center text-white font-bold">
                        {milestone.year}
                      </div>
                    </div>
                    <Card className="flex-1 bg-linear-to-br from-blue-50 to-pink-50 border-0">
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {milestone.event}
                        </h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No milestones available at this time.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Vision & Compliance */}
      <section className="py-16 md:py-24 bg-linear-to-br from-[#1d44c3] to-[#0d2463] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Our Vision
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed mb-6">
                We envision a future where earned wage access supports financial stability, productivity, and dignity for workers across industries.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Trust, Compliance & Responsibility</h3>
              <p className="text-blue-100 text-sm mb-6">
                FinWage is built with compliance, transparency, and responsible financial access at its core—ensuring protection for both employees and employers.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">AML & KYC Compliant</div>
                    <div className="text-blue-100 text-sm">
                      Full Anti-Money Laundering and Know Your Customer protocols
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">
                      Data Privacy & Protection
                    </div>
                    <div className="text-blue-100 text-sm">
                      Bank-level encryption and data privacy standards
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Regulatory Governance</div>
                    <div className="text-blue-100 text-sm">
                      Adherence to applicable regulations in Canada
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Secure System Design</div>
                    <div className="text-blue-100 text-sm">
                      Enterprise-grade security across all platforms
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Us on Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're an employer or employee, become part of the financial
            wellness revolution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#1d44c3] hover:bg-[#0d2463]">
              For Employers
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="border-2 border-[#1d44c3] text-[#1d44c3]"
            >
              For Employees
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
