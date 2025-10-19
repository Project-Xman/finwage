import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { FileText, Bell, Share2, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const files = [
  {
    name: "payroll.pdf",
    body: "Access your payroll information and wage statements instantly through our secure platform.",
  },
  {
    name: "benefits.xlsx",
    body: "Comprehensive overview of your employee benefits and financial wellness tools available.",
  },
  {
    name: "schedule.svg",
    body: "View your work schedule and earned wages in real-time with our intuitive interface.",
  },
  {
    name: "tax-forms.pdf",
    body: "Download and manage all your tax documents securely in one convenient location.",
  },
  {
    name: "direct-deposit.txt",
    body: "Set up and manage your direct deposit preferences for instant wage access.",
  },
];

const features = [
  {
    Icon: FileText,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute top-10 w-full [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
        <div className="flex flex-col gap-2 animate-marquee">
          {files.map((f, idx) => (
            <figure
              key={idx}
              className={cn(
                "relative w-full cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                  <figcaption className="text-sm font-medium dark:text-white">
                    {f.name}
                  </figcaption>
                </div>
              </div>
              <blockquote className="mt-2 text-xs">{f.body}</blockquote>
            </figure>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: Bell,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute top-4 right-2 h-[300px] w-full border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
        <div className="flex flex-col gap-4 p-4">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-sm font-medium">Wage Available</p>
            <p className="text-xs text-gray-600">Your earned wages are ready to access</p>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-sm font-medium">Payment Processed</p>
            <p className="text-xs text-gray-600">Your transfer has been completed</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: Share2,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
        <div className="grid grid-cols-3 gap-4 p-8">
          <div className="h-12 w-12 rounded-lg bg-blue-100" />
          <div className="h-12 w-12 rounded-lg bg-purple-100" />
          <div className="h-12 w-12 rounded-lg bg-pink-100" />
          <div className="h-12 w-12 rounded-lg bg-green-100" />
          <div className="h-12 w-12 rounded-lg bg-yellow-100" />
          <div className="h-12 w-12 rounded-lg bg-red-100" />
        </div>
      </div>
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute top-10 right-0 origin-top scale-75 rounded-md border [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
      />
    ),
  },
];

export default function Features() {
  return (
    <section className="bg-white w-full py-12 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col gap-4 mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#1d44c3] leading-tight">
            Everything you need to empower your workforce
          </h2>
          <p className="text-base md:text-lg text-gray-800 leading-7 max-w-2xl">
            Discover how FinWage provides comprehensive solutions for modern payroll management.
          </p>
        </div>
        
        <BentoGrid>
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
