import { ArrowRight, Home, Search } from "lucide-react";
import NextLink from "next/link";

export default function NotFound() {
  const popularPages = [
    { name: "How It Works", href: "/how-it-works" },
    { name: "For Employers", href: "/for-employers" },
    { name: "For Employees", href: "/for-employees" },
    { name: "Pricing", href: "/pricing" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-[#1d44c3] leading-none opacity-20">
            404
          </h1>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Search className="w-10 h-10 text-[#1d44c3]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <NextLink
              href="/"
              className="bg-[#1d44c3] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0d2463] transition-all inline-flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </NextLink>
            <NextLink
              href="/contact"
              className="bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all inline-flex items-center justify-center gap-2"
            >
              Contact Support
              <ArrowRight className="w-5 h-5" />
            </NextLink>
          </div>
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popular Pages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {popularPages.map((page) => (
                <NextLink
                  key={page.href}
                  href={page.href}
                  className="text-[#1d44c3] hover:text-[#0d2463] hover:underline font-semibold transition-colors"
                >
                  {page.name}
                </NextLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
