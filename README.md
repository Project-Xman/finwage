This is a [Next.js](https://nextjs.org) project bootstrapped with [
`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PocketBase instance running (for local development)

### Environment Setup

1. Copy the example environment file:

```bash
cp .env.local.example .env.local
```

2. Update `.env.local` with your configuration:

```env
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
```

For detailed environment configuration, see [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md).

### Running PocketBase (Local Development)

1. Navigate to the data directory:

```bash
cd data
```

2. Start PocketBase:

```bash
./pocketbase serve
```

PocketBase will be available at http://127.0.0.1:8090

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically
optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

### Blog SEO Optimization

The blog system includes comprehensive SEO metadata support for Next.js 15 static generation:

- **Custom SEO titles and descriptions** for each blog post
- **Open Graph metadata** for social media sharing
- **Twitter Card support** for enhanced Twitter shares
- **Canonical URL support** for cross-posted content
- **Keyword meta tags** for search engine optimization

Blog posts are statically generated at build time with full SEO metadata embedded in the HTML for optimal search engine indexing and social media sharing.

For detailed information, see:
- [Blog SEO Configuration Guide](docs/BLOG-SEO.md)
- [Blog SEO Examples](docs/BLOG-SEO-EXAMPLE.md)
- [Static Generation Guide](docs/STATIC-GENERATION.md)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions
are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for
more details.
