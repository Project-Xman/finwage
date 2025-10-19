import { ArrowRight, Zap, Shield, Heart, TrendingUp, Clock, DollarSign } from "lucide-react";
import Image from "next/image";

export default function ForEmployeesPage() {
  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Access",
      description: "Get your earned wages in minutes, not weeks. No waiting for payday when emergencies happen."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Zero Fees",
      description: "Completely free for employees. No hidden charges, no interest, no debt traps."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Stress-Free",
      description: "Say goodbye to payday loans and overdraft fees. Access your own money when you need it."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Build Savings",
      description: "Set automatic savings goals and watch your financial wellness grow over time."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Available",
      description: "Access your account anytime, anywhere. Financial freedom on your schedule."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Track Earnings",
      description: "See your earned wages in real-time. Always know exactly what you have available."
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Retail Associate",
      image: "/assets/person-1.png",
      quote: "FinWage saved me from a $35 overdraft fee when my car broke down. Having access to my earned wages gave me peace of mind.",
      rating: 5
    },
    {
      name: "James T.",
      role: "Warehouse Worker",
      image: "/assets/person-2.png",
      quote: "I used to stress about money constantly. Now I can handle unexpected expenses without going into debt. Game changer!",
      rating: 5
    },
    {
      name: "Maria L.",
      role: "Healthcare Worker",
      image: "/assets/person-3.png",
      quote: "The savings feature helped me build an emergency fund for the first time in my life. I feel so much more secure now.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Is FinWage really free?",
      answer: "Yes! FinWage is 100% free for employees. No fees, no interest, no hidden charges. Your employer covers the cost as a benefit."
    },
    {
      question: "How quickly can I access my money?",
      answer: "Once approved, funds are typically deposited to your account within minutes. Most transfers complete in under 5 minutes."
    },
    {
      question: "Is my information secure?",
      answer: "Absolutely. We use bank-level 256-bit encryption and are fully compliant with all data protection regulations. Your information is completely safe."
    },
    {
      question: "How much can I access?",
      answer: "You can access up to 50% of your earned wages at any time. The exact amount depends on how many hours you've worked since your last payday."
    },
    {
      question: "When do I repay?",
      answer: "Repayment happens automatically on your next payday. The amount you accessed is simply deducted from your regular paycheck."
    },
    {
      question: "Will this affect my credit score?",
      answer: "No. FinWage doesn't report to credit bureaus and accessing your earned wages has zero impact on your credit score."
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Your Money, Your Control
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Access your earned wages instantly. No fees, no interest, no waiting. Just financial freedom when you need it most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-[#1d44c3] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all">
                  Watch How It Works
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Earned This Week</span>
                    <span className="text-3xl font-bold">$485.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Available Now</span>
                    <span className="text-3xl font-bold text-green-400">$242.50</span>
                  </div>
                  <button className="w-full bg-white text-[#1d44c3] py-4 rounded-full font-semibold hover:bg-gray-100 transition-all">
                    Access My Wages
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use FinWage */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Thousands Choose FinWage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Break free from the payday cycle and take control of your financial future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 hover:shadow-xl transition-all">
                <div className="text-[#1d44c3] mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Real Stories from Real People
            </h2>
            <p className="text-xl text-gray-600">
              See how FinWage has transformed lives across the country
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about FinWage
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button className="text-[#1d44c3] font-semibold hover:underline">
              Contact Our Support Team →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of employees who have found financial freedom with FinWage
          </p>
          <button className="bg-white text-[#1d44c3] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg inline-flex items-center gap-2">
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </main>
  );
}
