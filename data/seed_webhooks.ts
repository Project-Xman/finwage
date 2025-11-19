import PocketBase from 'pocketbase';

// CONFIGURATION
const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD;

// The URL where PocketBase will send the webhook events
// CHANGE THIS to your actual production URL
const WEBHOOK_TARGET_URL = process.env.WEBHOOK_TARGET_URL || "https://finwage.com/api/webhooks/pocketbase";

// The secret to verify the webhook signature
const WEBHOOK_SECRET = process.env.POCKETBASE_WEBHOOK_SECRET || "change-me-to-a-secure-random-string";

const COLLECTIONS_TO_MONITOR = [
  "authors",
  "blogs",
  "category",
  "company_milestones",
  "compliance_items",
  "contact_options",
  "cta_cards",
  "employee_benefits",
  "employer_stats",
  "faq_topics",
  "faqs",
  "features",
  "integrations",
  "jobs",
  "leadership",
  "locations",
  "partners",
  "press",
  "pricing_plans",
  "process_steps",
  "resource_articles",
  "resource_categories",
  "resource_downloads",
  "security_features",
  "status",
  "support",
  "testimonials",
  "values"
];

async function seedWebhooks() {
  console.log(`Connecting to PocketBase at ${POCKETBASE_URL}...`);
  const pb = new PocketBase(POCKETBASE_URL);

  try {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      console.error("Error: POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD env vars are required.");
      process.exit(1);
    }

    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log("Authenticated as admin");

    for (const collectionName of COLLECTIONS_TO_MONITOR) {
      const webhookName = `Revalidate ${collectionName}`;
      
      // Check if a webhook for this collection already exists to avoid duplicates
      try {
        const existing = await pb.collection('webhooks').getFirstListItem(`collection="${collectionName}"`);
        if (existing) {
            console.log(`Webhook for "${collectionName}" already exists. Skipping.`);
            
            // Optional: Update existing webhook if needed
            // await pb.collection('webhooks').update(existing.id, {
            //     destination: WEBHOOK_TARGET_URL,
            //     headers: { "x-webhook-secret": WEBHOOK_SECRET }
            // });
            continue;
        }
      } catch (e) {
        // Not found, proceed to create
      }

      const data = {
        name: webhookName,
        collection: collectionName,
        destination: WEBHOOK_TARGET_URL,
        headers: {
            "x-webhook-secret": WEBHOOK_SECRET
        },
        active: true,
        event_type: ["create", "update", "delete"]
      };

      try {
        await pb.collection('webhooks').create(data);
        console.log(`✅ Created webhook for "${collectionName}"`);
      } catch (err: any) {
        console.error(`❌ Failed to create webhook for "${collectionName}":`, err.message);
      }
    }

    console.log("\nWebhook seeding completed!");
    console.log(`Target URL: ${WEBHOOK_TARGET_URL}`);
    console.log(`Secret: ${WEBHOOK_SECRET}`);

  } catch (error: any) {
    console.error("Fatal error seeding webhooks:", error.message);
  }
}

seedWebhooks();
