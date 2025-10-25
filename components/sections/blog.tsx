import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFeaturedBlogs, getBlogs } from "@/lib/services/blogs";
import { getImageUrl } from "@/lib/utils/pocketbase";
import type { BlogsResponse, CategoryResponse } from "@/types/pocketbase";

type BlogWithExpand = BlogsResponse<unknown, { category?: CategoryResponse }>;

function BlogCard({ post }: { post: BlogWithExpand }) {
  const categoryName = post.expand?.category?.name || 'BLOG';
  const imageUrl = getImageUrl(post, post.featured_image?.[0], { fallback: '/placeholder.jpg' });

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="rounded-lg hover:shadow-md transition-shadow border-0">
        <CardContent className="p-0 flex gap-3 h-[104px] items-center">
          <div className="flex-shrink-0 w-32 h-20 rounded-md overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.title}
              width={128}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2 pr-4">
            <span className="text-xs font-bold text-gray-600 tracking-wider uppercase">
              {categoryName}
            </span>
            <h3 className="text-base font-bold text-[#1d44c3] leading-5 line-clamp-2">
              {post.title}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function FeaturedPost({ post }: { post: BlogWithExpand | null }) {
  if (!post) {
    return null;
  }

  const imageUrl = getImageUrl(post, post.featured_image?.[0], { fallback: '/placeholder.jpg' });

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="text-[#f64162] hover:text-[#f64162] font-bold inline-flex items-center gap-2 hover:gap-3 transition-all p-0 h-auto"
        asChild
      >
        <Link href="/blog">
          Explore all resources
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>

      <div className="space-y-6">
        <Link href={`/blog/${post.slug}`}>
          <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src={imageUrl}
              alt={post.title}
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </Link>

        <div className="space-y-4">
          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-2xl md:text-3xl font-bold text-[#1d44c3] leading-8 hover:text-[#0d2463] transition-colors">
              {post.title}
            </h3>
          </Link>
          <p className="text-gray-800 leading-6">
            {post.excerpt}
          </p>
          <Button
            variant="ghost"
            className="text-[#f64162] hover:text-[#f64162] font-bold inline-flex items-center gap-2 hover:gap-3 transition-all p-0 h-auto"
            asChild
          >
            <Link href={`/blog/${post.slug}`}>
              Learn more
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function LatestPosts({ posts }: { posts: BlogWithExpand[] }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1d44c3]">
          Latest
        </h2>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default async function Blogs() {
  // Fetch featured blog and latest blogs in parallel
  const [featuredBlogs, latestBlogs] = await Promise.all([
    getFeaturedBlogs(1),
    getBlogs({ perPage: 5 }),
  ]);

  const featuredPost = (featuredBlogs[0] as BlogWithExpand) || null;
  const latestPosts = latestBlogs.items as BlogWithExpand[];

  return (
    <section className="bg-[#f7f9ff] py-12 md:py-24 px-4 md:px-8 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-14 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1d44c3] leading-tight">
            Actionable Insights, Anytime, Anywhere.
          </h1>
          <p className="text-gray-800 leading-6 max-w-2xl">
            Discover the latest insights, initiatives, and innovations from
            FinWage as we shape the future of on-demand pay and modern payroll
            solutions.
          </p>
        </div>

        {/* Grid Layout - 1 column on mobile, 2 columns on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <FeaturedPost post={featuredPost} />
          <LatestPosts posts={latestPosts} />
        </div>
      </div>
    </section>
  );
}
