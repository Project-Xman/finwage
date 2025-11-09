/**
 * Support Service Layer
 *
 * Provides data fetching functions for support resources and FAQ content.
 * Handles support documentation, help articles, and frequently asked questions.
 */

import {
  getFaqItems as apiFetchFaqItems,
  getFaqItemsByCategory as apiFetchFaqItemsByCategory,
  getFaqTopics as apiFetchFaqTopics,
  getFeaturedFaqItems as apiFetchFeaturedFaqItems,
  getSupportResources as apiFetchSupportResources,
  getSupportResourcesByCategory as apiFetchSupportResourcesByCategory,
} from "@/lib/api";
import type {
  FaqsResponse,
  FaqTopicsResponse,
  SupportResponse,
} from "@/types/pocketbase";
import type { ProcessListOptions } from "./process";

// ============================================================
// TYPES
// ============================================================

export interface SupportResourcesOptions {
  category?: string;
  limit?: number;
}

export interface FaqItemsOptions {
  category?: string;
  limit?: number;
}

export interface GroupedFaqs {
  [categoryId: string]: {
    topic: FaqTopicsResponse;
    items: FaqsResponse[];
  };
}

// ============================================================
// SUPPORT RESOURCES FUNCTIONS
// ============================================================

/**
 * Fetch all support resources
 *
 * Returns help articles, documentation links, and other support materials
 * organized by category and order.
 *
 * @param options - Optional filtering and pagination options
 * @returns Array of support resources
 *
 * @example
 * ```ts
 * // Get all support resources
 * const resources = await getSupportResources();
 *
 * // Get resources for a specific category
 * const resources = await getSupportResources({ category: 'getting-started' });
 * ```
 */
export async function getSupportResources(
  options: SupportResourcesOptions = {},
): Promise<SupportResponse[]> {
  try {
    const { category, limit } = options;

    if (category) {
      // Fetch resources by category
      const resources = await apiFetchSupportResourcesByCategory(category);
      return limit ? resources.slice(0, limit) : resources;
    }

    // Fetch all resources
    const response = await apiFetchSupportResources({
      perPage: limit || 50,
      sort: "order",
    });

    return response.items;
  } catch (error) {
    console.error("Failed to fetch support resources:", error);
    return [];
  }
}

/**
 * Fetch support resources grouped by category
 *
 * Returns support resources organized by their category for easier display
 * in categorized sections.
 *
 * @returns Object with categories as keys and arrays of resources as values
 *
 * @example
 * ```ts
 * const groupedResources = await getSupportResourcesByCategory();
 * Object.entries(groupedResources).forEach(([category, resources]) => {
 *   console.log(`Category: ${category}`);
 *   resources.forEach(resource => console.log(`  - ${resource.title}`));
 * });
 * ```
 */
export async function getSupportResourcesGroupedByCategory(): Promise<
  Record<string, SupportResponse[]>
> {
  try {
    const response = await apiFetchSupportResources({
      perPage: 100,
      sort: "category,order",
    });

    // Group resources by category
    const grouped: Record<string, SupportResponse[]> = {};

    response.items.forEach((resource) => {
      const category = resource.category || "general";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(resource);
    });

    return grouped;
  } catch (error) {
    console.error("Failed to fetch grouped support resources:", error);
    return {};
  }
}

// ============================================================
// FAQ TOPICS FUNCTIONS
// ============================================================

/**
 * Fetch all FAQ topics/categories
 *
 * Returns the list of FAQ categories that can be used for navigation
 * and organizing FAQ items.
 *
 * @returns Array of FAQ topics sorted by order
 *
 * @example
 * ```ts
 * const topics = await getFaqTopics();
 * topics.forEach(topic => {
 *   console.log(topic.name, topic.description);
 * });
 * ```
 */
export async function getFaqTopics(
  options: ProcessListOptions = {},
): Promise<FaqTopicsResponse[]> {
  const { category } = options;

  try {
    const response = await apiFetchFaqTopics({
      sort: "order",
      category,
    });

    return response.items;
  } catch (error) {
    console.error("Failed to fetch FAQ topics:", error);
    return [];
  }
}

// ============================================================
// FAQ ITEMS FUNCTIONS
// ============================================================

/**
 * Fetch all FAQ items with optional filtering
 *
 * Returns frequently asked questions with their answers, optionally
 * filtered by category.
 *
 * @param options - Optional filtering options
 * @returns Array of FAQ items with expanded category data
 *
 * @example
 * ```ts
 * // Get all FAQs
 * const faqs = await getFaqItems();
 *
 * // Get FAQs for a specific category
 * const faqs = await getFaqItems({ category: 'billing' });
 *
 * // Limit number of results
 * const faqs = await getFaqItems({ limit: 10 });
 * ```
 */
