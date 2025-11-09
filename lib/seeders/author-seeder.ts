/**
 * Author Seeder
 *
 * Seeds the authors collection with FinWage content team.
 * Independent seeder - no dependencies on other collections.
 * Follows Single Responsibility Principle - only handles author seeding.
 */

import type PocketBase from "pocketbase";
import type { AuthorSeedData } from "@/types/seeders";
import { BaseSeeder } from "./base-seeder";

export class AuthorSeeder extends BaseSeeder {
  constructor(pb: PocketBase, verbose: boolean = false) {
    super(pb, verbose);
  }

  get name(): string {
    return "Authors";
  }

  protected get collectionName(): string {
    return "authors";
  }

  /**
   * Get author seed data
   * Returns FinWage content team members with realistic profiles
   */
  protected getSeedData(): AuthorSeedData[] {
    return [
      {
        name: "Sarah Mitchell",
        slug: "sarah-mitchell",
        email: "sarah@finwage.com",
        bio: "Head of Content at FinWage with 10+ years experience in fintech and employee benefits. Passionate about financial wellness and helping employees achieve financial freedom.",
        role: "Head of Content",
        social_link: {
          twitter: "https://twitter.com/sarahmitchell",
          linkedin: "https://linkedin.com/in/sarah-mitchell-finwage",
        },
        active: true,
      },
      {
        name: "David Chen",
        slug: "david-chen",
        email: "david@finwage.com",
        bio: "Financial wellness expert and product strategist. David has helped thousands of employees improve their financial health through earned wage access.",
        role: "Product Strategist",
        social_link: {
          linkedin: "https://linkedin.com/in/davidchen-finwage",
          twitter: "https://twitter.com/davidchen_ewa",
        },
        active: true,
      },
      {
        name: "Maria Rodriguez",
        slug: "maria-rodriguez",
        email: "maria@finwage.com",
        bio: "HR and benefits consultant specializing in modern compensation strategies. Maria writes about the future of work and employee financial wellness.",
        role: "Benefits Consultant",
        social_link: {
          linkedin: "https://linkedin.com/in/maria-rodriguez-hr",
        },
        active: true,
      },
    ];
  }

  protected getRecordLabel(data: AuthorSeedData): string {
    return `Author: ${data.name}`;
  }
}
