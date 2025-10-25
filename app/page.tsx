import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Cta from "@/components/sections/cta";
import Blogs from "@/components/sections/blog";
import Implementation from "@/components/sections/implementation";
import Globe from "@/components/sections/globe";
import StandOut from "@/components/sections/standout";
import Footer from "@/components/sections/footer";
import Features from "@/components/sections/features";
import Integrations from "@/components/sections/integrations";
import Pricing from "@/components/sections/pricing";
import Testimonials from "@/components/sections/testimonials";
import Employees from "@/components/sections/employees";
import Partners from "@/components/sections/partners";
import PlatformSection from "@/components/sections/platform";
import You from "@/components/sections/you";
import CycleSection from "@/components/sections/cycle";

export const metadata = {
  title: "FinWage - Earned Wage Access for Financial Wellness",
  description: "Work Today, Get Paid Today! FinWage provides earned wage access to help employees access their wages instantly while saving employers time and money.",
  keywords: ["earned wage access", "financial wellness", "payroll", "employee benefits", "instant pay", "wage advance", "fintech"],
  openGraph: {
    title: "FinWage - Earned Wage Access for Financial Wellness",
    description: "Work Today, Get Paid Today! Access your earned wages instantly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinWage - Earned Wage Access for Financial Wellness",
    description: "Work Today, Get Paid Today! Access your earned wages instantly.",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PlatformSection />
      <You />
      <CycleSection />
      <Partners />
      <Employees />
      <StandOut />
      <Integrations />
      <Pricing />
      <Testimonials />
      <Features />
      <Globe />
      <Implementation />
      <Blogs />
      <Cta />
    </main>
  );
}
