import { ArrowRight, Code, Heart, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getJobPositions, getFeaturedJobs } from "@/lib/services/careers";
import { getBenefitsGroupedByCategory } from "@/lib/services/benefits";
import { getCompanyValues } from "@/lib/services/values";
import type { JobsResponse } from "@/types/pocketbase";

export const metadata = {
  title: "Careers at FinWage",
  description: "Join FinWage and help transform financial wellness for millions of workers. Explore open positions, benefits, and our company culture.",
  keywords: ["careers", "jobs", "fintech jobs", "financial wellness", "open positions", "hiring"],
  openGraph: {
    title: "Careers at FinWage",
    description: "Join our mission to transform financial wellness for millions of workers.",
    type: "website",
  },
};

export default async function CareersPage() {
  // Fetch open job positions, featured jobs, benefits, and values in parallel
  const [jobsResult, featuredJobs, benefitsGrouped, values] = await Promise.all([
    getJobPositions({ status: 'open', perPage: 50 }),
    getFeaturedJobs(3),
    getBenefitsGroupedByCategory(),
    getCompanyValues({ perPage: 10 }),
  ]);

  const openPositions = jobsResult.items;

  // Map icon names to components
  const iconMap: Record<string, React.ReactNode> = {
    Heart: <Heart className="w-8 h-8" />,
    TrendingUp: <TrendingUp className="w-8 h-8" />,
    Zap: <Zap className="w-8 h-8" />,
    Code: <Code className="w-8 h-8" />,
  };

  // Transform benefits data for display
  const benefits = Object.entries(benefitsGrouped).map(([category, items]) => {
    // Get icon from first item in category or use default
    const iconName = items[0]?.icon || 'Heart';
    return {
      icon: iconMap[iconName] || <Heart className="w-8 h-8" />,
      title: category,
      items: items.map((item) => item.description),
    };
  });


  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Us in Transforming Financial Wellness
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Build products that make a real difference in people's lives. Help
              millions of workers achieve financial freedom.
            </p>
            <Button
              size="lg"
              className="bg-white text-[#1d44c3] hover:bg-gray-100"
            >
              View Open Positions
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why FinWage */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Work at FinWage?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than just a fintech company. We're a mission-driven
              team changing how people get paid.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value) => (
              <Card
                key={value.title}
                className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 text-center"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#1d44c3] to-[#0d2463] rounded-3xl p-8 md:p-16 text-white text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Make Real Impact Every Day
            </h3>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your work directly helps families avoid overdraft fees, escape
              payday loan debt, and build financial security. Every feature you
              ship, every bug you fix, and every customer you support changes
              lives.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      {benefits.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                World-Class Benefits
              </h2>
              <p className="text-xl text-gray-600">
                We take care of our team so they can focus on our mission
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="shadow-lg">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full text-[#1d44c3] mb-6">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {benefit.title}
                    </h3>
                    <ul className="space-y-3">
                      {benefit.items.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Open Positions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600">
              Find your next challenge at FinWage
            </p>
          </div>

          {/* Featured Jobs Section */}
          {featuredJobs.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Featured Opportunities
              </h3>
              <div className="space-y-6 max-w-4xl mx-auto">
                {featuredJobs.map((position: JobsResponse) => (
                  <Card
                    key={position.id}
                    className="bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-[#1d44c3] hover:shadow-2xl transition-all group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                              ⭐ Featured
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1d44c3] transition-colors">
                              {position.title}
                            </h3>
                            {position.department && (
                              <span className="bg-[#1d44c3] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {position.department}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{position.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            {position.location && <span>📍 {position.location}</span>}
                            {position.location && position.type && <span>•</span>}
                            {position.type && <span>💼 {position.type}</span>}
                          </div>
                        </div>
                        <Button className="flex-shrink-0 bg-[#1d44c3] hover:bg-[#0d2463]">
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Open Positions */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {openPositions.length > 0 ? (
              openPositions.map((position: JobsResponse) => (
                <Card
                  key={position.id}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 hover:shadow-xl transition-all group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1d44c3] transition-colors">
                            {position.title}
                          </h3>
                          {position.department && (
                            <span className="bg-[#1d44c3] text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {position.department}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{position.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          {position.location && <span>📍 {position.location}</span>}
                          {position.location && position.type && <span>•</span>}
                          {position.type && <span>💼 {position.type}</span>}
                        </div>
                      </div>
                      <Button className="flex-shrink-0 bg-[#1d44c3] hover:bg-[#0d2463]">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  No open positions at the moment. Check back soon!
                </p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Don't see the right role? We're always looking for talented
              people.
            </p>
            <Button variant="link" className="text-[#1d44c3] font-semibold text-base hover:underline">
              Send Us Your Resume →
            </Button>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Culture
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Remote-First & Flexible
                  </h3>
                  <p className="text-gray-600">
                    Work from anywhere in the US. Set your own hours. We trust
                    you to get the job done while living your best life.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Fast-Paced & Innovative
                  </h3>
                  <p className="text-gray-600">
                    We move quickly, test new ideas, and aren't afraid to fail.
                    If you love building and shipping, you'll love it here.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Diverse & Inclusive
                  </h3>
                  <p className="text-gray-600">
                    We're committed to building a team that reflects the
                    diversity of the employees we serve. Everyone belongs here.
                  </p>
                </div>
              </div>
            </div>
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle>By the Numbers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-4xl font-bold text-[#1d44c3] mb-2">
                      100+
                    </div>
                    <div className="text-gray-600">Team Members</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#1d44c3] mb-2">
                      15+
                    </div>
                    <div className="text-gray-600">Countries</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#1d44c3] mb-2">
                      4.8/5
                    </div>
                    <div className="text-gray-600">Glassdoor Rating</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#1d44c3] mb-2">
                      95%
                    </div>
                    <div className="text-gray-600">Employee Satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our mission to transform financial wellness for millions of
            workers
          </p>
          <Button
            size="lg"
            className="bg-white text-[#1d44c3] hover:bg-gray-100"
          >
            Explore Open Roles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </main>
  );
}
