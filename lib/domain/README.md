# Domain Layer Architecture

## Overview

The domain layer represents the core business logic and rules of the application. It is independent of external frameworks, databases, and UI implementations, following **Clean Architecture** principles.

## Structure

```
lib/domain/
├── interfaces/          # Contracts and abstractions (DIP)
│   ├── data-repository.interface.ts
│   └── common.interface.ts
├── models/             # Domain entities and value objects
│   ├── entities.ts
│   └── value-objects.ts
├── mappers/            # Data transformation (SRP)
│   └── data-mappers.ts
├── validators/         # Input validation (SRP)
│   └── input-validators.ts
└── index.ts           # Exports
```

## SOLID Principles Implementation

### 1. Single Responsibility Principle (SRP)

Each class/module has one reason to change:

- **Validators**: Only validate input data
- **Mappers**: Only transform data between formats
- **Entities**: Only represent business objects
- **Repositories**: Only handle data access

**Example:**
```typescript
// ❌ Bad: Multiple responsibilities
class BlogService {
  validate(data) { /* validation */ }
  save(data) { /* database logic */ }
  sendEmail() { /* email logic */ }
}

// ✅ Good: Single responsibility
class BlogValidator {
  validate(data) { /* validation only */ }
}
class BlogRepository {
  save(data) { /* database only */ }
}
class EmailService {
  sendEmail() { /* email only */ }
}
```

### 2. Open/Closed Principle (OCP)

Open for extension, closed for modification:

- **Interfaces** allow new implementations without changing existing code
- **Abstract classes** provide base behavior that can be extended

**Example:**
```typescript
// Base interface (closed for modification)
interface IDataRepository<T> {
  findById(id: string): Promise<Result<T>>;
  findAll(): Promise<Result<T[]>>;
}

// Multiple implementations (open for extension)
class PocketBaseRepository<T> implements IDataRepository<T> { }
class RestApiRepository<T> implements IDataRepository<T> { }
class GraphQLRepository<T> implements IDataRepository<T> { }
```

### 3. Liskov Substitution Principle (LSP)

Derived classes must be substitutable for their base classes:

```typescript
interface IMapper<TSource, TTarget> {
  toModel(source: TSource): TTarget;
  toResponse(model: TTarget): TSource;
}

// All mappers can be used interchangeably
class BlogMapper implements IMapper<BlogsResponse, Blog> { }
class AuthorMapper implements IMapper<AuthorsResponse, Author> { }
```

### 4. Interface Segregation Principle (ISP)

Clients shouldn't depend on interfaces they don't use:

```typescript
// ❌ Bad: Fat interface
interface IBigRepository {
  findById();
  findAll();
  create();
  update();
  delete();
  search();
  export();
  import();
}

// ✅ Good: Segregated interfaces
interface IReadRepository {
  findById();
  findAll();
}
interface IWriteRepository {
  create();
  update();
  delete();
}
interface IQueryRepository extends IReadRepository {
  search();
}
```

### 5. Dependency Inversion Principle (DIP)

Depend on abstractions, not concretions:

```typescript
// ❌ Bad: Depends on concrete implementation
class BlogService {
  private pocketbase = new PocketBaseClient();
  
  async getBlogs() {
    return this.pocketbase.collection('blogs').getFullList();
  }
}

// ✅ Good: Depends on abstraction
class BlogService {
  constructor(private repository: IDataRepository<Blog>) {}
  
  async getBlogs() {
    return this.repository.findAll();
  }
}
```

## Clean Architecture Layers

```
┌─────────────────────────────────────┐
│      Presentation Layer (UI)        │
│    (Next.js Pages, Components)      │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│      Application Layer               │
│   (Use Cases, Server Actions)       │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│       Domain Layer ⭐                │
│  (Entities, Value Objects, Logic)   │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│    Infrastructure Layer              │
│  (PocketBase, APIs, External Deps)  │
└─────────────────────────────────────┘
```

## Best Practices

### 1. DRY (Don't Repeat Yourself)

