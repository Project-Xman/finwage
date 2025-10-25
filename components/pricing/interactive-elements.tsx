"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/shared/contact-modal";
import { EnquiriesInterestOptions } from "@/types/pocketbase";


export function InteractivePricingElements({ type = "both" }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <>
      {type === "contact" && (
        <Button 
          variant="link" 
          className="text-[#1d44c3]"
          onClick={() => setIsContactModalOpen(true)}
        >
          Contact Sales for Custom Pricing →
        </Button>
      )}

      {type === "demo" && (
        <Button 
          size="lg" 
          className="bg-white text-[#1d44c3] hover:bg-gray-100"
          onClick={() => setIsDemoModalOpen(true)}
        >
          Schedule Your Demo
        </Button>
      )}

      {type === "both" && (
        <>
          <Button 
            variant="link" 
            className="text-[#1d44c3]"
            onClick={() => setIsContactModalOpen(true)}
          >
            Contact Sales for Custom Pricing →
          </Button>
        </>
      )}

      {/* Contact Modal for Custom Pricing */}
      <ContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
        interestType={EnquiriesInterestOptions.pricing}
        title="Contact Sales"
        description="Tell us about your organization and we'll create a custom pricing plan for you."
      />

      {/* Demo Modal */}
      <ContactModal
        open={isDemoModalOpen}
        onOpenChange={setIsDemoModalOpen}
        interestType={EnquiriesInterestOptions.demo}
        title="Schedule a Demo"
        description="We'll contact you to schedule a personalized demo of our platform."
      />
    </>
  );
}