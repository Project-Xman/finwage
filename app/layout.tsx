import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import CookieConsent from "@/components/cookie-consent";
import './globals.css';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
}); 

export const metadata: Metadata = {
  title: {
    default: "FinWage - Earned Wage Access for Financial Wellness",
    template: "%s | FinWage"
  },
  description: "Work Today, Get Paid Today! FinWage provides earned wage access to help employees access their wages instantly while saving employers time and money.",
  keywords: ["earned wage access", "financial wellness", "payroll", "employee benefits", "instant pay", "wage advance", "fintech"],
  authors: [{ name: "FinWage" }],
  creator: "FinWage",
  publisher: "FinWage",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://finwage.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "FinWage - Earned Wage Access for Financial Wellness",
    description: "Work Today, Get Paid Today! FinWage provides earned wage access to help employees access their wages instantly.",
    url: 'https://finwage.com',
    siteName: 'FinWage',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'FinWage - Earned Wage Access',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FinWage - Earned Wage Access for Financial Wellness",
    description: "Work Today, Get Paid Today! Access your earned wages instantly.",
    images: ['/opengraph-image.png'],
    creator: '@finwage',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