```typescript
// ❌ Bad: Repeated validation logic
function validateBlog1(data) {
  if (!data.title || data.title.length < 5) return false;
  // ...
}
function validateBlog2(data) {
  if (!data.title || data.title.length < 5) return false;
  // ...
}

// ✅ Good: Centralized validation
const validator = new BlogCreateValidator();
validator.validate(data);
```

### 2. KISS (Keep It Simple, Stupid)

```typescript
// ❌ Bad: Over-engineered
class ComplexBlogFactory extends AbstractFactory 
  implements FactoryInterface, Serializable {
  // 500 lines of code
}

// ✅ Good: Simple and clear
class BlogMapper {
  toModel(response: BlogsResponse): Blog {
    // Simple transformation
  }
}
```

### 3. YAGNI (You Aren't Gonna Need It)

Only implement what's needed now, not what might be needed later.

```typescript
// ❌ Bad: Implementing features that aren't needed
class Blog {
  // 50+ methods for every possible future use case
}

// ✅ Good: Only what's currently needed
class Blog {
  // Essential properties and methods only
}
```

### 4. Strong Typing

```typescript
// ❌ Bad
function process(data: any) { }

// ✅ Good
function process(data: ContactFormInput): Result<ContactEnquiry> { }
```

### 5. Error Handling

```typescript
// ✅ Use Result type for operations that can fail
interface Result<T, E = Error> {
  success: boolean;
  data?: T;
  error?: E;
}

async function getBlog(id: string): Promise<Result<Blog>> {
  try {
    const blog = await repository.findById(id);
    return { success: true, data: blog };
  } catch (error) {
    return { success: false, error };
  }
}
```

### 6. Immutability with Value Objects

```typescript
// Value objects are immutable
const email = Email.create('user@example.com');
// email.value = 'new@email.com'; // ❌ Not possible

const slug = Slug.create('My Blog Post'); // 'my-blog-post'
const money = Money.create(99.99, 'USD');
```

## Usage Examples

### Creating a Blog with Validation

```typescript
import { Validators, BlogMapper } from '@/lib/domain';

// Validate input
const result = Validators.blogCreate.validate(inputData);

if (!result.success) {
  return { errors: result.errors };
}

// Map to domain model
const mapper = new BlogMapper();
const blog = mapper.toModel(result.data);

// Save using repository
await repository.create(blog);
```

### Using Value Objects

```typescript
import { Email, Slug, Money } from '@/lib/domain';

// Email with validation
const email = Email.create('user@example.com');
console.log(email.getDomain()); // 'example.com'

// Slug generation
const slug = Slug.create('My Awesome Post');
console.log(slug.toString()); // 'my-awesome-post'

// Money calculations
const price = Money.create(99.99, 'USD');
const tax = price.multiply(0.1);
const total = price.add(tax);
console.log(total.format()); // '$109.99'
```

### Repository Pattern

```typescript
// Define your repository
class BlogRepository implements IQueryRepository<Blog> {
  async findById(id: string): Promise<Result<Blog>> {
    // Implementation
  }
  
  async findOneBy(field: keyof Blog, value: unknown): Promise<Result<Blog | null>> {
    // Implementation
  }
}

// Use in service
class BlogService {
  constructor(private repository: IQueryRepository<Blog>) {}
  
  async getBlogBySlug(slug: string): Promise<Blog | null> {
    const result = await this.repository.findOneBy('slug', slug);
    return result.success ? result.data : null;
  }
}
```

## Benefits

1. **Testability**: Domain logic is isolated and easy to test
2. **Maintainability**: Clear separation of concerns
3. **Scalability**: Easy to add new features without breaking existing code
4. **Flexibility**: Easy to swap implementations (e.g., change database)
5. **Type Safety**: Strong typing catches errors at compile time
6. **Reusability**: Domain models can be used across different contexts

## Migration Guide

To migrate existing code to use the domain layer:

1. **Identify business entities** → Create domain models
2. **Extract validation logic** → Use validators
3. **Create mappers** → Transform API responses to domain models
4. **Define interfaces** → Abstract data access
5. **Update services** → Use domain models instead of raw API responses

## Related Documentation

- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html)
