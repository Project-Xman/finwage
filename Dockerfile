# Multi-stage build for Next.js 15 + Turbopack using Bun

###########################
# Stage 1: Dependencies
###########################
FROM oven/bun:1-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies (cached layer)
RUN bun install --frozen-lockfile || bun install

###########################
# Stage 2: Builder
###########################
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Copy package files and install all dependencies (including devDependencies)
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile || bun install

# Copy source code
COPY . .

# Set build environment
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application using Turbopack
RUN bun run build

###########################
# Stage 3: Runner
###########################
FROM oven/bun:1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Add non-root user
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copy necessary build artifacts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Ensure proper permissions for the nextjs user
RUN chown -R nextjs:nextjs /app/public

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the app with Bun (uses Node.js-compatible runtime)
CMD ["bun", "server.js"]
