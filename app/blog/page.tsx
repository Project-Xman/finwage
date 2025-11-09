import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getBlogs, getFeaturedBlogs } from "@/lib/services/blogs";
import { getCategories } from "@/lib/services/categories";
import { getImageUrl } from "@/lib/utils/pocketbase";
import type {
  AuthorsResponse,
  BlogsResponse,
  CategoryResponse,
} from "@/types/pocketbase";
import { Metadata } from "next";

// Type for blog with expanded relations
type BlogWithExpand = BlogsResponse<
  Record<string, unknown>,
  {
    author?: AuthorsResponse;
    category?: CategoryResponse;
  }
>;

export const metadata: Metadata = {
  title: "Blog - FinWage",
  description:
    "Expert insights on financial wellness, earned wage access, and the future of payroll.",
  keywords: [
    "blog",
    "financial wellness",
    "earned wage access",
    "payroll",
    "fintech insights",
  ],
  openGraph: {
    title: "Blog - FinWage",
    description:
      "Expert insights on financial wellness, earned wage access, and the future of payroll.",
    type: "website",
  },
};

// Revalidate blog list page every month (2,678,400 seconds)
// This enables Incremental Static Regeneration (ISR) for better performance
export const revalidate = 2678400;

export default async function BlogPage() {
  // Fetch data in parallel
  const [blogsResult, featuredBlogsData, categoriesResult] = await Promise.all([
    getBlogs({ perPage: 20 }),
    getFeaturedBlogs(1),
    getCategories({ perPage: 50 }),
  ]);

  const posts = blogsResult.items as BlogWithExpand[];
  const featuredPost = (featuredBlogsData[0] || posts[0]) as BlogWithExpand;
  const recentPosts = posts.filter((p) => p.id !== featuredPost?.id);
  const allCategories = categoriesResult.items;

  // Build category list with counts
  const categories = [
    { name: "All Posts", count: blogsResult.totalItems, slug: null },
    ...allCategories.map((cat) => ({
      name: cat.name,
      count: cat.count || 0,
      slug: cat.slug,
    })),
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#1d44c3] to-[#0d2463] text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
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
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <Button
                key={category.name}
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 ? "bg-[#1d44c3] hover:bg-[#0d2463]" : ""}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-sm font-bold text-[#1d44c3] uppercase tracking-wider mb-4">
              Featured Post
            </h2>
            <NextLink href={`/blog/${featuredPost.slug}`}>
              <Card className="bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full min-h-[400px]">
                    <Image
                      src={getImageUrl(
                        featuredPost,
                        featuredPost.featured_image?.[0],
                        { fallback: "/placeholder.jpg" },
                      )}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-[#1d44c3] text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {(featuredPost.expand?.category as CategoryResponse)
                          ?.name || "Blog"}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(
                          featuredPost.published_date,
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {Math.ceil((featuredPost.content?.length || 0) / 1000)}{" "}
                        min read
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
                        {(featuredPost.expand?.author as AuthorsResponse)
                          ?.avatar && (
                          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                            <Image
                              src={getImageUrl(
                                featuredPost.expand.author as AuthorsResponse,
                                (featuredPost.expand.author as AuthorsResponse)
                                  .avatar,
                                { fallback: "/placeholder.jpg" },
                              )}
                              alt={
                                (featuredPost.expand?.author as AuthorsResponse)
                                  ?.name || "Author"
                              }
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-gray-900">
                            {(featuredPost.expand?.author as AuthorsResponse)
                              ?.name || "Anonymous"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {(featuredPost.expand?.author as AuthorsResponse)
                              ?.role || "Author"}
                          </div>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <Button
                          variant="link"
                          className="text-[#1d44c3] font-semibold flex items-center gap-2 hover:gap-3"
                        >
                          Read More
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </NextLink>
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Recent Posts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <NextLink key={post.slug} href={`/blog/${post.slug}`}>
                <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group h-full flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src={getImageUrl(post, post.featured_image?.[0], {
                        fallback: "/placeholder.jpg",
                      })}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#1d44c3] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {(post.expand?.category as CategoryResponse)?.name ||
                          "Blog"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.published_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.ceil((post.content?.length || 0) / 1000)} min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1d44c3] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        {(post.expand?.author as AuthorsResponse)?.avatar && (
                          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                            <Image
                              src={getImageUrl(
                                post.expand.author as AuthorsResponse,
                                (post.expand.author as AuthorsResponse).avatar,
                                { fallback: "/placeholder.jpg" },
                              )}
                              alt={
                                (post.expand?.author as AuthorsResponse)
                                  ?.name || "Author"
                              }
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="text-sm font-semibold text-gray-700">
                          {(post.expand?.author as AuthorsResponse)?.name ||
                            "Anonymous"}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#1d44c3] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </NextLink>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-linear-to-br from-[#1d44c3] to-[#0d2463] text-white">
        <div className="max-w-[800px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest insights on financial wellness and employee benefits
            delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button
              type="button"
              className="px-8 py-4 bg-white text-[#1d44c3] rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
