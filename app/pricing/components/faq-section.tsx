import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqsResponse, FaqTopicsResponse } from "@/types/pocketbase";

interface FAQSectionProps {
  getFaqItems: (options?: any) => Promise<{ items: FaqsResponse[] }>;
  getFaqTopics: (options?: any) => Promise<{ items: FaqTopicsResponse[] }>;
}

export async function FAQSection({ getFaqItems, getFaqTopics }: FAQSectionProps) {
  // First, get the "Pricing & Fees" category
  const categoriesResponse = await getFaqTopics({
    filter: 'name = "Pricing & Fees"'
  });
  
  const pricingCategory = categoriesResponse.items[0];
  
  if (!pricingCategory) {
    console.error('Pricing & Fees category not found');
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Pricing FAQ</h2>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600">
              Have questions? Contact our sales team for more information.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Fetch all FAQs for the "Pricing & Fees" category
  const faqsResponse = await getFaqItems({
    sort: "order",
    expand: "category",
    filter: `category = "${pricingCategory.id}"`
  });
  
  const faqs = faqsResponse.items;

  // Sort by featured first, then by order
  const sortedFAQs = [...faqs].sort((a, b) => {
    // Featured first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // Then by order
    return (a.order || 999) - (b.order || 999);
  });

  if (sortedFAQs.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Pricing FAQ</h2>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600">
              Have questions? Contact our sales team for more information.
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
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Pricing FAQ</h2>
          <p className="text-lg text-gray-600 mt-4">
            Common questions about our pricing and fees
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {sortedFAQs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-lg font-semibold text-left">
                  <span className="flex items-center gap-2">
                    {faq.question}
                    {faq.featured && (
                      <span className="text-xs bg-[#1d44c3] text-white px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}