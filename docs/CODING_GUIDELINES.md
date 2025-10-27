# Coding Guidelines

## Overview

This document outlines the coding standards and best practices for the FinWage project. Following these guidelines ensures consistency, maintainability, and quality across the codebase.

## General Principles

### 1. Code Quality Standards

- **Clean**: Easy to read and understand
- **Readable**: Self-documenting with clear intent
- **Production-ready**: Robust, tested, and reliable
- **Maintainable**: Easy to modify and extend
- **Testable**: Designed for unit testing

### 2. SOLID Principles

All code should follow SOLID principles:
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed examples.

### 3. Core Best Practices

1. **DRY** - Don't Repeat Yourself
2. **KISS** - Keep It Simple, Stupid
3. **YAGNI** - You Aren't Gonna Need It
4. **Strong Typing** - Use TypeScript strictly
5. **Error Handling** - No silent failures
6. **Testing** - Write unit tests
7. **Readability** - Descriptive naming
8. **Security** - Validate inputs
9. **Scalability** - Plan for growth
10. **Maintainability** - Modular design

## TypeScript Guidelines

### Type Safety

```typescript
// ❌ Avoid: Using 'any'
function process(data: any) {
  return data.value;
}

// ✅ Good: Use proper types
function process(data: BlogData): string {
  return data.value;
}

// ✅ Better: Use generics when appropriate
function process<T extends HasValue>(data: T): T['value'] {
  return data.value;
}
```

### Type Definitions

```typescript
// ✅ Good: Use interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Good: Use types for unions and complex types
type UserRole = 'admin' | 'user' | 'guest';
type UserWithRole = User & { role: UserRole };

// ✅ Good: Use enums for fixed sets of values
enum Status {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
}
```

### Async/Await

```typescript
// ✅ Good: Always use async/await (not .then())
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
}

// ✅ Good: Handle errors properly
async function fetchUserSafe(id: string): Promise<Result<User>> {
  try {
    const user = await fetchUser(id);
    return { success: true, data: user };
  } catch (error) {
    logger.error('Failed to fetch user', error);
    return { success: false, error };
  }
}
```

## Naming Conventions

### Variables and Functions

```typescript
// camelCase for variables and functions
const userName = 'John';
const userEmail = 'john@example.com';

function getUserById(id: string) { }
function calculateTotalPrice() { }

// Boolean variables should be prefixed with is/has/can/should
const isActive = true;
const hasPermission = false;
const canEdit = true;
const shouldRedirect = false;
```

### Classes and Interfaces

```typescript
// PascalCase for classes
class UserService { }
class BlogRepository { }

// PascalCase with 'I' prefix for interfaces
interface IUserRepository { }
interface ILogger { }

// No prefix for type definitions
type UserData = { };
```

### Constants

```typescript
// UPPER_SNAKE_CASE for constants
const MAX_RETRIES = 3;
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_PAGE_SIZE = 20;

// Configuration objects can use camelCase
const config = {
  maxRetries: 3,
  timeout: 5000,
};
```

### Files and Folders

```
// kebab-case for files
user-service.ts
blog-repository.ts
data-mapper.ts

// PascalCase for component files
UserProfile.tsx
BlogList.tsx
ContactForm.tsx
```

## Function Design

### Function Length

```typescript
// ❌ Avoid: Long functions (>50 lines)
function processUser(user: User) {
  // 100+ lines of code
}

// ✅ Good: Small, focused functions
function processUser(user: User): ProcessedUser {
  const validated = validateUser(user);
  const normalized = normalizeUser(validated);
  const enriched = enrichUserData(normalized);
  return enriched;
}

function validateUser(user: User): User {
  // Validation logic
}

function normalizeUser(user: User): User {
  // Normalization logic
}

function enrichUserData(user: User): ProcessedUser {
  // Enrichment logic
}
```

### Function Parameters

```typescript
// ❌ Avoid: Too many parameters
function createUser(
  name: string,
  email: string,
  age: number,
  address: string,
  phone: string,
  role: string
) { }

// ✅ Good: Use object parameter
interface CreateUserInput {
  name: string;
  email: string;
  age: number;
  address: string;
  phone: string;
  role: string;
}

function createUser(input: CreateUserInput) { }

// ✅ Even better: Use validated input
function createUser(input: CreateUserInput): Result<User> {
  const validation = Validators.user.validate(input);
  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }
  // Create user
}
```

### Return Types

```typescript
// ✅ Always specify return types
function getUser(id: string): Promise<User> {
  // Implementation
}

// ✅ Use Result type for operations that can fail
function getUser(id: string): Promise<Result<User, Error>> {
  // Implementation
}

// ✅ Use null for optional returns
function findUser(id: string): Promise<User | null> {
  // Implementation
}
```

## Error Handling

### Try-Catch Blocks

```typescript
// ✅ Good: Specific error handling
async function fetchData(): Promise<Result<Data>> {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      return {
        success: false,
        error: new HttpError(response.status, response.statusText)
      };
    }
    
    const data = await response.json();
    return { success: true, data };
    
  } catch (error) {
    logger.error('Failed to fetch data', error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
}
```

### Custom Errors

```typescript
// ✅ Good: Create custom error classes
class ValidationError extends Error {
  constructor(
    message: string,
    public fields: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} not found: ${id}`);
    this.name = 'NotFoundError';
  }
}

