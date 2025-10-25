#!/usr/bin/env node

/**
 * Webhook Testing Script
 * 
 * Test PocketBase webhook integration and Next.js cache revalidation
 * 
 * Usage:
 *   npm run test:webhooks
 *   node scripts/test-webhooks.js --webhook-url=http://localhost:3000/api/webhooks/pocketbase
 */

const https = require('https');
const http = require('http');

// Configuration
const config = {
  webhookUrl: process.env.WEBHOOK_URL || 'http://localhost:3000/api/webhooks/pocketbase',
  revalidationUrl: process.env.REVALIDATION_URL || 'http://localhost:3000',
  webhookSecret: process.env.POCKETBASE_WEBHOOK_SECRET || 'test-secret',
  apiKey: process.env.REVALIDATION_API_KEY || 'test-api-key',
  verbose: process.argv.includes('--verbose') || process.argv.includes('-v'),
};

// Parse command line arguments
process.argv.forEach((arg) => {
  if (arg.startsWith('--webhook-url=')) {
    config.webhookUrl = arg.split('=')[1];
  }
  if (arg.startsWith('--revalidation-url=')) {
    config.revalidationUrl = arg.split('=')[1];
  }
  if (arg.startsWith('--secret=')) {
    config.webhookSecret = arg.split('=')[1];
  }
  if (arg.startsWith('--api-key=')) {
    config.apiKey = arg.split('=')[1];
  }
});

// Test data generators
const generateTestPayloads = {
  blog: (action = 'create') => ({
    action,
    collection: 'blogs',
    record: {
      id: 'test-blog-123',
      slug: 'test-blog-post',
      title: 'Test Blog Post',
      published: true,
      featured: false,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
    admin: {
      id: 'admin-123',
      email: 'admin@example.com',
    },
  }),

  testimonial: (action = 'create') => ({
    action,
    collection: 'testimonials',
    record: {
      id: 'test-testimonial-123',
      name: 'John Doe',
      company: 'Test Company',
      quote: 'This is a test testimonial',
      verified: true,
      featured: true,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
    admin: {
      id: 'admin-123',
      email: 'admin@example.com',
    },
  }),

  job: (action = 'create') => ({
    action,
    collection: 'job_positions',
    record: {
      id: 'test-job-123',
      title: 'Senior Developer',
      department: 'Engineering',
      location: 'Remote',
      status: 'open',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
    admin: {
      id: 'admin-123',
      email: 'admin@example.com',
    },
  }),
};

// HTTP request helper
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const req = client.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: jsonData,
            success: res.statusCode >= 200 && res.statusCode < 300,
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: data,
            success: res.statusCode >= 200 && res.statusCode < 300,
          });
        }
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

// Test webhook endpoint
async function testWebhook(payload, testName) {
  const startTime = Date.now();
  
  try {
    const result = await makeRequest(config.webhookUrl, {
      method: 'POST',
      headers: {
        'x-webhook-secret': config.webhookSecret,
      },
      body: payload,
    });

    const duration = Date.now() - startTime;
    
    if (config.verbose) {
      console.log(`  Response: ${JSON.stringify(result.data, null, 2)}`);
    }

    return {
      success: result.success,
      duration,
      status: result.status,
      data: result.data,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      success: false,
      duration,
      error: error.message,
    };
  }
}

