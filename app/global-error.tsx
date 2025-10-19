'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Critical Error</h1>
            <p className="text-gray-600 mb-6">A critical error occurred. Please try refreshing the page or contact support.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={reset} className="flex-1 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-all">
                Try Again
              </button>
              <a href="/" className="flex-1 bg-gray-100 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all">
                Go Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
