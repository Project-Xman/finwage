/**
 * PocketBase Database Seeder
 * 
 * This script seeds the PocketBase database with initial data.
 * Run with: npx tsx data/seed-db.ts
 */

import { allSeedData } from './seed';

const POCKETBASE_URL = 'http://localhost:8090';

// Seeder user credentials
const SEEDER_EMAIL = 'admin@projectx.com';
const SEEDER_PASSWORD = 'Admin@12345';

interface AuthResponse {
  token: string;
  record: any;
}

async function createSeederUser(): Promise<void> {
  try {
    // Try to create the seeder user
    await fetch(`${POCKETBASE_URL}/api/collections/users/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: SEEDER_EMAIL,
        password: SEEDER_PASSWORD,
        passwordConfirm: SEEDER_PASSWORD,
      }),
    });
  } catch (error) {
    // User might already exist, continue
  }
}

async function loginUser(): Promise<string> {
  const response = await fetch(`${POCKETBASE_URL}/api/collections/users/auth-with-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identity: SEEDER_EMAIL,
      password: SEEDER_PASSWORD,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to login user: ${response.statusText}`);
  }

  const data: AuthResponse = await response.json();
  return data.token;
}

async function createRecord(collection: string, data: any, token: string): Promise<void> {
  try {
    const response = await fetch(`${POCKETBASE_URL}/api/collections/${collection}/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Warning: Failed to create record in ${collection}: ${response.status} - ${errorText}`);
      // Continue anyway, assuming it already exists
    }
  } catch (error) {
    console.log(`Warning: Error creating record in ${collection}: ${error}`);
    // Continue
  }
}

// Mapping of seed keys to collection names
const collectionMapping: Record<string, string> = {
  authors: 'Authors',
  leadership: 'Leadership',
  company_values: 'Values',
  milestones: 'Company_Milestones',
  job_positions: 'Jobs',
  benefits: 'Employee_Benefits',
  company_stats: 'Stats',
  faq_categories: 'Faq_Topics',
  faq_items: 'Faqs',
  contact_options: 'Contacts',
  support_resources: 'Support',
  office_locations: 'Locations',
  categories: 'Category',
  blogs: 'Blogs',
  features: 'Features',
  integrations: 'Integrations',
  partners: 'Partners',
  pricing_plans: 'Pricing_Plans',
  testimonials: 'Testimonials',
  press_releases: 'Press',
};

async function getRecordId(collection: string, filter: string, token: string): Promise<string> {
  const response = await fetch(`${POCKETBASE_URL}/api/collections/${collection}/records?filter=${encodeURIComponent(filter)}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get record from ${collection}: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.items.length === 0) {
    throw new Error(`No record found in ${collection} with filter ${filter}`);
  }

  return data.items[0].id;
}

async function getRecordCount(collection: string, token: string): Promise<number> {
  const response = await fetch(`${POCKETBASE_URL}/api/collections/${collection}/records?perPage=1`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get record count from ${collection}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.totalItems;
}

async function seedDatabase() {
  console.log('Starting database seeding...');

  await createSeederUser();
  const token = await loginUser();
  console.log('User logged in successfully');

  // Collections without relations - create first
  const baseCollections = [
    'authors',
    'leadership',
    'company_values',
    'milestones',
    'job_positions',
    'benefits',
    'company_stats',
    'faq_categories',
    'contact_options',
    'support_resources',
    'office_locations',
    'categories',
    'features',
    'integrations',
    'partners',
    'pricing_plans',
    'testimonials',
    'press_releases',
  ];

  for (const key of baseCollections) {
    const collection = collectionMapping[key];
    if (allSeedData[key as keyof typeof allSeedData]) {
      console.log(`Seeding ${collection}...`);
      const records = allSeedData[key as keyof typeof allSeedData] as any[];
      for (const record of records) {
        await createRecord(collection, record, token);
      }
    }
  }

  // Blogs - depends on authors and categories
  console.log('Seeding Blogs...');
  for (const blog of allSeedData.blogs) {
    try {
      const authorId = await getRecordId('Authors', `slug="${blog.author}"`, token);
      const categoryId = await getRecordId('Category', `slug="${blog.category}"`, token);

      await createRecord('Blogs', {
        ...blog,
        author: authorId,
        category: categoryId,
      }, token);
    } catch (error) {
      console.log(`Warning: Could not seed blog "${blog.title}": ${error}`);
    }
  }

  // FAQ items - depends on faq_categories
  console.log('Seeding Faqs...');
  for (const faq of allSeedData.faq_items) {
    try {
      const categoryId = await getRecordId('Faq_Topics', `name="${faq.category}"`, token);

      await createRecord('Faqs', {
        ...faq,
        category: categoryId,
      }, token);
    } catch (error) {
      console.log(`Warning: Could not seed FAQ "${faq.question}": ${error}`);
    }
  }

  console.log('Database seeding completed successfully!');
}

// Run the seeder
seedDatabase().catch(console.error);