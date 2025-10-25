/**
 * Script to add category_text field to Faqs collection
 */

import PocketBase from 'pocketbase';

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || 'admin@projectx.com';
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD || 'Admin@12345';

async function main() {
  console.log('🔧 Adding category_text field to Faqs collection...\n');

  const pb = new PocketBase(POCKETBASE_URL);

  try {
    // Authenticate as admin
    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Authentication successful\n');

    // Get the Faqs collection
    console.log('📋 Fetching Faqs collection...');
    const collections = await pb.collections.getFullList();
    const faqsCollection = collections.find(c => c.name === 'Faqs');
    
    if (!faqsCollection) {
      throw new Error('Faqs collection not found');
    }
    
    console.log('✅ Found Faqs collection\n');

    // Check if category_text field already exists
    const hasField = faqsCollection.schema?.some((field: any) => field.name === 'category_text');
    
    if (hasField) {
      console.log('ℹ️  category_text field already exists');
      return;
    }

    // Add the category_text field
    console.log('➕ Adding category_text field...');
    
    const updatedSchema = [
      ...(faqsCollection.schema || []),
      {
        name: 'category_text',
        type: 'text',
        required: false,
        options: {
          min: null,
          max: null,
          pattern: ''
        }
      }
    ];

    await pb.collections.update(faqsCollection.id, {
      schema: updatedSchema
    });

    console.log('✅ Successfully added category_text field\n');
    console.log('📝 Next step: Run migration script');
    console.log('   bun run scripts/migrate-marketing-data.ts');

  } catch (error: any) {
    console.error('❌ Script failed:', error.message);
    if (error.response?.data) {
      console.error('   Details:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

main();