export async function getFaqItems(
  options: FaqItemsOptions = {},
): Promise<FaqsResponse[]> {
  try {
    const { category, limit } = options;

    if (category) {
      // Fetch FAQs by category
      const faqs = await apiFetchFaqItemsByCategory(category);
      console.log("Fetched FAQ items for category:", category, faqs);
      return limit ? faqs.slice(0, limit) : faqs;
    }

    // Fetch all FAQs
    const response = await apiFetchFaqItems({
      perPage: limit || 50,
      sort: "order",
    });

    return response.items;
  } catch (error) {
    console.error("Failed to fetch FAQ items:", error);
    return [];
  }
}

/**
 * Fetch featured FAQ items for homepage or quick help sections
 *
 * Returns the most important or commonly accessed FAQs marked as featured.
 *
 * @param limit - Maximum number of featured FAQs to return (default: 6)
 * @returns Array of featured FAQ items
 *
 * @example
 * ```ts
 * // Get 6 featured FAQs for homepage
 * const featuredFaqs = await getFeaturedFaqItems();
 *
 * // Get more featured FAQs
 * const featuredFaqs = await getFeaturedFaqItems(10);
 * ```
 */
export async function getFeaturedFaqItems(
  limit: number = 6,
): Promise<FaqsResponse[]> {
  try {
    const faqs = await apiFetchFeaturedFaqItems(limit);
    return faqs;
  } catch (error) {
    console.error("Failed to fetch featured FAQ items:", error);
    return [];
  }
}

/**
 * Fetch FAQs grouped by topic/category
 *
 * Returns FAQs organized by their categories with topic information,
 * useful for displaying FAQs in an accordion or tabbed interface.
 *
 * @returns Object with category IDs as keys and topic/items as values
 *
 * @example
 * ```ts
 * const groupedFaqs = await getFaqItemsGroupedByTopic();
 * Object.entries(groupedFaqs).forEach(([categoryId, { topic, items }]) => {
 *   console.log(`Topic: ${topic.name}`);
 *   items.forEach(faq => console.log(`  Q: ${faq.question}`));
 * });
 * ```
 */
export async function getFaqItemsGroupedByTopic(): Promise<GroupedFaqs> {
  try {
    // Fetch all topics and FAQs in parallel
    const [topics, faqsResponse] = await Promise.all([
      apiFetchFaqTopics({ sort: "order" }),
      apiFetchFaqItems({ perPage: 100, sort: "order" }),
    ]);

    const grouped: GroupedFaqs = {};

    // Initialize groups with topics
    topics.items.forEach((topic) => {
      grouped[topic.id] = {
        topic,
        items: [],
      };
    });

    // Group FAQs by category
    faqsResponse.items.forEach((faq) => {
      const categoryId = faq.category;
      if (categoryId && grouped[categoryId]) {
        grouped[categoryId].items.push(faq);
      }
    });

    // Remove empty categories
    Object.keys(grouped).forEach((key) => {
      if (grouped[key].items.length === 0) {
        delete grouped[key];
      }
    });

    return grouped;
  } catch (error) {
    console.error("Failed to fetch grouped FAQ items:", error);
    return {};
  }
}

/**
 * Search FAQ items by keyword
 *
 * Searches through FAQ questions and answers for matching keywords.
 * Note: This performs client-side filtering. For production, consider
 * implementing server-side search with PocketBase filters.
 *
 * @param keyword - Search term to match against questions and answers
 * @returns Array of matching FAQ items
 *
 * @example
 * ```ts
 * const results = await searchFaqItems('payment');
 * results.forEach(faq => {
 *   console.log(faq.question);
 * });
 * ```
 */
export async function searchFaqItems(keyword: string): Promise<FaqsResponse[]> {
  try {
    if (!keyword || keyword.trim().length < 2) {
      return [];
    }

    const response = await apiFetchFaqItems({
      perPage: 100,
    });

    const searchTerm = keyword.toLowerCase().trim();

    // Filter FAQs that match the search term
    const results = response.items.filter((faq) => {
      const questionMatch = faq.question.toLowerCase().includes(searchTerm);
      const answerMatch = faq.answer.toLowerCase().includes(searchTerm);
      return questionMatch || answerMatch;
    });

    return results;
  } catch (error) {
    console.error("Failed to search FAQ items:", error);
    return [];
  }
}
