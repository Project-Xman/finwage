/**
 * Blog Service Layer
 * 
 * Provides data fetching functions for blog-related content.
 * Implements clean separation between data fetching and UI logic.
 */

import type { BlogsResponse } from '@/types/pocketbase';
import {
  getBlogs as apiFetchBlogs,
  getBlogBySlug as apiFetchBlogBySlug,
  getFeaturedBlogs as apiFetchFeaturedBlogs,
  getBlogsByCategory as apiFetchBlogsByCategory,
} from '@/lib/api';

// ============================================================
// TYPES
// ============================================================

export interface BlogListOptions {
  page?: number;
  perPage?: number;
  category?: string;
  sort?: string;
}

export interface BlogListResult {
  items: BlogsResponse[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all published blogs with pagination support
 * 
 * @param options - Pagination and filtering options
 * @returns Paginated list of blog posts with metadata
 * 
 * @example
 * ```ts
 * // Get first page with default pagination
 * const blogs = await getBlogs();
 * 
 * // Get specific page with custom page size
 * const blogs = await getBlogs({ page: 2, perPage: 10 });
 * 
 * // Filter by category
 * const blogs = await getBlogs({ category: 'tech' });
 * ```
 */
export async function getBlogs(
  options: BlogListOptions = {}
): Promise<BlogListResult> {
  try {
    const {
      page = 1,
      perPage = 20,
      category,
      sort = '-published_date',
    } = options;

    // Build filter for published blogs
    let filter = 'published = true';
    if (category) {
      filter += ` && category = "${category}"`;
    }

    const response = await apiFetchBlogs({
      page,
      perPage,
      sort,
      filter,
    });

    return {
      items: response.items,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
      page: response.page,
      perPage: response.perPage,
    };
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    // Return empty result on error to allow graceful degradation
    return {
      items: [],
      totalPages: 0,
      totalItems: 0,
      page: options.page || 1,
      perPage: options.perPage || 20,
    };
  }
}

/**
 * Fetch a single blog post by slug with author and category expansion
 * 
 * @param slug - The blog post slug
 * @returns Blog post with expanded author and category data, or null if not found
 * 
 * @example
 * ```ts
 * const blog = await getBlogBySlug('my-first-post');
 * if (blog) {
 *   console.log(blog.title);
 *   console.log(blog.expand?.author?.name);
 *   console.log(blog.expand?.category?.name);
 * }
 * ```
 */
export async function getBlogBySlug(
  slug: string
): Promise<BlogsResponse | null> {
  try {
    const blog = await apiFetchBlogBySlug(slug);
    return blog;
  } catch (error) {
    console.error(`Failed to fetch blog by slug: ${slug}`, error);
    return null;
  }
}

/**
 * Fetch featured blogs for homepage display
 * 
 * @param limit - Maximum number of featured blogs to return (default: 3)
 * @returns Array of featured blog posts
 * 
 * @example
 * ```ts
 * // Get 3 featured blogs for homepage
 * const featuredBlogs = await getFeaturedBlogs();
 * 
 * // Get more featured blogs
 * const featuredBlogs = await getFeaturedBlogs(6);
 * ```
 */
export async function getFeaturedBlogs(
  limit: number = 3
): Promise<BlogsResponse[]> {
  try {
    const blogs = await apiFetchFeaturedBlogs(limit);
    return blogs;
  } catch (error) {
    console.error('Failed to fetch featured blogs:', error);
    return [];
  }
}

/**
 * Fetch blogs filtered by category
 * 
 * @param categoryId - The category ID to filter by
 * @param limit - Maximum number of blogs to return (default: 10)
 * @returns Array of blog posts in the specified category
 * 
 * @example
 * ```ts
 * // Get blogs in a specific category
 * const techBlogs = await getBlogsByCategory('category-id-123');
 * 
 * // Get more blogs from category
 * const techBlogs = await getBlogsByCategory('category-id-123', 20);
 * ```
 */
export async function getBlogsByCategory(
  categoryId: string,
  limit: number = 10
): Promise<BlogsResponse[]> {
  try {
    const blogs = await apiFetchBlogsByCategory(categoryId, limit);
    return blogs;
  } catch (error) {
    console.error(`Failed to fetch blogs by category: ${categoryId}`, error);
    return [];
  }
}
