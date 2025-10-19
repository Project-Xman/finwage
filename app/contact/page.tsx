import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";

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
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1d44c3] rounded-full text-white mb-6">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                For Employers
              </h3>
              <p className="text-gray-600 mb-6">
                Schedule a demo and see how FinWage can transform your workplace
              </p>
              <button
                type="button"
                className="bg-[#1d44c3] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0d2463] transition-all w-full"
              >
                Schedule Demo
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full text-white mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Employee Support
              </h3>
              <p className="text-gray-600 mb-6">
                Get help with your account, transactions, or general questions
              </p>
              <button
                type="button"
                className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-all w-full"
              >
                Get Support
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full text-white mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                General Inquiries
              </h3>
              <p className="text-gray-600 mb-6">
                Media, partnerships, or other questions
              </p>
              <button
                type="button"
                className="bg-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-600 transition-all w-full"
              >
                Contact Us
              </button>
            </div>
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
                See FinWage in action and learn how we can help your
                organization. Our team will walk you through the platform and
                answer all your questions.
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

              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Quick Questions?
                </h4>
                <p className="text-gray-600 mb-3">Call us directly at:</p>
                <a
                  href="tel:1-800-FINWAGE"
                  className="text-2xl font-bold text-[#1d44c3] hover:underline"
                >
                  1-800-FINWAGE
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contact-first-name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      id="contact-first-name"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d44c3] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-last-name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      id="contact-last-name"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d44c3] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Work Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d44c3] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d44c3] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Company Name *
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d44c3] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-employee-count"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Number of Employees *
                  </label>
                  <select
                    id="contact-employee-count"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d44c3] focus:border-transparent"
                  >
                    <option>1-50</option>
                    <option>51-200</option>
                    <option>201-500</option>
                    <option>501-1000</option>
                    <option>1000+</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-hear-about"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    How did you hear about us?
                  </label>
                  <select
                    id="contact-hear-about"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d44c3] focus:border-transparent"
                  >
                    <option>Search Engine</option>
                    <option>Social Media</option>
                    <option>Referral</option>
                    <option>Conference/Event</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Message (Optional)
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1d44c3] focus:border-transparent"
                    placeholder="Tell us about your needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1d44c3] text-white py-4 rounded-full text-lg font-semibold hover:bg-[#0d2463] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Request Demo
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to our Privacy Policy
                </p>
              </form>
            </div>
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
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all">
              <h3 className="font-bold text-gray-900 mb-2">Help Center</h3>
              <p className="text-sm text-gray-600 mb-4">
                Search our knowledge base
              </p>
              <button
                type="button"
                className="text-[#1d44c3] font-semibold hover:underline"
              >
                Visit Help Center →
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all">
              <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">
                Chat with support team
              </p>
              <button
                type="button"
                className="text-[#1d44c3] font-semibold hover:underline"
              >
                Start Chat →
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all">
              <h3 className="font-bold text-gray-900 mb-2">FAQ</h3>
              <p className="text-sm text-gray-600 mb-4">
                Common questions answered
              </p>
              <button
                type="button"
                className="text-[#1d44c3] font-semibold hover:underline"
              >
                View FAQs →
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all">
              <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-4">Send us a message</p>
              <button
                type="button"
                className="text-[#1d44c3] font-semibold hover:underline"
              >
                support@finwage.com →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Office Info */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center">
              <MapPin className="w-8 h-8 text-[#1d44c3] mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">San Francisco HQ</h3>
              <p className="text-gray-600 text-sm">
                123 Market Street
                <br />
                San Francisco, CA 94105
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center">
              <Mail className="w-8 h-8 text-[#1d44c3] mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm">
                Sales: sales@finwage.com
                <br />
                Support: support@finwage.com
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center">
              <Phone className="w-8 h-8 text-[#1d44c3] mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600 text-sm">
                Sales: 1-800-FINWAGE
                <br />
                Support: 1-888-FINWAGE
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
