import { ArrowLeft, Home, Search } from "lucide-react";
import NextLink from "next/link";

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Search className="w-10 h-10 text-[#1d44c3]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Blog Post Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the blog post you're looking for. It may
            have been moved or removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <NextLink
              href="/blog"
              className="bg-[#1d44c3] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0d2463] transition-all inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </NextLink>
            <NextLink
              href="/"
              className="bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all inline-flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go Home
            </NextLink>
          </div>
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popular Blog Categories
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <NextLink
                href="/blog"
                className="text-[#1d44c3] hover:text-[#0d2463] hover:underline font-semibold transition-colors"
              >
                All Posts
              </NextLink>
              <span className="text-gray-300">•</span>
              <NextLink
                href="/blog"
                className="text-[#1d44c3] hover:text-[#0d2463] hover:underline font-semibold transition-colors"
              >
                Latest Articles
              </NextLink>
              <span className="text-gray-300">•</span>
              <NextLink
                href="/blog"
                className="text-[#1d44c3] hover:text-[#0d2463] hover:underline font-semibold transition-colors"
              >
                Featured Posts
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
