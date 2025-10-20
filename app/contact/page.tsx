import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function ContactPage() {
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
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1d44c3] rounded-full text-white mb-6 mx-auto">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <CardTitle>For Employers</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-6">
                  Schedule a demo and see how FinWage can transform your workplace
                </CardDescription>
                <Button className="bg-[#1d44c3] hover:bg-[#0d2463] w-full">
                  Schedule Demo
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full text-white mb-6 mx-auto">
                  <Phone className="w-8 h-8" />
                </div>
                <CardTitle>Employee Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-6">
                  Get help with your account, transactions, or general questions
                </CardDescription>
                <Button className="bg-green-500 hover:bg-green-600 w-full">
                  Get Support
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full text-white mb-6 mx-auto">
                  <Mail className="w-8 h-8" />
                </div>
                <CardTitle>General Inquiries</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-6">
                  Media, partnerships, or other questions
                </CardDescription>
                <Button className="bg-purple-500 hover:bg-purple-600 w-full">
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
                  <a
                    href="tel:1-800-FINWAGE"
                    className="text-2xl font-bold text-[#1d44c3] hover:underline"
                  >
                    1-800-FINWAGE
                  </a>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle>Demo Request Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact-first-name">First Name *</Label>
                      <Input
                        id="contact-first-name"
                        type="text"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-last-name">Last Name *</Label>
                      <Input
                        id="contact-last-name"
                        type="text"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Work Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="john@company.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone Number *</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-company">Company Name *</Label>
                    <Input
                      id="contact-company"
                      type="text"
                      placeholder="Acme Corporation"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-employee-count">
                      Number of Employees *
                    </Label>
                    <Select>
                      <SelectTrigger id="contact-employee-count">
                        <SelectValue placeholder="Select a range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-50">1-50</SelectItem>
                        <SelectItem value="51-200">51-200</SelectItem>
                        <SelectItem value="201-500">201-500</SelectItem>
                        <SelectItem value="501-1000">501-1000</SelectItem>
                        <SelectItem value="1000+">1000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-hear-about">
                      How did you hear about us?
                    </Label>
                    <Select>
                      <SelectTrigger id="contact-hear-about">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="search">Search Engine</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="conference">
                          Conference/Event
                        </SelectItem>
                           <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message (Optional)</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us about your needs..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#1d44c3] hover:bg-[#0d2463]"
                    size="lg"
                  >
                    Request Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    By submitting this form, you agree to our Privacy Policy
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Employee Support Links */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Employee Support Resources
            </h2>
            <p className="text-xl text-gray-600">
              Quick access to help and information
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Help Center</CardTitle>
                <CardDescription>Search our knowledge base</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link">Visit Help Center →</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>Chat with support team</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link">Start Chat →</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
                <CardDescription>Common questions answered</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link">View FAQs →</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Send us a message</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link">support@finwage.com →</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
