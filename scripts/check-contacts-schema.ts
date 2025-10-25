/**
 * Script to check Contacts collection schema
 */

import PocketBase from 'pocketbase';

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || 'admin@projectx.com';
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD || 'Admin@12345';

async function main() {
    const pb = new PocketBase(POCKETBASE_URL);

    try {
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);

        const collections = await pb.collections.getFullList();
        const contactsCollection = collections.find(c => c.name === 'Contacts');

        if (!contactsCollection) {
            console.log('❌ Contacts collection not found');
            return;
        }

        console.log('📋 Contacts Collection Schema:');
        console.log('Fields:');
        contactsCollection.schema?.forEach((field: any) => {
            console.log(`  - ${field.name} (${field.type})`);
        });

        console.log('\n📊 Sample record:');
        const records = await pb.collection('Contacts').getList(1, 1);
        if (records.items.length > 0) {
            console.log(JSON.stringify(records.items[0], null, 2));
        }

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

main();
