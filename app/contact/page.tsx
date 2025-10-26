import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { getContactOptions } from "@/lib/services/contact";
import { EnquiriesInterestOptions } from "@/types/pocketbase";
import { FAQSection } from "@/components/sections/faq";
import { SupportResourcesSection } from "@/components/sections/support-resources";
import { Skeleton } from "@/components/ui/skeleton";
import NextLink from "next/link";

export const metadata = {
  title: "Contact Us - FinWage",
  description: "Get in touch with FinWage. Schedule a demo, request support, or send us your questions. We're here to help.",
  keywords: ["contact", "support", "demo", "customer service", "finwage contact"],
  openGraph: {
    title: "Contact Us - FinWage",
    description: "Get in touch with FinWage. Schedule a demo or request support.",
    type: "website",
  },
};

export default async function ContactPage() {
  // Fetch contact options from PocketBase
  const contactOptions = await getContactOptions();
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Whether you're an employer looking to offer FinWage or an employee
              needing support, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      {contactOptions.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactOptions.slice(0, 3).map((option, index) => {
                // Determine icon based on type or use default
                const IconComponent = 
                  option.type === 'email' ? Mail :
                  option.type === 'phone' ? Phone :
                  MessageSquare;
                
                // Determine color based on index
                const colors = [
                  { bg: 'bg-[#1d44c3]', hover: 'hover:bg-[#0d2463]' },
                  { bg: 'bg-green-500', hover: 'hover:bg-green-600' },
                  { bg: 'bg-purple-500', hover: 'hover:bg-purple-600' },
                ];
                const color = colors[index] || colors[0];

                return (
                  <Card key={option.id} className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
                    <CardHeader className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 ${color.bg} rounded-full text-white mb-6 mx-auto`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <CardTitle>{option.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="mb-6">
                        {option.description}
                      </CardDescription>
                      {option.action_url && (
                        <Button 
                          className={`${color.bg} ${color.hover} w-full`}
                          asChild
                        >
                          <NextLink href={option.action_url}>
                            {option.title}
                          </NextLink>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Demo Request Form */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Request a Demo
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                See FinWage in action and learn how we can help your organization. Our team will walk you through the platform and answer all your questions.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#1d44c3]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      30-Minute Session
                    </h3>
                    <p className="text-gray-600">
                      Quick overview of features and benefits
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-[#1d44c3]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      Personalized
                    </h3>
                    <p className="text-gray-600">
                      Tailored to your company's specific needs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-[#1d44c3]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      Next Steps
                    </h3>
                    <p className="text-gray-600">
                      Clear path to implementation and onboarding
                    </p>
                  </div>
                </div>
              </div>

              <Card className="mt-8 bg-blue-50 border-0">
                <CardHeader>
                  <CardTitle>Quick Questions?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">Call us directly at:</p>
                  <NextLink
                    href="tel:1-800-FINWAGE"
                    className="text-2xl font-bold text-[#1d44c3] hover:underline"
                  >
                    1-800-FINWAGE
                  </NextLink>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm defaultInterest={EnquiriesInterestOptions.demo} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Resources - Dynamic from PocketBase */}
      <Suspense fallback={<SupportResourcesSkeleton />}>
        <SupportResourcesSection 
          title="Employee Support Resources"
          description="Quick access to help and information"
          grouped={true}
        />
      </Suspense>

      {/* FAQ Section - Dynamic from PocketBase */}
      <Suspense fallback={<FAQSkeleton />}>
        <FAQSection 
          title="Frequently Asked Questions"
          description="Find answers to common questions about FinWage"
          showFeaturedOnly={true}
          limit={8}
        />
      </Suspense>

      {/* Office Info */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">
                  San Francisco HQ
                </h3>
                <p className="text-gray-600 text-sm">
                  123 Market Street
                  <br />
                  San Francisco, CA 94105
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600 text-sm">
                  Sales: sales@finwage.com
                  <br />
                  Support: support@finwage.com
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600 text-sm">
                  Sales: 1-800-FINWAGE
                  <br />
                  Support: 1-888-FINWAGE
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

// Loading skeletons
function SupportResourcesSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </section>
  );
}
