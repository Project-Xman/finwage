/**
 * General FAQ Section Component
 *
 * Displays FAQs grouped by category with accordion UI.
 * Can be used on any page to show relevant FAQs.
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  getFaqItemsGroupedByTopic,
  getFeaturedFaqItems,
} from "@/lib/services/support";

interface FAQSectionProps {
  title?: string;
  description?: string;
  showFeaturedOnly?: boolean;
  categoryFilter?: string;
  limit?: number;
}

export async function FAQSection({
  title = "Frequently Asked Questions",
  description = "Find answers to common questions",
  showFeaturedOnly = false,
  categoryFilter,
  limit,
}: FAQSectionProps) {
  let faqs;
  let groupedFaqs;

  if (showFeaturedOnly) {
    // Show only featured FAQs
    faqs = await getFeaturedFaqItems(limit || 6);
  } else if (categoryFilter) {
    // Show FAQs for a specific category
    groupedFaqs = await getFaqItemsGroupedByTopic();

    // Filter to only the requested category
    const filteredGroups: typeof groupedFaqs = {};
    Object.entries(groupedFaqs).forEach(([categoryId, data]) => {
      if (
        data.topic.name === categoryFilter ||
        data.topic.id === categoryFilter
      ) {
        filteredGroups[categoryId] = data;
      }
    });
    groupedFaqs = filteredGroups;
  } else {
    // Show all FAQs grouped by topic
    groupedFaqs = await getFaqItemsGroupedByTopic();
  }

  // If showing featured only, render simple list
  if (showFeaturedOnly && faqs) {
    if (faqs.length === 0) {
      return (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                {title}
              </h2>
              {description && (
                <p className="text-lg text-gray-600 mt-4">{description}</p>
              )}
            </div>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-600">
                Have questions? Contact our support team for more information.
              </p>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-gray-600 mt-4">{description}</p>
            )}
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    <span className="flex items-center gap-2">
                      {faq.question}
                      {faq.featured && (
                        <Badge className="bg-[#1d44c3] text-white text-xs">
                          Popular
                        </Badge>
                      )}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-gray-700">
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    );
  }

  // Render grouped FAQs by category
  if (!groupedFaqs || Object.keys(groupedFaqs).length === 0) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-gray-600 mt-4">{description}</p>
            )}
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600">
              Have questions? Contact our support team for more information.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 mt-4">{description}</p>
          )}
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {Object.entries(groupedFaqs).map(([categoryId, { topic, items }]) => (
            <div key={categoryId}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {topic.name}
              </h3>
              {topic.description && (
                <p className="text-gray-600 mb-6">{topic.description}</p>
              )}
              <Accordion type="single" collapsible className="w-full">
                {items.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-lg font-semibold text-left">
                      <span className="flex items-center gap-2">
                        {faq.question}
                        {faq.featured && (
                          <Badge className="bg-[#1d44c3] text-white text-xs">
                            Popular
                          </Badge>
                        )}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-700">
                      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
