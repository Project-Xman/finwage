"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import NextLink from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function CareersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Careers Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-orange-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Error Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Unable to Load Careers
        </h1>

        <p className="text-gray-600 mb-6">
          We're having trouble loading our job openings. Please try again in a
          moment.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-700 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="button"
            onClick={reset}
            className="flex-1 bg-[#1d44c3] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0d2463] transition-all inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </Button>

          <NextLink
            href="/"
            className="flex-1 bg-gray-100 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all inline-flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </NextLink>
        </div>

        {/* Support Link */}
        <p className="text-sm text-gray-500 mt-6">
          Need help?{" "}
          <NextLink
            href="/contact"
            className="text-[#1d44c3] hover:underline font-semibold"
          >
            Contact Support
          </NextLink>
        </p>
      </div>
    </div>
  );
}
