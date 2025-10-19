import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/data/posts";

export const metadata = {
  title: "Blog - FinWage",
  description:
    "Expert insights on financial wellness, earned wage access, and the future of payroll.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  const categories = [
    { name: "All Posts", count: posts.length },
    {
      name: "Financial Wellness",
      count: posts.filter((p) => p.category === "Financial Wellness").length,
    },
    {
      name: "Employer Benefits",
      count: posts.filter((p) => p.category === "Employer Benefits").length,
    },
    {
      name: "Industry Trends",
      count: posts.filter((p) => p.category === "Industry Trends").length,
    },
    {
      name: "Employer Guide",
      count: posts.filter((p) => p.category === "Employer Guide").length,
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog & Insights
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Expert perspectives on financial wellness, employee benefits, and
              the future of payroll
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <button
                key={category.name}
                type="button"
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  index === 0
                    ? "bg-[#1d44c3] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="text-sm font-bold text-[#1d44c3] uppercase tracking-wider mb-4">
              Featured Post
            </h2>
            <Link href={`/blog/${featuredPost.slug}`}>
              <article className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full min-h-[400px]">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-[#1d44c3] text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {featuredPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-[#1d44c3] transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {featuredPost.author.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {featuredPost.author.role}
                          </div>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <button
                          type="button"
                          className="text-[#1d44c3] font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                        >
                          Read More
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Recent Posts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group h-full flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#1d44c3] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1d44c3] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-sm font-semibold text-gray-700">
                          {post.author.name}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#1d44c3] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white">
        <div className="max-w-[800px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest insights on financial wellness and employee benefits
            delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="button"
              className="px-8 py-4 bg-white text-[#1d44c3] rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
