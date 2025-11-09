/**
 * Value Objects (DDD - Domain Driven Design)
 *
 * Value objects are immutable objects that represent a conceptual whole.
 * They are defined by their attributes rather than a unique identity.
 */

/**
 * Email value object with validation
 */
export class Email {
  private readonly value: string;

  private constructor(email: string) {
    this.value = email.toLowerCase().trim();
  }

  /**
   * Create an Email instance with validation
   */
  static create(email: string): Email {
    if (!Email.isValid(email)) {
      throw new Error(`Invalid email address: ${email}`);
    }
    return new Email(email);
  }

  /**
   * Validate email format
   */
  static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Get email value
   */
  toString(): string {
    return this.value;
  }

  /**
   * Get email domain
   */
  getDomain(): string {
    return this.value.split("@")[1];
  }

  /**
   * Compare emails
   */
  equals(other: Email): boolean {
    return this.value === other.value;
  }
}

/**
 * Slug value object with generation and validation
 */
export class Slug {
  private readonly value: string;

  private constructor(slug: string) {
    this.value = slug;
  }

  /**
   * Create a Slug from a string
   */
  static create(text: string): Slug {
    const slug = Slug.generate(text);
    return new Slug(slug);
  }

  /**
   * Create a Slug from an existing slug string (with validation)
   */
  static fromString(slug: string): Slug {
    if (!Slug.isValid(slug)) {
      throw new Error(`Invalid slug format: ${slug}`);
    }
    return new Slug(slug);
  }

  /**
   * Generate a URL-friendly slug from text
   */
  static generate(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  }

  /**
   * Validate slug format
   */
  static isValid(slug: string): boolean {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug) && slug.length <= 200;
  }

  /**
   * Get slug value
   */
  toString(): string {
    return this.value;
  }

  /**
   * Compare slugs
   */
  equals(other: Slug): boolean {
    return this.value === other.value;
  }
}

/**
 * Money value object for handling currency amounts
 */
export class Money {
  private constructor(
    private readonly amount: number,
    private readonly currency: string,
  ) {
    if (amount < 0) {
      throw new Error("Amount cannot be negative");
    }
  }

  /**
   * Create a Money instance
   */
  static create(amount: number, currency: string = "USD"): Money {
    return new Money(amount, currency.toUpperCase());
  }

  /**
   * Get amount
   */
  getAmount(): number {
    return this.amount;
  }

  /**
   * Get currency
   */
  getCurrency(): string {
    return this.currency;
  }

  /**
   * Add two money objects (must be same currency)
   */
  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error("Cannot add money with different currencies");
    }
    return Money.create(this.amount + other.amount, this.currency);
  }

  /**
   * Subtract two money objects (must be same currency)
   */
  subtract(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error("Cannot subtract money with different currencies");
    }
    return Money.create(this.amount - other.amount, this.currency);
  }

  /**
   * Multiply by a factor
   */
  multiply(factor: number): Money {
    return Money.create(this.amount * factor, this.currency);
  }

  /**
   * Format as currency string
   */
  format(): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: this.currency,
    }).format(this.amount);
  }

  /**
   * Compare money objects
   */
  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  /**
   * Check if greater than another money object
   */
  greaterThan(other: Money): boolean {
    if (this.currency !== other.currency) {
      throw new Error("Cannot compare money with different currencies");
    }
    return this.amount > other.amount;
  }

  /**
   * Check if less than another money object
   */
  lessThan(other: Money): boolean {
    if (this.currency !== other.currency) {
      throw new Error("Cannot compare money with different currencies");
    }
    return this.amount < other.amount;
  }
}

/**
 * Date range value object
 */
export class DateRange {
  private constructor(
    private readonly startDate: Date,
    private readonly endDate: Date,
  ) {
    if (startDate > endDate) {
      throw new Error("Start date must be before end date");
    }
  }

  /**
   * Create a DateRange instance
   */
  static create(startDate: Date, endDate: Date): DateRange {
    return new DateRange(startDate, endDate);
  }

  /**
   * Get start date
   */
  getStartDate(): Date {
    return this.startDate;
  }

  /**
   * Get end date
   */
  getEndDate(): Date {
    return this.endDate;
  }

  /**
   * Check if a date falls within this range
   */
  contains(date: Date): boolean {
    return date >= this.startDate && date <= this.endDate;
  }

  /**
   * Get duration in days
   */
  getDurationInDays(): number {
    const diff = this.endDate.getTime() - this.startDate.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  /**
   * Check if this range overlaps with another
   */
  overlaps(other: DateRange): boolean {
    return this.startDate <= other.endDate && this.endDate >= other.startDate;
  }
}

/**
 * URL value object with validation
 */
export class Url {
  private readonly value: string;

  private constructor(url: string) {
    this.value = url;
  }

  /**
   * Create a URL instance with validation
   */
  static create(url: string): Url {
    try {
      new URL(url);
      return new Url(url);
    } catch {
      throw new Error(`Invalid URL: ${url}`);
    }
  }

  /**
   * Get URL value
   */
  toString(): string {
    return this.value;
  }

  /**
   * Get domain from URL
   */
  getDomain(): string {
    try {
      const urlObj = new URL(this.value);
      return urlObj.hostname;
    } catch {
      return "";
    }
  }

  /**
   * Check if URL is HTTPS
   */
  isSecure(): boolean {
    return this.value.startsWith("https://");
  }

  /**
   * Compare URLs
   */
  equals(other: Url): boolean {
    return this.value === other.value;
  }
}
