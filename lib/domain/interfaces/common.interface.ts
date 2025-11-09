/**
 * Cache Strategy Interface (OCP - Open/Closed Principle)
 *
 * This interface allows different caching strategies to be implemented
 * without modifying existing code. New cache strategies can be added
 * by creating new implementations of this interface.
 */

export interface ICacheStrategy {
  /**
   * Get a value from cache
   */
  get<T>(key: string): Promise<T | null>;

  /**
   * Set a value in cache with optional TTL
   */
  set<T>(key: string, value: T, ttl?: number): Promise<void>;

  /**
   * Remove a value from cache
   */
  delete(key: string): Promise<void>;

  /**
   * Clear all cache entries
   */
  clear(): Promise<void>;

  /**
   * Check if a key exists in cache
   */
  has(key: string): Promise<boolean>;
}

/**
 * Logger Interface (DIP - Dependency Inversion Principle)
 *
 * This interface abstracts logging operations, allowing different
 * logging implementations (console, file, external service) to be used
 * without changing business logic.
 */
export interface ILogger {
  /**
   * Log informational messages
   */
  info(message: string, context?: Record<string, unknown>): void;

  /**
   * Log warning messages
   */
  warn(message: string, context?: Record<string, unknown>): void;

  /**
   * Log error messages
   */
  error(
    message: string,
    error?: Error,
    context?: Record<string, unknown>,
  ): void;

  /**
   * Log debug messages (development only)
   */
  debug(message: string, context?: Record<string, unknown>): void;
}

/**
 * Validator Interface (SRP - Single Responsibility Principle)
 *
 * This interface defines validation operations separately from
 * business logic, following SRP.
 */
export interface IValidator<T> {
  /**
   * Validate data and return validation result
   */
  validate(data: unknown): ValidationResult<T>;

  /**
   * Validate and throw error if invalid
   */
  validateOrThrow(data: unknown): T;
}

/**
 * Validation result structure
 */
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
}

/**
 * Validation error details
 */
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

/**
 * Serializer Interface (SRP - Single Responsibility Principle)
 *
 * Separates data transformation logic from business logic
 */
export interface ISerializer<TInput, TOutput> {
  /**
   * Serialize data to output format
   */
  serialize(data: TInput): TOutput;

  /**
   * Deserialize data from input format
   */
  deserialize(data: TOutput): TInput;
}

/**
 * Event Emitter Interface (OCP - Open/Closed Principle)
 *
 * Allows event-driven architecture without coupling components
 */
export interface IEventEmitter {
  /**
   * Emit an event with optional data
   */
  emit(event: string, data?: unknown): void;

  /**
   * Subscribe to an event
   */
  on(event: string, handler: (data?: unknown) => void): void;

  /**
   * Unsubscribe from an event
   */
  off(event: string, handler: (data?: unknown) => void): void;
}
