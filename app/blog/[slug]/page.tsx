import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Facebook,
  Linkedin,
  Share2,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogs, getBlogBySlug, getBlogsByCategory } from "@/lib/services/blogs";
import { getImageUrl } from "@/lib/utils/pocketbase";
import type { BlogsResponse, AuthorsResponse, CategoryResponse } from "@/types/pocketbase";

// Type for blog with expanded relations
type BlogWithExpand = BlogsResponse<any, {
  author?: AuthorsResponse;
  category?: CategoryResponse;
}>;

// Revalidate blog detail pages every hour (3600 seconds)
// This enables Incremental Static Regeneration (ISR)
export const revalidate = 3600;

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  try {
    // Fetch all published blogs for static generation
    // Using a high perPage value to get all blogs in one request
    // If you have more than 500 blogs, consider implementing pagination
    const blogsResult = await getBlogs({ perPage: 500 });
    
    return blogsResult.items.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params for blog posts:', error);
    // Return empty array to prevent build failure
    // Pages will be generated on-demand (ISR)
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found - FinWage",
    };
  }

  return {
    title: `${post.title} - FinWage Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [getImageUrl(post, post.featured_image?.[0], { fallback: '/placeholder.jpg' })],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug) as BlogWithExpand | null;

  if (!post) {
    notFound();
  }

  // Fetch related posts from the same category in parallel with other operations
  const categoryId = post.category;
  const relatedPostsAll = await getBlogsByCategory(categoryId, 4) as BlogWithExpand[];
  // Filter out the current post
  const relatedPosts = relatedPostsAll.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1d44c3] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <article>
        <header className="relative bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white py-16 md:py-24">
          <div className="max-w-[800px] mx-auto px-4 md:px-6">
            <div className="mb-6">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                {(post.expand?.category as CategoryResponse)?.name || 'Blog'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-6 text-blue-100">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date(post.published_date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {Math.ceil((post.content?.length || 0) / 1000)} min read
              </span>
            </div>
          </div>
        </header>

        {/* Author Info */}
        <div className="bg-white border-b">
          <div className="max-w-[800px] mx-auto px-4 md:px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {(post.expand?.author as AuthorsResponse)?.avatar && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={getImageUrl(
                        post.expand.author as AuthorsResponse, 
                        (post.expand.author as AuthorsResponse).avatar,
                        { fallback: '/placeholder.jpg' }
                      )}
                      alt={(post.expand?.author as AuthorsResponse)?.name || 'Author'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {(post.expand?.author as AuthorsResponse)?.name || 'Anonymous'}
                  </div>
                  <div className="text-gray-600">
                    {(post.expand?.author as AuthorsResponse)?.role || 'Author'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-100 hover:bg-[#1d44c3] hover:text-white"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-100 hover:bg-[#1d44c3] hover:text-white"
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-100 hover:bg-[#1d44c3] hover:text-white"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-100 hover:bg-[#1d44c3] hover:text-white"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-[400px] md:h-[500px] bg-gray-100">
          <Image
            src={getImageUrl(post, post.featured_image?.[0], { fallback: '/placeholder.jpg' })}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="max-w-[800px] mx-auto px-4 md:px-6 py-16">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-li:text-gray-700 prose-li:mb-2
              prose-a:text-[#1d44c3] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-blockquote:border-l-4 prose-blockquote:border-[#1d44c3] prose-blockquote:pl-6 prose-blockquote:italic"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Blog content is sourced from trusted PocketBase database.
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold hover:bg-[#1d44c3] hover:text-white transition-all cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                    <div className="relative h-48">
                      <Image
                        src={getImageUrl(relatedPost, relatedPost.featured_image?.[0], { fallback: '/placeholder.jpg' })}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#1d44c3] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {(relatedPost.expand?.category as CategoryResponse)?.name || 'Blog'}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <span>
                          {new Date(relatedPost.published_date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                        <span>•</span>
                        <span>{Math.ceil((relatedPost.content?.length || 0) / 1000)} min read</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1d44c3] transition-colors">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm font-semibold text-gray-700">
                          {(relatedPost.expand?.author as AuthorsResponse)?.name || 'Anonymous'}
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#1d44c3] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1d44c3] to-[#0d2463] text-white">
        <div className="max-w-[800px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Workplace?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            See how FinWage can help your employees achieve financial wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button size="lg" className="bg-white text-[#1d44c3] hover:bg-gray-100">
                Schedule a Demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#1d44c3]">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