// Usage
if (!user) {
  throw new NotFoundError('User', userId);
}
```

## Comments and Documentation

### JSDoc Comments

```typescript
/**
 * Fetch a blog post by its slug with expanded relations
 * 
 * This function retrieves a blog post and automatically expands
 * the author and category relations if available.
 * 
 * @param slug - The URL-friendly slug of the blog post
 * @returns Promise resolving to the blog post or null if not found
 * 
 * @throws {ValidationError} If the slug format is invalid
 * @throws {NetworkError} If the API request fails
 * 
 * @example
 * ```typescript
 * const blog = await getBlogBySlug('my-first-post');
 * if (blog) {
 *   console.log(blog.title);
 *   console.log(blog.author?.name);
 * }
 * ```
 */
async function getBlogBySlug(slug: string): Promise<Blog | null> {
  // Implementation
}
```

### Inline Comments

```typescript
// ✅ Good: Explain "why", not "what"
// Use exponential backoff to avoid overwhelming the API
const delay = Math.pow(2, retryCount) * 1000;

// ❌ Avoid: Obvious comments
// Increment counter
counter++;

// ✅ Good: Complex logic explanation
// Calculate pro-rated amount based on days remaining in billing cycle
// Formula: (daily_rate * days_remaining) rounded to 2 decimals
const proRatedAmount = Math.round(dailyRate * daysRemaining * 100) / 100;
```

## React/Next.js Guidelines

### Component Structure

```typescript
// ✅ Good: Clear component structure
import { useState, useEffect } from 'react';
import type { Blog } from '@/lib/domain';

interface BlogListProps {
  initialBlogs: Blog[];
  limit?: number;
}

/**
 * BlogList component displays a list of blog posts
 */
export function BlogList({ initialBlogs, limit = 10 }: BlogListProps) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Effect logic
  }, []);
  
  const handleLoadMore = async () => {
    // Handler logic
  };
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

### Server Components vs Client Components

```typescript
// ✅ Server Component (default in Next.js 15)
export default async function BlogPage() {
  const blogs = await getBlogs();
  return <BlogList blogs={blogs} />;
}

// ✅ Client Component (when needed)
'use client';

import { useState } from 'react';

export function InteractiveBlogList() {
  const [filter, setFilter] = useState('all');
  // Interactive logic
}
```

### Server Actions

```typescript
'use server';

import { revalidatePath } from 'next/cache';
import { Validators } from '@/lib/domain';

/**
 * Submit contact form (Server Action)
 */
export async function submitContactForm(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  // 1. Extract data
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };
  
  // 2. Validate
  const validation = Validators.contactForm.validate(rawData);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }
  
  // 3. Process
  try {
    await createEnquiry(validation.data);
    revalidatePath('/contact');
    
    return {
      success: true,
      message: 'Thank you for contacting us!',
    };
  } catch (error) {
    logger.error('Failed to submit form', error);
    return {
      success: false,
      message: 'An error occurred. Please try again.',
    };
  }
}
```

## Testing Guidelines

### Unit Tests

```typescript
import { describe, it, expect, vi } from 'vitest';
import { BlogService } from './blog-service';

describe('BlogService', () => {
  it('should fetch blog by ID', async () => {
    // Arrange
    const mockRepo = {
      findById: vi.fn().mockResolvedValue(mockBlog),
    };
    const service = new BlogService(mockRepo);
    
    // Act
    const result = await service.getBlogById('123');
    
    // Assert
    expect(result).toEqual(mockBlog);
    expect(mockRepo.findById).toHaveBeenCalledWith('123');
  });
  
  it('should return null for non-existent blog', async () => {
    // Arrange
    const mockRepo = {
      findById: vi.fn().mockResolvedValue(null),
    };
    const service = new BlogService(mockRepo);
    
    // Act
    const result = await service.getBlogById('999');
    
    // Assert
    expect(result).toBeNull();
  });
});
```

## Security Guidelines

### Input Validation

```typescript
// ✅ Always validate user input
export async function updateProfile(formData: FormData) {
  const validation = Validators.profile.validate({
    name: formData.get('name'),
    email: formData.get('email'),
  });
  
  if (!validation.success) {
    return { errors: validation.errors };
  }
  
  // Process validated data
}
```

### Sanitization

```typescript
// ✅ Sanitize user input before rendering
import DOMPurify from 'isomorphic-dompurify';

function renderUserContent(html: string) {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

### Environment Variables

```typescript
// ✅ Never expose secrets to client
// .env.local
POCKETBASE_ADMIN_EMAIL=admin@example.com
POCKETBASE_ADMIN_PASSWORD=secret

// ✅ Only expose public variables
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Performance Guidelines

### Caching

```typescript
// ✅ Use Next.js cache appropriately
import { unstable_cache } from 'next/cache';

export const getBlogs = unstable_cache(
  async () => {
    // Fetch blogs
  },
  ['blogs'],
  { revalidate: 3600 } // 1 hour
);
```

### Pagination

```typescript
// ✅ Always paginate large lists
interface GetBlogsOptions {
  page?: number;
  perPage?: number;
}

async function getBlogs(options: GetBlogsOptions = {}) {
  const { page = 1, perPage = 20 } = options;
  // Fetch paginated results
}
```

## Code Review Checklist

Before submitting code for review, ensure:

- [ ] Code follows SOLID principles
- [ ] All functions have single responsibility
- [ ] Type safety is maintained (no `any`)
- [ ] Error handling is proper
- [ ] Comments explain "why", not "what"
- [ ] JSDoc for public APIs
- [ ] Tests are written and passing
- [ ] No console.log() in production code
- [ ] Security: inputs validated
- [ ] Performance: caching where appropriate
- [ ] Naming is clear and consistent
- [ ] No code duplication (DRY)
- [ ] Code is simple (KISS)
- [ ] No unnecessary features (YAGNI)

## Additional Resources

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture overview
- [lib/domain/README.md](../lib/domain/README.md) - Domain layer documentation
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Next.js Best Practices](https://nextjs.org/docs)
