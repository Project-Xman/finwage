/**
 * Data Mappers (SRP - Single Responsibility Principle)
 *
 * Mappers handle the transformation between different data representations:
 * - API responses → Domain models
 * - Domain models → DTOs (Data Transfer Objects)
 * - Database entities → Domain models
 *
 * This separation ensures that changes in API structure don't affect
 * business logic and vice versa.
 */

import type {
  AuthorsResponse,
  BlogsResponse,
  CategoryResponse,
} from "@/types/pocketbase";
import { Collections } from "@/types/pocketbase";
import type { Author, Blog, Category } from "../models/entities";
import { Slug } from "../models/value-objects";

/**
 * Base mapper interface for read-only operations
 */
export interface IReadMapper<TSource, TTarget> {
  toModel(source: TSource): TTarget;
}

/**
 * Bidirectional mapper interface for read/write operations
 */
export interface IBidirectionalMapper<TSource, TTarget>
  extends IReadMapper<TSource, TTarget> {
  toResponse(model: TTarget): Partial<TSource>;
}

/**
 * Utility function to safely parse date or throw error
 */
function parseDateOrThrow(
  dateString: string | undefined,
  fieldName: string,
): Date {
  if (!dateString) {
    throw new Error(`Missing required date field: ${fieldName}`);
  }
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date format for field: ${fieldName}`);
  }
  return date;
}

/**
 * Blog mapper - converts between PocketBase response and domain model
 */
export class BlogMapper implements IBidirectionalMapper<BlogsResponse, Blog> {
  /**
   * Convert PocketBase blog response to domain model
   */
  toModel(response: BlogsResponse): Blog {
    return {
      id: response.id,
      title: response.title || "",
      slug: response.slug || "",
      content: response.content || "",
      excerpt: response.excerpt || "",
      published: response.published || false,
      publishedDate: response.published_date
        ? new Date(response.published_date)
        : null,
      featuredImage: response.featured_image || null,
      metaTitle: null, // Not in current schema - can be added later
      metaDescription: null, // Not in current schema - can be added later
      readingTime: 0, // Calculated field - can be implemented separately
      viewCount: response.views || 0,
      authorId: response.author || "",
      categoryId: response.category || "",
      created: parseDateOrThrow(response.created, "created"),
      updated: parseDateOrThrow(response.updated, "updated"),
    };
  }

  /**
   * Convert domain model to PocketBase response format (partial implementation)
   * Note: Some optional fields may be missing - use with caution
   */
  toResponse(model: Blog): Partial<BlogsResponse> {
    return {
      id: model.id,
      title: model.title,
      slug: model.slug,
      content: model.content,
      excerpt: model.excerpt,
      published: model.published,
      published_date: model.publishedDate?.toISOString() || "",
      featured_image: model.featuredImage || "",
      views: model.viewCount,
      author: model.authorId,
      category: model.categoryId,
      created: model.created.toISOString(),
      updated: model.updated.toISOString(),
    };
  }

  /**
   * Convert blog response with expanded relations
   */
  toModelWithRelations(
    response: BlogsResponse<
      Record<string, unknown>,
      { author?: AuthorsResponse; category?: CategoryResponse }
    >,
  ): Blog {
    const blog = this.toModel(response);

    // Map expanded author if present
    if (response.expand?.author) {
      blog.author = new AuthorMapper().toModel(response.expand.author);
    }

    // Map expanded category if present
    if (response.expand?.category) {
      blog.category = new CategoryMapper().toModel(response.expand.category);
    }

    return blog;
  }
}

/**
 * Author mapper
 */
export class AuthorMapper
  implements IBidirectionalMapper<AuthorsResponse, Author>
{
  toModel(response: AuthorsResponse): Author {
    const socialLink = response.social_link as
      | Record<string, string>
      | null
      | undefined;

    return {
      id: response.id,
      name: response.name || "",
      email: response.email || "",
      bio: response.bio || null,
      avatar: response.avatar || null,
      socialLinks: {
        twitter: socialLink?.twitter || undefined,
        linkedin: socialLink?.linkedin || undefined,
        github: socialLink?.github || undefined,
        website: socialLink?.website || undefined,
      },
      created: parseDateOrThrow(response.created, "created"),
      updated: parseDateOrThrow(response.updated, "updated"),
    };
  }

  toResponse(model: Author): Partial<AuthorsResponse> {
    return {
      id: model.id,
      name: model.name,
      email: model.email,
      bio: model.bio || "",
      avatar: model.avatar || "",
      slug: Slug.create(model.name).toString(),
      social_link: {
        twitter: model.socialLinks.twitter || "",
        linkedin: model.socialLinks.linkedin || "",
        github: model.socialLinks.github || "",
        website: model.socialLinks.website || "",
      },
      created: model.created.toISOString(),
      updated: model.updated.toISOString(),
    };
  }
}

/**
 * Category mapper
 */
export class CategoryMapper
  implements IBidirectionalMapper<CategoryResponse, Category>
{
  toModel(response: CategoryResponse): Category {
    return {
      id: response.id,
      name: response.name || "",
      slug: response.slug || "",
      description: response.description || null,
      color: response.color || "#000000",
      icon: response.icon_svg || null,
      created: parseDateOrThrow(response.created, "created"),
      updated: parseDateOrThrow(response.updated, "updated"),
    };
  }

  toResponse(model: Category): Partial<CategoryResponse> {
    return {
      id: model.id,
      name: model.name,
      slug: model.slug,
      description: model.description || "",
      color: model.color,
      icon_svg: model.icon || "",
      created: model.created.toISOString(),
      updated: model.updated.toISOString(),
    };
  }
}

/**
 * Mapper factory for creating mappers
 *
 * This follows the Factory Pattern and makes it easy to get
 * the appropriate mapper for a given type.
 */
export class MapperFactory {
  private static mappers: Map<string, IReadMapper<unknown, unknown>> =
    new Map();

  /**
   * Register a mapper
   */
  static register<TSource, TTarget>(
    key: string,
    mapper: IReadMapper<TSource, TTarget>,
  ): void {
    MapperFactory.mappers.set(key, mapper as IReadMapper<unknown, unknown>);
  }

  /**
   * Get a registered mapper
   */
  static get<TSource, TTarget>(
    key: string,
  ): IReadMapper<TSource, TTarget> | null {
    const mapper = MapperFactory.mappers.get(key);
    return mapper ? (mapper as IReadMapper<TSource, TTarget>) : null;
  }
}

// Register default mappers
MapperFactory.register("blog", new BlogMapper());
MapperFactory.register("author", new AuthorMapper());
MapperFactory.register("category", new CategoryMapper());
