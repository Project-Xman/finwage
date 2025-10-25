# PocketBase Webhooks Setup Guide

This guide explains how to set up and configure webhooks for your PocketBase instance in the FinWage application.

## Overview

Webhooks allow PocketBase to send HTTP requests to external endpoints when certain events occur (create, update, delete operations on collections). This enables real-time integration with your Next.js application or external services.

## Files Added

### Core Webhook Files
- `data/pocketbase_webhooks.go` - Webhook plugin implementation
- `data/main.go` - PocketBase server with webhook plugin
- `data/go.mod` - Go module dependencies
- `scripts/webhook-server.go` - Example webhook receiver server

### Configuration Files
- `data/Dockerfile.pocketbase` - Updated to build Go-based PocketBase
- `docker-compose.yaml` - Updated with webhook environment variables

## Setup Instructions

### 1. Build and Start PocketBase with Webhooks

```bash
# Build and start the services
docker-compose up --build pocketbase

# Or run in development mode
cd data
go run .
```

### 2. Access PocketBase Admin

1. Open http://localhost:8090/_/
2. Create an admin account if first time
3. Login to the admin interface

### 3. Configure Webhooks

1. Navigate to Collections in the admin interface
2. You'll see a new "webhooks" system collection
3. Click on "webhooks" to manage webhook configurations

### 4. Create Webhook Records

Create webhook entries with the following fields:

| Field | Description | Example |
|--------|-------------|---------|
| `name` | Webhook identifier | "Contact Form Webhook" |
| `collection` | Target collection name | "contacts" |
| `destination` | Webhook endpoint URL | "http://localhost:3000/api/webhooks/pocketbase" |
| `headers` | Custom HTTP headers (JSON) | `{"X-API-Key": "secret", "Authorization": "Bearer token"}` |
| `active` | Enable/disable webhook | `true` |

### 5. Example Webhook Configurations

#### Contact Form Webhook
```json
{
  "name": "Contact Form Notifications",
  "collection": "contacts",
  "destination": "http://localhost:3000/api/webhooks/pocketbase",
  "headers": "{\"X-Webhook-Source\": \"pocketbase\"}",
  "active": true
}
```

#### Blog Post Webhook
```json
{
  "name": "Blog Cache Invalidation",
  "collection": "blogs",
  "destination": "http://localhost:3000/api/webhooks/pocketbase",
  "headers": "{\"X-Action\": \"cache-invalidate\"}",
  "active": true
}
```

#### Testimonial Webhook
```json
{
  "name": "New Testimonial Alert",
  "collection": "testimonials",
  "destination": "http://localhost:3000/api/webhooks/pocketbase",
  "headers": "{\"X-Notification-Type\": \"testimonial\"}",
  "active": true
}
```

## Webhook Payload Structure

When an event occurs, PocketBase sends a POST request with this payload:

```json
{
  "action": "create|update|delete",
  "collection": "collection_name",
  "record": {
    "id": "record_id",
    "field1": "value1",
    "field2": "value2"
  },
  "auth": {
    // User auth record if authenticated user triggered the event
  },
  "admin": {
    // Admin record if admin triggered the event
  }
}
```

## Testing Webhooks

### Option 1: Use the Example Webhook Server

```bash
# Run the example webhook server
cd scripts
go run webhook-server.go

# Server will start on http://localhost:8080
# Webhook endpoint: http://localhost:8080/webhook
# Health check: http://localhost:8080/health
```

Configure your webhook destination to: `http://host.docker.internal:8080/webhook`

### Option 2: Use Your Next.js Application

The existing webhook endpoint at `/app/api/webhooks/pocketbase/route.ts` is already configured to handle PocketBase webhooks.

Configure your webhook destination to: `http://host.docker.internal:3000/api/webhooks/pocketbase`

### Option 3: Use ngrok for External Testing

```bash
# Install ngrok and create tunnel
ngrok http 3000

# Use the generated URL as webhook destination
# e.g., https://abc123.ngrok.io/api/webhooks/pocketbase
```

## Environment Variables

Add these to your `.env.local` file:

```env
# PocketBase Webhook Configuration
PB_ENCRYPTION_KEY=your-secret-encryption-key-change-this
WEBHOOK_SECRET=webhook-secret-change-this
POCKETBASE_WEBHOOK_SECRET=webhook-secret-change-this
```

## Security Considerations

1. **Webhook Secret**: Always use a strong webhook secret to verify incoming requests
2. **HTTPS**: Use HTTPS endpoints in production
3. **Rate Limiting**: Implement rate limiting on webhook endpoints
4. **Validation**: Validate webhook payloads before processing
5. **Authentication**: Verify webhook signatures when possible

## Troubleshooting

### Common Issues

1. **Webhook not firing**: Check that the webhook is active and collection name matches exactly
2. **Connection refused**: Ensure the destination URL is accessible from the PocketBase container
3. **Invalid JSON**: Check that custom headers are valid JSON format
4. **Timeout errors**: Webhook endpoints should respond quickly (< 30 seconds)

### Debug Logs

Check PocketBase logs for webhook events:

```bash
# View container logs
docker-compose logs -f pocketbase

# You should see entries like:
# webhook sent action=create name=Contact Form Webhook collection=contacts destination=http://...
```

### Testing Webhook Delivery

1. Create a test record in a monitored collection
2. Check PocketBase logs for webhook send confirmation
3. Verify your webhook endpoint received the request
4. Check webhook endpoint logs for processing results

## Advanced Configuration

### Custom Headers

You can add custom headers to webhook requests by storing them as JSON in the `headers` field:

```json
{
  "Authorization": "Bearer your-token",
  "X-API-Key": "your-api-key",
  "X-Custom-Header": "custom-value"
}
```

### Conditional Webhooks

The current implementation sends webhooks for all create/update/delete events. To add conditional logic, modify the `event` function in `pocketbase_webhooks.go`.

### Multiple Destinations

You can create multiple webhook records for the same collection to send events to different endpoints.

## Next Steps

1. Configure webhooks for your specific collections
2. Implement webhook handlers in your Next.js application
3. Add error handling and retry logic
4. Set up monitoring and alerting for webhook failures
5. Consider implementing webhook signatures for enhanced security

## Support

For issues or questions:
1. Check PocketBase documentation: https://pocketbase.io/docs/
2. Review webhook plugin logs in the container
3. Test webhook endpoints independently
4. Verify network connectivity between containers