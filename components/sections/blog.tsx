import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Placeholder images
const imgFinWageChosenAsWorkdaysTrustedPartnerForOnDemandPayInnovation = "https://placehold.co/600x400";
const imgCorporateWorkersBrainstormingTogether1 = "https://placehold.co/128x80";
const imgCoupleDeskHoldingSmartphoneCreditCard2 = "https://placehold.co/128x80";
const imgHealthyLifestyleSustainedHome1 = "https://placehold.co/128x80";
const imgCloseUpCompanyTeamWorking1 = "https://placehold.co/128x80";

const blogPosts = [
  {
    type: "REPORT",
    title: "FinWage Tops List as #1 Adopted Financial Wellness Benefit",
    image: imgCorporateWorkersBrainstormingTogether1,
  },
  {
    type: "BLOG",
    title: "How Improved Financial Wellness Can Help Employers",
    image: imgCoupleDeskHoldingSmartphoneCreditCard2,
  },
  {
    type: "BLOG",
    title: "Empower Your Workforce With Real-Time Digital Access Through FinWage Tips",
    image: imgHealthyLifestyleSustainedHome1,
  },
  {
    type: "BLOG",
    title: "The Hidden Benefits of On-Demand Pay for Employers",
    image: imgCloseUpCompanyTeamWorking1,
  },
  {
    type: "BLOG",
    title: "The Hidden Benefits of On-Demand Pay for Employers",
    image: imgHealthyLifestyleSustainedHome1,
  },
];

function BlogCard({ type, title, image }: { type: string; title: string; image: string }) {
  return (
    <div className="rounded-lg hover:shadow-md transition-shadow">
      <div className="flex gap-3 h-[104px] items-center">
        <div className="flex-shrink-0 w-32 h-20 rounded-md overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={128}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-xs font-bold text-gray-600 tracking-wider uppercase">
            {type}
          </span>
          <h3 className="text-base font-bold text-[#1d44c3] leading-5 line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

function FeaturedPost() {
  return (
    <div className="space-y-6">
      <Link
        href="#"
        className="text-[#f64162] font-bold inline-flex items-center gap-2 hover:gap-3 transition-all"
      >
        Explore all resources
        <ArrowRight className="w-4 h-4" />
      </Link>

      <div className="space-y-6">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <Image
            src={imgFinWageChosenAsWorkdaysTrustedPartnerForOnDemandPayInnovation}
            alt="FinWage Chosen as Workday's Trusted Partner for On-Demand Pay Innovation"
            width={600}
            height={400}
            className="w-full h-auto"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-[#1d44c3] leading-8">
            FinWage Chosen as Workday's Trusted Partner for On-Demand Pay Innovation
          </h3>
          <p className="text-gray-800 leading-6">
            Together, the companies are delivering a more integrated experience for joint
            customers—empowering employees to access their earned wages whenever
            they need them most.
          </p>
          <a
            href="#"
            className="text-[#f64162] font-bold inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            Learn more
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function LatestPosts() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1d44c3]">Latest</h2>
      </div>

      <div className="space-y-6">
        {blogPosts.map((post, index) => (
          <BlogCard
            key={index}
            type={post.type}
            title={post.title}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
}

export default function Blogs() {
  return (
    <section className="bg-[#f7f9ff] py-12 md:py-24 px-4 md:px-8 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-14 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1d44c3] leading-tight">
            Actionable Insights, Anytime, Anywhere.
          </h1>
          <p className="text-gray-800 leading-6 max-w-2xl">
            Discover the latest insights, initiatives, and innovations from FinWage as we
            shape the future of on-demand pay and modern payroll solutions.
          </p>
        </div>

        {/* Grid Layout - 1 column on mobile, 2 columns on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <FeaturedPost />
          <LatestPosts />
        </div>
      </div>
    </section>
  );
}
