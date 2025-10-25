# Webhook Environment Variables

This document outlines the environment variables needed for PocketBase webhook integration and Next.js 15 cache revalidation.

## Required Environment Variables

Add these variables to your `.env.local` file:

```env
# PocketBase Configuration
NEXT_PUBLIC_POCKETBASE_URL=http://localhost:8090
PB_ENCRYPTION_KEY=your-secret-encryption-key-change-this

# Webhook Security
POCKETBASE_WEBHOOK_SECRET=your-webhook-secret-change-this
REVALIDATION_API_KEY=your-revalidation-api-key-change-this

# Optional: For testing
WEBHOOK_URL=http://localhost:3000/api/webhooks/pocketbase
REVALIDATION_URL=http://localhost:3000
```

## Environment Variable Details

### `NEXT_PUBLIC_POCKETBASE_URL`
- **Required**: Yes
- **Description**: Public URL of your PocketBase instance
- **Development**: `http://localhost:8090`
- **Production**: `https://your-pocketbase-domain.com`

### `PB_ENCRYPTION_KEY`
- **Required**: Yes (for PocketBase)
- **Description**: Encryption key for PocketBase data
- **Format**: Strong random string (32+ characters)
- **Generate**: `openssl rand -hex 32`

### `POCKETBASE_WEBHOOK_SECRET`
- **Required**: Recommended
- **Description**: Secret token for webhook authentication
- **Purpose**: Validates incoming webhook requests from PocketBase
- **Format**: Strong random string
- **Generate**: `openssl rand -hex 16`

### `REVALIDATION_API_KEY`
- **Required**: Optional (for manual revalidation API)
- **Description**: API key for manual cache revalidation endpoints
- **Purpose**: Protects manual revalidation endpoints from unauthorized access
- **Format**: Strong random string
- **Generate**: `openssl rand -hex 16`

### `WEBHOOK_URL` (Testing only)
- **Required**: No
- **Description**: Webhook endpoint URL for testing
- **Default**: `http://localhost:3000/api/webhooks/pocketbase`

### `REVALIDATION_URL` (Testing only)
- **Required**: No
- **Description**: Base URL for revalidation API testing
- **Default**: `http://localhost:3000`

## Production Configuration

### Vercel Deployment

```env
# Vercel Environment Variables
NEXT_PUBLIC_POCKETBASE_URL=https://your-pocketbase.fly.dev
PB_ENCRYPTION_KEY=your-production-encryption-key
POCKETBASE_WEBHOOK_SECRET=your-production-webhook-secret
REVALIDATION_API_KEY=your-production-api-key
```

### Docker Deployment

```env
# Docker Environment Variables
NEXT_PUBLIC_POCKETBASE_URL=http://pocketbase:8090
PB_ENCRYPTION_KEY=your-docker-encryption-key
POCKETBASE_WEBHOOK_SECRET=your-docker-webhook-secret
REVALIDATION_API_KEY=your-docker-api-key
```

## Security Best Practices

### 1. Generate Strong Secrets
```bash
# Generate encryption key
openssl rand -hex 32

# Generate webhook secret
openssl rand -base64 32

# Generate API key
openssl rand -base64 24
```

### 2. Different Secrets for Each Environment
- Use different secrets for development, staging, and production
- Never commit secrets to version control
- Use environment-specific secret management

### 3. Rotate Secrets Regularly
- Change secrets periodically (quarterly recommended)
- Update both application and PocketBase webhook configurations
- Test webhook functionality after secret rotation

## PocketBase Webhook Configuration

### 1. Access PocketBase Admin
- Go to `http://localhost:8090/_/` (development)
- Login with your admin credentials

### 2. Configure Webhooks
1. Navigate to Collections → webhooks
2. Create new webhook records:

```json
{
  "name": "Next.js Cache Revalidation",
  "collection": "blogs",
  "destination": "https://your-domain.com/api/webhooks/pocketbase",
  "headers": "{\"x-webhook-secret\": \"your-webhook-secret\"}",
  "active": true
}
```

