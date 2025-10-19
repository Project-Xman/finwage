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


export default function Home() {
	return (
		<main className="min-h-screen">
			<Header />
			<Hero />
			<PlatformSection />
			<You />
			<CycleSection />
			<Partners />
			<Employees />
			<Testimonials />
			<Features />
			<StandOut />
			<Integrations />
			<Pricing />
			<Globe />
			<Implementation />
			<Blogs />
			<Cta />
			<Footer />
		</main>
	);
}
