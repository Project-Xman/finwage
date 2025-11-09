"use client";

import Image from "next/image";
import NextLink from "next/link";
import { ImagePaths } from "@/lib/assets";

export default function Footer() {
  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  const productLinks = [
    { label: "For Employers", href: "/for-employers" },
    { label: "For Employees", href: "/for-employees" },
    { label: "How It Works", href: "/how-it-works" },
  ];

  const supportLinks = [
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Compliance", href: "/compliance" },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <NextLink
              href="/"
              className="flex items-center gap-2 font-bold text-lg shrink-0"
            >
              <div className="relative w-36 h-10 md:w-44 md:h-12">
                <Image
                  src={ImagePaths.APP_ICON}
                  alt="Finwage Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </NextLink>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              FinWage is a financial technology company that provides on-demand
              pay solutions to help employees access their earned wages while
              saving employers time and money.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <NextLink
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <NextLink
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <NextLink
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 FinWage. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <NextLink
                href="/compliance"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Compliance
              </NextLink>
              <NextLink
                href="/resources"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Resources
              </NextLink>
              <NextLink
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Contact
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
