/**
 * FinWage PocketBase Seed Script (Refactored)
 * 
 * This script seeds the PocketBase database following SOLID principles.
 * - Single Responsibility: Each seeder handles one collection
 * - Open/Closed: Easy to add new seeders without modifying existing code
 * - Dependency Inversion: Depends on abstractions (ISeeder interface)
 * - Interface Segregation: Small, focused interfaces
 * - Liskov Substitution: All seeders are substitutable
 * 
 * Usage: bun run data/seed.ts or npx tsx data/seed.ts
 */

import PocketBase from 'pocketbase';
import { SeederOrchestrator } from '@/lib/seeders/orchestrator';
import { CategorySeeder } from '@/lib/seeders/category-seeder';
import { AuthorSeeder } from '@/lib/seeders/author-seeder';
import { BlogSeeder } from '@/lib/seeders/blog-seeder';

// ============================================================
// CONFIGURATION
// ============================================================

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://localhost:8090';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@finwage.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@12345';
const VERBOSE = process.env.VERBOSE === 'true';

// ============================================================
// AUTHENTICATION
// ============================================================

/**
 * Authenticate with PocketBase admin account
 * Handles error cases with descriptive messages
 */
async function authenticateAdmin(pb: PocketBase): Promise<void> {
  console.log('🔐 Authenticating with PocketBase...');
  
  try {
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Authenticated as admin successfully\n');
  } catch (error: any) {
    console.error('❌ Admin authentication failed:', error.message);
    console.error('\nPlease ensure:');
    console.error('  1. PocketBase is running (./pocketbase serve)');
    console.error('  2. Admin credentials are correct');
    console.error('  3. POCKETBASE_URL is accessible\n');
    throw new Error('Failed to authenticate with PocketBase');
  }
}

// ============================================================
// MAIN SEEDING FUNCTION
// ============================================================

async function seedData(): Promise<void> {
  // Initialize PocketBase client
  const pb = new PocketBase(POCKETBASE_URL);
  
  try {
    // Authenticate
    await authenticateAdmin(pb);
    
    // Create orchestrator
    const orchestrator = new SeederOrchestrator();
    
    // Register seeders
    // Order doesn't matter - orchestrator handles dependencies
    orchestrator.registerMany([
      new CategorySeeder(pb, VERBOSE),
      new AuthorSeeder(pb, VERBOSE),
      new BlogSeeder(pb, VERBOSE),
      // Add more seeders here as they are created
      // new CompanyMilestoneSeeder(pb, VERBOSE),
      // new ComplianceItemSeeder(pb, VERBOSE),
      // new ContactOptionSeeder(pb, VERBOSE),
      // ... etc
    ]);
    
    // Execute all seeders in correct dependency order
    await orchestrator.execute();
    
    console.log('🎉 Your FinWage database is ready to use!\n');
    
  } catch (error: any) {
    console.error('\n❌ Seeding failed:', error.message);
    if (error.data) {
      console.error('Details:', JSON.stringify(error.data, null, 2));
    }
    process.exit(1);
  } finally {
    // Clear auth
    pb.authStore.clear();
  }
}

// ============================================================
// RUN SEEDER
// ============================================================

// Entry point
seedData();
