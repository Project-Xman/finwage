"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImagePaths } from "@/lib/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useState } from "react";

// Navigation data
const navigationItems = [
  {
    label: "Employers",
    href: "#employers",
    hasDropdown: true,
    dropdownItems: [
      { label: "For Companies", href: "#companies" },
      { label: "Payroll Solutions", href: "#payroll" },
      { label: "HR Management", href: "#hr" },
    ],
  },
  {
    label: "Solutions",
    href: "#solutions",
    hasDropdown: true,
    dropdownItems: [
      { label: "Payroll Management", href: "#payroll-management" },
      { label: "Time Tracking", href: "#time-tracking" },
      { label: "Benefits", href: "#benefits" },
    ],
  },
  {
    label: "Our Partners",
    href: "#partners",
    hasDropdown: false,
  },
  {
    label: "Resources",
    href: "#resources",
    hasDropdown: true,
    dropdownItems: [
      { label: "Blog", href: "#blog" },
      { label: "Documentation", href: "#docs" },
      { label: "API Reference", href: "#api" },
    ],
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Group: Logo + Navigation */}
          <div className="flex items-center flex-1 md:flex-initial justify-center md:justify-start">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg flex-shrink-0"
            >
              <div className="relative w-36 h-10 md:w-44 md:h-12">
                <Image
                  src={ImagePaths.APP_ICON}
                  alt="Finwage Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center ml-8 gap-8">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  {item.hasDropdown ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                        {item.label}
                        <ChevronDown className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <DropdownMenuItem key={dropdownItem.label} asChild>
                            <Link href={dropdownItem.href}>
                              {dropdownItem.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Desktop Right Group: Search + Login + Demo */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2 hover:bg-muted rounded-md transition-colors">
              <Search className="w-4 h-4 text-foreground/80 hover:text-foreground" />
            </button>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium"
              asChild
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              size="sm"
              className="bg-[#1d44c3] text-white hover:shadow-lg transition-shadow rounded-full h-10 px-6"
              asChild
            >
              <Link href="/demo">Get a Demo</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-muted rounded-md transition-colors ml-auto"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Tablet Menu Button */}
          <div className="hidden md:flex lg:hidden pt-2 space-y-2 gap-3 ml-auto">
            <Button
              variant={"ghost"}
              className="p-2 hover:bg-muted rounded-md transition-colors"
            >
              <Search className="w-4 h-4 text-foreground/80 hover:text-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium"
              asChild
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-lg transition-shadow"
              asChild
            >
              <Link href="/demo">Get a Demo</Link>
            </Button>
            <Button
              variant={"ghost"}
              onClick={toggleMenu}
              className="hidden md:flex lg:hidden p-2 hover:bg-muted rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-border/40 py-4 space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2 flex flex-col">
              <button className="w-full p-2 flex items-center justify-center gap-2 hover:bg-muted rounded-md transition-colors border border-border">
                <Search className="w-4 h-4" />
                <span className="text-sm font-medium">Search</span>
              </button>
              <Button variant="outline" size="sm" className="w-full">
                Log in
              </Button>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-primary to-blue-600 text-white"
              >
                Get a Demo
              </Button>
            </div>
          </nav>
        )}

        {/* Tablet Navigation Menu */}
        {isMenuOpen && (
          <nav className="hidden md:block lg:hidden border-t border-border/40 py-4 space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
