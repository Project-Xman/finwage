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

export const metadata = {
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

  // Icon mapping for values (fallback to default icons)
  const getValueIcon = (icon?: string) => {
    switch (icon?.toLowerCase()) {
      case "heart":
        return <Heart className="w-8 h-8" />;
      case "shield":
        return <Shield className="w-8 h-8" />;
      case "trending-up":
      case "trendingup":
        return <TrendingUp className="w-8 h-8" />;
      default:
        return <Heart className="w-8 h-8" />;
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transforming Payday for Everyone
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              We believe no one should have to wait two weeks to access money
              they've already earned.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                FinWage was born from a simple observation: millions of
                hardworking people live paycheck to paycheck, not because they
                don't earn enough, but because traditional pay cycles don't
                match real life.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                We're on a mission to eliminate financial stress for workers by
                giving them instant access to their earned wages, while
                providing employers with a powerful retention and recruiting
                tool.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                Every day, we help thousands of families avoid overdraft fees,
                payday loans, and the anxiety of unexpected expenses. That's
                what drives us.
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
            {values.map((value) => (
              <Card
                key={value.id}
                className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 text-center"
              >
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1d44c3] rounded-full text-white mb-6">
                    {getValueIcon(value.icon)}
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
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
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
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative h-64">
                  <Image
                    src={getImageUrl(leader, leader.image, {
                      fallback: "/assets/person-1.png",
                    })}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {leader.name}
                  </h3>
                  <div className="text-[#1d44c3] font-semibold mb-3">
                    {leader.role}
                  </div>
                  <p className="text-gray-600 text-sm">{leader.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
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
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#1d44c3] to-[#0d2463] rounded-full flex items-center justify-center text-white font-bold">
                        {milestone.year}
                      </div>
                    </div>
                    <Card className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 border-0">
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
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Our Vision for the Future
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed mb-6">
                We're building a world where financial stress doesn't exist for
                working people. Where every employee has instant access to their
                earned wages and the tools to build long-term financial
                wellness.
              </p>
              <p className="text-xl text-blue-100 leading-relaxed">
                In the next five years, we aim to serve 10 million workers
                across North America, partnering with businesses of all sizes to
                make financial freedom the standard, not the exception.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Compliance & Security</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">AML Compliant</div>
                    <div className="text-blue-100 text-sm">
                      Full Anti-Money Laundering protocols in place
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">
                      GDPR & Data Protection
                    </div>
                    <div className="text-blue-100 text-sm">
                      Bank-level encryption and data privacy standards
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">SOC 2 Certified</div>
                    <div className="text-blue-100 text-sm">
                      Independently audited security controls
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold mb-1">State Licensed</div>
                    <div className="text-blue-100 text-sm">
                      Licensed in all 50 states for wage access services
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
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
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
