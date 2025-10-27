/**
 * Seeder Orchestrator
 * 
 * Manages the execution of all seeders in the correct order.
 * Follows Single Responsibility Principle - only handles seeder orchestration.
 * Implements Dependency Inversion Principle - depends on ISeeder abstraction.
 */

import type PocketBase from 'pocketbase';
import type { ISeeder, SeederResult, SeederConfig } from '@/types/seeders';
import type { DependentSeeder } from './base-seeder';

/**
 * Orchestrates seeder execution with dependency management
 */
export class SeederOrchestrator {
  private seeders: Map<string, ISeeder> = new Map();
  private results: Map<string, SeederResult> = new Map();
  private recordCache: Map<string, string[]> = new Map();
  
  /**
   * Register a seeder
   * @param seeder - Seeder instance to register
   */
  register(seeder: ISeeder): void {
    this.seeders.set(seeder.name, seeder);
  }
  
  /**
   * Register multiple seeders
   * @param seeders - Array of seeder instances
   */
  registerMany(seeders: ISeeder[]): void {
    seeders.forEach(seeder => this.register(seeder));
  }
  
  /**
   * Execute all registered seeders in dependency order
   * @returns Map of seeder results
   */
  async execute(): Promise<Map<string, SeederResult>> {
    console.log('\n📊 Starting seeder orchestration...\n');
    
    // Build execution order based on dependencies
    const executionOrder = this.buildExecutionOrder();
    
    // Execute seeders in order
    for (const seederName of executionOrder) {
      const seeder = this.seeders.get(seederName);
      if (!seeder) {
        throw new Error(`Seeder not found: ${seederName}`);
      }
      
      try {
        // Inject dependencies for dependent seeders
        if (this.isDependent Seeder(seeder)) {
          this.injectDependencies(seeder as DependentSeeder);
        }
        
        // Execute seeder
        const recordIds = await seeder.seed();
        
        // Cache results for dependent seeders
        this.recordCache.set(seederName, recordIds);
        
        // Store result
        this.results.set(seederName, {
          collection: seederName,
          recordIds,
          count: recordIds.length,
          success: true
        });
        
      } catch (error: any) {
        // Store error result
        this.results.set(seederName, {
          collection: seederName,
          recordIds: [],
          count: 0,
          success: false,
          error
        });
        
        // Stop execution on error (can be configured to continue)
        throw new Error(`Seeder ${seederName} failed: ${error.message}`);
      }
    }
    
    this.printSummary();
    return this.results;
  }
  
  /**
   * Build execution order based on dependencies
   * Uses topological sort to ensure dependencies are seeded first
   */
  private buildExecutionOrder(): string[] {
    const order: string[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();
    
    const visit = (seederName: string) => {
      if (visited.has(seederName)) return;
      if (visiting.has(seederName)) {
        throw new Error(`Circular dependency detected: ${seederName}`);
      }
      
      visiting.add(seederName);
      
      const seeder = this.seeders.get(seederName);
      if (seeder && this.isDependentSeeder(seeder)) {
        const dependencies = (seeder as DependentSeeder).getDependencies();
        for (const dep of dependencies) {
          visit(dep);
        }
      }
      
      visiting.delete(seederName);
      visited.add(seederName);
      order.push(seederName);
    };
    
    // Visit all seeders
    for (const seederName of this.seeders.keys()) {
      visit(seederName);
    }
    
    return order;
  }
  
  /**
   * Inject cached record IDs into dependent seeder
   */
  private injectDependencies(seeder: DependentSeeder): void {
    const dependencies = seeder.getDependencies();
    for (const dep of dependencies) {
      const records = this.recordCache.get(dep);
      if (records) {
        seeder.setCachedRecords(dep, records);
      }
    }
  }
  
  /**
   * Check if seeder is a dependent seeder
   */
  private isDependentSeeder(seeder: ISeeder): boolean {
    return 'getDependencies' in seeder && typeof (seeder as any).getDependencies === 'function';
  }
  
  /**
   * Print execution summary
   */
  private printSummary(): void {
    console.log('\n✅ Seeding completed successfully!\n');
    console.log('📊 Summary:');
    
    let totalRecords = 0;
    for (const [name, result] of this.results) {
      console.log(`  - ${name}: ${result.count} records`);
      totalRecords += result.count;
    }
    
    console.log(`\n🎉 Total: ${totalRecords} records created across ${this.results.size} collections\n`);
  }
  
  /**
   * Get results for a specific seeder
   */
  getResult(seederName: string): SeederResult | undefined {
    return this.results.get(seederName);
  }
  
  /**
   * Get all results
   */
  getAllResults(): Map<string, SeederResult> {
    return this.results;
  }
  
  /**
   * Clean up all seeded data (calls cleanup on all seeders)
   */
  async cleanup(): Promise<void> {
    console.log('\n🧹 Cleaning up all seeded data...\n');
    
    for (const seeder of this.seeders.values()) {
      if (seeder.cleanup) {
        await seeder.cleanup();
      }
    }
    
    console.log('✅ Cleanup completed\n');
  }
}

/**
 * Factory function to create and configure orchestrator with all seeders
 * @param pb - PocketBase client instance
 * @param verbose - Enable verbose logging
 */
export function createSeederOrchestrator(pb: PocketBase, verbose: boolean = false): SeederOrchestrator {
  const orchestrator = new SeederOrchestrator();
  
  // Import and register all seeders
  // Note: Seeders will be imported dynamically to avoid circular dependencies
  
  return orchestrator;
}