// Test revalidation API
async function testRevalidation(endpoint, payload, testName) {
  const startTime = Date.now();
  const url = `${config.revalidationUrl}/api/revalidate/${endpoint}`;
  
  try {
    const result = await makeRequest(url, {
      method: 'POST',
      headers: {
        'x-api-key': config.apiKey,
      },
      body: payload,
    });

    const duration = Date.now() - startTime;
    
    if (config.verbose) {
      console.log(`  Response: ${JSON.stringify(result.data, null, 2)}`);
    }

    return {
      success: result.success,
      duration,
      status: result.status,
      data: result.data,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      success: false,
      duration,
      error: error.message,
    };
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting Webhook Integration Tests\\n');
  console.log('Configuration:');
  console.log(`  Webhook URL: ${config.webhookUrl}`);
  console.log(`  Revalidation URL: ${config.revalidationUrl}`);
  console.log(`  Webhook Secret: ${config.webhookSecret ? '***' : 'Not set'}`);
  console.log(`  API Key: ${config.apiKey ? '***' : 'Not set'}`);
  console.log(`  Verbose: ${config.verbose}\\n`);

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  // Webhook tests
  console.log('📡 Testing Webhook Endpoints:\\n');

  const webhookTests = [
    { name: 'Blog Create Webhook', payload: generateTestPayloads.blog('create') },
    { name: 'Blog Update Webhook', payload: generateTestPayloads.blog('update') },
    { name: 'Blog Delete Webhook', payload: generateTestPayloads.blog('delete') },
    { name: 'Testimonial Create Webhook', payload: generateTestPayloads.testimonial('create') },
    { name: 'Job Position Create Webhook', payload: generateTestPayloads.job('create') },
  ];

  for (const test of webhookTests) {
    totalTests++;
    console.log(`  Testing: ${test.name}...`);
    
    const result = await testWebhook(test.payload, test.name);
    
    if (result.success) {
      passedTests++;
      console.log(`  ✅ ${test.name} - Passed (${result.duration}ms)`);
    } else {
      failedTests++;
      console.log(`  ❌ ${test.name} - Failed (${result.duration}ms)`);
      if (result.error) {
        console.log(`     Error: ${result.error}`);
      } else {
        console.log(`     Status: ${result.status}`);
        console.log(`     Response: ${JSON.stringify(result.data)}`);
      }
    }
    
    if (config.verbose) {
      console.log('');
    }
  }

  // Revalidation API tests
  console.log('\\n🔄 Testing Revalidation API:\\n');

  const revalidationTests = [
    {
      name: 'Collection Revalidation',
      endpoint: 'collection',
      payload: { collection: 'blogs', record: { id: 'test-123', slug: 'test-post' } },
    },
    {
      name: 'Tag Revalidation',
      endpoint: 'tag',
      payload: { tags: ['blogs', 'testimonials'] },
    },
    {
      name: 'Path Revalidation',
      endpoint: 'path',
      payload: { paths: ['/blog', '/pricing'] },
    },
  ];

  for (const test of revalidationTests) {
    totalTests++;
    console.log(`  Testing: ${test.name}...`);
    
    const result = await testRevalidation(test.endpoint, test.payload, test.name);
    
    if (result.success) {
      passedTests++;
      console.log(`  ✅ ${test.name} - Passed (${result.duration}ms)`);
    } else {
      failedTests++;
      console.log(`  ❌ ${test.name} - Failed (${result.duration}ms)`);
      if (result.error) {
        console.log(`     Error: ${result.error}`);
      } else {
        console.log(`     Status: ${result.status}`);
        console.log(`     Response: ${JSON.stringify(result.data)}`);
      }
    }
    
    if (config.verbose) {
      console.log('');
    }
  }

  // Summary
  console.log('\\n📊 Test Summary:');
  console.log(`  Total Tests: ${totalTests}`);
  console.log(`  Passed: ${passedTests}`);
  console.log(`  Failed: ${failedTests}`);
  console.log(`  Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);

  if (failedTests > 0) {
    console.log('\\n💡 Troubleshooting Tips:');
    console.log('  - Ensure your Next.js application is running');
    console.log('  - Check that environment variables are set correctly');
    console.log('  - Verify webhook secret and API key match your configuration');
    console.log('  - Check server logs for detailed error messages');
    process.exit(1);
  } else {
    console.log('\\n🎉 All tests passed! Your webhook integration is working correctly.');
    process.exit(0);
  }
}

// Health check
async function healthCheck() {
  console.log('🏥 Running Health Check...\\n');
  
  try {
    // Test webhook endpoint health
    const webhookHealth = await makeRequest(config.webhookUrl, { method: 'GET' });
    console.log(`Webhook Endpoint: ${webhookHealth.success ? '✅ Healthy' : '❌ Unhealthy'}`);
    
    // Test revalidation API health
    const revalidationHealth = await makeRequest(`${config.revalidationUrl}/api/revalidate/collection`, { method: 'GET' });
    console.log(`Revalidation API: ${revalidationHealth.success ? '✅ Healthy' : '❌ Unhealthy'}`);
    
    console.log('');
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    console.log('');
  }
}

// Main execution
async function main() {
  if (process.argv.includes('--health')) {
    await healthCheck();
    return;
  }

  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
Webhook Testing Script

Usage:
  node scripts/test-webhooks.js [options]

Options:
  --webhook-url=URL       Webhook endpoint URL (default: http://localhost:3000/api/webhooks/pocketbase)
  --revalidation-url=URL  Revalidation API base URL (default: http://localhost:3000)
  --secret=SECRET         Webhook secret for authentication
  --api-key=KEY          API key for revalidation endpoints
  --verbose, -v          Verbose output
  --health              Run health check only
  --help, -h            Show this help message

Environment Variables:
  WEBHOOK_URL             Same as --webhook-url
  REVALIDATION_URL        Same as --revalidation-url
  POCKETBASE_WEBHOOK_SECRET   Same as --secret
  REVALIDATION_API_KEY    Same as --api-key

Examples:
  npm run test:webhooks
  node scripts/test-webhooks.js --verbose
  node scripts/test-webhooks.js --webhook-url=https://myapp.com/api/webhooks/pocketbase
    `);
    return;
  }

  await healthCheck();
  await runTests();
}

main().catch(console.error);