/**
 * Script to fix collection schemas
 * Adds missing fields to collections
 */

import PocketBase from 'pocketbase';

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || 'admin@projectx.com';
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD || 'Admin@12345';

async function main() {
  console.log('🔧 Fixing collection schemas...\n');

  const pb = new PocketBase(POCKETBASE_URL);

  try {
    // Authenticate as admin
    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Authentication successful\n');

    // Check if Faqs collection exists and has records
    console.log('📋 Checking Faqs collection...');
    try {
      const faqs = await pb.collection('Faqs').getList(1, 1);
      console.log(`  ℹ️  Faqs collection exists with ${faqs.totalItems} items`);
      
      // Check if category_text field exists by trying to filter
      try {
        await pb.collection('Faqs').getList(1, 1, {
          filter: 'category_text != ""'
        });
        console.log('  ✓ category_text field exists');
      } catch (error: any) {
        console.log('  ⚠️  category_text field might not exist');
        console.log('  → Add it manually in PocketBase admin UI: http://localhost:8090/_/');
      }
    } catch (error: any) {
      console.error('  ✗ Error checking Faqs:', error.message);
    }
    console.log('');

    // Check Contacts collection
    console.log('📞 Checking Contacts collection...');
    try {
      const contacts = await pb.collection('Contacts').getList(1, 1);
      console.log(`  ℹ️  Contacts collection exists with ${contacts.totalItems} items`);
      
      if (contacts.totalItems === 0) {
        console.log('  ⚠️  Contacts collection is empty');
        console.log('  → This might cause 400 errors in your app');
      }
    } catch (error: any) {
      console.error('  ✗ Error checking Contacts:', error.message);
      console.log('  → Collection might not exist or have permission issues');
    }
    console.log('');

    // List all collections
    console.log('📚 Available collections:');
    try {
      const collections = await pb.collections.getFullList();
      collections
        .filter(c => !c.system)
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach(c => {
          console.log(`  - ${c.name} (${c.type})`);
        });
    } catch (error: any) {
      console.error('  ✗ Error listing collections:', error.message);
    }

    console.log('\n✨ Collection check completed!');
    console.log('\n📝 Next steps:');
    console.log('  1. Go to http://localhost:8090/_/');
    console.log('  2. Navigate to Collections → Faqs');
    console.log('  3. Add a "Text" field named "category_text"');
    console.log('  4. Run: bun run scripts/migrate-marketing-data.ts');

  } catch (error: any) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  }
}

main();
