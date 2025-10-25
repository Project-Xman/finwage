# Environment Configuration Guide

This document describes all environment variables required for the FinWage Next.js application and PocketBase integration.

## Required Environment Variables

### NEXT_PUBLIC_POCKETBASE_URL

**Required**: Yes  
**Type**: String (URL)  
**Description**: The base URL of your PocketBase instance  
**Default**: `http://127.0.0.1:8090` (development only)

**Examples**:
- Development: `http://127.0.0.1:8090`
- Production: `https://api.yoursite.com`
- Staging: `https://staging-api.yoursite.com`

**Important Notes**:
- Must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser
- Should NOT include a trailing slash
- Must be a valid HTTP or HTTPS URL
- In production, this should point to your deployed PocketBase instance

## Optional Environment Variables

### NODE_ENV

**Required**: No (automatically set by Next.js)  
**Type**: String  
**Description**: The environment the application is running in  
**Values**: `development`, `production`, `test`  
**Default**: `development`

### PORT

**Required**: No  
**Type**: Number  
**Description**: The port the Next.js development server runs on  
**Default**: `3000`

### DEBUG

**Required**: No  
**Type**: Boolean  
**Description**: Enable verbose logging for debugging  
**Default**: `false`

## Environment Setup

### Local Development

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update `.env.local` with your local PocketBase URL:
   ```env
   NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
   ```

3. Start your PocketBase instance:
   ```bash
   cd data
   ./pocketbase serve
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

### Production Deployment

#### Vercel

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add the following variable:
   - **Name**: `NEXT_PUBLIC_POCKETBASE_URL`
   - **Value**: Your production PocketBase URL (e.g., `https://api.yoursite.com`)
   - **Environment**: Production

#### Docker

1. Create a `.env.production` file:
   ```env
   NEXT_PUBLIC_POCKETBASE_URL=https://api.yoursite.com
   NODE_ENV=production
   ```

2. Update your `docker-compose.yaml` to use the environment file:
   ```yaml
   services:
     nextjs:
       env_file:
         - .env.production
   ```

#### Other Platforms

For other deployment platforms (AWS, Google Cloud, Azure, etc.), add the environment variable through their respective configuration interfaces.

### Staging Environment

For staging environments, create a separate environment configuration:

```env
NEXT_PUBLIC_POCKETBASE_URL=https://staging-api.yoursite.com
NODE_ENV=production
```

## Environment Validation

The application automatically validates required environment variables on startup in production mode. If any required variables are missing, the application will fail to start with a clear error message.

### Validation Logic

The validation is implemented in `/lib/utils/env.ts`:

```typescript
import { validateEnv, getPocketBaseUrl } from '@/lib/utils/env';

// Validate environment on startup (production only)
validateEnv();

// Get PocketBase URL with fallback
const pocketbaseUrl = getPocketBaseUrl();
```

### Manual Validation

You can manually validate your environment configuration:

```typescript
import { validateEnv } from '@/lib/utils/env';

try {
  validateEnv();
  console.log('✓ Environment configuration is valid');
} catch (error) {
  console.error('✗ Environment validation failed:', error);
}
```

## Troubleshooting

### Error: "Missing required environment variables"

**Cause**: Required environment variables are not set  
**Solution**: 
1. Ensure `.env.local` exists in your project root
2. Verify all required variables are defined
3. Restart your development server

### Error: "Failed to connect to PocketBase"

**Cause**: PocketBase URL is incorrect or PocketBase is not running  
**Solution**:
1. Verify PocketBase is running: `curl http://127.0.0.1:8090/api/health`
2. Check the URL in your environment file
3. Ensure there's no trailing slash in the URL

### Environment Variables Not Updating

**Cause**: Next.js caches environment variables  
**Solution**:
1. Stop the development server
2. Delete `.next` folder: `rm -rf .next`
3. Restart the development server: `npm run dev`

## Security Best Practices

1. **Never commit `.env.local` or `.env.production`** - These files contain sensitive configuration and should be gitignored

2. **Use different PocketBase instances for different environments** - Don't use production data in development

3. **Rotate credentials regularly** - If using authentication tokens, rotate them periodically

4. **Use HTTPS in production** - Always use HTTPS URLs for production PocketBase instances

5. **Limit CORS origins** - Configure PocketBase to only accept requests from your Next.js domain

## Environment Variable Checklist

Before deploying to production, verify:

- [ ] `NEXT_PUBLIC_POCKETBASE_URL` is set to production URL
- [ ] Production PocketBase instance is accessible
- [ ] HTTPS is enabled for production PocketBase
- [ ] CORS is properly configured in PocketBase
- [ ] Environment variables are set in deployment platform
- [ ] `.env.local` is not committed to version control
- [ ] Application starts without validation errors

## Additional Resources

- [Next.js Environment Variables Documentation](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [PocketBase Documentation](https://pocketbase.io/docs/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
