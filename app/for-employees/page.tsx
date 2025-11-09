import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { EnquiryButton } from "@/components/shared/enquiry-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getEmployeeBenefits } from "@/lib/services/benefits";
import { getFAQs } from "@/lib/services/faqs";
import { getTestimonials } from "@/lib/services/testimonials";
import { renderIcon } from "@/lib/utils/icon-mapper";
import { getImageUrl } from "@/lib/utils/pocketbase";
import { SvgIcon } from "@/lib/utils/svg-icon-renderer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Employees - FinWage",
  description:
    "Get instant access to your earned wages with FinWage. Zero fees, no interest, completely free financial wellness tool.",
  keywords: [
    "employee benefits",
    "wage access",
    "instant pay",
    "financial wellness",
    "earned wage access",
  ],
  openGraph: {
    title: "For Employees - FinWage",
    description:
      "Get instant access to your earned wages. Zero fees, no interest.",
    type: "website",
  },
};

// Revalidate for-employees page every month (2,678,400 seconds)
// This enables Incremental Static Regeneration (ISR)
export const revalidate = 2678400;

export default async function ForEmployeesPage() {
  // Fetch data from PocketBase using Promise.all for parallel requests
  const [benefits, testimonialsResult, faqs] = await Promise.all([
    getEmployeeBenefits({ perPage: 20 }),
    getTestimonials({ perPage: 10 }),
    getFAQs({ perPage: 50, category: "employee" }),
  ]);

  const testimonials = testimonialsResult.items;

  console.log("For Employees Page - FAQs fetched:", faqs);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#1d44c3] to-[#0d2463] text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Your Money, Your Control
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Access your earned wages instantly. No fees, no interest, no
                waiting. Just financial freedom when you need it most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <EnquiryButton
                  type="contact"
                  size="lg"
                  className="bg-white text-[#1d44c3] hover:bg-gray-100"
                  icon={<ArrowRight className="w-5 h-5 ml-2" />}
                >
                  Get Started
                </EnquiryButton>
                <Button
                  size="lg"
                  variant="ghost"
                  className="border-2 border-white text-white hover:bg-white/10"
                >
                  Watch How It Works
                </Button>
              </div>
            </div>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Earned This Week</span>
                    <span className="text-3xl font-bold text-white">
                      $485.00
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Available Now</span>
                    <span className="text-3xl font-bold text-green-400">
                      $242.50
                    </span>
                  </div>
                  <Button className="w-full bg-white text-[#1d44c3] hover:bg-gray-100">
                    Access My Wages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Use FinWage */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Thousands Choose FinWage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Break free from the payday cycle and take control of your
              financial future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.length > 0 ? (
              benefits.map((benefit) => (
                <Card
                  key={benefit.id}
                  className="bg-linear-to-br from-blue-50 to-purple-50 border-0 hover:shadow-xl transition-all"
                >
                  <CardContent className="p-8">
                    <div className="text-[#1d44c3] mb-4">
                      <SvgIcon
                        svgString={benefit.icon_svg}
                        className="w-8 h-8"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">
                  No benefits available at this time.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Real Stories from Real People
            </h2>
            <p className="text-xl text-gray-600">
              See how FinWage has transformed lives across the country
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="shadow-lg hover:shadow-xl transition-all"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={getImageUrl(
                            testimonial,
                            testimonial.image || "",
                            {
                              fallback: "/assets/person-1.png",
                            },
                          )}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.position || "Employee"}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <span
                          key={`${testimonial.id}-star-${i}`}
                          className="text-yellow-400 text-xl"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">
                  No testimonials available at this time.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about FinWage
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.length > 0 ? (
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.id} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-bold text-gray-900 hover:text-[#1d44c3]">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No FAQs available at this time.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button
              variant="link"
              className="text-[#1d44c3] font-semibold text-base hover:underline"
            >
              Contact Our Support Team →
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-linear-to-br from-[#1d44c3] to-[#0d2463] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of employees who have found financial freedom with
            FinWage
          </p>
          <EnquiryButton
            type="contact"
            size="lg"
            className="bg-white text-[#1d44c3] hover:bg-gray-100"
            icon={<ArrowRight className="w-5 h-5 ml-2" />}
            modalTitle="Get Started with FinWage"
            modalDescription="Sign up for FinWage and start accessing your earned wages today."
          >
            Get Started Today
          </EnquiryButton>
        </div>
      </section>
    </main>
  );
}
