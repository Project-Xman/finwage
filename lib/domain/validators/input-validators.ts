/**
 * Input Validators (SRP - Single Responsibility Principle)
 * 
 * Validators are responsible solely for validating input data.
 * They use Zod for schema-based validation with strong typing.
 */

import { z } from 'zod';
import type { IValidator, ValidationResult } from '../interfaces/common.interface';

/**
 * Base validator implementation using Zod
 */
export abstract class BaseValidator<T> implements IValidator<T> {
  constructor(protected schema: z.ZodSchema<T>) {}

  validate(data: unknown): ValidationResult<T> {
    const result = this.schema.safeParse(data);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }

    return {
      success: false,
      errors: result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
      })),
    };
  }

  validateOrThrow(data: unknown): T {
    return this.schema.parse(data);
  }
}

/**
 * Contact form validator
 */
export class ContactFormValidator extends BaseValidator<ContactFormInput> {
  constructor() {
    super(contactFormSchema);
  }
}

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters')
    .trim(),
  interest: z.enum(['demo', 'pricing', 'partnership', 'support', 'other'], {
    message: 'Please select a valid interest option',
  }),
  company: z
    .string()
    .max(200, 'Company name must not exceed 200 characters')
    .trim()
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]+$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Blog creation validator
 */
export class BlogCreateValidator extends BaseValidator<BlogCreateInput> {
  constructor() {
    super(blogCreateSchema);
  }
}

const blogCreateSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must not exceed 200 characters')
    .trim(),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(200, 'Slug must not exceed 200 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only')
    .trim(),
  content: z
    .string()
    .min(50, 'Content must be at least 50 characters')
    .trim(),
  excerpt: z
    .string()
    .min(20, 'Excerpt must be at least 20 characters')
    .max(500, 'Excerpt must not exceed 500 characters')
    .trim(),
  published: z.boolean().default(false),
  publishedDate: z.date().nullable().optional(),
  featuredImage: z.string().url('Must be a valid URL').nullable().optional(),
  metaTitle: z.string().max(60, 'Meta title should not exceed 60 characters').nullable().optional(),
  metaDescription: z.string().max(160, 'Meta description should not exceed 160 characters').nullable().optional(),
  authorId: z.string().min(1, 'Author is required'),
  categoryId: z.string().min(1, 'Category is required'),
});

export type BlogCreateInput = z.infer<typeof blogCreateSchema>;

/**
 * Blog update validator (all fields optional)
 */
export class BlogUpdateValidator extends BaseValidator<BlogUpdateInput> {
  constructor() {
    super(blogUpdateSchema);
  }
}

const blogUpdateSchema = blogCreateSchema.partial();

export type BlogUpdateInput = z.infer<typeof blogUpdateSchema>;

/**
 * Pagination validator
 */
export class PaginationValidator extends BaseValidator<PaginationInput> {
  constructor() {
    super(paginationSchema);
  }
}

const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  perPage: z.number().int().min(1).max(100).default(20),
  sort: z.string().optional(),
  filter: z.string().optional(),
});

export type PaginationInput = z.infer<typeof paginationSchema>;

/**
 * Search query validator
 */
export class SearchQueryValidator extends BaseValidator<SearchQueryInput> {
  constructor() {
    super(searchQuerySchema);
  }
}

const searchQuerySchema = z.object({
  query: z
    .string()
    .min(2, 'Search query must be at least 2 characters')
    .max(100, 'Search query must not exceed 100 characters')
    .trim(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
});

export type SearchQueryInput = z.infer<typeof searchQuerySchema>;

/**
 * Email validator
 */
export class EmailValidator extends BaseValidator<EmailInput> {
  constructor() {
    super(emailSchema);
  }
}

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address').trim().toLowerCase(),
});

export type EmailInput = z.infer<typeof emailSchema>;

/**
 * ID validator
 */
export class IdValidator extends BaseValidator<IdInput> {
  constructor() {
    super(idSchema);
  }
}

const idSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type IdInput = z.infer<typeof idSchema>;

/**
 * Slug validator
 */
export class SlugValidator extends BaseValidator<SlugInput> {
  constructor() {
    super(slugSchema);
  }
}

const slugSchema = z.object({
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(200, 'Slug must not exceed 200 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only')
    .trim(),
});

export type SlugInput = z.infer<typeof slugSchema>;

/**
 * Export all validators for convenience
 */
export const Validators = {
  contactForm: new ContactFormValidator(),
  blogCreate: new BlogCreateValidator(),
  blogUpdate: new BlogUpdateValidator(),
  pagination: new PaginationValidator(),
  searchQuery: new SearchQueryValidator(),
  email: new EmailValidator(),
  id: new IdValidator(),
  slug: new SlugValidator(),
} as const;
