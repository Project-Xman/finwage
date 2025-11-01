# Architecture Documentation

## Overview

This document describes the architecture and design principles used in the FinWage application. The codebase follows **Clean Architecture** principles with a strong emphasis on **SOLID** design patterns and **best practices** for maintainable, scalable, and testable code.

## Table of Contents

1. [Architecture Layers](#architecture-layers)
2. [SOLID Principles](#solid-principles)
3. [Directory Structure](#directory-structure)
4. [Design Patterns](#design-patterns)
5. [Best Practices](#best-practices)
6. [Code Quality Guidelines](#code-quality-guidelines)

## Architecture Layers

The application follows a layered architecture with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│     Presentation Layer (UI)              │
│  ├─ app/            (Next.js Pages)      │
│  ├─ components/     (React Components)   │
│  └─ public/         (Static Assets)      │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     Application Layer                    │
│  ├─ lib/actions/    (Server Actions)     │
│  ├─ lib/services/   (Business Logic)     │
│  └─ hooks/          (Custom Hooks)       │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     Domain Layer ⭐                      │
│  ├─ lib/domain/interfaces/               │
│  ├─ lib/domain/models/                   │
│  ├─ lib/domain/mappers/                  │
│  └─ lib/domain/validators/               │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     Infrastructure Layer                 │
│  ├─ lib/api.ts      (API Client)         │
│  ├─ lib/pocketbase.ts (Database)         │
│  └─ lib/utils/      (Utilities)          │
└─────────────────────────────────────────┘
```

### Layer Responsibilities

#### 1. Presentation Layer
- **Purpose**: User interface and interaction
- **Contains**: Pages, components, styles
- **Rules**: 
  - No business logic
  - Depends only on Application layer
  - Pure UI concerns only

#### 2. Application Layer
- **Purpose**: Application-specific business logic and use cases
- **Contains**: Services, actions, workflows
- **Rules**:
  - Orchestrates domain objects
  - Implements use cases
  - Handles application flow

#### 3. Domain Layer ⭐
- **Purpose**: Core business logic and rules
- **Contains**: Entities, value objects, interfaces
- **Rules**:
  - Independent of frameworks
  - No external dependencies
  - Pure business logic only

#### 4. Infrastructure Layer
- **Purpose**: External services and technical concerns
- **Contains**: Database, APIs, utilities
- **Rules**:
  - Implements interfaces from Domain layer
  - Handles technical details
  - Swappable implementations

## SOLID Principles

### 1. Single Responsibility Principle (SRP)

> "A class should have one, and only one, reason to change."

**Implementation:**
- Validators only validate
- Mappers only transform data
- Repositories only handle data access
- Services orchestrate but don't implement details

**Example:**
```typescript
// ✅ Good: Single responsibility
class BlogValidator {
  validate(data: unknown): ValidationResult<Blog> {
    // Only validation logic
  }
}

class BlogRepository {
  async findById(id: string): Promise<Blog> {
    // Only data access logic
  }
}

class BlogMapper {
  toModel(response: BlogResponse): Blog {
    // Only transformation logic
  }
}
```

### 2. Open/Closed Principle (OCP)

> "Software entities should be open for extension, but closed for modification."

**Implementation:**
- Use interfaces for abstractions
- Extend behavior through new implementations
- Don't modify existing working code

**Example:**
```typescript
// Interface (closed for modification)
interface IDataRepository<T> {
  findById(id: string): Promise<T>;
}

// Open for extension with new implementations
class PocketBaseRepository<T> implements IDataRepository<T> {
  async findById(id: string): Promise<T> { }
}

class RestApiRepository<T> implements IDataRepository<T> {
  async findById(id: string): Promise<T> { }
}
```

### 3. Liskov Substitution Principle (LSP)

> "Derived classes must be substitutable for their base classes."

**Implementation:**
- All implementations honor interface contracts
- Subclasses don't break parent class behavior
- Proper inheritance hierarchies

**Example:**
```typescript
interface IMapper<TSource, TTarget> {
  toModel(source: TSource): TTarget;
}

// All mappers are interchangeable
class BlogMapper implements IMapper<BlogResponse, Blog> { }
class AuthorMapper implements IMapper<AuthorResponse, Author> { }
```

### 4. Interface Segregation Principle (ISP)

> "Clients should not be forced to depend on interfaces they don't use."

**Implementation:**
- Split large interfaces into smaller, focused ones
- Create role-specific interfaces
- Clients depend only on what they need

**Example:**
```typescript
// ✅ Good: Segregated interfaces
interface IReadRepository<T> {
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}

interface IWriteRepository<T> {
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<void>;
}

// Clients can depend on only what they need
class BlogReader {
  constructor(private repo: IReadRepository<Blog>) {}
}
```

### 5. Dependency Inversion Principle (DIP)

> "Depend on abstractions, not concretions."

**Implementation:**
- Services depend on interfaces, not implementations
- Inject dependencies through constructors
- High-level modules don't depend on low-level modules

**Example:**
```typescript
// ✅ Good: Depends on abstraction
class BlogService {
  constructor(
    private repository: IDataRepository<Blog>,
    private logger: ILogger
  ) {}
  
  async getBlog(id: string): Promise<Blog> {
    this.logger.info(`Fetching blog ${id}`);
    return this.repository.findById(id);
  }
}
```

## Directory Structure

```
finwage/
├── app/                        # Next.js 15 App Router
│   ├── (routes)/              # Route groups
│   ├── api/                   # API routes
│   └── layout.tsx             # Root layout
│
├── components/                # React components
│   ├── sections/              # Page sections
│   ├── shared/                # Shared components
│   └── ui/                    # UI primitives
│
├── lib/                       # Core application code
│   ├── domain/                # Domain layer ⭐
│   │   ├── interfaces/        # Contracts and abstractions
│   │   ├── models/            # Entities and value objects
│   │   ├── mappers/           # Data transformations
│   │   ├── validators/        # Input validation
│   │   └── README.md          # Domain documentation
│   │
│   ├── services/              # Business logic services
│   ├── actions/               # Server actions
│   ├── utils/                 # Utility functions
│   ├── api.ts                 # API client
│   └── pocketbase.ts          # Database client
│
├── types/                     # TypeScript type definitions
├── hooks/                     # Custom React hooks
├── public/                    # Static assets
└── docs/                      # Documentation
```

## Design Patterns

### 1. Repository Pattern
- Abstracts data access logic
- Provides consistent interface for data operations
- Makes testing easier with mock repositories

### 2. Factory Pattern
- Creates objects without specifying exact class
- Example: `MapperFactory` for creating mappers

### 3. Strategy Pattern
- Defines family of algorithms
- Makes them interchangeable
- Example: Different cache strategies

### 4. Mapper Pattern
- Separates domain models from DTOs
- Handles data transformation
- Example: `BlogMapper`, `AuthorMapper`

### 5. Result Pattern
- Wraps operation results
- Explicit error handling
- Type-safe success/failure

```typescript
interface Result<T, E = Error> {
  success: boolean;
  data?: T;
  error?: E;
}
```

## Best Practices

### 1. DRY (Don't Repeat Yourself)
- Extract common logic into utilities
- Use composition over duplication
- Centralize configuration

### 2. KISS (Keep It Simple, Stupid)
- Simple solutions over complex ones
- Clear and readable code
- Avoid over-engineering

### 3. YAGNI (You Aren't Gonna Need It)
- Build what's needed now
- Don't add speculative features
- Refactor when needed

### 4. Strong Typing
- Use TypeScript strictly
- Avoid `any` type
- Define clear interfaces

### 5. Error Handling
- No silent failures
- Descriptive error messages
- Proper error logging

### 6. Testing
- Write testable code
- Mock dependencies
- Test business logic thoroughly

### 7. Security
- Validate all inputs
- Sanitize user data
- Handle secrets safely
- Use environment variables

### 8. Performance
- Implement caching strategically
- Optimize database queries
- Use pagination
- Lazy load when appropriate

### 9. Maintainability
- Write self-documenting code
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Use meaningful names

### 10. Scalability
- Design for growth
- Use efficient algorithms
- Optimize when needed
- Plan for high load

## Code Quality Guidelines

### Naming Conventions

```typescript
// Classes: PascalCase
class BlogService { }

// Interfaces: PascalCase with 'I' prefix
interface IDataRepository { }

// Functions/Methods: camelCase
function getBlogBySlug() { }

// Constants: UPPER_SNAKE_CASE
const MAX_PAGE_SIZE = 100;

// Private properties: camelCase with '_' prefix
class Example {
  private _privateField: string;
}
```

### File Organization

```typescript
// 1. Imports (grouped and sorted)
import { useState } from 'react';
import type { Blog } from '@/lib/domain';

// 2. Type definitions
interface Props {
  blog: Blog;
}

// 3. Constants
const DEFAULT_LIMIT = 10;

// 4. Component/Function
export function BlogList({ blogs }: Props) {
  // Implementation
}

// 5. Exports
export type { Props };
```

### Comments

```typescript
/**
 * Fetch blog by slug with author and category
 * 
 * @param slug - The blog post slug
 * @returns Blog with expanded relations or null if not found
 * 
 * @example
 * ```typescript
 * const blog = await getBlogBySlug('my-post');
 * if (blog) {
 *   console.log(blog.title);
 * }
 * ```
 */
async function getBlogBySlug(slug: string): Promise<Blog | null> {
  // Implementation
}
```

### Error Handling

```typescript
// ✅ Good: Explicit error handling
try {
  const result = await fetchData();
  if (!result.success) {
    logger.error('Failed to fetch data', result.error);
    return fallbackValue;
  }
  return result.data;
} catch (error) {
  logger.error('Unexpected error', error);
  throw new ApplicationError('Failed to process request');
}
```

### Async/Await

```typescript
// ✅ Good: Consistent async/await
async function processBlogs(): Promise<Blog[]> {
  const blogs = await fetchBlogs();
  const processed = await Promise.all(
    blogs.map(blog => processBlog(blog))
  );
  return processed;
}
```

## Migration Guide

To apply these principles to existing code:

1. **Identify domain entities** → Create models in `lib/domain/models/`
2. **Extract validation** → Use validators in `lib/domain/validators/`
3. **Create mappers** → Transform data in `lib/domain/mappers/`
4. **Define interfaces** → Abstract contracts in `lib/domain/interfaces/`
5. **Refactor services** → Use domain layer in `lib/services/`

## Additional Resources

- [Domain Layer Documentation](./lib/domain/README.md)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

## Questions?

For questions about the architecture or design decisions, please refer to:
- This document for high-level architecture
- `lib/domain/README.md` for domain layer specifics
- Code comments for implementation details
