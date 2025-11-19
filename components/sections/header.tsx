"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar,
  NavbarButton,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { ImagePaths } from "@/lib/assets";

// Navigation data
const navigationItems = [
  {
    name: "For Employers",
    link: "/for-employers",
  },
  {
    name: "For Employees",
    link: "/for-employees",
  },
  {
    name: "How It Works",
    link: "/how-it-works",
  },
  // {
  //   name: "Pricing",
  //   link: "/pricing",
  // },
  // {
  //   name: "Resources",
  //   link: "/resources",
  // },
  {
    name: "About",
    link: "/about",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar className="top-0">
      {/* Desktop Navigation */}
      <NavBody>
        <div className="flex items-center gap-2">
          <NextLink href="/" className="relative z-20 flex items-center">
            <div className="relative w-36 h-10 md:w-44 md:h-12">
              <Image
                src={ImagePaths.APP_ICON}
                alt="Finwage Logo"
                fill
                className="object-contain"
              />
            </div>
          </NextLink>
        </div>

        <NavItems items={navigationItems} currentPath={pathname} />

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-muted rounded-md transition-colors">
            <Search className="w-4 h-4 text-foreground/80 hover:text-foreground" />
          </button>
          <NavbarButton variant="secondary" href="/login">
            Log in
          </NavbarButton>
          <NavbarButton variant="gradient" href="/contact">
            Contact Us
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NextLink href="/" className="flex items-center">
            <div className="relative w-32 h-9">
              <Image
                src={ImagePaths.APP_ICON}
                alt="Finwage Logo"
                fill
                className="object-contain"
              />
            </div>
          </NextLink>
          <MobileNavToggle
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          {navigationItems.map((item, idx) => {
            const isActive = pathname === item.link;
            return (
              <a
                key={`mobile-nav-${idx}`}
                href={item.link}
                className="relative w-full px-2 py-2 text-left text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative inline-block">
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-pink-500 origin-left animate-in zoom-in-0 slide-in-from-left-1/2 duration-300" style={{ animationFillMode: 'both' }} />
                  )}
                </span>
              </a>
            );
          })}
          <div className="flex w-full flex-col gap-2 pt-4">
            <button className="w-full p-2 flex items-center justify-center gap-2 hover:bg-muted rounded-md transition-colors border border-border">
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">Search</span>
            </button>
            <NavbarButton variant="secondary" href="/login" className="w-full">
              Log in
            </NavbarButton>
            <NavbarButton variant="gradient" href="/contact" className="w-full">
              Contact Us
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
