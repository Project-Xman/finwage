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
   * Returns FinWage team members for content authorship
   */
  protected getSeedData(): AuthorSeedData[] {
    return [
      {
        name: "Shibin Shahul",
        slug: "shibin-shahul",
        email: "shibin@finwage.com",
        bio: "Founder & CEO of FinWage with extensive experience in building and scaling technology-driven businesses across the Middle East and North America. With a strong background in fintech and workforce solutions, Shibin leads FinWage with a focus on responsible innovation and operational excellence.",
        role: "Founder & CEO",
        social_link: {
          linkedin: "https://linkedin.com/in/shibin-shahul",
        },
        active: true,
      },
      {
        name: "Richard James",
        slug: "richard-james",
        email: "richard@finwage.com",
        bio: "Chief Technology Officer leading FinWage's technology strategy, overseeing the design and development of secure, scalable, and high-performance platforms. With deep expertise in fintech architecture and product engineering.",
        role: "Chief Technology Officer",
        social_link: {
          linkedin: "https://linkedin.com/in/richard-james-cto",
        },
        active: true,
      },
      {
        name: "Joby Varghese",
        slug: "joby-varghese",
        email: "joby@finwage.com",
        bio: "Compliance Officer with strong expertise in financial services and fintech compliance, focusing on AML, KYC, data privacy, and regulatory governance. Joby oversees FinWage's compliance framework and risk management practices.",
        role: "Compliance Officer",
        social_link: {
          linkedin: "https://linkedin.com/in/joby-varghese",
        },
        active: true,
      },
    ];
  }

  protected getRecordLabel(data: AuthorSeedData): string {
    return `Author: ${data.name}`;
  }
}
