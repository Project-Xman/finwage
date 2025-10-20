import { ArrowRight, Code, Heart, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      description:
        "Build the future of payroll technology with cutting-edge React and Node.js",
    },
    {
      title: "Product Manager - Financial Wellness",
      department: "Product",
      location: "Remote / New York",
      type: "Full-time",
      description:
        "Define the roadmap for employee financial wellness features",
    },
    {
      title: "Enterprise Account Executive",
      department: "Sales",
      location: "Remote",
      type: "Full-time",
      description:
        "Help growing companies discover the power of earned wage access",
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote / Chicago",
      type: "Full-time",
      description: "Ensure our clients get maximum value from FinWage",
    },
    {
      title: "Compliance Analyst",
      department: "Legal & Compliance",
      location: "Remote / Boston",
      type: "Full-time",
      description:
        "Navigate regulatory landscape and ensure platform compliance",
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Remote / Austin",
      type: "Full-time",
      description: "Create intuitive experiences for employees and employers",
    },
  ];

  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health & Wellness",
      items: [
        "100% covered medical, dental, vision",
        "Mental health support",
        "Fitness stipend",
        "Wellness programs",
      ],
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Financial Growth",
      items: [
        "Competitive salary",
        "Equity options",
        "401(k) matching",
        "Performance bonuses",
      ],
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Work-Life Balance",
      items: [
        "Unlimited PTO",
        "Flexible hours",
        "Remote-first culture",
        "Parental leave",
      ],
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Professional Growth",
      items: [
        "Learning budget",
        "Conference attendance",
        "Mentorship programs",
        "Career development",
      ],
    },
  ];

  const values = [
    {
      title: "Employee First",
      description:
        "Everything we do starts with how it impacts employees' financial wellness",
    },
    {
      title: "Move Fast",
      description:
        "We ship quickly, iterate constantly, and learn from every experience",
    },
    {
      title: "Own It",
      description:
        "Take ownership, make decisions, and deliver results independently",
    },
    {
      title: "Better Together",
      description: "Collaborate openly, support each other, and win as a team",
    },
  ];

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
                    {benefit.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
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

          <div className="space-y-6 max-w-4xl mx-auto">
            {openPositions.map((position) => (
              <Card
                key={position.title}
                className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 hover:shadow-xl transition-all group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1d44c3] transition-colors">
                          {position.title}
                        </h3>
                        <span className="bg-[#1d44c3] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {position.department}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{position.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>📍 {position.location}</span>
                        <span>•</span>
                        <span>💼 {position.type}</span>
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
