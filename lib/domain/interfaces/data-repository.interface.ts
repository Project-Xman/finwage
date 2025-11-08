/**
 * Data Repository Interface (DIP - Dependency Inversion Principle)
 *
 * This interface defines the contract for data access operations.
 * By depending on this abstraction rather than concrete implementations,
 * we can easily swap data sources (e.g., PocketBase, REST API, GraphQL)
 * without changing business logic.
 */

/**
 * Generic pagination options for list queries
 */
export interface PaginationOptions {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
}

/**
 * Generic paginated response structure
 */
export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

/**
 * Result wrapper for operations that can fail
 */
export interface Result<T, E = Error> {
  success: boolean;
  data?: T;
  error?: E;
}

/**
 * Base repository interface for CRUD operations
 *
 * @template T - The entity type
 * @template ID - The identifier type (usually string)
 */
export interface IDataRepository<T, ID = string> {
  /**
   * Retrieve a single entity by its identifier
   */
  findById(id: ID): Promise<Result<T, Error>>;

  /**
   * Retrieve all entities with optional pagination
   */
  findAll(
    options?: PaginationOptions,
  ): Promise<Result<PaginatedResponse<T>, Error>>;

  /**
   * Create a new entity
   */
  create(data: Partial<T>): Promise<Result<T, Error>>;

  /**
   * Update an existing entity
   */
  update(id: ID, data: Partial<T>): Promise<Result<T, Error>>;

  /**
   * Delete an entity
   */
  delete(id: ID): Promise<Result<boolean, Error>>;
}

/**
 * Extended repository interface with common query operations
 */
export interface IQueryRepository<T> extends IDataRepository<T> {
  /**
   * Find entities by a specific field value
   */
  findBy(field: keyof T, value: unknown): Promise<Result<T[], Error>>;

  /**
   * Find a single entity by a unique field (e.g., slug, email)
   */
  findOneBy(field: keyof T, value: unknown): Promise<Result<T | null, Error>>;

  /**
   * Count total entities matching criteria
   */
  count(filter?: string): Promise<Result<number, Error>>;

  /**
   * Check if an entity exists
   */
  exists(id: string): Promise<Result<boolean, Error>>;
}
