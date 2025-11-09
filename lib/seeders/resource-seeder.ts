/**
 * Resource Seeder
 *
 * Seeds the resource collections with articles, categories, and downloads.
 * Includes categories, articles, and downloadable guides for the Resources page.
 */

import type PocketBase from "pocketbase";
import { DependentSeeder } from "./base-seeder";

interface ResourceCategorySeedData {
  name: string;
  slug: string;
  icon: string;
  article_count: number;
  description?: string;
  order: number;
  active: boolean;
}

interface ResourceArticleSeedData {
  title: string;
  slug: string;
  excerpt: string;
  image?: string;
  category?: string;
  published_date: string;
  read_time: string;
  featured: boolean;
  published: boolean;
  order?: number;
}

interface ResourceDownloadSeedData {
  title: string;
  description: string;
  file_url?: string;
  type: string;
  featured: boolean;
  active: boolean;
  order: number;
}

export class ResourceSeeder extends DependentSeeder {
  constructor(pb: PocketBase, verbose: boolean = false) {
    super(pb, verbose);
  }

  get name(): string {
    return "Resources";
  }

  protected get collectionName(): string {
    return "resource_categories"; // Start with categories
  }

  getDependencies(): string[] {
    return []; // No dependencies
  }

  /**
   * Seed all resource-related collections
   */
  async seed(): Promise<void> {
    try {
      this.log("Starting resource seeding...");

      // Seed categories first
      const categoryIds = await this.seedCategories();

      // Seed articles with category references
      await this.seedArticles(categoryIds);

      // Seed downloads
      await this.seedDownloads();

      this.log("Resource seeding completed successfully");
    } catch (error) {
      console.error("Resource seeding failed:", error);
      throw error;
    }
  }

  /**
   * Seed resource categories
   */
  private async seedCategories(): Promise<string[]> {
    this.log("Seeding resource categories...");

    const categories = this.getCategoriesData();
    const categoryIds: string[] = [];

    for (const category of categories) {
      try {
        const existing = await this.pb
          .collection("resource_categories")
          .getFirstListItem(`slug = "${category.slug}"`);

        this.log(`Category "${category.name}" already exists, skipping...`);
        categoryIds.push(existing.id);
      } catch {
        const record = await this.pb
          .collection("resource_categories")
          .create(category);

        this.log(`Created category: ${category.name}`);
        categoryIds.push(record.id);
      }
    }

    return categoryIds;
  }

  /**
   * Seed resource articles
   */
  private async seedArticles(categoryIds: string[]): Promise<void> {
    this.log("Seeding resource articles...");

    const articles = this.getArticlesData(categoryIds);

    for (const article of articles) {
      try {
        await this.pb
          .collection("resource_articles")
          .getFirstListItem(`slug = "${article.slug}"`);

        this.log(`Article "${article.title}" already exists, skipping...`);
      } catch {
        await this.pb.collection("resource_articles").create(article);

        this.log(`Created article: ${article.title}`);
      }
    }
  }

  /**
   * Seed resource downloads
   */
  private async seedDownloads(): Promise<void> {
    this.log("Seeding resource downloads...");

    const downloads = this.getDownloadsData();

    for (const download of downloads) {
      try {
        await this.pb
          .collection("resource_downloads")
          .getFirstListItem(`title = "${download.title}"`);

        this.log(`Download "${download.title}" already exists, skipping...`);
      } catch {
        await this.pb.collection("resource_downloads").create(download);

        this.log(`Created download: ${download.title}`);
      }
    }
  }

  /**
   * Get categories seed data
   */
  private getCategoriesData(): ResourceCategorySeedData[] {
    return [
      {
        name: "Financial Wellness",
        slug: "financial-wellness",
        icon: "TrendingUp",
        article_count: 24,
        description: "Resources about improving employee financial health",
        order: 1,
        active: true,
      },
      {
        name: "Employee Retention",
        slug: "employee-retention",
        icon: "Users",
        article_count: 18,
        description: "Strategies for retaining top talent",
        order: 2,
        active: true,
      },
      {
        name: "Payroll Trends",
        slug: "payroll-trends",
        icon: "Calendar",
        article_count: 15,
        description: "Latest trends in payroll and compensation",
        order: 3,
        active: true,
      },
      {
        name: "Case Studies",
        slug: "case-studies",
        icon: "Award",
        article_count: 12,
        description: "Success stories from our customers",
        order: 4,
        active: true,
      },
      {
        name: "Industry News",
        slug: "industry-news",
        icon: "BookOpen",
        article_count: 32,
        description: "Latest news and updates",
        order: 5,
        active: true,
      },
    ];
  }

