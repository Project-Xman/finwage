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

import type { BlogsResponse, AuthorsResponse, CategoryResponse } from '@/types/pocketbase';
import type { Blog, Author, Category } from '../models/entities';

/**
 * Base mapper interface
 */
export interface IMapper<TSource, TTarget> {
  toModel(source: TSource): TTarget;
  toResponse(model: TTarget): TSource;
}

/**
 * Blog mapper - converts between PocketBase response and domain model
 */
export class BlogMapper implements IMapper<BlogsResponse, Blog> {
  /**
   * Convert PocketBase blog response to domain model
   */
  toModel(response: BlogsResponse): Blog {
    return {
      id: response.id,
      title: response.title || '',
      slug: response.slug || '',
      content: response.content || '',
      excerpt: response.excerpt || '',
      published: response.published || false,
      publishedDate: response.published_date ? new Date(response.published_date) : null,
      featuredImage: response.featured_image || null,
      metaTitle: response.meta_title || null,
      metaDescription: response.meta_description || null,
      readingTime: response.reading_time || 0,
      viewCount: response.view_count || 0,
      authorId: response.author || '',
      categoryId: response.category || '',
      created: new Date(response.created),
      updated: new Date(response.updated),
    };
  }

  /**
   * Convert domain model to PocketBase response format
   */
  toResponse(model: Blog): BlogsResponse {
    return {
      id: model.id,
      title: model.title,
      slug: model.slug,
      content: model.content,
      excerpt: model.excerpt,
      published: model.published,
      published_date: model.publishedDate?.toISOString() || '',
      featured_image: model.featuredImage || '',
      meta_title: model.metaTitle || '',
      meta_description: model.metaDescription || '',
      reading_time: model.readingTime,
      view_count: model.viewCount,
      author: model.authorId,
      category: model.categoryId,
      created: model.created.toISOString(),
      updated: model.updated.toISOString(),
      collectionId: '',
      collectionName: 'blogs',
    };
  }

  /**
   * Convert blog response with expanded relations
   */
  toModelWithRelations(
    response: BlogsResponse<Record<string, unknown>, { author?: AuthorsResponse; category?: CategoryResponse }>,
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
export class AuthorMapper implements IMapper<AuthorsResponse, Author> {
  toModel(response: AuthorsResponse): Author {
    return {
      id: response.id,
      name: response.name || '',
      email: response.email || '',
      bio: response.bio || null,
      avatar: response.avatar || null,
      socialLinks: {
        twitter: response.twitter || undefined,
        linkedin: response.linkedin || undefined,
        github: response.github || undefined,
        website: response.website || undefined,
      },
      created: new Date(response.created),
      updated: new Date(response.updated),
    };
  }

  toResponse(model: Author): AuthorsResponse {
    return {
      id: model.id,
      name: model.name,
      email: model.email,
      bio: model.bio || '',
      avatar: model.avatar || '',
      twitter: model.socialLinks.twitter || '',
      linkedin: model.socialLinks.linkedin || '',
      github: model.socialLinks.github || '',
      website: model.socialLinks.website || '',
      created: model.created.toISOString(),
      updated: model.updated.toISOString(),
      collectionId: '',
      collectionName: 'authors',
    };
  }
}

/**
 * Category mapper
 */
export class CategoryMapper implements IMapper<CategoryResponse, Category> {
  toModel(response: CategoryResponse): Category {
    return {
      id: response.id,
      name: response.name || '',
      slug: response.slug || '',
      description: response.description || null,
      color: response.color || '#000000',
      icon: response.icon || null,
      created: new Date(response.created),
      updated: new Date(response.updated),
    };
  }

  toResponse(model: Category): CategoryResponse {
    return {
      id: model.id,
      name: model.name,
      slug: model.slug,
      description: model.description || '',
      color: model.color,
      icon: model.icon || '',
      created: model.created.toISOString(),
      updated: model.updated.toISOString(),
      collectionId: '',
      collectionName: 'category',
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
  private static mappers: Map<string, IMapper<unknown, unknown>> = new Map();

  /**
   * Register a mapper
   */
  static register<TSource, TTarget>(
    key: string,
    mapper: IMapper<TSource, TTarget>,
  ): void {
    this.mappers.set(key, mapper as IMapper<unknown, unknown>);
  }

  /**
   * Get a registered mapper
   */
  static get<TSource, TTarget>(key: string): IMapper<TSource, TTarget> | null {
    const mapper = this.mappers.get(key);
    return mapper ? (mapper as IMapper<TSource, TTarget>) : null;
  }
}

// Register default mappers
MapperFactory.register('blog', new BlogMapper());
MapperFactory.register('author', new AuthorMapper());
MapperFactory.register('category', new CategoryMapper());
