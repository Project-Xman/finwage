"use client";

import { useState } from "react";
import { ContactModal } from "@/components/shared/contact-modal";
import { Button } from "@/components/ui/button";
import { EnquiriesInterestOptions } from "@/types/pocketbase";

interface EnquiryButtonProps {
  /**
   * Type of enquiry: demo, pricing, contact, or other
   */
  type: "demo" | "pricing" | "contact" | "other";
  /**
   * Button text - defaults based on type if not provided
   */
  children?: React.ReactNode;
  /**
   * Button size - defaults to "default"
   */
  size?: "default" | "sm" | "lg" | "icon";
  /**
   * Button variant
   */
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Modal title - defaults based on type if not provided
   */
  modalTitle?: string;
  /**
   * Modal description - defaults based on type if not provided
   */
  modalDescription?: string;
  /**
   * Icon to show after text
   */
  icon?: React.ReactNode;
}

/**
 * EnquiryButton - A standardized button component for creating enquiries
 *
 * This component provides a consistent interface for demo requests, contact forms,
 * and pricing inquiries. It automatically opens a modal with the appropriate form
 * and creates enquiries in the PocketBase database.
 *
 * @example
 * // Demo button
 * <EnquiryButton type="demo" size="lg" className="bg-white text-blue-600">
 *   Schedule Your Demo
 * </EnquiryButton>
 *
 * @example
 * // Contact button
 * <EnquiryButton type="contact" variant="link">
 *   Contact Sales
 * </EnquiryButton>
 */
export function EnquiryButton({
  type,
  children,
  size = "default",
  variant = "default",
  className = "",
  modalTitle,
  modalDescription,
  icon,
}: EnquiryButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Map type to EnquiriesInterestOptions
  const interestType = {
    demo: EnquiriesInterestOptions.demo,
    pricing: EnquiriesInterestOptions.pricing,
    contact: EnquiriesInterestOptions.contact,
    other: EnquiriesInterestOptions.other,
  }[type];

  // Default button text based on type
  const defaultButtonText = {
    demo: "Schedule a Demo",
    pricing: "Get Pricing",
    contact: "Contact Us",
    other: "Get in Touch",
  }[type];

  // Default modal title based on type
  const defaultModalTitle = {
    demo: "Schedule a Demo",
    pricing: "Request Pricing Information",
    contact: "Contact Us",
    other: "Get in Touch",
  }[type];

  // Default modal description based on type
  const defaultModalDescription = {
    demo: "We'll contact you to schedule a personalized demo of our platform.",
    pricing:
      "Tell us about your organization and we'll create a custom pricing plan for you.",
    contact: "Send us a message and we'll get back to you as soon as possible.",
    other: "How can we help you today?",
  }[type];

  return (
    <>
      <Button
        size={size}
        variant={variant}
        className={className}
        onClick={() => setIsModalOpen(true)}
      >
        {children || defaultButtonText}
        {icon}
      </Button>

      <ContactModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        interestType={interestType}
        title={modalTitle || defaultModalTitle}
        description={modalDescription || defaultModalDescription}
      />
    </>
  );
}
