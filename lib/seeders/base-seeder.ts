/**
 * Base Seeder Class
 *
 * Abstract base class for all seeders.
 * Implements Dependency Inversion Principle - depends on PocketBase abstraction.
 * Follows Single Responsibility Principle - handles common seeding concerns only.
 */

import type PocketBase from "pocketbase";
import type { ISeeder, SeederResult } from "@/types/seeders";

/**
 * Abstract base class for all seeders
 * Provides common functionality and enforces structure
 */
export abstract class BaseSeeder implements ISeeder {
  protected readonly pb: PocketBase;
  protected readonly verbose: boolean;

  /**
   * Initialize base seeder
   * @param pb - PocketBase client instance
   * @param verbose - Enable verbose logging
   */
  constructor(pb: PocketBase, verbose: boolean = false) {
    this.pb = pb;
    this.verbose = verbose;
  }

  /**
   * Name of the seeder (must be implemented by subclasses)
   */
  abstract get name(): string;

  /**
   * Collection name this seeder targets (must be implemented by subclasses)
   */
  protected abstract get collectionName(): string;

  /**
   * Get seed data (must be implemented by subclasses)
   */
  protected abstract getSeedData(): Promise<any[]> | any[];

  /**
   * Execute the seeding operation
   * Implements Template Method pattern
   */
  async seed(): Promise<string[]> {
    try {
      this.log(`🌱 Seeding ${this.name}...`);

      const seedData = await this.getSeedData();
      const recordIds: string[] = [];

      for (const data of seedData) {
        try {
          const record = await this.createRecord(data);
          recordIds.push(record.id);
          this.logSuccess(`Created: ${this.getRecordLabel(data)}`);
        } catch (error) {
          this.logError(
            `Failed to create: ${this.getRecordLabel(data)}`,
            error,
          );
          throw error;
        }
      }

      this.log(
        `✅ Completed ${this.name}: ${recordIds.length} records created\n`,
      );
      return recordIds;
    } catch (error) {
      this.logError(`Failed to seed ${this.name}`, error);
      throw error;
    }
  }

  /**
   * Create a single record in the collection
   * Can be overridden for custom creation logic
   */
  protected async createRecord(data: any): Promise<any> {
    return await this.pb.collection(this.collectionName).create(data);
  }

  /**
   * Get a human-readable label for a record (can be overridden)
   */
  protected getRecordLabel(data: any): string {
    return data.name || data.title || data.slug || "Record";
  }

  /**
   * Cleanup seeded data (optional, can be overridden)
   */
  async cleanup(): Promise<void> {
    this.log(`🧹 Cleaning up ${this.name}...`);
    // Subclasses can implement specific cleanup logic
  }

  /**
   * Log a message (only if verbose mode is enabled)
   */
  protected log(message: string): void {
    if (this.verbose) {
      console.log(message);
    }
  }

  /**
   * Log a success message
   */
  protected logSuccess(message: string): void {
    console.log(`  ✓ ${message}`);
  }

  /**
   * Log an error message
   */
  protected logError(message: string, error: any): void {
    console.error(`  ✗ ${message}:`, error.message || error);
  }
}

/**
 * Seeder that depends on other seeders
 * Implements dependency management
 */
export abstract class DependentSeeder extends BaseSeeder {
  protected recordCache: Map<string, string[]> = new Map();

  /**
   * Set cached record IDs from dependent seeders
   */
  setCachedRecords(seederName: string, recordIds: string[]): void {
    this.recordCache.set(seederName, recordIds);
  }

  /**
   * Get cached record IDs from a dependent seeder
   */
  protected getCachedRecords(seederName: string): string[] {
    const records = this.recordCache.get(seederName);
    if (!records || records.length === 0) {
      throw new Error(`No cached records found for dependency: ${seederName}`);
    }
    return records;
  }

  /**
   * Get a random record ID from cached records
   */
  protected getRandomCachedRecord(seederName: string): string {
    const records = this.getCachedRecords(seederName);
    const randomIndex = Math.floor(Math.random() * records.length);
    return records[randomIndex];
  }

  /**
   * Get dependencies for this seeder (must be implemented by subclasses)
   */
  abstract getDependencies(): string[];
}
