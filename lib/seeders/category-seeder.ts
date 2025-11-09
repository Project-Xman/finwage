/**
 * Category Seeder
 *
 * Seeds the categories collection with FinWage-specific categories.
 * Independent seeder - no dependencies on other collections.
 * Follows Single Responsibility Principle - only handles category seeding.
 */

import type PocketBase from "pocketbase";
import type { CategorySeedData } from "@/types/seeders";
import { BaseSeeder } from "./base-seeder";

export class CategorySeeder extends BaseSeeder {
  constructor(pb: PocketBase, verbose: boolean = false) {
    super(pb, verbose);
  }

  get name(): string {
    return "Categories";
  }

  protected get collectionName(): string {
    return "category";
  }

  /**
   * Get category seed data
   * Returns FinWage-specific categories for financial wellness content
   */
  protected getSeedData(): CategorySeedData[] {
    return [
      {
        name: "Financial Wellness",
        slug: "financial-wellness",
        description:
          "Tips and insights on achieving financial wellness in the workplace.",
        color: "#1d44c3",
        icon: "fa-wallet",
        count: "0",
      },
      {
        name: "Earned Wage Access",
        slug: "earned-wage-access",
        description:
          "Everything about on-demand pay and earned wage access solutions.",
        color: "#0d2463",
        icon: "fa-money-bill-wave",
        count: "0",
      },
      {
        name: "Employee Benefits",
        slug: "employee-benefits",
        description: "Modern employee benefits and compensation strategies.",
        color: "#28a745",
        icon: "fa-gift",
        count: "0",
      },
    ];
  }

  protected getRecordLabel(data: CategorySeedData): string {
    return `Category: ${data.name}`;
  }
}