### 3. Test Webhook Configuration
```bash
# Test webhook endpoints
npm run test:webhooks

# Verbose testing
npm run test:webhooks:verbose

# Health check only
npm run webhook:health
```

## Troubleshooting

### Common Issues

#### 1. Webhook Authentication Failed
**Error**: `401 Unauthorized - Invalid webhook secret`

**Solution**:
- Verify `POCKETBASE_WEBHOOK_SECRET` matches the secret in PocketBase webhook headers
- Check for trailing spaces or special characters
- Ensure webhook headers JSON is properly formatted

#### 2. Revalidation API Unauthorized
**Error**: `401 Unauthorized - Invalid API key`

**Solution**:
- Set `REVALIDATION_API_KEY` environment variable
- Include correct API key in request headers
- Use either `x-api-key` or `Authorization: Bearer` header format

#### 3. PocketBase Connection Failed
**Error**: Connection refused or timeout

**Solution**:
- Verify `NEXT_PUBLIC_POCKETBASE_URL` is correct
- Check PocketBase is running and accessible
- For Docker: ensure containers are on same network

#### 4. Cache Not Invalidating
**Error**: Old content still showing after webhook

**Solution**:
- Check webhook is reaching the endpoint (check logs)
- Verify collection name mapping in `handlePocketBaseWebhook`
- Test manual revalidation API to isolate the issue

### Debug Commands

```bash
# Test webhook connectivity
curl -X GET http://localhost:3000/api/webhooks/pocketbase

# Test manual revalidation
curl -X POST http://localhost:3000/api/revalidate/collection \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{"collection": "blogs"}'

# Check PocketBase health
curl -X GET http://localhost:8090/api/health

# Test with webhook payload
curl -X POST http://localhost:3000/api/webhooks/pocketbase \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: your-webhook-secret" \
  -d '{
    "action": "create",
    "collection": "blogs",
    "record": {"id": "test-123", "slug": "test-post"}
  }'
```

### Logging

Enable verbose logging to debug webhook issues:

```javascript
// In your webhook handler
console.log('[Webhook] Received payload:', JSON.stringify(payload, null, 2));
console.log('[Webhook] Environment secret:', process.env.POCKETBASE_WEBHOOK_SECRET ? 'Set' : 'Not set');
console.log('[Webhook] Request secret:', request.headers.get('x-webhook-secret'));
```

## Testing Checklist

Before deploying to production:

- [ ] Environment variables are set correctly
- [ ] Webhook secret matches between Next.js and PocketBase
- [ ] PocketBase webhooks are configured for all relevant collections
- [ ] Webhook endpoints return 200 status codes
- [ ] Cache revalidation is working (test with browser dev tools)
- [ ] Manual revalidation API is accessible (if using)
- [ ] All webhook tests pass (`npm run test:webhooks`)
- [ ] Production webhook URLs are using HTTPS
- [ ] Secrets are different from development environment

## Migration Guide

### From Basic Setup to Webhook Integration

1. **Add environment variables**:
   ```env
   POCKETBASE_WEBHOOK_SECRET=your-webhook-secret
   REVALIDATION_API_KEY=your-api-key
   ```

2. **Update PocketBase configuration**:
   - Stop PocketBase
   - Update to Go-based PocketBase with webhook plugin
   - Restart and configure webhook records

3. **Test integration**:
   ```bash
   npm run test:webhooks
   ```

4. **Deploy changes**:
   - Update production environment variables
   - Deploy Next.js application
   - Update production webhook URLs in PocketBase

### Rollback Plan

If webhook integration causes issues:

1. **Disable webhooks in PocketBase**:
   - Set webhook records `active: false`

2. **Remove webhook environment variables**:
   - Application will work without webhook revalidation

3. **Revert to manual cache management**:
   - Use time-based revalidation instead of on-demand

4. **Re-enable after fixing issues**:
   - Debug and test in development first
   - Gradually re-enable webhooks for each collection