  /**
   * Get articles seed data
   */
  private getArticlesData(categoryIds: string[]): ResourceArticleSeedData[] {
    const [
      financialWellnessId,
      employeeRetentionId,
      payrollTrendsId,
      caseStudiesId,
      industryNewsId,
    ] = categoryIds;

    return [
      // Featured Articles
      {
        title: "The Real Cost of Living Paycheck to Paycheck",
        slug: "real-cost-living-paycheck-to-paycheck",
        excerpt:
          "How earned wage access is helping millions of workers break free from the payday cycle and build long-term financial security.",
        image: "/assets/analytic-image.png",
        category: financialWellnessId,
        published_date: new Date("2025-01-15").toISOString(),
        read_time: "5 min read",
        featured: true,
        published: true,
        order: 1,
      },
      {
        title: "Why Top Companies Are Offering Wage Access",
        slug: "why-top-companies-offering-wage-access",
        excerpt:
          "The ROI of financial wellness benefits and how they're transforming employee retention strategies.",
        image: "/assets/office-meeting.png",
        category: employeeRetentionId,
        published_date: new Date("2025-01-10").toISOString(),
        read_time: "7 min read",
        featured: true,
        published: true,
        order: 2,
      },
      {
        title: "The Future of Payroll: On-Demand Wages",
        slug: "future-of-payroll-on-demand-wages",
        excerpt:
          "Exploring how technology is revolutionizing when and how employees get paid.",
        image: "/assets/laptop-office.png",
        category: payrollTrendsId,
        published_date: new Date("2025-01-05").toISOString(),
        read_time: "6 min read",
        featured: true,
        published: true,
        order: 3,
      },

      // Recent Articles
      {
        title: "5 Ways Financial Stress Impacts Employee Productivity",
        slug: "financial-stress-impacts-productivity",
        excerpt:
          "Understanding the connection between financial wellness and workplace performance.",
        category: financialWellnessId,
        published_date: new Date("2025-01-12").toISOString(),
        read_time: "4 min read",
        featured: false,
        published: true,
      },
      {
        title: "How to Choose the Right Wage Access Provider",
        slug: "choose-right-wage-access-provider",
        excerpt:
          "A comprehensive guide for employers evaluating EWA solutions.",
        category: employeeRetentionId,
        published_date: new Date("2025-01-08").toISOString(),
        read_time: "8 min read",
        featured: false,
        published: true,
      },
      {
        title: "Understanding the Earned Wage Access Regulation Landscape",
        slug: "ewa-regulation-landscape",
        excerpt:
          "Navigate the regulatory environment for earned wage access programs.",
        category: industryNewsId,
        published_date: new Date("2025-01-03").toISOString(),
        read_time: "10 min read",
        featured: false,
        published: true,
      },
      {
        title: "Case Study: Reducing Turnover by 30% with FinWage",
        slug: "case-study-reducing-turnover-30-percent",
        excerpt:
          "How one company transformed their retention strategy with earned wage access.",
        category: caseStudiesId,
        published_date: new Date("2024-12-28").toISOString(),
        read_time: "6 min read",
        featured: false,
        published: true,
      },
      {
        title: "The Psychology of Payday: Why Timing Matters",
        slug: "psychology-of-payday",
        excerpt:
          "Research insights on how pay frequency affects employee financial behavior.",
        category: financialWellnessId,
        published_date: new Date("2024-12-22").toISOString(),
        read_time: "5 min read",
        featured: false,
        published: true,
      },
      {
        title: "Building a Financial Wellness Program That Works",
        slug: "building-financial-wellness-program",
        excerpt:
          "Step-by-step guide to creating an effective financial wellness initiative.",
        category: employeeRetentionId,
        published_date: new Date("2024-12-18").toISOString(),
        read_time: "9 min read",
        featured: false,
        published: true,
      },
    ];
  }

  /**
   * Get downloads seed data
   */
  private getDownloadsData(): ResourceDownloadSeedData[] {
    return [
      {
        title: "The Complete Guide to Implementing Earned Wage Access",
        description:
          "Everything you need to know about implementing EWA in your organization, from planning to rollout.",
        file_url: "#", // Placeholder - would be actual PDF link
        type: "guide",
        featured: true,
        active: true,
        order: 1,
      },
      {
        title: "Financial Wellness ROI Calculator",
        description:
          "Calculate the potential return on investment for your financial wellness program.",
        file_url: "#",
        type: "template",
        featured: false,
        active: true,
        order: 2,
      },
      {
        title: "Employee Financial Wellness Survey Template",
        description:
          "Assess your employees' financial wellness needs with this comprehensive survey template.",
        file_url: "#",
        type: "template",
        featured: false,
        active: true,
        order: 3,
      },
    ];
  }

  protected async getSeedData(): Promise<any[]> {
    // Not used - we override the seed() method
    return [];
  }
}
