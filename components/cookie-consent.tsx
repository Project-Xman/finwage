"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    localStorage.setItem("analytics-consent", "true");
    localStorage.setItem("marketing-consent", "true");
    setShowBanner(false);
    setShowModal(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential");
    localStorage.setItem("analytics-consent", "false");
    localStorage.setItem("marketing-consent", "false");
    setShowBanner(false);
    setShowModal(false);
  };

  const handleCustomize = () => {
    setShowModal(true);
  };

  const handleSavePreferences = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const analytics = formData.get("analytics") === "on";
    const marketing = formData.get("marketing") === "on";

    localStorage.setItem("cookie-consent", "custom");
    localStorage.setItem("analytics-consent", analytics.toString());
    localStorage.setItem("marketing-consent", marketing.toString());
    setShowBanner(false);
    setShowModal(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg animate-in slide-in-from-bottom duration-500">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We Value Your Privacy
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use cookies and similar technologies to enhance your browsing
                experience, analyze site traffic, and personalize content. By
                clicking "Accept All", you consent to our use of cookies. You
                can manage your preferences at any time.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={handleAcceptEssential}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={handleCustomize}
                className="px-6 py-2.5 text-sm font-medium text-[#1d44c3] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Customize
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2.5 text-sm font-medium text-white bg-[#1d44c3] rounded-lg hover:bg-[#153399] transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customization Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">
                Cookie Preferences
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSavePreferences} className="p-6">
              <p className="text-sm text-gray-600 mb-6">
                We use different types of cookies to optimize your experience on
                our website. Click on the categories below to learn more and
                customize your preferences.
              </p>

              {/* Essential Cookies */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Essential Cookies
                    </h3>
                    <p className="text-sm text-gray-600">
                      These cookies are necessary for the website to function
                      and cannot be disabled. They are usually set in response
                      to actions you take, such as setting privacy preferences
                      or logging in.
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Always Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Analytics Cookies
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      These cookies help us understand how visitors interact
                      with our website by collecting and reporting information
                      anonymously. This helps us improve our website's
                      performance.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li className="list-disc">Google Analytics</li>
                      <li className="list-disc">Page view tracking</li>
                      <li className="list-disc">User behavior analysis</li>
                    </ul>
                  </div>
                  <div className="ml-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="analytics"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1d44c3]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Marketing Cookies
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      These cookies are used to track visitors across websites
                      to display relevant advertisements and measure the
                      effectiveness of marketing campaigns.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li className="list-disc">Facebook Pixel</li>
                      <li className="list-disc">Google Ads</li>
                      <li className="list-disc">Retargeting campaigns</li>
                    </ul>
                  </div>
                  <div className="ml-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="marketing"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1d44c3]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Image Storage Permission */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-blue-900 mb-1">
                      Browser Image Storage
                    </h3>
                    <p className="text-sm text-blue-800">
                      We may store images temporarily in your browser cache to
                      improve loading times and enhance your experience. These
                      images are stored locally and can be cleared at any time
                      through your browser settings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy Policy Link */}
              <p className="text-sm text-gray-600 mb-6">
                For more information about how we handle your data, please read
                our{" "}
                <a
                  href="/privacy-policy"
                  className="text-[#1d44c3] hover:underline font-medium"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/cookie-policy"
                  className="text-[#1d44c3] hover:underline font-medium"
                >
                  Cookie Policy
                </a>
                .
              </p>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleAcceptEssential}
                  className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Accept Essential Only
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 text-sm font-medium text-white bg-[#1d44c3] rounded-lg hover:bg-[#153399] transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
