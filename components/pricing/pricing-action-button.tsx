"use client";

import { EnquiryButton } from "@/components/shared/enquiry-button";

interface PricingActionButtonProps {
  isEnterprise: boolean;
  planName: string;
}

/**
 * PricingActionButton - Client component for pricing plan CTA
 */
export function PricingActionButton({
  isEnterprise,
  planName,
}: PricingActionButtonProps) {
  return (
    <EnquiryButton
      type={isEnterprise ? "pricing" : "pricing"}
      className="w-full bg-[#1d44c3] text-white hover:bg-[#153399] transition-colors h-12 font-semibold"
      modalTitle={
        isEnterprise ? "Contact Sales" : `Get Started with ${planName}`
      }
      modalDescription={
        isEnterprise
          ? "Tell us about your organization and we'll create a custom pricing plan for you."
          : `We'll contact you to help get you started with the ${planName} plan.`
      }
    >
      {isEnterprise ? "Contact Sales" : "Get Started"}
    </EnquiryButton>
  );
}
